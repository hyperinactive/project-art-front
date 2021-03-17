/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Loader } from 'semantic-ui-react';
import { GET_PROJECT } from '../../graphql';
import { UserContext } from '../../context/UserProvider';
import ProjectWorkspace from '../ProjectWorkspace';
import ProjectProfile from '../ProjectProfile';

const isMemeber = (project, user) =>
  project.members.find((member) => member.id === user.id) !== undefined;

const Project = (props) => {
  const { user } = useContext(UserContext);
  const { projectID } = props.match.params;
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: {
      projectID,
    },
  });

  return (
    <div className="project" style={{ textAlign: 'center' }}>
      {/* show join us page to whomever, but if the user isn't signed in */}
      {/* redirect them to the login page */}
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : user ? (
        data &&
        data.getProject &&
        (isMemeber(data.getProject, user) ? (
          <ProjectWorkspace project={data.getProject} />
        ) : (
          <ProjectProfile project={data.getProject} />
        ))
      ) : (
        <ProjectProfile project={data.getProject} />
      )}
    </div>
  );
};

export default Project;
