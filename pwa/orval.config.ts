import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'tags-split',
      target: 'src/api/api-client.ts',
      schemas: 'src/api/models',
      client: 'react-query',
      baseUrl: 'http://localhost:3000',
      mock: true,
      prettier: true,
      override: {
        mutator: {
          path: 'src/api/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    input: {
      target: 'http://php/docs.jsonopenapi',
    },
  },
});
