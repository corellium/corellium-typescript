/* eslint-disable no-console */
import Corellium from '../dist';

const corellium = new Corellium({
  accessToken: '123',
});

try {
  const devices = await corellium.device.list();

  console.log(devices);
} catch (error) {
  console.error(error);
}
