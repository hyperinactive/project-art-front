/* eslint-disable no-nested-ternary */
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { baseURL, logo } from '../../appConfig';
import prettyString from '../../utils/prettyString';

const ElementList = ({ elements, type }) => (
  <div className="elementList">
    {elements.length > 0 ? (
      <div className="elementList__innerContainer">
        {elements.map((element) => (
          <Grid.Row
            className="elementList__innerContainer__element"
            key={element.id}
            style={{ margin: 10 }}
            centered
          >
            <Image
              rounded
              size="tiny"
              src={
                element.imageURL ? `${baseURL}/files/${element.imageURL}` : logo
              }
              as={Link}
              to={`/${type}/${element.id}`}
            />
            <div style={{ textAlign: 'center' }}>
              <p>
                {type === 'projects'
                  ? prettyString(element.name, 14)
                  : prettyString(element.username, 14)}
              </p>
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
