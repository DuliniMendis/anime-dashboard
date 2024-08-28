import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://graphql.anilist.co',
  documents: ['app/graphql/*.ts'],
  overwrite: true,
  generates: {
    './app/generated/types.ts': {
      plugins: ['typescript'],
    },
    './app/generated/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations'],
    },
  },
}
export default config
