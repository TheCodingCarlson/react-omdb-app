// React Dependencies
import React from 'react'
import ReactDOM from 'react-dom'

// React Router
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Components
import MovieSearch from './components/MovieSearch.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import About from './components/About.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                    <hr />

                    <Route exact path='/' component={MovieSearch} />
                    <Route path='/about' component={About} />
                    <Route path='/results/:id' component={MovieDetails} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('container'));