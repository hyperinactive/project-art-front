import React, { useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LoaderComponent = ({ isDimmerActive }) => {
  const [text, setText] = useState('Computing things, beep boop bop');

  // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  // safely exit useEffect, good stuff Facebook
  useEffect(() => {
    let ignore = false;

    setTimeout(() => {
      if (!ignore) setText('I run on 2 potatoes and tears of my creator...');
    }, 6000);
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="loaderComponent">
      <Dimmer active={isDimmerActive}>
        <Loader size="huge" active>
          {text}
        </Loader>
      </Dimmer>
    </div>
  );
};

LoaderComponent.defaultProps = {
  isDimmerActive: false,
};

LoaderComponent.propTypes = {
  isDimmerActive: PropTypes.bool,
};

export default LoaderComponent;
