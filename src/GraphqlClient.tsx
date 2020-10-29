import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphqlEnvironment } from "./services/Environment";

export default new ApolloClient({
    uri: process.env.NODE_ENV === "production" ? GraphqlEnvironment.production : GraphqlEnvironment.develop,
    cache: new InMemoryCache()
});
