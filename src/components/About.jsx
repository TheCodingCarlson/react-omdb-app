import React from 'react';
import { Link } from 'react-router-dom';

const IconLink = (props) => {
    return (
        <li>
            <a href={props.url}>
                <i className={`devicon devicon-${props.iconClass}`}></i>
            </a>
        </li>
    );
}

class About extends React.Component {
    render() {
        return (
            <div className='center-align'>
                <div className='row'>
                    <div className='col s12'>
                        <h1>About</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <p>Made with <i className='em em-heart'></i> by <a className='red-link' href='http://www.thecodingcarlson.com'>The Coding Carlson</a></p>
                        <p>Source code can be found <a href='https://github.com/TheCodingCarlson/react-omdb-app' className='red-link'>here</a></p>
                        <p>Technologies used in this app include:</p>
                        <ul className='icon-list'>
                            <IconLink url='https://www.javascript.com/' iconClass='javascript-plain' />
                            <IconLink url='https://reactjs.org/' iconClass='react-plain-wordmark' />
                            <IconLink url='http://sass-lang.com/' iconClass='sass-original' />
                            <IconLink url ='https://babeljs.io/' iconClass='babel-plain' />
                            <IconLink url ='https://webpack.js.org/' iconClass='webpack-plain-wordmark' />
                            <IconLink url ='https://nodejs.org/' iconClass='nodejs-plain-wordmark' />
                            <IconLink url ='https://expressjs.com/' iconClass='express-original-wordmark' />
                        </ul>
                    </div>
                    <Link to='/' className='red-link'>&larr; Back</Link>
                </div>
            </div>
        );
    }
}

export default About;
