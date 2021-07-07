/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { Grid, Loader } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { cloneDeep } from 'lodash';

import LoaderComponent from '../../../../shared/LoaderComponent';
import PostFormModal from './PostFormModal';
import { GET_FEED, GET_POSTS_FEED } from '../../../../../graphql';
import PostCard from '../../../../PostCard';
import ElementList from '../../../../shared/ElementList';
import { NavigationContext } from '../../../../../context/NavigationProvider';

const ProjectWorkspace = ({ project, elements }) => {
  const [cursor, setCursor] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

  const [loadFeed, { data, loading, fetchMore }] = useLazyQuery(GET_FEED, {
    onCompleted: () => {
      console.log(data.getFeed);
      if (!data.getFeed.hasMoreItems) setCanLoadMore(false);
      setCursor(data.getFeed.nextCursor);
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
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.getFeed.hasMoreItems) {
          setCanLoadMore(false);
        }

        const prevClone = cloneDeep(prev);
        prevClone.getFeed.posts = [
          ...prevClone.getFeed.posts,
          ...fetchMoreResult.getFeed.posts,
        ];
        prevClone.getFeed.hasMoreItems = fetchMoreResult.getFeed.hasMoreItems;
        prevClone.getFeed.nextCursor = fetchMoreResult.getFeed.nextCursor;

        setCursor(fetchMoreResult.getFeed.nextCursor);
        return prevClone;
      },
    });
  };

  useEffect(() => {
    let ignore = false;
    loadFeed({
      variables: {
        projectID: project.id,
      },
    });
    if (!ignore) {
      setTemporaryTab({
        name: project.name,
        link: `/projects/${project.id}`,
      });
      setActiveItem(project.name);
    }
    return () => {
      ignore = true;
    };
  }, [project.id]);

  return (
    <div className="projectWorkspace">
      <div className="projectWorkspace__heading headline">{project.name}</div>

      <div className="projectWorkspace__wrapper">
        <div className="projectWorkspace__wrapper__members">
          <ElementList elements={elements} type="user" />
        </div>
        <div className="projectWorkspace__wrapper__posts">
          <div className="projectWorkspace__wrapper__posts__feed">
            {loading ? (
              <LoaderComponent />
            ) : (
              <>
                {/* TODO: feed needs fixing */}
                {data &&
                  data.getFeed &&
                  data.getFeed.posts &&
                  data.getFeed.posts.map((post, i) => (
                    <React.Fragment key={post.id}>
                      <PostCard post={post} />
                      {i === data.getFeed.posts.length - 1 && (
                        <Waypoint
                          onEnter={() => {
                            if (canLoadMore) {
                              feedMe();
                            }
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
              </>
            )}
          </div>
          <div className="projectWorkspace__wrapper__posts__modal">
            <PostFormModal project={project} />
          </div>
        </div>
      </div>

      {/* <Grid container columns={2}>
        <Grid.Row columns={1} centered>
          <h2>{project.name}</h2>
        </Grid.Row>
        <Grid.Column width={2}>
          <Grid.Row centered>
            <ElementList elements={elements} type="user" />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid.Row textAlign="center">
            <Grid.Column>
              {loading && (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              )}
              <PostProjectForm project={project} />
              <div>
                <div className="projectWorkspace__feed">
                  {data &&
                    data.getPostsFeed.posts &&
                    data.getPostsFeed.posts.map((post, i) => (
                      <React.Fragment key={post.id}>
                        <PostCard post={post} />
                        {i === 0 && (
                          <Waypoint
                            onEnter={() => {
                              if (canLoadMore) {
                                feedMe();
                              }
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                </div>

                {loading && <Loader>Loading more posts</Loader>}
              </div>

              {loading && (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid> */}
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
