import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    inject: ["./react-import.js"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
  },
  {
    entry: ["./src/styles.css"],
  },
]);
