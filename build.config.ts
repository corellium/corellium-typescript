import { defineBuildConfig } from 'unbuild';
import terser from '@rollup/plugin-terser';

export default defineBuildConfig({
  entries: [ './src/index' ],
  outDir: 'dist',
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    output: {
      compact: true,
      minifyInternalExports: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      dir: 'dist',
      // @ts-ignore
      plugins: [ terser() ] // minify
    }
  }
});