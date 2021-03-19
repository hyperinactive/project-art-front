/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Loader } from 'semantic-ui-react';
import { GET_MEMBERS, GET_PROJECT } from '../../graphql';
import { UserContext } from '../../context/UserProvider';
import ProjectWorkspace from '../ProjectWorkspace';
import ProjectProfile from '../ProjectProfile';

const isMemeber = (members, user) =>
  members.find((member) => member.id === user.id) !== undefined;

const Project = (props) => {
  const { user } = useContext(UserContext);
  const { projectID } = props.match.params;

  const { data: dData, loading: dLoading } = useQuery(GET_PROJECT, {
    variables: {
      projectID,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const { data: pData, loading: pLoading } = useQuery(GET_MEMBERS, {
    variables: {
      projectID,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="project" style={{ textAlign: 'center' }}>
      {/* show join us page to whomever, but if the user isn't signed in */}
      {/* redirect them to the login page */}
      {dLoading || pLoading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : user ? (
        pData.getProjectMembers &&
        dData.getProject &&
        (isMemeber(pData.getProjectMembers, user) ? (
          <ProjectWorkspace project={dData.getProject} />
        ) : (
          <ProjectProfile project={dData.getProject} />
        ))
      ) : (
        <ProjectProfile project={dData.getProject} />
      )}
    </div>
  );
};

export default Project;
