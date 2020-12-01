import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import fetch from "cross-fetch";
import { GRAPHQL_PATH } from "../constants";
import { API_URL } from "../envs";
import { middlewareErrorLink, middlewareLoggerLink } from "./middlewares";

const path = API_URL + GRAPHQL_PATH;

let client = (undefined as unknown) as ApolloClient<unknown>;
let cache = (undefined as unknown) as InMemoryCache;

export function makeApolloClient(
  { uri }: MakeApolloClientArgs = { uri: path }
) {
  if (client) {
    return client;
  }

  cache = new InMemoryCache();

  let link = createHttpLink({
    uri,
    fetch,
  });

  link = middlewareErrorLink(link);
  link = middlewareLoggerLink(link);

  client = new ApolloClient({
    cache,
    link,
    queryDeduplication: false,
    ssrMode: typeof window === "undefined" ? true : false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return client;
}

type MakeApolloClientArgs = {
  uri?: string;
};