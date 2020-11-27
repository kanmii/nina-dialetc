import { Server } from "@hapi/hapi";
import { ApolloServer } from "apollo-server-hapi";
import { typeDefs } from "@talat/commons/src/gql/root";
import { rootResolvers } from "@talat/commons/src/resolvers/root";
import { countryResolver } from "@talat/commons/src/resolvers/country";
import { GRAPHQL_PATH } from "@talat/commons/src/routes";

const { NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === "development";

export async function setUpApollo(appServer: Server) {
  const apolloServer = new ApolloServer({
    typeDefs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: [rootResolvers as any, countryResolver],
    introspection: IS_DEV,
    playground: IS_DEV,
  });
  await apolloServer.applyMiddleware({
    app: appServer,
    path: GRAPHQL_PATH,
  });

  await apolloServer.installSubscriptionHandlers(appServer.listener);
}