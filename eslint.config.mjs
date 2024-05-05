import harmony from 'eslint-config-harmony';

harmony.forEach((config) => {
  config.rules['@typescript-eslint/explicit-module-boundary-types'] = 'off';
  config.rules['new-cap'] = 'off';
});

export default harmony;
