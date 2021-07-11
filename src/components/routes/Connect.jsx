import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Input, Image } from 'semantic-ui-react';

import LoaderComponent from '../shared/LoaderComponent';
import { UserContext } from '../../context/userContext/UserProvider';
import { GET_USERS } from '../../graphql/userGQL';
import { baseURL, defaultAvatar } from '../../appConfig';

const Connect = () => {
  const { user } = useState(UserContext);
  const history = useHistory();

  if (user === null) history.push('/login');

  const [searchTerm, setSearchTerm] = useState('');

  const { data: userData, loading: userLoading } = useQuery(GET_USERS, {
    pollInterval: 5000,
    // onCompleted: () => {
    //   console.log(userData.getUsers);
    // },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="connect">
      {userLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="connect__search">
            <Input
              className="themeForm"
              placeholder="search"
              icon={{ name: 'search', color: 'orange' }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="connect__usersGrid">
            {userData &&
              userData.getUsers &&
              [...userData.getUsers]
                .sort((a, b) => {
                  const al = a.username.toLowerCase();
                  const bl = b.username.toLowerCase();

                  if (al > bl) return 1;
                  return -1;
                })
                .filter((currentUser) =>
                  currentUser.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((member) => (
                  <div key={member.id}>
                    <div style={{ textAlign: 'center' }}>
                      <Image
                        rounded
                        size="tiny"
                        src={
                          member.imageURL
                            ? `${baseURL}/files/${member.imageURL}`
                            : defaultAvatar
                        }
                        as={Link}
                        to={`/user/${member.id}`}
                      />

                      <p>{member.username}</p>
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Connect;
