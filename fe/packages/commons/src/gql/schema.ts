import { gql } from "@apollo/client/core";

export const typeDefs = gql`
  scalar Date
  scalar DateTime

  type Country {
    id: ID!
    countryName: String!
    countryCode: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Currency {
    id: ID!
    currencyName: String!
    currencyCode: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  input PaginationInput {
    first: Int
    last: Int
    before: String
    after: String
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
  }

  type CountryEdge {
    node: Country!
    cursor: String!
  }

  type CountryConnection {
    edges: [CountryEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    listCountries(paginationInput: PaginationInput!): CountryConnection!
    listCurrencies: [Currency]!
  }
`;
