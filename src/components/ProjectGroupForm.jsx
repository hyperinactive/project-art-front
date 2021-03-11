import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Grid, Form, Header } from 'semantic-ui-react';
import { CREATE_PROJECT } from '../graphql/projectGroup';

const ProjectGroupForm = () => {
  // TODO: needs to redirect to the project page or smth
  const [name, setName] = useState('');
  const [createProject] = useMutation(CREATE_PROJECT, {
    variables: {
      name,
    },
    update: (_, result) => {
      console.log(result);
      //   console.log(result);
      //   const cacheData = cache.readQuery(GET_PROJECTS);
      //   const cacheDataClone = cloneDeep(cacheData);
      //   cacheDataClone.getPosts = [
      //     result.data.createProject,
      //     ...cacheDataClone.getProjects,
      //   ];
      //   cache.writeQuery({
      //     query: GET_PROJECTS,
      //     data: cacheDataClone,
      //   });
    },
    onCompleted: (data) => {
      console.log(data);
    },

    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createProject();
  };
  return (
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
            <Form size="large" noValidate onSubmit={handleSubmit}>
              <Form.Input
                fluid
                placeholder="project name"
                type="text"
                value={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
              />

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
};

export default ProjectGroupForm;
