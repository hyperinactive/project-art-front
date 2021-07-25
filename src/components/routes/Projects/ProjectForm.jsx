import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Form, Header, Checkbox } from 'semantic-ui-react';

import useCreateProject from '../../../utils/hooks/createProject';

const ProjectForm = () => {
  // TODO: needs to redirect to the project page or smth
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});
  const [created, setIsCreated] = useState({
    project: null,
    isCreated: false,
  });

  const [createProject] = useCreateProject(setIsCreated);
  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      variables: {
        name,
      },
    });
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
                <Header as="h1" className="headline">
                  Project created!
                </Header>
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
                <Header as="h1" textAlign="center" className="headline">
                  On to a great success
                </Header>
                <Form
                  size="large"
                  noValidate
                  onSubmit={handleSubmit}
                  className="projectForm__form"
                >
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
                  <Form.Input>
                    <Checkbox
                      className="projectForm__form__checkbox"
                      label="private"
                      value={isPrivate}
                      onClick={() => setIsPrivate(true)}
                    />
                  </Form.Input>

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
