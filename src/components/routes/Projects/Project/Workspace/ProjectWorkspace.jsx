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
import { GET_POSTS_FEED } from '../../../../../graphql';
import PostCard from '../../../../PostCard';
import ElementList from '../../../../shared/ElementList';
import { NavigationContext } from '../../../../../context/NavigationProvider';

const ProjectWorkspace = ({ project, elements }) => {
  const [cursor, setCursor] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

  const [loadFeed, { data, loading, fetchMore }] = useLazyQuery(
    GET_POSTS_FEED,
    {
      // pollInterval: 5000,
      // fetchPolicy: 'network-only', // prevents cache being read initially and showing posts from other projects
      onCompleted: () => {
        console.log(data.getPostsFeed);
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
      <div className="projectWorkspace__heading headline">project name</div>

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
                  data.getPostsFeed &&
                  data.getPostsFeed.posts &&
                  data.getPostsFeed.posts.map((post, i) => (
                    <React.Fragment key={post.id}>
                      <PostCard post={post} />
                      {i === 10 && (
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
          {/* TODO: modal here */}
          <div className="projectWorkspace__wrapper__posts__modal">modal</div>
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
