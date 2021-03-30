import {
  ApolloClient,
  InMemoryCache,
  // createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { baseURL } from './appConfig';

// https://www.apollographql.com/docs/react/get-started/

// this can also be done in the App.jsx and would be more "traditional" - to have the App as the index
// subject to change
// we're just wrapping the App with the Apollo provider, a client that will connect to the backend

// -----------------------------------------------------------------------------------------
// CONFLICTS with the uploadLink, upload link the only way to communicate through the graphql endpoint
// need to create the client to connect to our server on the backend
// creating the link
// not really needed, could've done the raw link instead
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql', // dev uri lmao
// });

const uploadLink = createUploadLink({
  uri: `${baseURL}/graphql`,
});

// need auth headers in our requests
// get the token from the local storage and pass it in authLink
const authLink = setContext(() => {
  const token = localStorage.getItem('userToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// TODO: need to read up on caching
// setting policies on root Query doesn't feel right
// NOTE: docs use typeDefs
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          // just replace them
          merge(existing, incoming) {
            return incoming;
          },
        },
        getPostsFeed: {
          keyArgs: false,
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Post: {
      fields: {
        likes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        comments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    // PostsCursorResponse: {
    //   fields: {
    //     posts: {
    //       merge(existing, incoming) {
    //         return incoming;
    //       },
    //     },
    //     nextCursor: {
    //       merge(existing, incoming) {
    //         return incoming;
    //       },
    //     },
    //     hasMoreItems: {
    //       merge(existing, incoming) {
    //         return incoming;
    //       },
    //     },
    //   },
    // },
  },
});

// link has to go before httoLink
// easy solution .concat
const client = new ApolloClient({
  // link: concat(authLink, httpLink),
  // link: ApolloLink.from([authLink, httpLink, uploadLink]),
  link: ApolloLink.concat(authLink, uploadLink),
  // cache: new InMemoryCache(),
  cache,
});

export default client;
