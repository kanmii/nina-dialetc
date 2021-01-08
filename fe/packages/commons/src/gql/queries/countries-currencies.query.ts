import { gql } from "@apollo/client/core";
import { PageInfoFragment } from ".";

const CountryFragment = gql`
  fragment CountryFragment on Country {
    id
    countryName
    countryCode
  }
`;

const CurrencyFragment = gql`
  fragment CurrencyFragment on Currency {
    id
    currencyName
    currencyCode
  }
`;

export const listCountriesAndCurrenciesQuery = gql`
  query ListCountriesAndCurrencies(
    $countriesPaginationInput: PaginationInput!
  ) {
    listCountries(paginationInput: $countriesPaginationInput) {
      edges {
        node {
          ...CountryFragment
        }
        cursor
      }

      pageInfo {
        ...PageInfoFragment
      }
    }

    listCurrencies {
      ...CurrencyFragment
    }
  }

  ${CountryFragment}
  ${PageInfoFragment}
  ${CurrencyFragment}
`;
