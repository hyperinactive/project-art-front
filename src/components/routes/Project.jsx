/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECT } from '../../graphql';

const Project = (props) => {
  console.log(props.match.params);
  const { projectID } = props.match.params;
  const { data } = useQuery(GET_PROJECT, {
    variables: {
      projectID,
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div className="project" style={{ textAlign: 'center' }}>
      {data && (
        <>
          <h1>{data.getProject.name}</h1>
          <h3>{data.getProject.owner.username}</h3>
        </>
      )}

      {console.log(data)}
    </div>
  );
};

export default Project;
