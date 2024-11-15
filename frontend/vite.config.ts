/// <reference types="vitest"/>
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
    },
    plugins: [react(), tsconfigPaths],
    build: {
      outDir: "dist/",
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "vitest-utils.ts",
    }
  }
})
