import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Button, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserContext } from '../../../../context/userContext/UserProvider';
import {
  ADD_MEMBER,
  GET_MEMBERS,
  GET_PROJECT,
  GET_USER_PROJECTS,
} from '../../../../graphql';

// project.project.<attributes>...
const ProjectProfile = ({ project }) => {
  const { user } = useContext(UserContext);

  const [addMember] = useMutation(ADD_MEMBER, {
    variables: {
      projectID: project.id,
    },
    update: (cache, result) => {
      const members = cache.readQuery({
        query: GET_MEMBERS,
        variables: {
          projectID: project.id,
        },
      });

      const membersClone = {};
      membersClone.getProjectMembers = [
        ...cloneDeep(members.getProjectMembers),
        result.data.addMember,
      ];

      cache.writeQuery({
        query: GET_MEMBERS,
        variables: {
          projectID: project.id,
        },
        data: {
          getProjectMembers: membersClone.getProjectMembers,
        },
      });

      const projectData = cache.readQuery({
        query: GET_PROJECT,
        variables: {
          projectID: project.id,
        },
      });

      const projectClone = {};
      projectClone.getProject = cloneDeep(projectData.getProject);
      projectClone.getProject.members = [
        ...projectClone.getProject.members,
        result.data.addMember.id,
      ];

      cache.writeQuery({
        query: GET_PROJECT,
        variables: {
          projectID: project.id,
        },
        data: {
          getProject: {
            members: projectClone.getProject.members,
          },
        },
      });

      const userProjects = cache.readQuery({
        query: GET_USER_PROJECTS,
      });

      const userProjectsClone = cloneDeep(userProjects);
      userProjectsClone.getUserProjects = [
        ...userProjectsClone.getUserProjects,
        projectClone.getProject,
      ];

      cache.writeQuery({
        query: GET_USER_PROJECTS,
        data: {
          getUserProjects: userProjectsClone.getUserProjects,
        },
      });
    },
    onCompleted: () => {
      console.log('completed');
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    addMember();
  };
  return (
    <div
      className="projectProfile"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100,
      }}
    >
      <Header as="h2" icon textAlign="center">
        <Header.Content className="headline">{project.name}</Header.Content>
        <Header.Subheader className="headline">
          {project.description}
        </Header.Subheader>
      </Header>
      <Image
        rounded
        src={`${process.env.PUBLIC_URL}/projectArt-IconTransparent.png`}
        size="tiny"
      />
      {user ? (
        <Button color="orange" onClick={handleClick} style={{ margin: 20 }}>
          Join the project!
        </Button>
      ) : (
        <Button as={Link} to="/login" color="orange" style={{ margin: 20 }}>
          Join the project!
        </Button>
      )}
    </div>
  );
};

ProjectProfile.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectProfile;
