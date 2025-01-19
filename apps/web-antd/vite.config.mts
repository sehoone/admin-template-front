import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          // '/api': {
          //   changeOrigin: true,
          //   rewrite: (path) => path.replace(/^\/api/, ''),
          //   // mock proxy target address
          //   target: 'http://localhost:5320/api',
          //   ws: true,
          // },
          '/dummy': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/dummy/, ''),
            // mock proxy target address
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
