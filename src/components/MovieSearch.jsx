import React from 'react'
import { Link } from 'react-router-dom'

class MovieSearch extends React.Component {
    static intialState = () => ({
        searchTerm: '',
        results: []
    });
    state = MovieSearch.intialState();

    searchChange = (e) => this.setState({ searchTerm: e.target.value })
    clear = () => this.setState(MovieSearch.intialState());
    
    search = (e) => {
        e.preventDefault();

        fetch(`http://omdbapi.com/?s=${this.state.searchTerm}&apikey=${process.env.OMDB_API_KEY}`)
        .then(res => {
            res.json().then(data => {
                this.setState({ searchTerm: '', results: data.Search });
            });
        }).catch(err => {
            this.setState({ searcTerm: '', results: [] });
        });
    }

    render() {  
        const results = this.state.results !== undefined ?
            this.state.results.map((movie, id) => {
                return (
                    <div className='col s12 m6' key={id}>
                        <div className='card blue-grey darken-1'>    
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
                <div className="col s6 offset-s3">
                    <h4>Sorry! there were no movies matching that query!</h4>
                </div>
            </div>;
     
        return (
            <div>
                <div className='row'>
                    <div className="col s6 offset-s3">
                        <form onSubmit={this.search}>
                            <input value={this.state.searchTerm} onChange={this.searchChange} placeholder="Movie Title" /> 
                            <button className="waves-effect waves-light btn" type='submit'>
                                <i class="material-icons">search</i>
                            </button>
                            <button className="waves-effect waves-light btn" type='button' onClick={this.clear}>
                                <i class="material-icons">clear</i>
                            </button>
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