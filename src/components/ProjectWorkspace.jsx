import React from 'react';
import { Grid, Image, Loader } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useQuery } from '@apollo/client';
import PostProjectForm from './PostProjectForm';
import { GET_PROJECT_POSTS } from '../graphql';
import PostCard from './PostCard';

const ProjectWorkspace = ({ project }) => {
  // TODO: setup the feed
  const { data, loading } = useQuery(GET_PROJECT_POSTS, {
    variables: {
      projectID: project.id,
    },
    // pollInterval: 3000,
    onCompleted: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="projectWorkspace">
      <div style={{ backgroundColor: '#e8e8e8', width: '100%' }}>
        <h2
          style={{
            marginTop: 40,
            float: 'left',
          }}
        >
          {project.name}
        </h2>
      </div>
      <Grid container divided columns={3} style={{ marginTop: 40 }}>
        <Grid.Column width={2}>
          <Grid.Row centered>
            <Grid.Row>
              <Image
                avatar
                size="tiny"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Row>

            <Grid.Row>
              <Image
                avatar
                size="tiny"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Row>

            <Grid.Row>
              <Image
                avatar
                size="tiny"
                src="http://localhost:4000/files/17694acf-1c0e-48c1-80de-fbde5bd1dfcbdownload.jpeg"
              />
            </Grid.Row>
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
                {data &&
                  data.getProjectPosts &&
                  data.getProjectPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
              </div>
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
};

export default ProjectWorkspace;
