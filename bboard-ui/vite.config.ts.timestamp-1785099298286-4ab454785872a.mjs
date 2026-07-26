// vite.config.ts
import fs from "node:fs";
import { defineConfig } from "file:///D:/Risein%201/bboard-ui/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Risein%201/bboard-ui/node_modules/@vitejs/plugin-react/dist/index.js";
import wasm from "file:///D:/Risein%201/bboard-ui/node_modules/vite-plugin-wasm/exports/import.mjs";
import topLevelAwait from "file:///D:/Risein%201/bboard-ui/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import { nodePolyfills } from "file:///D:/Risein%201/bboard-ui/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/Risein%201/bboard-ui/vite.config.ts";
var localModulesDir = fileURLToPath(new URL("./node_modules", __vite_injected_original_import_meta_url));
var rootModulesDir = fileURLToPath(new URL("../node_modules", __vite_injected_original_import_meta_url));
var getModulePath = (subpath) => {
  const localPath = `${localModulesDir}/${subpath}`;
  return fs.existsSync(localPath) ? localPath : `${rootModulesDir}/${subpath}`;
};
var vite_config_default = defineConfig({
  cacheDir: "./.vite",
  build: {
    target: "esnext",
    minify: false,
    rollupOptions: {
      external: [
        "@midnight-ntwrk/midnight-js-contracts",
        "@midnight-ntwrk/midnight-js-indexer-public-data-provider",
        "isomorphic-ws"
      ],
      output: {
        manualChunks: (id) => {
          if (id.includes("onchain-runtime-v3")) return "wasm";
        }
      }
    },
    commonjsOptions: {
      // Transform CommonJS to ESM more aggressively
      transformMixedEsModules: true,
      extensions: [".js", ".cjs"],
      // Needed for Node.js modules
      ignoreDynamicRequires: true
    }
  },
  plugins: [
    react(),
    wasm(),
    nodePolyfills({
      // Polyfill buffer and related Node.js built-ins for browser
      include: ["buffer", "process", "util"],
      globals: { Buffer: true, process: true }
    }),
    topLevelAwait({
      // Be more permissive with top-level await
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`
    }),
    // Custom resolver for handling problematic modules
    {
      name: "wasm-module-resolver",
      resolveId(source, importer) {
        if (source === "@midnight-ntwrk/onchain-runtime-v3" && importer && importer.includes("@midnight-ntwrk/compact-runtime")) {
          return {
            id: source,
            external: false,
            moduleSideEffects: true
          };
        }
        return null;
      }
    }
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      supported: { "top-level-await": true },
      // Configure ESBuild to handle Node.js-style modules
      platform: "browser",
      format: "esm",
      loader: {
        ".wasm": "binary"
      }
    },
    include: [
      "@midnight-ntwrk/midnight-js-protocol/compact-runtime",
      "@midnight-ntwrk/midnight-js-protocol/compact-js",
      "@midnight-ntwrk/midnight-js-protocol/ledger"
    ],
    exclude: [
      "@midnight-ntwrk/onchain-runtime-v3",
      "@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm",
      "@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm.js"
    ]
  },
  define: {
    // Ensure Buffer is available globally
    global: "globalThis"
  },
  // Add specific import configuration for more control
  resolve: {
    // Ensure WASM files are loaded properly
    alias: [
      {
        find: "buffer",
        replacement: getModulePath("buffer/index.js")
      },
      {
        find: "isomorphic-ws/browser.js",
        replacement: fileURLToPath(new URL("./src/shims/isomorphic-ws-browser.ts", __vite_injected_original_import_meta_url))
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/compact-js/effect/Contract",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/compact-js-effect-contract.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/compact-js/effect",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/compact-js-effect.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/platform-js/effect/Configuration",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/platform-effect-configuration.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/platform-js/effect/ContractAddress",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/platform-effect-contract-address.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/compact-runtime",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/compact-runtime.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/compact-js",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/compact-js.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/ledger",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/ledger.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/onchain-runtime",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/onchain-runtime.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-protocol/platform-js",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-protocol/dist/platform.mjs")
      },
      {
        find: "@midnight-ntwrk/midnight-js-contracts",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-contracts")
      },
      {
        find: "@midnight-ntwrk/midnight-js-fetch-zk-config-provider",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-fetch-zk-config-provider")
      },
      {
        find: "@midnight-ntwrk/midnight-js-http-client-proof-provider",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-http-client-proof-provider")
      },
      {
        find: "@midnight-ntwrk/midnight-js-indexer-public-data-provider",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-indexer-public-data-provider")
      },
      {
        find: "@midnight-ntwrk/midnight-js-network-id",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-network-id")
      },
      {
        find: "@midnight-ntwrk/midnight-js-types",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-types")
      },
      {
        find: "@midnight-ntwrk/midnight-js-utils",
        replacement: getModulePath("@midnight-ntwrk/midnight-js-utils")
      },
      {
        find: "@midnight-ntwrk/dapp-connector-api",
        replacement: getModulePath("@midnight-ntwrk/dapp-connector-api")
      },
      {
        find: "pino",
        replacement: getModulePath("pino/browser.js")
      },
      {
        find: "rxjs",
        replacement: getModulePath("rxjs/dist/esm5/index.js")
      }
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".wasm"],
    mainFields: ["browser", "module", "main"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxSaXNlaW4gMVxcXFxiYm9hcmQtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFJpc2VpbiAxXFxcXGJib2FyZC11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUmlzZWluJTIwMS9iYm9hcmQtdWkvdml0ZS5jb25maWcudHNcIjsvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBtaWRuaWdodG50d3JrL2V4YW1wbGUtY291bnRlci5cbi8vIENvcHlyaWdodCAoQykgTWlkbmlnaHQgRm91bmRhdGlvblxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHdhc20gZnJvbSAndml0ZS1wbHVnaW4td2FzbSc7XG5pbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tICd2aXRlLXBsdWdpbi10b3AtbGV2ZWwtYXdhaXQnO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuY29uc3QgbG9jYWxNb2R1bGVzRGlyID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL25vZGVfbW9kdWxlcycsIGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3Qgcm9vdE1vZHVsZXNEaXIgPSBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4uL25vZGVfbW9kdWxlcycsIGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3QgZ2V0TW9kdWxlUGF0aCA9IChzdWJwYXRoOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbG9jYWxQYXRoID0gYCR7bG9jYWxNb2R1bGVzRGlyfS8ke3N1YnBhdGh9YDtcbiAgcmV0dXJuIGZzLmV4aXN0c1N5bmMobG9jYWxQYXRoKSA/IGxvY2FsUGF0aCA6IGAke3Jvb3RNb2R1bGVzRGlyfS8ke3N1YnBhdGh9YDtcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjYWNoZURpcjogJy4vLnZpdGUnLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLWNvbnRyYWN0cycsXG4gICAgICAgICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtaW5kZXhlci1wdWJsaWMtZGF0YS1wcm92aWRlcicsXG4gICAgICAgICdpc29tb3JwaGljLXdzJyxcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAvLyBTZXBhcmF0ZSBjaHVuayBmb3IgV0FTTSBtb2R1bGVzIHRvIGF2b2lkIHRvcC1sZXZlbCBhd2FpdCBpc3N1ZXNcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ29uY2hhaW4tcnVudGltZS12MycpKSByZXR1cm4gJ3dhc20nO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgLy8gVHJhbnNmb3JtIENvbW1vbkpTIHRvIEVTTSBtb3JlIGFnZ3Jlc3NpdmVseVxuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgICBleHRlbnNpb25zOiBbJy5qcycsICcuY2pzJ10sXG4gICAgICAvLyBOZWVkZWQgZm9yIE5vZGUuanMgbW9kdWxlc1xuICAgICAgaWdub3JlRHluYW1pY1JlcXVpcmVzOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHdhc20oKSxcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIC8vIFBvbHlmaWxsIGJ1ZmZlciBhbmQgcmVsYXRlZCBOb2RlLmpzIGJ1aWx0LWlucyBmb3IgYnJvd3NlclxuICAgICAgaW5jbHVkZTogWydidWZmZXInLCAncHJvY2VzcycsICd1dGlsJ10sXG4gICAgICBnbG9iYWxzOiB7IEJ1ZmZlcjogdHJ1ZSwgcHJvY2VzczogdHJ1ZSB9LFxuICAgIH0pLFxuICAgIHRvcExldmVsQXdhaXQoe1xuICAgICAgLy8gQmUgbW9yZSBwZXJtaXNzaXZlIHdpdGggdG9wLWxldmVsIGF3YWl0XG4gICAgICBwcm9taXNlRXhwb3J0TmFtZTogJ19fdGxhJyxcbiAgICAgIHByb21pc2VJbXBvcnROYW1lOiAoaSkgPT4gYF9fdGxhXyR7aX1gLFxuICAgIH0pLFxuICAgIC8vIEN1c3RvbSByZXNvbHZlciBmb3IgaGFuZGxpbmcgcHJvYmxlbWF0aWMgbW9kdWxlc1xuICAgIHtcbiAgICAgIG5hbWU6ICd3YXNtLW1vZHVsZS1yZXNvbHZlcicsXG4gICAgICByZXNvbHZlSWQoc291cmNlLCBpbXBvcnRlcikge1xuICAgICAgICAvLyBTcGVjaWFsIGhhbmRsaW5nIGZvciB0aGUgcHJvYmxlbWF0aWMgbW9kdWxlXG4gICAgICAgIGlmIChcbiAgICAgICAgICBzb3VyY2UgPT09ICdAbWlkbmlnaHQtbnR3cmsvb25jaGFpbi1ydW50aW1lLXYzJyAmJlxuICAgICAgICAgIGltcG9ydGVyICYmXG4gICAgICAgICAgaW1wb3J0ZXIuaW5jbHVkZXMoJ0BtaWRuaWdodC1udHdyay9jb21wYWN0LXJ1bnRpbWUnKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBGb3JjZSBkeW5hbWljIGltcG9ydCBmb3IgdGhpcyBjYXNlXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBzb3VyY2UsXG4gICAgICAgICAgICBleHRlcm5hbDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVTaWRlRWZmZWN0czogdHJ1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgIHN1cHBvcnRlZDogeyAndG9wLWxldmVsLWF3YWl0JzogdHJ1ZSB9LFxuICAgICAgLy8gQ29uZmlndXJlIEVTQnVpbGQgdG8gaGFuZGxlIE5vZGUuanMtc3R5bGUgbW9kdWxlc1xuICAgICAgcGxhdGZvcm06ICdicm93c2VyJyxcbiAgICAgIGZvcm1hdDogJ2VzbScsXG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgJy53YXNtJzogJ2JpbmFyeScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgaW5jbHVkZTogW1xuICAgICAgJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9jb21wYWN0LXJ1bnRpbWUnLFxuICAgICAgJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9jb21wYWN0LWpzJyxcbiAgICAgICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvbGVkZ2VyJyxcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFtcbiAgICAgICdAbWlkbmlnaHQtbnR3cmsvb25jaGFpbi1ydW50aW1lLXYzJyxcbiAgICAgICdAbWlkbmlnaHQtbnR3cmsvb25jaGFpbi1ydW50aW1lLXYzL21pZG5pZ2h0X29uY2hhaW5fcnVudGltZV93YXNtX2JnLndhc20nLFxuICAgICAgJ0BtaWRuaWdodC1udHdyay9vbmNoYWluLXJ1bnRpbWUtdjMvbWlkbmlnaHRfb25jaGFpbl9ydW50aW1lX3dhc20uanMnLFxuICAgIF0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIC8vIEVuc3VyZSBCdWZmZXIgaXMgYXZhaWxhYmxlIGdsb2JhbGx5XG4gICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXG4gIH0sXG4gIC8vIEFkZCBzcGVjaWZpYyBpbXBvcnQgY29uZmlndXJhdGlvbiBmb3IgbW9yZSBjb250cm9sXG4gIHJlc29sdmU6IHtcbiAgICAvLyBFbnN1cmUgV0FTTSBmaWxlcyBhcmUgbG9hZGVkIHByb3Blcmx5XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ2J1ZmZlcicsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdidWZmZXIvaW5kZXguanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdpc29tb3JwaGljLXdzL2Jyb3dzZXIuanMnLFxuICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9zaGltcy9pc29tb3JwaGljLXdzLWJyb3dzZXIudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvY29tcGFjdC1qcy9lZmZlY3QvQ29udHJhY3QnLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLXByb3RvY29sL2Rpc3QvY29tcGFjdC1qcy1lZmZlY3QtY29udHJhY3QubWpzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLXByb3RvY29sL2NvbXBhY3QtanMvZWZmZWN0JyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGdldE1vZHVsZVBhdGgoJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9kaXN0L2NvbXBhY3QtanMtZWZmZWN0Lm1qcycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9wbGF0Zm9ybS1qcy9lZmZlY3QvQ29uZmlndXJhdGlvbicsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvZGlzdC9wbGF0Zm9ybS1lZmZlY3QtY29uZmlndXJhdGlvbi5tanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvcGxhdGZvcm0tanMvZWZmZWN0L0NvbnRyYWN0QWRkcmVzcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvZGlzdC9wbGF0Zm9ybS1lZmZlY3QtY29udHJhY3QtYWRkcmVzcy5tanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvY29tcGFjdC1ydW50aW1lJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGdldE1vZHVsZVBhdGgoJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9kaXN0L2NvbXBhY3QtcnVudGltZS5tanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvY29tcGFjdC1qcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvZGlzdC9jb21wYWN0LWpzLm1qcycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9sZWRnZXInLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLXByb3RvY29sL2Rpc3QvbGVkZ2VyLm1qcycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9vbmNoYWluLXJ1bnRpbWUnLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLXByb3RvY29sL2Rpc3Qvb25jaGFpbi1ydW50aW1lLm1qcycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1wcm90b2NvbC9wbGF0Zm9ybS1qcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtcHJvdG9jb2wvZGlzdC9wbGF0Zm9ybS5tanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtY29udHJhY3RzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGdldE1vZHVsZVBhdGgoJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1jb250cmFjdHMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtZmV0Y2gtemstY29uZmlnLXByb3ZpZGVyJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGdldE1vZHVsZVBhdGgoJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy1mZXRjaC16ay1jb25maWctcHJvdmlkZXInKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtaHR0cC1jbGllbnQtcHJvb2YtcHJvdmlkZXInLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLWh0dHAtY2xpZW50LXByb29mLXByb3ZpZGVyJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLWluZGV4ZXItcHVibGljLWRhdGEtcHJvdmlkZXInLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLWluZGV4ZXItcHVibGljLWRhdGEtcHJvdmlkZXInKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtbmV0d29yay1pZCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtbmV0d29yay1pZCcpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0BtaWRuaWdodC1udHdyay9taWRuaWdodC1qcy10eXBlcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtdHlwZXMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAbWlkbmlnaHQtbnR3cmsvbWlkbmlnaHQtanMtdXRpbHMnLFxuICAgICAgICByZXBsYWNlbWVudDogZ2V0TW9kdWxlUGF0aCgnQG1pZG5pZ2h0LW50d3JrL21pZG5pZ2h0LWpzLXV0aWxzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQG1pZG5pZ2h0LW50d3JrL2RhcHAtY29ubmVjdG9yLWFwaScsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdAbWlkbmlnaHQtbnR3cmsvZGFwcC1jb25uZWN0b3ItYXBpJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAncGlubycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBnZXRNb2R1bGVQYXRoKCdwaW5vL2Jyb3dzZXIuanMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdyeGpzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGdldE1vZHVsZVBhdGgoJ3J4anMvZGlzdC9lc201L2luZGV4LmpzJyksXG4gICAgICB9LFxuICAgIF0sXG4gICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy53YXNtJ10sXG4gICAgbWFpbkZp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
