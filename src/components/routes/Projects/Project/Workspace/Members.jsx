import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_MEMBERS } from '../../../../../graphql';

// TODO: GET_PROJECT_MEMBERS and GET_PROJECT_INFO
const Members = (projectID) => {
  const { data: dData, loading } = useQuery(GET_MEMBERS, {
    variables: {
      projectID,
    },
    onCompleted() {
      console.log(dData);
    },
  });

  if (loading) return <div className="loading">Loading</div>;

  return <div>some member list</div>;
};

export default Members;
