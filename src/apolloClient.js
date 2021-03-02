import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// https://www.apollographql.com/docs/react/get-started/

// this can also be done in the App.jsx and would be more "traditional" - to have the App as the index
// subject to change
// we're just wrapping the App with the Apollo provider, a client that will connect to the backend

// need to create the client to connect to our server on the backend
// creating the link
// not really needed, could've done the raw link instead
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // dev uri lmao
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
