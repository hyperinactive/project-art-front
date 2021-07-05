import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoaderComponent = () => (
  <div className="loaderComponent">
    <Loader size="huge" active>
      Computing things, beep boop bop
    </Loader>
  </div>
);

export default LoaderComponent;
