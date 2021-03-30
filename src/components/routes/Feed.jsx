/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-param-reassign */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/client';
// import { Button } from 'semantic-ui-react';
import { GET_POSTS_CHUNK } from '../../graphql/postGQL';

const Feed = () => {
  const { data, loading, fetchMore } = useQuery(GET_POSTS_CHUNK, {
    variables: {
      limit: 10,
    },
    pollInterval: 1000,
  });

  const feedMe = () => {
    // get the offset
    const offset = data.getPostsChunk.posts.length;

    // fetch more data and update the cache
    fetchMore({
      variables: {
        limit: 10,
        skip: offset,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.getPostsChunk.posts = [
          ...prevResult.getPostsChunk.posts,
          ...fetchMoreResult.getPostsChunk.posts,
        ];
        return fetchMoreResult;
      },
    });
  };

  if (loading) return <div>LOADING</div>;

  return (
    <div>
      {/* TOP SCROLL */}

      <div
        id="scrollableDiv"
        style={{
          height: '50vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {/* Put the scroll bar always on the bottom */}
        <InfiniteScroll
          dataLength={data.getPostsChunk.posts.length}
          next={() => feedMe()}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
          inverse //
          hasMore={data.getPostsChunk.hasMoreItems}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {data.getPostsChunk.posts.map((post, index) => (
            <div key={post.id}>
              <p>
                ${index} {post.username}
              </p>

              <p>{post.body}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>

      <hr />
      <hr />

      <div>
        <hr />
        <InfiniteScroll
          dataLength={data.getPostsChunk.posts.length}
          next={feedMe}
          hasMore={data.getPostsChunk.hasMoreItems}
          loader={<h4>Loading...</h4>}
        >
          {data.getPostsChunk.posts.map((post, index) => (
            <div key={post.id}>
              <p>{index}</p>
              <p>{post.username}</p>
              <p>{post.body}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
