param(
  [string]$BaseUrl = "https://snuushco.nl"
)

$ErrorActionPreference = "Stop"

$routes = @(
  "/",
  "/intake",
  "/doelgroepen/security-facilitair",
  "/doelgroepen/bouw-techniek",
  "/api/ops/health"
)

$results = foreach ($route in $routes) {
  $url = "$BaseUrl$route"
  try {
    $response = Invoke-WebRequest -Uri $url -MaximumRedirection 5 -TimeoutSec 30 -UseBasicParsing
    [pscustomobject]@{
      url = $url
      status = [int]$response.StatusCode
      ok = [int]$response.StatusCode -ge 200 -and [int]$response.StatusCode -lt 300
      hasForbiddenCopy = $response.Content -match "AI upsell|AI workflows|vage AI|dit is voor mij|Maandbudget|Websitebudget|Onder EUR 1.000"
    }
  } catch {
    [pscustomobject]@{
      url = $url
      status = 0
      ok = $false
      hasForbiddenCopy = $false
      error = $_.Exception.Message
    }
  }
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
