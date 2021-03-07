/* eslint-disable no-param-reassign */
import React from 'react';
import { useQuery } from '@apollo/client';
// import { Button } from 'semantic-ui-react';
import { GET_POSTS_CHUNK } from '../../graphql/postGQL';

const PostIF = () => {
  const { data, loading, fetchMore } = useQuery(GET_POSTS_CHUNK, {
    variables: {
      limit: 10,
    },
  });

  if (loading) return <div>Loading ...</div>;
  if (data) console.log(data.getPostsChunk);

  return (
    <div>
      <ol>
        {data &&
          data.getPostsChunk.posts.map((post) => (
            <React.Fragment key={post.id}>
              <li style={{ margin: 20 }}>
                <p>{post.id}</p>
                <p>{post.username}</p>
                <p>{post.body}</p>
              </li>
              <hr />
            </React.Fragment>
          ))}
        )
      </ol>
      <button
        type="button"
        onClick={() => {
          // get the offset
          const offset = data.getPostsChunk.posts.length;
          console.log(offset);

          // fetch more data and update the cache
          fetchMore({
            variables: {
              limit: 10,
              skip: offset,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              console.log(prevResult);
              console.log(fetchMoreResult);
              fetchMoreResult.getPostsChunk.posts = [
                ...prevResult.getPostsChunk.posts,
                ...fetchMoreResult.getPostsChunk.posts,
              ];
              return fetchMoreResult;
            },
          });
        }}
      >
        more!
      </button>
    </div>
  );
};

export default PostIF;
