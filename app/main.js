import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './components/ReduxProvider';
require("font-awesome-sass-loader");

const render = (Component) => {
  ReactDOM.render(
    <ReduxProvider/>,
    document.getElementById('root'),
  );
};

render(ReduxProvider);