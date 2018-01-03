import React from 'react';
import { Link } from 'react-router-dom';

const LoadingMessage = () => {
    return (
        <div className='row'>
            <div className='col s12'>
                <h1>...Loading</h1>
            </div>
        </div>
    );
}

class MovieDetails extends React.Component {
    static initialState = () => ({
        movie: null
    })

    state = MovieDetails.initialState();

    componentDidMount() {
        fetch(`https://omdbapi.com/?i=${this.props.match.params.id}&apikey=${process.env.OMDB_API_KEY}`)
        .then(res => {
            res.json()
            .then(data => {
                this.setState({ movie: data });
            })
        }).catch(err => {
            this.setState({ movie: null });
        })
    }

    render() {
        const movie = this.state.movie;
        if(!movie) return <LoadingMessage />;
        const scores = this.state.movie.Ratings.map((score, id) => {
            return (
                <li className='collection-item' key={id}>
                    <span className='red-text'>{score.Source}:</span> {score.Value}
                </li>
            );
        })

        const poster = this.state.movie.Poster !== 'N/A' ? 
            <img src={this.state.movie.Poster} alt={this.state.movie.Poster} /> :
            <h4>There is no poster available for this film</h4>;

        const plot = this.state.movie.Plot !== 'N/A' ? this.state.movie.Plot : '';

        return(
            <div>
                <div className='row'>
                    <div className='col s12'>
                        <h1>{movie.Title}</h1>
                        <p>{plot}</p>  
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m6 center-align'>
                        {poster}
                    </div>
                    <div className='col s12 m6'>
                        <ul className='collection'>
                            <li className='collection-item'>
                                <span className='red-text'>Released:</span> {movie.Released}
                            </li>
                            <li className='collection-item'>
                                <span className='red-text'>Genre:</span> {movie.Genre}
                            </li>
                            <li className='collection-item'>
                                <span className='red-text'>Rating:</span> {movie.Rated}
                            </li>
                            <li className='collection-item'>
                                <span className='red-text'>Length:</span> {movie.Runtime}
                            </li>
                            <li className='collection-item'>
                                <span className='red-text'>Director(s):</span> {movie.Director}
                            </li>
                            <li className='collection-item'>
                                <span className='red-text'>Actors:</span> {movie.Actors}
                            </li>
                        </ul>
                        <p>Ratings</p>
                        <ul className='collection'>
                            {scores}
                        </ul>   
                    </div>
                </div>
                <div className='row'>
                    <div className='s12'>
                        <Link to='/' className='red-link'>&larr; Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieDetails;
