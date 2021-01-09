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

  type Branch {
    id: ID!
    postCode: String!
    street: String!
    city: String!
    branchAlias: String
    phone: String
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Brand {
    id: ID!
    name: String!
    countryId: ID!
    country: Country!
    currencyId: ID!
    currency: Currency!
    phone: String
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

  type BranchEdge {
    node: Branch!
    cursor: String!
  }

  type BranchConnection {
    edges: [BranchEdge]!
    pageInfo: PageInfo!
  }

  type BrandEdge {
    node: Brand!
    cursor: String!
  }

  type BrandConnection {
    edges: [BrandEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    listCountries(paginationInput: PaginationInput!): CountryConnection!
    listCurrencies: [Currency]!
    listBranches(paginationInput: PaginationInput!): BranchConnection!
    listBrands(paginationInput: PaginationInput!): BrandConnection!
  }
`;
