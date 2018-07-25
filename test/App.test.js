import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

describe('testing App component', function () {
    this.timeout(20000);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
