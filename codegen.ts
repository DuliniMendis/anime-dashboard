import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["app/graphql/*.ts"],
  generates: {
    "./app/generated/": {
      preset: "client",
    },
  },
};
export default config;
