import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import { InboxContext } from '../../../context/inboxContext/InboxProvider';
import prettyString from '../../../utils/prettyString';

const InboxUserCard = ({
  userID,
  active,
  imageURL,
  username,
  latestMessageContent,
  latestMessageFromID,
  onClick,
}) => {
  const { user } = useContext(UserContext);
  const { selectedUser } = useContext(InboxContext);

  return (
    <button
      type="button"
      className="inboxComponent__friendList__friendCard"
      onClick={onClick}
    >
      <Image
        className="inboxComponent__friendList__friendCard__avatar"
        rounded
        size="tiny"
        src={imageURL ? `${baseURL}/files/${imageURL}` : defaultAvatar}
      />
      <div className="inboxComponent__friendList__friendCard__info">
        <div className="inboxComponent__friendList__friendCard__info__header">
          <h2
            className={`inboxComponent__friendList__friendCard__info__header__name ${
              active ? 'active' : 'headline'
            }`}
          >
            {username}
          </h2>
          <div
            className={`${selectedUser === userID ? 'selectedUser' : ''}`}
            style={{ display: 'none' }}
          >
            <Icon name="angle left" size="big" />
          </div>
        </div>

        {latestMessageFromID ? (
          <div
            className={`inboxComponent__friendList__friendCard__info__message ${
              latestMessageFromID === user.id
                ? 'senderLatest'
                : 'receiverLatest'
            }`}
          >
            <h4>
              {latestMessageContent
                ? prettyString(latestMessageContent, 30)
                : 'no message'}
            </h4>
          </div>
        ) : (
          <div className="inboxComponent__friendList__friendCard__info__message">
            <h4>--no message--</h4>
          </div>
        )}
      </div>
    </button>
  );
};

InboxUserCard.defaultProps = {
  userID: '',
  imageURL: defaultAvatar,
  active: false,
  latestMessageContent: null,
  latestMessageFromID: null,
  onClick: () => {},
};

InboxUserCard.propTypes = {
  userID: PropTypes.string,
  active: PropTypes.bool,
  username: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  latestMessageContent: PropTypes.string,
  latestMessageFromID: PropTypes.string,
  onClick: PropTypes.func,
};

export default InboxUserCard;
