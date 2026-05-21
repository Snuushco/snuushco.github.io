param(
  [string]$BaseUrl = "https://snuushco.nl",
  [string]$OpsUser = "",
  [string]$OpsPassword = "",
  [string]$CredentialName = "snuushco_ops",
  [switch]$SkipCredentialLookup
)

$ErrorActionPreference = "Stop"

function Get-OpsCredential {
  if ($SkipCredentialLookup -or ($OpsUser -and $OpsPassword)) {
    return
  }

  $credentialScript = "C:\Users\GuusB\.openclaw\workspace-emily\scripts\get-credential.ps1"
  if (-not (Test-Path $credentialScript)) {
    return
  }

  try {
    $credential = & powershell -NoProfile -File $credentialScript -Name $CredentialName
    if (-not $OpsUser -and $credential.User) {
      $script:OpsUser = $credential.User
    }
    if (-not $OpsPassword -and $credential.Password) {
      $script:OpsPassword = $credential.Password
    }
  } catch {
    # Public smoke checks can still run without internal ops credentials.
  }
}

function Invoke-SmokeRequest {
  param(
    [string]$Url,
    [hashtable]$Headers = @{}
  )

  try {
    $response = Invoke-WebRequest -Uri $Url -MaximumRedirection 5 -TimeoutSec 30 -UseBasicParsing -Headers $Headers
    return [pscustomobject]@{
      status = [int]$response.StatusCode
      ok = [int]$response.StatusCode -ge 200 -and [int]$response.StatusCode -lt 300
      content = $response.Content
      error = ""
    }
  } catch {
    $status = 0
    if ($_.Exception.Response) {
      $status = [int]$_.Exception.Response.StatusCode
    }
    return [pscustomobject]@{
      status = $status
      ok = $false
      content = ""
      error = $_.Exception.Message
    }
  }
}

Get-OpsCredential

$publicRoutes = @(
  "/",
  "/intake",
  "/website-laten-maken/dienstverleners",
  "/doelgroepen/security-facilitair",
  "/doelgroepen/bouw-techniek",
  "/privacy",
  "/voorwaarden",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt"
)

$results = foreach ($route in $publicRoutes) {
  $url = "$BaseUrl$route"
  $result = Invoke-SmokeRequest -Url $url
  [pscustomobject]@{
    url = $url
    status = $result.status
    ok = $result.ok
    hasForbiddenCopy = $result.content -match "AI upsell|AI workflows|vage AI|dit is voor mij|Maandbudget|Websitebudget|Onder EUR 1.000"
    error = $result.error
  }
}

$opsHealthUrl = "$BaseUrl/api/ops/health"
$opsHeaders = @{}
if ($OpsUser -and $OpsPassword) {
  $token = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${OpsUser}:${OpsPassword}"))
  $opsHeaders.Authorization = "Basic $token"
}

$opsHealth = Invoke-SmokeRequest -Url $opsHealthUrl -Headers $opsHeaders
$results += [pscustomobject]@{
  url = $opsHealthUrl
  status = $opsHealth.status
  ok = if ($OpsUser -and $OpsPassword) { $opsHealth.ok } else { $opsHealth.status -eq 401 -or $opsHealth.status -eq 200 }
  hasForbiddenCopy = $false
  authMode = if ($OpsUser -and $OpsPassword) { "basic" } elseif ($opsHealth.status -eq 401) { "protected_401_expected" } else { "unconfigured_or_local_200" }
  error = if (($OpsUser -and $OpsPassword) -or ($opsHealth.status -ne 401 -and $opsHealth.status -ne 200)) { $opsHealth.error } else { "" }
}

$failed = @($results | Where-Object { -not $_.ok -or $_.hasForbiddenCopy })

[pscustomobject]@{
  checkedAt = (Get-Date).ToUniversalTime().ToString("o")
  baseUrl = $BaseUrl
  ok = $failed.Count -eq 0
  results = $results
} | ConvertTo-Json -Depth 6

if ($failed.Count -gt 0) {
  exit 1
}
