import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://noomi.in', // [TBD] replace with the real domain
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
