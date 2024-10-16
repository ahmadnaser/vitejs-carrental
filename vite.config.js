// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   plugins: ["@babel/plugin-syntax-import-attributes"]
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'babel',
      apply: 'build',
      config: {
        plugins: ["@babel/plugin-syntax-import-attributes"]
      },
    }
  ],
});
