import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs',
      sourcemap: isDevelopment,
    },
  ],
  plugins: [
    commonjs(),
    json(),
    resolve({ preferBuiltins: true }),
    !isDevelopment &&
      terser({
        compress: { drop_console: !isDevelopment },
        format: { comments: false },
      }),
    typescript(),
    typescriptPaths(),
  ].filter(Boolean),
  external: [
    // Mark Node.js built-ins as external
    'crypto',
    'fs',
    'path',
    'process',
  ],
};
