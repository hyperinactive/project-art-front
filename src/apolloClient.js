/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import { cloneDeep } from 'lodash';

// import { relayStylePagination } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { baseURL } from './appConfig';

// https://www.apollographql.com/docs/react/get-started/

// this can also be done in the App.jsx and would be more "traditional"
// -> to have the App as the index
// subject to change
// we're just wrapping the App with the Apollo provider, a client that will connect to the backend

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

// merge policy
// const offsetFromCursor = (items, cursor) => {
//   // Search from the back of the list because the cursor we're
//   // looking for is typically the ID of the last item.
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     // Using readField works for both non-normalized objects
//     // (returning item.id) and normalized references (returning
//     // the id field from the referenced entity object), so it's
//     // a good idea to use readField when you're not sure what
//     // kind of elements you're dealing with.
//     if (item.id === cursor) {
//       // Add one because the cursor identifies the item just
//       // before the first item in the page we care about.
//       return i + 1;
//     }
//   }
//   // Report that the cursor could not be found.
//   return -1;
// };

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          // just replace them
          merge(_, incoming) {
            return incoming;
          },
        },

        // getPostsFeed: relayStylePagination(),
        // getPostsFeed: {
        //   keyArgs: ['id'],

        //   merge(existing, incoming, { args }) {
        //     let cursor = null;
        //     if (args.cursor !== undefined) {
        //       cursor = args.cursor;
        //     }
        //     const merged = existing
        //       ? cloneDeep(existing)
        //       : { posts: [], hasMoreItems: false, nextCursor: null };
        //     let offset = offsetFromCursor(merged.posts, cursor);
        //     // If we couldn't find the cursor, default to appending to
        //     // the end of the list, so we don't lose any data.
        //     if (offset < 0) offset = merged.posts.length;
        //     // Now that we have a reliable offset, the rest of this logic
        //     // is the same as in offsetLimitPagination.
        //     for (let i = 0; i < incoming.posts.length; ++i) {
        //       merged.posts.unshift(incoming.posts[i]);
        //     }
        //     merged.hasMoreItems = incoming.hasMoreItems;
        //     merged.nextCursor = incoming.nextCursor;
        //     return merged;
        //   },
        // },
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
  // link: ApolloLink.concat(authLink, uploadLink),
  link: splitLink,
  // cache: new InMemoryCache(),
  cache,
});

export default client;
