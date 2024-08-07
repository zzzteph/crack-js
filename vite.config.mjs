import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            name: 'crack',
            entry: path.resolve(__dirname, 'index.js'),
            fileName: `crack`,
            formats: ['cjs']
        },
        rollupOptions: {
            external: [],
        }
    },
    resolve: {
    }
});
