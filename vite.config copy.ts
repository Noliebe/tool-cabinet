// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const path = require('node:path')
// import { pluginsConfig, resolveConfig } from "./scripts/preview";
import dts from "vite-plugin-dts";
export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
            cssCodeSplit: true,
            rollupOptions: {
                external: ["three", "@ant-design/icons-vue", "ant-design-vue", "unplugin-vue-components", "unplugin-auto-import", "vue"],
                output: [
                    {
                        format: "es",
                        entryFileNames: "[name].js",
                        exports: "named",
                        name: "BqDesign",
                        dir: "./build/dist",
                    },
                    {
                        format: "es",
                        entryFileNames: "[name].js",
                        exports: "named",
                        preserveModules: true,
                        preserveModulesRoot: "packages",
                        dir: "./build/es",
                    },
                    {
                        format: "cjs",
                        entryFileNames: "[name].js",
                        exports: "named",
                        preserveModules: true,
                        preserveModulesRoot: "packages",
                        dir: "./build/lib",
                    },
                ],
            },
            lib: {
                entry: resolve(__dirname, "./packages/index.ts"),
                name: "BqDesign",
                fileName: (format) => `bq-design.${format}.js`,
                formats: ["es", "cjs"],
            },
        },
        plugins: [
            vue(),
            dts({
                tsconfigPath: "./tsconfig.prod.json",
                outDir: "build/lib",
            }),
            dts({
                tsconfigPath: "./tsconfig.prod.json",
                outDir: "build/es",
            }),
            // ...pluginsConfig,
        ],
        resolve: {
            // alias: {
            //     '@': '/packages/components/', // 将 '@' 映射到 '/src' 目录
            // },
            // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'], // 自动解析确定的扩展名
        }
        // resolve: resolveConfig,
    };
});