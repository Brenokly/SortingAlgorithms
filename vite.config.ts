import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/SortingAlgorithms/', // Caminho base para GitHub Pages
});