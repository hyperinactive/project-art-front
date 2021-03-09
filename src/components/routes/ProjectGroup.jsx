import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Loader, Input, Grid } from 'semantic-ui-react';
import { GET_PROJECTS } from '../../graphql';
import ProjectGroupCard from '../ProjectGroupCard';

import './ProjectGroup.css';

const ProjectGroup = () => {
  const placeholder = 'hello world';

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    pollInterval: 10000,
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (error) return <div>Uh, oh, error</div>;
  if (data) console.log(data);

  return (
    <div style={{ textAlign: 'center' }} className="projectGroup">
      <h1>Project group --{placeholder}</h1>
      {loading && <Loader active>Computing, things, beep bop</Loader>}
      <hr />
      {/* TODO: please custom design this... placeholder components */}
      {/* TODO: use flexbox or something, semantic sucks */}
      <Grid columns={3} doubling textAlign="center">
        <Grid.Row>
          <Input
            placeholder="search and destory"
            icon="search"
            style={{ margin: 20 }}
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
                <Grid.Column>
                  <ProjectGroupCard key={project.id} project={project} />
                </Grid.Column>
              ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProjectGroup;
