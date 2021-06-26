/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { Grid, Loader } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { cloneDeep } from 'lodash';

import PostProjectForm from './PostProjectForm';
import { GET_POSTS_FEED } from '../../../../../graphql';
import PostCard from '../../../../PostCard';
import ElementList from '../../../../shared/ElementList';
import { NavigationContext } from '../../../../../context/NavigationProvider';

const ProjectWorkspace = ({ project, elements }) => {
  // const [isBottom, setIsBottom] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

  // TODO: pollInterval calls this and messes up the cache
  // NOTE: may have to do with the cursor being "sent back"
  const [loadFeed, { data, loading, fetchMore }] = useLazyQuery(
    GET_POSTS_FEED,
    {
      // pollInterval: 5000,
      // fetchPolicy: 'network-only', // prevents cache being read initially and showing posts from other projects
      onCompleted: () => {
        if (!data.getPostsFeed.hasMoreItems) setCanLoadMore(false);
        setCursor(data.getPostsFeed.nextCursor);
        // setIsBottom(true);
      },
      onError: (err) => {
        console.log({ err });
      },
    }
  );

  const offsetFromCursor = (items, cursorID) => {
    // Search from the back of the list because the cursor we're
    // looking for is typically the ID of the last item.
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Using readField works for both non-normalized objects
      // (returning item.id) and normalized references (returning
      // the id field from the referenced entity object), so it's
      // a good idea to use readField when you're not sure what
      // kind of elements you're dealing with.
      if (item.id === cursorID) {
        // Add one because the cursor identifies the item just
        // before the first item in the page we care about.
        return i + 1;
      }
    }
    // Report that the cursor could not be found.
    return -1;
  };
  const feedMe = () => {
    fetchMore({
      variables: {
        projectID: project.id,
        cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        let cursorClone = null;
        if (cursor !== undefined || cursor !== null) {
          cursorClone = cursor;
        }
        const prevClone = prev
          ? cloneDeep(prev)
          : { posts: [], hasMoreItems: false, nextCursor: null };
        let offset = offsetFromCursor(
          prevClone.getPostsFeed.posts,
          cursorClone
        );
        if (offset < 0) offset = prevClone.getPostsFeed.posts.length;
        let j = fetchMoreResult.getPostsFeed.posts.length - 1;
        for (let i = 0; i < fetchMoreResult.getPostsFeed.posts.length; i++) {
          prevClone.getPostsFeed.posts.unshift(
            fetchMoreResult.getPostsFeed.posts[j--]
          );
        }
        prevClone.getPostsFeed.hasMoreItems =
          fetchMoreResult.getPostsFeed.hasMoreItems;
        prevClone.getPostsFeed.nextCursor =
          fetchMoreResult.getPostsFeed.nextCursor;

        setCanLoadMore(fetchMoreResult.getPostsFeed.hasMoreItems);
        setCursor(fetchMoreResult.getPostsFeed.nextCursor);
        return prevClone;
      },
      // updateQuery: (prevResult, { fetchMoreResult }) => {
      //   if (!fetchMoreResult) {
      //     return prevResult;
      //   }
      //   fetchMoreResult.getPostsFeed.posts = [
      //     ...fetchMoreResult.getPostsFeed.posts,
      //     ...prevResult.getPostsFeed.posts,
      //   ];

      //   // --------------------------------------------------------------------
      //   setCursor(fetchMoreResult.getPostsFeed.nextCursor);
      //   setCanLoadMore(fetchMoreResult.getPostsFeed.hasMoreItems);

      //   // if (fetchMoreResult.getPostsFeed.hasMoreItems) setIsBottom(false);
      //   // --------------------------------------------------------------------
      //   return { ...fetchMoreResult };
      // },
    });
  };

  // ----------------------------------------------------------------------------------------
  // INFINITE SCROLL
  // const handleScroll = () => {
  //   const scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   const scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;
  //   if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
  //     setIsBottom(true);
  //   }
  // };

  useEffect(() => {
    loadFeed({
      variables: {
        projectID: project.id,
      },
    });
    setTemporaryTab({
      name: project.name,
      link: `/projects/${project.id}`,
    });
    setActiveItem(project.name);
  }, [loadFeed, project.id]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   if (isBottom && canLoadMore) {
  //     console.log('I hit rock bottom -.-');
  //     feedME();
  //   }
  // }, [isBottom]);

  // const { data } = useQuery(GET_PROJECT_POSTS, {
  //   variables: {
  //     projectID: project.id,
  //   },
  //   pollInterval: 3000,
  //   onCompleted: () => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const handleClick = () => {
  //   if (canLoadMore) {
  //     feedMe();
  //   }
  // };

  return (
    <div className="projectWorkspace">
      <Grid container columns={3} style={{ marginTop: 40 }}>
        <Grid.Row columns={1}>
          <h2
            style={{
              margin: 25,
              marginTop: 10,
              marginBottom: 10,
              float: 'left',
            }}
          >
            {project.name}
          </h2>
        </Grid.Row>
        <Grid.Column width={2}>
          <Grid.Row centered>
            <ElementList elements={elements} type="user" />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid.Row textAlign="center">
            <Grid.Column>
              {loading && (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              )}
              <PostProjectForm project={project} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* {data &&
                  data.getProjectPosts &&
                  data.getProjectPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))} */}
                {data &&
                  data.getPostsFeed.posts &&
                  data.getPostsFeed.posts.map((post, i) => (
                    <React.Fragment key={post.id}>
                      <PostCard post={post} />
                      {i === 0 && (
                        <Waypoint
                          onEnter={() => {
                            console.log('called');
                            console.log('10th element');
                            if (canLoadMore) {
                              feedMe();
                            }
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                {loading && <Loader>Loading more posts</Loader>}
              </div>
              {/* Button variant */}
              {/* {canLoadMore &&
                (feedLoading ? (
                  <Loader size="huge" active>
                    Computing, things, beep bop
                  </Loader>
                ) : (
                  <Button type="button" color="orange" onClick={handleClick}>
                    Load more!
                  </Button>
                ))} */}
              {loading && (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={3}>I am a --to be named-- column</Grid.Column>
      </Grid>
    </div>
  );
};

ProjectWorkspace.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
  elements: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
    })
  ).isRequired,
};

export default ProjectWorkspace;
