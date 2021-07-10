import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';

import ProjectCard from './ProjectCard';
import LoaderComponent from '../../shared/LoaderComponent';
import { UserContext } from '../../../context/userContext/UserProvider';
import { GET_PROJECTS } from '../../../graphql';

const Projects = () => {
  const { user } = useContext(UserContext);

  const [loadProjects, { loading, error, data }] = useLazyQuery(GET_PROJECTS, {
    pollInterval: 1500,
    onError: () => {
      console.log(error);
    },
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="projects">
      <div className="projects__top">
        {user && (
          <div className="projects__top__createProject">
            <Button
              as={Link}
              to="/projects/createProject"
              color="orange"
              animated="fade"
              tabIndex="0"
            >
              <div className="visible content">Create a project?</div>
              <div className="hidden content">Create a project!</div>
            </Button>
          </div>
        )}
        {loading && <LoaderComponent />}
        {/* TODO: please custom design this... placeholder components */}
        {/* TODO: use flexbox or something, semantic sucks */}
        <div className="projectSearch__top__searchInput">
          <Input
            className="themeForm"
            placeholder="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            icon={{ name: 'search', color: 'orange' }}
          />
        </div>
      </div>

      <div className="projects__bottom">
        {data &&
          data.getProjects &&
          [...data.getProjects]
            .sort((a, b) => {
              const al = a.name.toLowerCase();
              const bl = b.name.toLowerCase();

              if (al > bl) return 1;
              return -1;
            })
            .filter((project) =>
              project.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
      </div>
    </div>
  );
};

export default Projects;
