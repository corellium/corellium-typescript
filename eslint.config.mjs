import ultracite from 'ultracite';

for (const config of ultracite) {
  config.rules = config.rules || {};
  config.rules['@typescript-eslint/explicit-module-boundary-types'] = 'off';
  config.rules['new-cap'] = 'off';
  config.rules['@typescript-eslint/member-ordering'] = 'off';
  config.rules['sonarjs/no-duplicate-string'] = 'off';
}

export { default } from 'ultracite';
