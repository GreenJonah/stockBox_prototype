import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
