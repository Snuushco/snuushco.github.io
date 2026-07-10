#!/usr/bin/env node

import http from "node:http";
import https from "node:https";

const baseUrl = process.env.KASSIE_SMOKE_BASE_URL ?? process.env.BASE_URL ?? "http://127.0.0.1:3000";
const host = process.env.KASSIE_SMOKE_HOST ?? "kassieapp.nl";

const cases = [
  {
    path: "/pricing",
    status: 308,
    location: "https://mijn.kassieapp.nl/pricing",
  },
  {
    path: "/blog/boekhouding-zzp-verplicht-2026",
    status: 308,
    location: "https://mijn.kassieapp.nl/blog/boekhouding-zzp-verplicht-2026",
  },
  {
    path: "/blog/factuur-verplichte-velden-zzp",
    status: 308,
    location: "https://mijn.kassieapp.nl/blog/factuur-verplichte-velden-zzp",
  },
  {
    path: "/verwerkersovereenkomst",
    status: 307,
    location: "https://mijn.kassieapp.nl/verwerkersovereenkomst",
  },
  {
    path: "/subprocessors",
    status: 307,
    location: "https://mijn.kassieapp.nl/subprocessors",
  },
  {
    path: "/security",
    status: 307,
    location: "https://mijn.kassieapp.nl/security",
  },
];

function normalizeLocation(location) {
  if (!location) return "";
  const url = new URL(location, baseUrl);
  url.hash = "";
  return url.toString();
}

function requestHead(path) {
  const url = new URL(path, baseUrl);
  const client = url.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const request = client.request(url, {
      method: "GET",
      headers: {
        Host: host,
      },
    }, (response) => {
      response.resume();
      response.on("end", () => {
        resolve({
          status: response.statusCode,
          location: response.headers.location ?? "",
        });
      });
    });

    request.setTimeout(10_000, () => {
      request.destroy(new Error(`timeout requesting ${url.toString()}`));
    });
    request.on("error", reject);
    request.end();
  });
}

let failures = 0;

for (const testCase of cases) {
  const response = await requestHead(testCase.path);
  const actualLocation = normalizeLocation(response.location);
  const expectedLocation = normalizeLocation(testCase.location);
  const ok = response.status === testCase.status && actualLocation === expectedLocation;

  console.log(`${ok ? "ok" : "not ok"} ${testCase.path} -> ${response.status} ${actualLocation}`);

  if (!ok) {
    failures += 1;
    console.error(`  expected ${testCase.status} ${expectedLocation}`);
  }
}

if (failures > 0) {
  console.error(`${failures} Kassie route smoke check(s) failed for Host: ${host} at ${baseUrl}`);
  process.exit(1);
}

console.log(`Kassie route smoke passed for Host: ${host} at ${baseUrl}`);
