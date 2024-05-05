# corellium-typescript

`corellium-typescript` is a TypeScript library for interacting with the Corellium API. It is a wrapper around the Corellium REST API, providing a more user-friendly interface for interacting with the API.

**Note: While I am a Corellium employee, this library is not officially supported by Corellium.**

## Installation

You can install `corellium-typescript` using any JavaScript package manager. For example, using `pnpm`:

```sh
pnpm add corellium-typescript
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
