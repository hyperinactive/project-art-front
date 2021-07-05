/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoaderComponent from '../../../shared/LoaderComponent';
import { UserContext } from '../../../../context/UserProvider';
import { GET_MEMBERS, GET_PROJECT } from '../../../../graphql';
import ProjectWorkspace from './Workspace/ProjectWorkspace';
import ProjectProfile from './ProjectProfile';

const isMemeber = (members, user) =>
  members.find((member) => member.id === user.id) !== undefined;

const Project = () => {
  const { user } = useContext(UserContext);

  const { projectID } = useParams();
  console.log(projectID);

  const [loadProject, { data, loading }] = useLazyQuery(GET_PROJECT, {
    variables: {
      projectID,
    },
  });

  const [loadMembers, { data: mData, mLoading }] = useLazyQuery(GET_MEMBERS, {
    variables: {
      projectID,
    },
  });

  useEffect(() => {
    loadProject();
    loadMembers();
  }, [loadProject, loadMembers]);

  return (
    <div className="project" style={{ textAlign: 'center' }}>
      {/* show join us page to whomever, but if the user isn't signed in */}
      {/* redirect them to the login page */}
      {loading || mLoading ? (
        <LoaderComponent />
      ) : user ? (
        data &&
        data.getProject &&
        data.getProject.members &&
        mData &&
        mData.getProjectMembers &&
        (isMemeber(data.getProject.members, user) ? (
          <ProjectWorkspace
            project={data.getProject}
            elements={mData.getProjectMembers}
          />
        ) : (
          data &&
          data.getProject && <ProjectProfile project={data.getProject} />
        ))
      ) : (
        data && data.getProject && <ProjectProfile project={data.getProject} />
      )}
    </div>
  );
};

export default Project;
