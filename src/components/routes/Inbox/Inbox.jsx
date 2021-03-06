import React, { useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import LoaderComponent from '../../shared/LoaderComponent';
import InboxFeed from './InboxFeed';
import InboxForm from './InboxForm';
import InboxFriends from './InboxFriends';
import { InboxContext } from '../../../context/inboxContext/InboxProvider';
import { NavigationContext } from '../../../context/navigationContext/NavigationProvider';
import useLoadMessages from '../../../utils/hooks/loadMessages';
import useSubToMessages from '../../../utils/hooks/subToMessages';

const Inbox = () => {
  const { selectedUser, setSelectedUser } = useContext(InboxContext);
  const { setTemporaryTab } = useContext(NavigationContext);
  const { cache } = useApolloClient();

  const [loadUserMessages, { data: friendsData, loading: friendsLoading }] =
    useLoadMessages(setSelectedUser);

  // TODO: some nice cleanup function for async
  useEffect(() => {
    loadUserMessages();
    setTemporaryTab({
      name: 'Inbox',
      link: `/inbox`,
    });
  }, []);

  useSubToMessages(cache);

  return (
    <div className="inboxComponent">
      {/* TODO: switch off the Grid */}
      <div className="inboxComponent__wrapper">
        <div className="inboxComponent__wrapper__left">
          {/* if data loading show loader, when check if a selected user exists */}
          {selectedUser ? (
            <>
              {selectedUser ? (
                friendsData &&
                friendsData.getUserMessages.map((userMObj) => {
                  if (userMObj.user.id === selectedUser) {
                    return (
                      <InboxFeed
                        key={userMObj.user.id}
                        feed={userMObj.messages.slice(0).reverse()}
                      />
                    );
                  }
                  return null;
                })
              ) : (
                <InboxFeed feed={[]} />
              )}
              <InboxForm />
            </>
          ) : (
            <p>select a friend to see messages</p>
          )}
        </div>

        <div className="inboxComponent__wrapper__right">
          {friendsLoading ? (
            <LoaderComponent />
          ) : (
            <>
              {friendsData && friendsData.getUserMessages && (
                <InboxFriends friends={friendsData.getUserMessages} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
