import { useQuery } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { Loader, Input, Grid, Button } from 'semantic-ui-react';
import { GET_PROJECTS } from '../../graphql';
import ProjectGroupCard from '../ProjectGroupCard';
import { UserContext } from '../../context/UserProvider';

import './ProjectGroup.css';

const ProjectGroup = () => {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    pollInterval: 10000,
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (error) return <div>Uh, oh, error</div>;
  if (data) console.log(data);

  return (
    <div style={{ textAlign: 'center' }} className="projectGroup">
      <h1>Project group</h1>
      {loading && (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      )}
      <hr />
      {user && (
        <Button
          as="div"
          size="large"
          color="orange"
          animated="fade"
          tabIndex="0"
          style={{ marginTop: 10, display: 'inline-block' }}
        >
          <div className="visible content">Create a project?</div>
          <div className="hidden content">Create a project!</div>
        </Button>
      )}

      {/* TODO: please custom design this... placeholder components */}
      {/* TODO: use flexbox or something, semantic sucks */}
      <Grid columns={3} doubling stackable textAlign="center">
        <Grid.Row>
          <Input
            placeholder="search and destory"
            icon="search"
            style={{ margin: 20, display: 'inline-block' }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </Grid.Row>

        <Grid.Row>
          {data &&
            data.getProjectGroups
              .filter((project) =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((project) => (
                <Grid.Column key={project.id}>
                  <ProjectGroupCard project={project} />
                </Grid.Column>
              ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProjectGroup;
