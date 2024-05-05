import Corellium from '../dist';

const corellium = new Corellium({
  accessToken: '123',
});

const devices = await corellium.device.list();

console.log(devices);
