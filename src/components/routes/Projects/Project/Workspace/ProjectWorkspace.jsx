/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Button, Grid, Loader } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import PostProjectForm from './PostProjectForm';
import { GET_POSTS_FEED } from '../../../../../graphql';
import PostCard from '../../../../PostCard';
import ElementList from '../../../../shared/ElementList';

// eslint-disable-next-line react/prop-types
const ProjectWorkspace = ({ project, elements }) => {
  // TODO: setup the feed

  // const [isBottom, setIsBottom] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [loadFeed, { data: feedData, loading: feedLoading, fetchMore }] =
    useLazyQuery(GET_POSTS_FEED, {
      pollInterval: 1500,
      fetchPolicy: 'network-only', // prevents cache being read initially and showing posts from other projects
      onCompleted: () => {
        if (!feedData.getPostsFeed.hasMoreItems) setCanLoadMore(false);
        setCursor(feedData.getPostsFeed.nextCursor);
        // setIsBottom(true);
      },
      onError: (err) => {
        console.log({ err });
      },
    });

  const feedMe = () => {
    fetchMore({
      variables: {
        projectID: project.id,
        cursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }
        fetchMoreResult.getPostsFeed.posts = [
          ...fetchMoreResult.getPostsFeed.posts,
          ...prevResult.getPostsFeed.posts,
        ];
        // --------------------------------------------------------------------
        setCursor(fetchMoreResult.getPostsFeed.nextCursor);
        setCanLoadMore(fetchMoreResult.getPostsFeed.hasMoreItems);
        // if (fetchMoreResult.getPostsFeed.hasMoreItems) setIsBottom(false);
        // --------------------------------------------------------------------
        return { ...fetchMoreResult };
      },
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

  const handleClick = () => {
    if (canLoadMore) {
      feedMe();
    }
  };

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
              {feedLoading && (
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
                {feedLoading ? (
                  <Loader>OS</Loader>
                ) : (
                  feedData &&
                  feedData.getPostsFeed.posts &&
                  feedData.getPostsFeed.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>
              {canLoadMore &&
                (feedLoading ? (
                  <Loader size="huge" active>
                    Computing, things, beep bop
                  </Loader>
                ) : (
                  <Button type="button" color="orange" onClick={handleClick}>
                    Load more!
                  </Button>
                ))}
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
    elements: PropType.arrayOf(
      PropType.shape({
        id: PropType.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProjectWorkspace;
