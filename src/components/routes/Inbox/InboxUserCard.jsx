import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { baseURL, defaultAvatar } from '../../../appConfig';

const InboxUserCard = ({ active, imageURL, username, onClick }) => (
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
      <h4 className="inboxComponent__friendList__friendCard__info__message">
        --placeholder message--
      </h4>
    </div>
  </button>
);

InboxUserCard.defaultProps = {
  imageURL: defaultAvatar,
  active: false,
  onClick: () => {},
};

InboxUserCard.propTypes = {
  active: PropTypes.bool,
  username: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default InboxUserCard;
