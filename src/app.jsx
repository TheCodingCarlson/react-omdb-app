// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Components
import MovieSearch from './components/MovieSearch.jsx';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' component={MovieSearch} />
                </div>
            </BrowserRouter>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('container'));