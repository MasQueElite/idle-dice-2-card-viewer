import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [solid(), tailwindcss()],
    base: "idle-dice-2-card-viewer",
    build: {
        outDir: "docs"
    }
})
