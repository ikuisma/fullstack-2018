import React from 'react';
import ReactDOM from 'react-dom';
import { App, store } from './App';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)