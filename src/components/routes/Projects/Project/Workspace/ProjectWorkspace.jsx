import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useQuery } from '@apollo/client';
import PostProjectForm from './PostProjectForm';
import { GET_PROJECT_POSTS } from '../../../../../graphql';
import PostCard from '../../../../PostCard';
import Members from './Members';

const ProjectWorkspace = ({ project }) => {
  // TODO: setup the feed
  const { data, loading } = useQuery(GET_PROJECT_POSTS, {
    variables: {
      projectID: project.id,
    },
    pollInterval: 1500,
    onCompleted: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
            <Members projectID={project.id} />
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
    members: PropType.arrayOf({
      id: PropType.string.isRequired,
      imageURL: PropType.string.isRequired,
    }),
  }).isRequired,
};

export default ProjectWorkspace;
