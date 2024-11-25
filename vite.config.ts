import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  // base: "/iframe-teachbase",
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    port: 3000,
    host: 'localhost',
    cors: false,
  },
});