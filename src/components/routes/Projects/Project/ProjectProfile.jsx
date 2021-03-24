/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image } from 'semantic-ui-react';
import { UserContext } from '../../../../context/UserProvider';
import { ADD_MEMBER, GET_MEMBERS, GET_PROJECT } from '../../../../graphql';

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
        <Header.Content>{project.name}</Header.Content>
        <Header.Subheader>{project.description}</Header.Subheader>
      </Header>
      <Image
        circular
        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
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

export default ProjectProfile;
