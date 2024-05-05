/* eslint-disable no-console */
import { Corellium } from '../dist';

const corellium = new Corellium('123');

try {
  const devices = await corellium.devices.list();

  await corellium.device('123').app.run('com.corellium.cafe');

  console.log(devices);
} catch (error) {
  console.error(error);
}
