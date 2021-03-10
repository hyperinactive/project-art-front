import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Loader, Input, Grid } from 'semantic-ui-react';
import { GET_PROJECTS } from '../graphql';
import ProjectGroupCard from './ProjectGroupCard';

const ProjectGroupSearch = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    pollInterval: 10000,
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (error) return <div>Uh, oh, error</div>;
  if (data) console.log(data);

  return (
    <div className="projectGroupSearch">
      {loading && (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
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

export default ProjectGroupSearch;
