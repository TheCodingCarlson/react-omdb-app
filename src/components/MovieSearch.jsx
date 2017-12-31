import React from 'react'
import { Link } from 'react-router-dom'

class MovieSearch extends React.Component {
    static intialState = () => ({
        searchTerm: '',
        results: []
    })
    state = MovieSearch.intialState();

    componentDidMount() {
        this.setState({
            searchTerm: localStorage.getItem('searchTerm') !== null ? localStorage.getItem('searchTerm') : '',
            results: localStorage.getItem('results') !== null ? JSON.parse(localStorage.getItem('results')) : []
        });
    }

    searchChange = (e) => this.setState({ searchTerm: e.target.value })
    clear = () => this.setState(MovieSearch.intialState());
    
    search = (e) => {
        e.preventDefault();

        fetch(`http://omdbapi.com/?s=${this.state.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
        .then(res => {
            res.json().then(data => {
                localStorage.setItem('searchTerm', this.state.searchTerm);
                localStorage.setItem('results', JSON.stringify(data.Search));
                this.setState({ results: data.Search });
            });
        }).catch(err => {
            this.setState({ searchTerm: '', results: [] });
        });
    }

    render() {  
        const results = this.state.results !== undefined ?
            this.state.results.map((movie, id) => {
                return (
                    <div className='col s12' key={id}>
                        <div className='card red darken-4'>    
                            <div className='card-content white-text'>
                                <span className='card-title'>{movie.Title}</span>
                                <p>{movie.Year}</p>
                            </div>
                            <div className='card-action'>
                                <Link to={`/results/${movie.imdbID}`}>Details</Link>
                            </div>
                        </div>
                    </div>
                );
            }) : 
            
            <div className='row'>
                <div className="col s12">
                    <h4>Sorry, there were no movies matching that query!</h4>
                </div>
            </div>;
     
        return (
            <div>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <h1>OMDB Movie Search</h1>
                        <p>Search the OMDB movie database for details on a specific movie or enter a general term to discover movies with that query in the title.</p>
                    </div>
                </div>
                <div className='row'>
                    <div className="col s12">
                        <form onSubmit={this.search}>
                            <input value={this.state.searchTerm} onChange={this.searchChange} placeholder="Movie Title: ex. Star Wars" required /> 
                            <div className='center-align'>
                                <button className="waves-effect waves-light btn red darken-4" type='submit'>
                                    <i className="material-icons">search</i>
                                </button>
                                <button className="waves-effect waves-light btn red darken-4" type='button' onClick={this.clear}>
                                    <i className="material-icons">clear</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    {results}
                </div>
            </div>
        )
    }
}

export default MovieSearch