import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropType from 'prop-types';
import PostProjectForm from './PostProjectForm';

const ProjectWorkspace = ({ project }) => (
  // TODO: setup the feed
  <div className="projectWorkspace">
    <h1 style={{ marginTop: 40 }}>{project.name} -- Workspace</h1>
    <Grid container divided columns={3} style={{ marginTop: 40 }}>
      <Grid.Column width={1}>
        <Grid.Row stretched>
          <Image
            circular
            floated="right"
            size="massive"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            style={{ margin: 10 }}
          />
          <Image
            circular
            floated="right"
            size="massive"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            style={{ margin: 10 }}
          />
          <Image
            circular
            floated="right"
            size="massive"
            src="http://localhost:4000/files/17694acf-1c0e-48c1-80de-fbde5bd1dfcbdownload.jpeg"
            style={{ margin: 10 }}
          />
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={12}>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <PostProjectForm project={project} />
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={3}>I am a --to be named-- column</Grid.Column>
    </Grid>
  </div>
);

ProjectWorkspace.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default ProjectWorkspace;
