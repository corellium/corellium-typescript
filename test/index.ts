/* eslint-disable no-console */
import { Corellium } from '../dist';

const corellium = new Corellium('123');

try {
  const _devices = await corellium.devices.list();

  await corellium.device('123').app.run('com.corellium.cafe');
} catch (_error) {}
