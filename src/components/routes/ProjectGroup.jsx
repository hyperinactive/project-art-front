import { useQuery } from '@apollo/client';
import React from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import { GET_PROJECTS } from '../../graphql';
import ProjectGroupCard from '../ProjectGroupCard';

const ProjectGroup = () => {
  const placeholder = 'hello world';

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    pollInterval: 10000,
  });

  if (error) return <div>Uh, oh, error</div>;
  if (data) console.log(data);

  return (
    <div style={{ textAlign: 'center' }} className="projectGroup">
      <h1>Project group --{placeholder}</h1>
      {loading && <Loader active>Computing, things, beep bop</Loader>}
      {/* TODO: please custom design this... placeholder components */}
      {/* TODO: use flexbox or something, semantic sucks */}
      <Segment.Group>
        {data &&
          data.getProjectGroups.map((project) => (
            <ProjectGroupCard key={project.id} project={project} />
          ))}
      </Segment.Group>
    </div>
  );
};

export default ProjectGroup;
