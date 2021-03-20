/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Loader } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../../context/UserProvider';
import { GET_MEMBERS, GET_PROJECT } from '../../../../graphql';
import ProjectWorkspace from './Workspace/ProjectWorkspace';
import ProjectProfile from './ProjectProfile';

const isMemeber = (members, user) =>
  members.find((member) => member.id === user.id) !== undefined;
const Project = () => {
  const { user } = useContext(UserContext);
  const { projectID } = useParams();

  const { data: projectData, loading: projectLoading } = useQuery(GET_PROJECT, {
    variables: {
      projectID,
    },
  });

  const { data: membersData, loading: membersLoading } = useQuery(GET_MEMBERS, {
    variables: {
      projectID,
    },
  });

  return (
    <div className="project" style={{ textAlign: 'center' }}>
      {/* show join us page to whomever, but if the user isn't signed in */}
      {/* redirect them to the login page */}
      {projectLoading || membersLoading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : user ? (
        projectData &&
        membersData &&
        membersData.getProjectMembers &&
        projectData.getProject &&
        (isMemeber(membersData.getProjectMembers, user) ? (
          <ProjectWorkspace
            project={projectData.getProject}
            members={membersData}
          />
        ) : (
          <ProjectProfile project={projectData.getProject} />
        ))
      ) : (
        <ProjectProfile project={projectData.getProject} />
      )}
    </div>
  );
};

export default Project;
