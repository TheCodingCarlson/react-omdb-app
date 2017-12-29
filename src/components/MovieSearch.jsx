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
                    <div key={id}>
                        <h2><Link to={`/results/${movie.imdbID}&apikey=c555a4b5`}>{movie.Title}</Link></h2>
                    </div>
                );
            }) : 
            
            <div>
                <h2>Sorry! there were no movies matching that query!</h2>
            </div>;
     
        return (
            <div>
                <h1>Search for movies</h1>
                <form onSubmit={this.search}>
                    <input type='text'
                        value={this.state.searchTerm}
                        onChange={this.searchChange} />

                    <input type='submit' />
                </form>
                <button onClick={this.clear}>Clear</button>
                <div>{ results }</div>
            </div>
        )
    }
}

export default MovieSearch