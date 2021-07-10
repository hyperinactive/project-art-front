import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';

const LoaderComponent = () => {
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
      <Loader size="huge" active>
        {text}
      </Loader>
    </div>
  );
};

export default LoaderComponent;
