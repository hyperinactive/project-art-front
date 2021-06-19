/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Form, Header } from 'semantic-ui-react';
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  GET_USER_PROJECTS,
} from '../../../graphql';

const ProjectForm = () => {
  // TODO: needs to redirect to the project page or smth
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [created, setIsCrated] = useState({
    project: null,
    isCreated: false,
  });

  // error prevention, not classy but doesn't the job
  // in case the user projects haven't been fetched at this point
  useQuery(GET_USER_PROJECTS, {
    onCompleted: () => {
      console.log('Fetched user projects');
    },
    onError(err) {
      console.log(err);
    },
  });

  const [createProject] = useMutation(CREATE_PROJECT, {
    variables: {
      name,
    },
    update: (cache, result) => {
      const projects = cache.readQuery({
        query: GET_PROJECTS,
      });

      const userProjects = cache.readQuery({
        query: GET_USER_PROJECTS,
      });

      const projectsClone = cloneDeep(projects);
      projectsClone.getProjects = [
        ...projectsClone.getProjects,
        result.data.createProject,
      ];

      const userProjectsClone = cloneDeep(userProjects);
      userProjectsClone.getUserProjects = [
        ...userProjectsClone.getUserProjects,
        result.data.createProject,
      ];

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          getProjects: projectsClone.getProjects,
        },
      });

      cache.writeQuery({
        query: GET_USER_PROJECTS,
        data: {
          getUserProjects: userProjectsClone.getUserProjects,
        },
      });
    },
    onCompleted: (data) => {
      setIsCrated((prevState) => ({
        ...prevState,
        project: data,
        isCreated: true,
      }));
      // props.history.push(`/projects/${data.createProject.id}`);
    },

    onError: (err) => {
      console.log(err);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
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
            {created.isCreated ? (
              <>
                <Header as="h1">Project created!</Header>
                <Button
                  color="orange"
                  as={Link}
                  to={created.project.createProject.id}
                >
                  {created.project.createProject.name}
                </Button>
              </>
            ) : (
              <>
                <Header as="h1" textAlign="center">
                  On to a great success
                </Header>
                <Form size="large" noValidate onSubmit={handleSubmit}>
                  <Form.Input
                    fluid
                    placeholder="project name"
                    type="text"
                    value={name}
                    error={errors.nameInUse || errors.nameLength}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                      setErrors({});
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
              </>
            )}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default ProjectForm;
