import React from 'react';
import { Button, Grid, Form, Header } from 'semantic-ui-react';

const ProjectGroupForm = () => (
  <div className="login" style={{ textAlign: 'center' }}>
    <div className="login">
      <Grid
        textAlign="center"
        style={{ height: '70vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center">
            On to a great success
          </Header>
          <Form size="large" noValidate>
            <Form.Input fluid placeholder="name" type="text" />

            <Button
              fluid
              size="large"
              type="submit"
              color="orange"
              animated="fade"
              tabIndex="0"
            >
              <div className="visible content">Looks good?</div>
              <div className="hidden content">Create!</div>
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  </div>
);

export default ProjectGroupForm;
