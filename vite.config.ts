import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                quietDeps: true,
            },
        },
    },
    resolve: {
        alias: {
            '@shared-components': path.resolve(__dirname, 'src/components/shared-components'),
            '@home': path.resolve(__dirname, 'src/components/home'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@api': path.resolve(__dirname, 'src/api'),
        },
    },
});
