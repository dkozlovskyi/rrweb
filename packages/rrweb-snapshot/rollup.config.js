import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

function toMinPath(path) {
  return path.replace(/\.js$/, '.min.js');
}

let configs = [
  // ES module - for building rrweb
  {
    input: './src/index.ts',
    plugins: [esbuild()],
    output: [
      {
        format: 'esm',
        file: pkg.module,
      },
    ],
  },
];
let extra_configs = [
  // browser
  {
    input: './src/index.ts',
    plugins: [esbuild()],
    output: [
      {
        name: 'rrwebSnapshot',
        format: 'iife',
        file: pkg.unpkg,
      },
    ],
  },
  {
    input: './src/index.ts',
    plugins: [
      esbuild({
        minify: true,
      }),
    ],
    output: [
      {
        name: 'rrwebSnapshot',
        format: 'iife',
        file: toMinPath(pkg.unpkg),
        sourcemap: true,
      },
    ],
  },
  // CommonJS
  {
    input: './src/index.ts',
    plugins: [esbuild()],
    output: [
      {
        format: 'cjs',
        file: pkg.main,
      },
    ],
  },
  // ES module (packed)
  {
    input: './src/index.ts',
    plugins: [
      esbuild({
        minify: true,
      }),
    ],
    output: [
      {
        format: 'esm',
        file: toMinPath(pkg.module),
        sourcemap: true,
      },
    ],
  },
];

if (!process.env.ES_ONLY) {
  configs.push(...extra_configs);
}

export default configs;
