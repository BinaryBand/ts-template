import path from 'path';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    alias({
      entries: [{ find: '@utils', replacement: path.join(path.resolve(), './src/utils') }],
    }),
    commonjs(),
    json(),
    nodeResolve(),
    resolve(),
    typescript(),
  ],
};
