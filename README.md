# shu-dades-client

## Overview
This is the front-end client application for my designing & developing enterprise systems module at Sheffield Hallam University.

## Prerequisites
- [node](https://nodejs.org/en/download)  
- [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)  
- [shu-dades-server](https://github.com/kkcaZ/shu-dades-server) - please start the server before running this application

## Development

```bash
npm i
npm run tauri dev
```

## Building

```bash
npm i
npm run tauri build
```

Once built, the installer for your operating system can be found in src-tauri/target/release/bundle
