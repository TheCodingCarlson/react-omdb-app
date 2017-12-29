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

        return(
            <div>
                <h1>{movie.Title}</h1>
                <p>{movie.Plot}</p>
                <Link to='/'>&larr; Back</Link>
            </div>
        )
    }
}

export default MovieDetails