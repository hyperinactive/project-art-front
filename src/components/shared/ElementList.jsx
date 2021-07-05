/* eslint-disable no-nested-ternary */
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { baseURL, defaultAvatar } from '../../appConfig';

const ElementList = ({ elements, type }) => (
  <div className="elementList">
    {elements.length > 0 ? (
      <div className="elementList__innerContainer">
        {elements.map((element) => (
          <Grid.Row key={element.id} style={{ margin: 10 }} centered>
            <Image
              rounded
              size="tiny"
              src={
                element.imageURL
                  ? `${baseURL}/files/${element.imageURL}`
                  : defaultAvatar
              }
              as={Link}
              to={`/${type}/${element.id}`}
            />
            <div style={{ textAlign: 'center' }}>
              <p>{type === 'projects' ? element.name : element.username}</p>
            </div>
          </Grid.Row>
        ))}
      </div>
    ) : type === 'projects' ? (
      <Grid.Row>
        <p>Joined no projects... (yet)</p>
      </Grid.Row>
    ) : (
      <Grid.Row>
        <p>No friends... (yet)</p>
      </Grid.Row>
    )}
  </div>
);

ElementList.defaultProps = {
  elements: PropTypes.shape({
    imageURL: null,
    map: () => {},
    type: '',
  }),
};

ElementList.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageURL: PropTypes.string,
      map: PropTypes.func,
    })
  ),
  type: PropTypes.string.isRequired,
};

export default ElementList;
