# corellium-typescript

[![Version](https://img.shields.io/npm/v/corellium-typescript.svg)](https://www.npmjs.org/package/corellium-typescript) [![Build Status](https://github.com/haydenbleasel/corellium-typescript/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/corellium-typescript/actions?query=branch%3Amain)

`corellium-typescript` is a TypeScript library for interacting with the Corellium API. It is a wrapper around the Corellium REST API, providing a more user-friendly interface for interacting with the API.

The key differences between `corellium-typescript` and official Corellium libraries are:

- TypeScript types for all API responses
- Improved structuring of endpoints e.g. `corellium.project.keys.add` instead of `corellium.v1AddProjectKey`
- Opinionated error handling (throws errors for all non-2xx responses so you can catch them)
- Endpoints with device context e.g. `corellium.device('123').app.run('com.corellium.cafe')`

**Note: While I am a Corellium employee, this library is not officially supported by Corellium.**

## Requirements

- Node.js 18.x or later
- A Corellium account

## Installation

You can install `corellium-typescript` using any JavaScript package manager:

```sh
# npm
npm install corellium-typescript

# yarn
yarn add corellium-typescript

# pnpm
pnpm add corellium-typescript

# bun
bun add corellium-typescript
```

## Usage

To use `corellium-typescript`, you will need to have a Corellium account and generate an API key. You can generate an API key by logging into the Corellium web interface and navigating to the "API Keys" section of your account settings.

### Authentication

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium({
  apiKey: '1234567890abcdef',

  // Optional: Set the API URL to use a different Corellium instance
  endpoint: 'https://acme.enterprise.corellium.com',
});
```

### Examples

```ts
// List all projects
const projects = await corellium.project.list();

// Get a project by ID
const project = await corellium.project.get(
  '12345678-1234-1234-1234-1234567890ab'
);

// Get all devices
const devices = await corellium.devices.list();

// Install an app
await corellium.device('123').app.run('com.corellium.cafe');
```
