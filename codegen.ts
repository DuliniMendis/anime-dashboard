import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://graphql.anilist.co',
  documents: ['app/lib/graphql/*.ts'],
  overwrite: true,
  generates: {
    './app/lib/generated/types.ts': {
      plugins: ['typescript'],
    },
    './app/lib/generated/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations'],
    },
  },
}
export default config
