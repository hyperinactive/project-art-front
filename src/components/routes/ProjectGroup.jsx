/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECT } from '../../graphql';

const ProjectGroup = (props) => {
  console.log(props.match.params);
  const projectGroupID = props.match.params.projectID;
  const { data } = useQuery(GET_PROJECT, {
    variables: {
      projectGroupID,
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div className="projectGroup" style={{ textAlign: 'center' }}>
      {data && (
        <>
          <h1>{data.getProjectGroup.name}</h1>
          <h3>{data.getProjectGroup.owner.username}</h3>
        </>
      )}

      {console.log(data)}
    </div>
  );
};

export default ProjectGroup;
