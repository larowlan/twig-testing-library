/* eslint-disable */

import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  external: [
    'path',
    'fs',
    '@testing-library/dom',
    'twig',
    'regenerator-runtime/runtime',
    'drupal-attribute',
    'core-js/modules/es.array.for-each',
    'core-js/modules/es.array.is-array',
    'core-js/modules/es.array.iterator',
    'core-js/modules/es.object.to-string',
    'core-js/modules/es.promise',
    'core-js/modules/es.set',
    'core-js/modules/es.string.iterator',
    'core-js/modules/web.dom-collections.for-each',
    'core-js/modules/web.dom-collections.iterator'
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      strict: false
    }
  ],
  plugins: [
    babel({
      presets: [['@babel/preset-env', {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      }]],
      babelrc: false,
    }),
  ],
};
