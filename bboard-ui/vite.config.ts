// This file is part of midnightntwrk/example-counter.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { fileURLToPath, URL } from 'node:url';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

const localNodeModules = fileURLToPath(new URL('./node_modules', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: './.vite',
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate chunk for WASM modules to avoid top-level await issues
          if (id.includes('onchain-runtime-v3')) return 'wasm';
        },
      },
      },
    commonjsOptions: {
      // Transform CommonJS to ESM more aggressively
      transformMixedEsModules: true,
      extensions: ['.js', '.cjs'],
      // Needed for Node.js modules
      ignoreDynamicRequires: true,
    },
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait({
      // Be more permissive with top-level await
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
    // Custom resolver for handling problematic modules
    {
      name: 'wasm-module-resolver',
      resolveId(source, importer) {
        // Special handling for the problematic module
        if (
          source === '@midnight-ntwrk/onchain-runtime-v3' &&
          importer &&
          importer.includes('@midnight-ntwrk/compact-runtime')
        ) {
          // Force dynamic import for this case
          return {
            id: source,
            external: false,
            moduleSideEffects: true,
          };
        }
        return null;
      },
    },
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: { 'top-level-await': true },
      // Configure ESBuild to handle Node.js-style modules
      platform: 'browser',
      format: 'esm',
      loader: {
        '.wasm': 'binary',
      },
    },
    include: [
      '@midnight-ntwrk/midnight-js-protocol/compact-runtime',
      '@midnight-ntwrk/midnight-js-protocol/compact-js',
      '@midnight-ntwrk/midnight-js-protocol/ledger',
    ],
    exclude: [
      '@midnight-ntwrk/onchain-runtime-v3',
      '@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm',
      '@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm.js',
    ],
  },
  define: {},
  checks: {
    importIsUndefined: false,
    pluginTimings: false,
  },
  // Add specific import configuration for more control
  resolve: {
    // Ensure WASM files are loaded properly
    alias: [
      {
        find: 'isomorphic-ws/browser.js',
        replacement: fileURLToPath(new URL('./src/shims/isomorphic-ws-browser.ts', import.meta.url)),
      },      {
        find: '@midnight-ntwrk/midnight-js-protocol/compact-js/effect/Contract',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/compact-js-effect-contract.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/compact-js/effect',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/compact-js-effect.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/platform-js/effect/Configuration',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/platform-effect-configuration.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/platform-js/effect/ContractAddress',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/platform-effect-contract-address.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/compact-runtime',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/compact-runtime.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/compact-js',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/compact-js.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/ledger',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/ledger.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/onchain-runtime',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/onchain-runtime.mjs`,
      },
      {
        find: '@midnight-ntwrk/midnight-js-protocol/platform-js',
        replacement: `${localNodeModules}/@midnight-ntwrk/midnight-js-protocol/dist/platform.mjs`,
      },
      {
        find: /^@midnight-ntwrk\/(.+)/,
        replacement: `${localNodeModules}/@midnight-ntwrk/$1`,
      },
      {
        find: 'pino',
        replacement: `${localNodeModules}/pino/browser.js`,
      },
      {
        find: 'rxjs',
        replacement: `${localNodeModules}/rxjs/dist/esm5/index.js`,
      },
    ],    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.wasm'],
    mainFields: ['browser', 'module', 'main'],
  },
});
