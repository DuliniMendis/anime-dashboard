/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getPage(\n    $page: Int = 1\n    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]\n  ) {\n    Page(page: $page, perPage: 20) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(sort: $sort) {\n        id\n        title {\n          english\n        }\n        coverImage {\n          medium\n        }\n        type\n        genres\n        averageScore\n        popularity\n      }\n    }\n  }\n": types.GetPageDocument,
    "\n  query getMedia {\n    Media(id: 16498) {\n      id\n      title {\n        english\n      }\n      bannerImage\n      coverImage {\n        large\n      }\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      season\n      seasonYear\n      description\n      type\n      format\n      episodes\n      duration\n      genres\n      isAdult\n      averageScore\n      popularity\n      studios(isMain: true) {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetMediaDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPage(\n    $page: Int = 1\n    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]\n  ) {\n    Page(page: $page, perPage: 20) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(sort: $sort) {\n        id\n        title {\n          english\n        }\n        coverImage {\n          medium\n        }\n        type\n        genres\n        averageScore\n        popularity\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPage(\n    $page: Int = 1\n    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]\n  ) {\n    Page(page: $page, perPage: 20) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(sort: $sort) {\n        id\n        title {\n          english\n        }\n        coverImage {\n          medium\n        }\n        type\n        genres\n        averageScore\n        popularity\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMedia {\n    Media(id: 16498) {\n      id\n      title {\n        english\n      }\n      bannerImage\n      coverImage {\n        large\n      }\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      season\n      seasonYear\n      description\n      type\n      format\n      episodes\n      duration\n      genres\n      isAdult\n      averageScore\n      popularity\n      studios(isMain: true) {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMedia {\n    Media(id: 16498) {\n      id\n      title {\n        english\n      }\n      bannerImage\n      coverImage {\n        large\n      }\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      season\n      seasonYear\n      description\n      type\n      format\n      episodes\n      duration\n      genres\n      isAdult\n      averageScore\n      popularity\n      studios(isMain: true) {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;