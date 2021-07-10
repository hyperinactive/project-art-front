/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoaderComponent from '../../../shared/LoaderComponent';
import { UserContext } from '../../../../context/userContext/UserProvider';
import { GET_MEMBERS, GET_PROJECT } from '../../../../graphql';
import ProjectWorkspace from './Workspace/ProjectWorkspace';
import ProjectProfile from './ProjectProfile';

const isMemeber = (members, user) =>
  members.find((member) => member.id === user.id) !== undefined;

const Project = () => {
  const { user } = useContext(UserContext);

  const { projectID } = useParams();

  const [loadProject, { data: projectData, loading: projectLoading }] =
    useLazyQuery(GET_PROJECT, {
      variables: {
        projectID,
      },
    });

  const [loadMembers, { data: memberData, mLoading: memberLoading }] =
    useLazyQuery(GET_MEMBERS, {
      variables: {
        projectID,
      },
    });

  useEffect(() => {
    loadProject();
    loadMembers();
  }, [loadProject, loadMembers]);

  return (
    <div className="project">
      {/* show join us page to whomever, but if the user isn't signed in */}
      {/* redirect them to the login page */}
      {projectLoading || memberLoading ? (
        <LoaderComponent />
      ) : user ? (
        projectData &&
        projectData.getProject &&
        projectData.getProject.members &&
        memberData &&
        memberData.getProjectMembers &&
        (isMemeber(projectData.getProject.members, user) ? (
          <ProjectWorkspace
            project={projectData.getProject}
            elements={memberData.getProjectMembers}
          />
        ) : (
          projectData &&
          projectData.getProject && (
            <ProjectProfile project={projectData.getProject} />
          )
        ))
      ) : (
        projectData &&
        projectData.getProject && (
          <ProjectProfile project={projectData.getProject} />
        )
      )}
    </div>
  );
};

export default Project;
