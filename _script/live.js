#!/usr/bin/env node
const liveServer = require('live-server');

const params = {
    port: 8080,
    host: "127.0.0.1", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    ignore: '*', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2 // 0 = errors only, 1 = some, 2 = lots
}

liveServer.start(params);