import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // 1. path library eka import karanna

export default defineConfig({
  base: '/musicstudiomanagment/',
  plugins: [react()],
  resolve: {
    alias: {
      // 2. Redux, Router, React files walata ekama path eka denna
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
});