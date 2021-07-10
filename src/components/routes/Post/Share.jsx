import React, { useEffect, useState } from 'react';
import { Modal, Header, Button, Image, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { baseURL, defaultAvatar } from '../../../appConfig';

const Share = ({ postID, imageURL, likeCount, commentCount }) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(null);
  const [btnText, setBtnText] = useState('copy');
  const [btnColor, setBtnColor] = useState('grey');

  useEffect(() => {
    setLink(
      `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/posts/${postID}`
    );
    return () => {
      setLink(null);
    };
  }, [link]);

  return (
    <div className="share">
      <Modal
        closeIcon
        open={open}
        trigger={<p>Share</p>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="share alternate" content="Sharing" />
        <Modal.Content>
          <div className="share__url">
            <div className="share__url__profile">
              <Image
                size="tiny"
                rounded
                src={imageURL ? `${baseURL}/files/${imageURL}` : defaultAvatar}
              />
              <div className="share__url__profile__info">
                <Button as="div" labelPosition="right">
                  <Button color="orange">
                    <Icon name="heart" />
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    {likeCount}
                  </Label>
                </Button>
                <Button as="div" labelPosition="right">
                  <Button color="red">
                    <Icon name="comments" />
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              </div>
            </div>
            <Link to={`/posts/${postID}`}>{link}</Link>
            <Button
              className="share__url__button"
              icon="copy"
              content={btnText}
              color={btnColor}
              onClick={() => {
                copy(link);
                setBtnText('copied!');
                setBtnColor('orange');
              }}
            />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

Share.defaultProps = {
  imageURL: null,
};

Share.propTypes = {
  postID: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default Share;
