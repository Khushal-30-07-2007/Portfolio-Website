import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],

  build: {
    // Code-splitting for Three.js and other large libraries
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js into its own chunk
          'three': ['three'],
          // Split React Three Fiber ecosystem
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          // Split GSAP
          'gsap': ['gsap'],
        }
      }
    },
    // Increase chunk size warning limit (Three.js is inherently large)
    chunkSizeWarningLimit: 600,
    // Use esbuild for minification (faster, built into Vite)
    minify: 'esbuild',
    // Generate source maps for debugging
    sourcemap: false
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap']
  },

  // Performance hints
  server: {
    // Enable HMR
    hmr: true
  }
})
