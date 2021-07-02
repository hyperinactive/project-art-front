import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/UserProvider';

const InboxUserCard = ({
  active,
  imageURL,
  username,
  latestMessageContent,
  latestMessageFromID,
  onClick,
}) => {
  const { user } = useContext(UserContext);

  const prettyString = (str) => {
    if (str.length > 30) {
      return `${str.substring(0, 30).trim()}...`;
    }
    return str;
  };

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
        <h2
          className={`inboxComponent__friendList__friendCard__info__name ${
            active ? 'active' : 'headline'
          }`}
        >
          {username}
        </h2>
        <h4
          className={`inboxComponent__friendList__friendCard__info__message ${
            latestMessageFromID !== user.id ? 'senderLatest' : 'receiverLatest'
          }`}
        >
          {latestMessageContent
            ? prettyString(latestMessageContent)
            : 'no message'}
        </h4>
      </div>
    </button>
  );
};

InboxUserCard.defaultProps = {
  imageURL: defaultAvatar,
  active: false,
  latestMessageContent: null,
  latestMessageFromID: null,
  onClick: () => {},
};

InboxUserCard.propTypes = {
  active: PropTypes.bool,
  username: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  latestMessageContent: PropTypes.string,
  latestMessageFromID: PropTypes.string,
  onClick: PropTypes.func,
};

export default InboxUserCard;
