import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import PostList  from "./PostList";

ReactDOM.render(<PostList />, document.getElementById("root"));
registerServiceWorker();
