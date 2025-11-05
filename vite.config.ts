import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configuração do servidor de desenvolvimento
  server: {
    host: true, // Necessário para Containerização
    port: 8080,
    strictPort: true,
    watch: {
      usePolling: true,
    }
  },

  // Plugins
  plugins: [
    react({
      // Configuração do plugin React
      plugins: [["@swc/plugin-emotion", {}]],
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // Resolução de módulos e aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },

  // Configuração de build
  build: {
    outDir: "dist",
    sourcemap: true,
    // Otimizações de build
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          // Adicione mais chunks conforme necessário
        },
      },
    },
  },

  // Otimizações
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["lovable-tagger"] // Excluir plugins que causam problemas na otimização
  },

  // Configurações específicas por ambiente
  define: {
    __DEV__: mode === "development",
  }
}));
