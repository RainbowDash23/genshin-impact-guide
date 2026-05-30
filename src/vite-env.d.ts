/// <reference types="vite/client" />

// Permite importar imágenes .png en TypeScript sin error
declare module '*.png' {
  const src: string;
  export default src;
}
