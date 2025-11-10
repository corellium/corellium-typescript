# corellium-typescript

[![Version](https://img.shields.io/npm/v/corellium-typescript.svg)](https://www.npmjs.org/package/corellium-typescript) [![Build Status](https://github.com/haydenbleasel/corellium-typescript/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/corellium-typescript/actions?query=branch%3Amain)

![Corellium TypeScript](/sample.png)

`corellium-typescript` is a TypeScript library for interacting with the [Corellium](https://www.corellium.com/) API. It is a wrapper around the Corellium REST API, providing a more user-friendly interface for interacting with the API.

The key differences between `corellium-typescript` and official Corellium libraries are:

- TypeScript types for all API responses
- Improved naming of endpoints e.g. `corellium.devices.list` instead of `corellium.v1Instances`
- Opinionated error handling (throws errors for all non-2xx responses so you can catch them)
- Endpoints with device context e.g. `corellium.device('deviceId').app.run('com.corellium.cafe')`
- Deep JSDoc comments for all methods and types
- Adds undocumented endpoint payloads
- Supports both ECMAScript Modules (ESM) and CommonJS (CJS) environments

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

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken', {
  // Optional: Set the API URL to use a different Corellium instance
  endpoint: 'https://acme.enterprise.corellium.com',
});
```

Alternatively, you can use an object containing `username` and `password`:

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium(
  {
    username: 'username',
    password: 'password',
  },
  {
    // Optional: Set the API URL to use a different Corellium instance
    endpoint: 'https://acme.enterprise.corellium.com',
  }
);
```

Then, you can use the `corellium` object to interact with the Corellium API. The library is structured in a way that mirrors the Corellium UI, with methods for projects, devices, and apps e.g.

```ts
const projects = await corellium.projects.list();
```

## Examples

### Apps

```ts
// List all apps on a device
const apps = await corellium.device('deviceId').app.list();

// Run an app on a device
await corellium.device('deviceId').app.run('com.corellium.cafe');

// Install an app on a device
await corellium.device('123').app.install({ path: '/com.corellium.cafe.ipa' });

// Uninstall an app from a device
await corellium.device('deviceId').app.uninstall('com.corellium.cafe');

// Get statuses for all apps on a device
const statuses = await corellium.device('deviceId').app.statuses();

// Get the icons for specified apps on a device
const icons = await corellium
  .device('deviceId')
  .app.icons(['com.corellium.cafe', 'com.apple.mobilesafari']);

// Kill an app on a device
await corellium.device('deviceId').app.kill('com.corellium.cafe');

// Install OpenGApps on an Android device
await corellium.device('deviceId').app.openGApps.install();
```

### AuthProviders

```ts
// Create an auth provider
const provider = await corellium.authProvider.create({
  enabled: true,
  providerType: 'open-id-connect',
  label: "Login with Custom Auth0",
  config: {
    discoveryUrl: 'http://localhost:8080/realms/Corellium/.well-known/openid-configuration',
    clientId: 'B5GhRzrVn19adO1a1vJ6aZRYdNY9jSP4',
    clientSecret: 'itsasecret',
    invitedOnly: false
  }
}

// Delete an auth provider
await corellium.authProvider.delete('authProviderId');

// List all auth providers
const providers = await corellium.authProvider.list();

// Update an auth provider
await corellium.authProvider.update('authProviderId', {
  enabled: false,
  label: "Login with Custom Auth0 (disabled)"
});
```

### Authentication

```ts
// Change the password for a user
await corellium.auth.changePassword({
  userId: 'userId',
  oldPassword: 'newpassword',
  newPassword: 'oldpassword',
});

// Reset the password for a user using a token
await corellium.auth.resetPassword({
  token: 'token',
  totpToken: 'totpToken',
  newPassword: 'newpassword',
});

// Send a password reset email to a user
await corellium.auth.sendPasswordResetEmail({
  email: 'jane@acme.com',
});

// Consent to the terms of service
await corellium.auth.consent();
```

### Connect

```ts
// Get the QuickConnect URL for a device
const url = await corellium.device('deviceId').connect.quickConnect.get();

// Get IP of eth0 (AOSP only)
const ip = await corellium.device('deviceId').connect.eth0IP.get();

// Get ADB Auth Setting (AOSP only)
const auth = await corellium.device('deviceId').connect.adbAuthSetting.get();

// Set ADB Auth Setting (AOSP only)
await corellium.device('deviceId').connect.adbAuthSetting.set({
  enabled: true,
});

// Connect to WiFi
await corellium.device('deviceId').connect.wifi.connect();

// Disconnect from WiFi
await corellium.device('deviceId').connect.wifi.disconnect();
```

### Console

```ts
// Get console websocket URL
const url = await corellium.device('deviceId').console.get();
```

### CoreTrace

```ts
// Start running CoreTrace on a device
await corellium.device('deviceId').coreTrace.start();

// Stop running CoreTrace on a device
await corellium.device('deviceId').coreTrace.stop();

// Get running CoreTrace threads on a device
const threads = await corellium.device('deviceId').coreTrace.threads();

// Clear the CoreTrace data on a device
await corellium.device('deviceId').coreTrace.clear();
```

### Devices (General)

```ts
// List all devices
const devices = await corellium.devices.list();

// Create a new device (Jailbroken / Rooted by default)
// Modern iOS devices require Firmware Assets to be downloaded when creating new devices.
// Pass FETCH_FIRMWARE_ASSETS=1 to automatically download assets.
const device = await corellium.devices.create({
  project: 'projectId',
  name: 'My New Device',
  flavor: 'ranchu',
  os: '14.0.0',
});

// Search for devices by name
const search = await corellium.devices.search('My Device');
```

### Device (Specific)

```ts
// Get a device
const device = await corellium.device('deviceId').get();

// Delete a device
await corellium.device('deviceId').delete();

// Update a device
await corellium.device('deviceId').update({
  name: 'My Updated Device',
});

// Start a device
await corellium.device('deviceId').start();

// Stop a device
await corellium.device('deviceId').stop();

// Reboot a device
await corellium.device('deviceId').reboot();

// Pause a device
await corellium.device('deviceId').pause();

// Resume a device
await corellium.device('deviceId').resume();

// Lock a device (iOS only)
await corellium.device('deviceId').lock();

// Unlock a device (iOS only)
await corellium.device('deviceId').unlock();

// Get the Websocket URL for a device
const url = await corellium.device('deviceId').websocket.get();

// Get the state of a device
const state = await corellium.device('deviceId').state.get();

// Get the GPIO state of a device
const gpio = await corellium.device('deviceId').gpio.get();

// Set the GPIO state of a device
await corellium.device('deviceId').gpio.set({
  button: {
    bitCount: 2,
    banks: [
      [0, 1],
      [1, 0],
    ],
  },
  switch: {
    bitCount: 8,
    banks: [[0, 1, 0, 1, 0, 1, 0, 1]],
  },
});

// Get the device's sensors
const sensors = await corellium.device('deviceId').sensors.get();

// Set the device's sensors
await corellium.device('deviceId').sensors.set({
  acceleration: [0, 9.81, 0],
  gyroscope: [0, 0, 0],
  magnetic: [0, 45, 0],
  orientation: [0, 0, 0],
  temperature: 25,
  proximity: 50,
  light: 20,
  pressure: 1013.25,
  humidity: 55,
});

// Take a screenshot of a device
const screenshot = await corellium.device('deviceId').takeScreenshot('png');

// Rotate a device
await corellium.device('deviceId').rotate('landscape');

// Send input to a device
await corellium.device('deviceId').input([
  {
    buttons: ['finger'],
    position: [[300, 600]],
    wait: 0,
  },
  {
    buttons: [],
    wait: 100,
  },
]);

// Upgrade a device's OS (iOS only)
await corellium.device('deviceId').upgrade({
  os: '15.0.0',
});

// Check if a device is ready for interaction
const ready = await corellium.device('deviceId').ready();

// Set the hostname of a device
await corellium.device('deviceId').hostname.set('my-hostname');

// Get a system property (Android only)
const property = await corellium
  .device('deviceId')
  .property.get('corellium.opengapps');

// Run Frida
await corellium.device('deviceId').frida.run('targetPid', 'targetName');

// List Frida processes on the device.
const processes = await corellium.device('deviceId').frida.list();

// Run Frida Kill
await corellium.device('deviceId').frida.kill();

// Check if SSL Pinning is enabled
const isEnabled = await corellium.device('deviceId').sslPinning.get();

// Enable SSL Pinning
await corellium.device('deviceId').sslPinning.set(true);

// Disable SSL Pinning
await corellium.device('deviceId').sslPinning.set(false);

// Enable UI Automation
await corellium.device('deviceId').uiAutomation.set(true);

// Disable UI Automation
await corellium.device('deviceId').uiAutomation.set(false);

// Acquire DisableAutolockAssertion
await corellium.device('deviceId').disableAutolockAssertion.acquire();

// Release DisableAutolockAssertion
const commandResponse = await corellium
  .device('deviceId')
  .disableAutolockAssertion.release();

// Send a commands directly into the device e.g. Run a shell command
const commandResponse = await corellium
  .device('deviceId')
  .send('app', 'shellExec', { cmd });
```

### Device (Specific) - MATRIX

```ts
// Run a MATRIX assessment
await corellium.device('deviceId').matrix.run({
  bundleId: 'com.corellium.cafe',
});

// Get a MATRIX assessment
const assessment = await corellium
  .device('deviceId')
  .matrix.assessment.get('assessmentId');

// Get all MATRIX assessments
const assessments = await corellium.device('deviceId').matrix.assessment.list();

// Delete a MATRIX assessment
await corellium.device('deviceId').matrix.assessment.delete('assessmentId');

// Download a MATRIX assessment
const assessment = await corellium
  .device('deviceId')
  .matrix.assessment.download('assessmentId', 'json');
```

### Files

```ts
// Get a file from a device
const file = await corellium.device('deviceId').file.get('/data/test.txt');

// Put a file on a device
await corellium
  .device('deviceId')
  .file.create('/data/test.txt', 'Hello, World!');

// Delete a file from a device
await corellium.device('deviceId').file.delete('/data/test.txt');

// Update a file on a device
await corellium.device('deviceId').file.update('/data/test.txt', {
  path: '/data/test.txt',
  mode: 0,
  uid: 0,
  gid: 0,
});

// Generate a unique filename on a device
const filename = await corellium.device('deviceId').file.generateFilename();
```

### HyperTrace

```ts
// Start running HyperTrace on a device
await corellium.device('deviceId').hyperTrace.start();

// Stop running HyperTrace on a device
await corellium.device('deviceId').hyperTrace.stop();

// Get Kernel extension ranges
const ranges = await corellium.device('deviceId').hyperTrace.ranges();

// Pre-authorize a HyperTrace download
const preauth = await corellium.device('deviceId').hyperTrace.authorize();

// Clear the HyperTrace data on a device
await corellium.device('deviceId').hyperTrace.clear();
```

### Image

```ts
// List all images
const images = await corellium.image.list();

// Create a new image
const image = await corellium.image.create({
  type: 'binary',
  encoding: 'plain',
  encapsulated: false,
  name: 'My New Image',
  project: 'projectId',
  instance: 'instanceId',
  file: File,
});

// Get an image
const image = await corellium.image.get('imageId');

// Update an image (contents)
await corellium.image.update('imageId', File);

// Delete an image
await corellium.image.delete('imageId');
```

### Kernel Hooks

```ts
// List all kernel hooks on a device
const hooks = await corellium.device('deviceId').kernelHook.list();

// Create a new kernel hook on a device
const hook = await corellium.device('deviceId').kernelHook.create({
  label: 'TEST HOOK',
  address: '0xfffffff006ae8864',
  patch: `print("Hello, world\n");`,
  patchType: 'csmfcc',
});

// Get a kernel hook on a device
const hook = await corellium.device('deviceId').kernelHook.get('hookId');

// Update a kernel hook on a device
await corellium.device('deviceId').kernelHook.update('hookId', {
  label: 'TEST HOOK (updated)',
});

// Delete a kernel hook on a device
await corellium.device('deviceId').kernelHook.delete('hookId');

// Run kernel hooks on a device
await corellium.device('deviceId').kernelHook.run();

// Clear kernel hooks on a device
await corellium.device('deviceId').kernelHook.clear();
```

### Media

```ts
// Start playing media file on a device
await corellium.device('deviceId').media.start({
  url: 'http://example.com/video.mp4',
});

// Stop playing media file on a device
await corellium.device('deviceId').media.stop();
```

### Messaging

```ts
// Receive a message (iOS only)
const message = await corellium.device('deviceId').message.receive({
  number: '+1234567890',
  message: 'Hello, World!',
});
```

### Models

```ts
// List all models
const models = await corellium.model.list();

// List all software for a model
const software = await corellium.model.software.list('modelId');
```

### Network Monitor

```ts
// Start network monitoring on a device
await corellium.device('deviceId').networkMonitor.start();

// Stop network monitoring on a device
await corellium.device('deviceId').networkMonitor.stop();

// Download network monitoring data from a device (PCAP)
const pcap = await corellium.device('deviceId').networkMonitor.download();
```

You can also use the Advanced Network Monitor, like so:

```ts
// Start advanced network monitoring on a device
await corellium.device('deviceId').networkMonitor.advanced.start({
  ports: ['443', '80'],
  processes: ['42'],
});

// Stop advanced network monitoring on a device
await corellium.device('deviceId').networkMonitor.advanced.stop();

// Download advanced network monitoring data from a device (PCAP)
const pcap = await corellium
  .device('deviceId')
  .networkMonitor.advanced.download();
```

### Panics

```ts
// List all panics on a device
const panics = await corellium.device('deviceId').panic.list();

// Clear all panics on a device
await corellium.device('deviceId').panic.clear();
```

### Profiles

```ts
// List all profiles on a device
const profiles = await corellium.device('deviceId').profile.list();

// Install a profile on a device
await corellium.device('deviceId').profile.install(File);

// Delete a profile from a device
await corellium.device('deviceId').profile.delete('profileId');
```

### Projects (General)

```ts
// List all projects
const projects = await corellium.projects.list();

// Create a new project
const project = await corellium.projects.create({
  name: 'My New Project',
});

// Search for projects by name
const search = await corellium.projects.search('My Project');
```

### Project (Specific)

```ts
// Get a project
const project = await corellium.project('projectId').get();

// Update a project
await corellium.project('projectId').update({
  name: 'My Updated Project',
});

// Delete a project
await corellium.project('projectId').delete();

// Get devices in a project
const devices = await corellium.project('projectId').device.list();

// Get the VPN configuration for a project
const vpn = await corellium.project('projectId').vpn.get();

// List the SSH keys for a project
const keys = await corellium.project('projectId').keys.list();

// Add an SSH key to a project
await corellium.project('projectId').keys.add({
  kind: 'ssh',
  label: 'My New Key',
  key: 'ssh-ed25519 <key>',
});

// Delete an SSH key from a project
await corellium.project('projectId').keys.delete('keyId');
```

### Roles

```ts
// List all roles
const roles = await corellium.role.list();

// Add a user role to a project
await corellium.role.add('projectId', 'roleId', {
  userId: 'userId',
});

// Remove a user role from a project
await corellium.role.remove('projectId', 'roleId', {
  userId,
});

// Add a team role to a project
await corellium.role.add('projectId', 'roleId', {
  teamId: 'teamId',
});

// Remove a team role from a project
await corellium.role.remove('projectId', 'roleId', {
  teamId,
});
```

### Snapshots

```ts
// List all snapshots
const snapshots = await corellium.snapshot.list('deviceId');

// Create a new snapshot
const snapshot = await corellium.snapshot.create('deviceId', {
  name: 'My New Snapshot',
});

// Get a snapshot
const snapshot = await corellium.snapshot.get('deviceId', 'snapshotId');

// Update a snapshot
await corellium.snapshot.update('deviceId', 'snapshotId', {
  name: 'My Updated Snapshot',
});

// Delete a snapshot
await corellium.snapshot.delete('deviceId', 'snapshotId');

// Restore a snapshot
await corellium.snapshot.restore('deviceId', 'snapshotId');

// List shared snapshots
const sharedSnapshots = await corellium.snapshot.sharing.list();

// Share a snapshot
await corellium.snapshot.sharing.create('snapshotId', {
  sharingType: 'passwordPublicLink',
  password: 'password',
});

// Set the sharing policy for a snapshot
await corellium.snapshot.sharing.allow('snapshotId', {
  members: ['jane@acme.com', 'john@acme.com'],
});

// Revoke the sharing policy for a snapshot
await corellium.snapshot.sharing.revoke('snapshotId', {
  members: ['jane@acme.com', 'john@acme.com'],
});

// Accept a shared snapshot
await corellium.snapshot.sharing.accept({
  sharingType: 'passwordPublicLink',
  password: 'abcd',
});
```

You can run a couple of these commands without a device context, like so:

```ts
// Get a snapshot
const snapshots = await corellium.snapshot.get('snapshotId');

// Delete a snapshot
await corellium.snapshot.delete('snapshotId');

// Update a snapshot
await corellium.snapshot.update('snapshotId', {
  name: 'My Updated Snapshot',
});
```

### Team

```ts
// List all teams
const teams = await corellium.team.list();

// Get a team
const team = await corellium.team.get('teamId');

// Create a new team
const team = await corellium.team.create({
  name: 'My New Team',
});

// Update a team
await corellium.team.update('teamId', {
  name: 'My Updated Team',
});

// Delete a team
await corellium.team.delete('teamId');

// Add a user to a team
await corellium.team.user.create('teamId', 'userId');

// Remove a user from a team
await corellium.team.user.delete('teamId', 'userId');
```

## Tokens (API)

```ts
// Create an API Token for the current user.
const token = await corellium.token.create();

// Delete the current user's API Token.
await corellium.token.delete();
```

### Users

```ts
// Delete a user
await corellium.user.delete('userId');
```

### Webplayer

```ts
// List all Webplayer sessions
const sessions = await corellium.webplayer.list();

// Create a new Webplayer session
const session = await corellium.webplayer.create({
  projectId: 'projectId',
  instanceId: 'instanceId',
  expiresIn: 3600, // 1 hour
  features: {
    apps: true,
    console: true,
    files: true,
  },
});

// Get a Webplayer session
const session = await corellium.webplayer.get('sessionId');

// Refresh a Webplayer session
await corellium.webplayer.refresh('sessionId');

// Delete a Webplayer session
await corellium.webplayer.delete('sessionId');

// Retrieve the list of allowed domains for all Webplayer sessions
const domains = await corellium.webplayer.domains.list();
```

## Recipes

### Hold down two buttons concurrently for 3 seconds

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

await corellium
  .device('deviceId')
  .input([
    { buttons: ['volumeUp', 'volumeDown'] },
    { buttons: [], wait: 3000 },
  ]);
```

### Run network monitor for 10 seconds and download the PCAP

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

await corellium.device('deviceId').networkMonitor.start();

await new Promise((resolve) => setTimeout(resolve, 10000));

const pcap = await corellium.device('deviceId').networkMonitor.download();
```

### Create a kernel hook and run all hooks on a device

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

const hook = await corellium.device('deviceId').kernelHook.create({
  label: 'TEST HOOK',
  address: '0xfffffff006ae8864',
  patch: `print("Hello, world\n");`,
  patchType: 'csmfcc',
});

await corellium.device('deviceId').kernelHook.run();
```

### Create a new project and add a user to it

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

const project = await corellium.projects.create({
  name: 'My New Project',
});

const roles = await corellium.role.list();

await corellium.role.add(project.id, roles[0].id, {
  userId,
});
```

### Spin up 10 Android devices concurrently

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

const project = await corellium.projects.create({
  name: 'My New Project',
});

const devices = await Promise.allSettled(
  Array.from({ length: 10 }).map(() =>
    corellium.devices.create({
      project: project.id,
      name: 'My New Device',
      flavor: 'ranchu',
      os: '14.0.0',
    })
  )
);

// Errors will contain the devices that failed to create
const errors = devices.filter((device) => device.status === 'rejected');
const successes = devices.filter((device) => device.status === 'fulfilled');

if (errors.length) {
  console.error(errors);
}

console.log(
  `Successfully created ${successes.length} / ${devices.length} devices`
);
```

### Create an iPhone XS and wait for it to be ready

```ts
import { Corellium } from 'corellium-typescript';

const corellium = new Corellium('apiToken');

const device = await corellium.devices.create({
  project: 'projectId',
  name: 'My New Device',
  flavor: 'iphone-xs',
  os: '14.0.0',
});

while (!(await corellium.device(device.id).ready())) {
  // Wait 1 minute before checking again
  await new Promise((resolve) => setTimeout(resolve, 60000));
}

console.log('Device is ready!');
```
