/// <reference types="vite/client" />

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.jsx' {
  import type React from 'react';
  const component: React.ComponentType<any>;
  export default component;
}

declare module 'bootstrap-icons/font/bootstrap-icons.css';
declare module 'bootstrap/dist/css/bootstrap.min.css';
