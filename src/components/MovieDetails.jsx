import React from 'react'
import { Link } from 'react-router-dom'

class MovieDetails extends React.Component {
    static initialState = () => ({
        movie: null
    })
    state = MovieDetails.initialState();

    componentDidMount() {
        fetch(`http://omdbapi.com/?i=${this.props.match.params.id}&apikey=${process.env.OMDB_API_KEY}`)
        .then(res => {
            res.json()
            .then(data => {
                this.setState({ movie: data })
            })
        }).catch(err => {
            this.setState({ movie: null })
        })
    }

    render() {
        const movie = this.state.movie;
        if(!movie) return <h1>...Loading</h1>;
        const scores = this.state.movie.Ratings.map((score, id) => {
            return (
                <li className='collection-item' key={id}>
                    <span className='red-text'>{score.Source}:</span> {score.Value}
                </li>
            )
        });

        return(
            <div>
                <div className='row'>
                    <div className='col s12'>
                        <h1>{movie.Title}</h1>
                        <p>{movie.Plot}</p>  
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m6 center-align'>
                        <img src={movie.Poster} alt={movie.Title} />
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
                        <Link to='/' className='back-link'>&larr; Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetails