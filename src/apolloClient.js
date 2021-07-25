/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { baseURL } from './appConfig';

// -----------------------------------------------------------------------------------------
// CONFLICTS with the uploadLink, upload link the only way to communicate through
// the graphql endpoint
// need to create the client to connect to our server on the backend
// creating the link
// not really needed, could've done the raw link instead
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql', // dev uri lmao
// });

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

const uploadLink = createUploadLink({
  uri: `${baseURL}/graphql`,
});

const wsLinkURI = baseURL.split('http')[1];
const wsLink = new WebSocketLink({
  uri: `ws${wsLinkURI}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  },
});

// look for operation type and use the appropriate link
// websocket link for subs
// http link for http requests
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(uploadLink)
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          // just replace them
          merge: (_, incoming) => incoming,
        },
        getUserRequests: {
          merge: (_, incoming) => incoming,
        },
      },
    },
    Post: {
      fields: {
        likes: {
          merge: (_, incoming) => incoming,
        },
        comments: {
          merge: (_, incoming) => incoming,
        },
      },
    },
  },
});

// link has to go before httoLink
// easy solution .concat
const client = new ApolloClient({
  // link: concat(authLink, httpLink),
  // link: ApolloLink.from([authLink, httpLink, uploadLink]),
  // link: ApolloLink.concat(authLink, uploadLink),
  link: splitLink,
  // cache: new InMemoryCache(),
  cache,
});

export default client;
