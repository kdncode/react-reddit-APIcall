import React, { Component } from 'react';
import axios from 'axios';

// https://www.reddit.com/r/space.json

// Challenge -> get data real-time in text box

class APIcall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            subr: 'unt',
            name: ''
        };

        this.getReddit = this.getReddit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Life cycle
    componentWillMount(){
        this.getReddit();
    }

    getReddit() {
        axios.get(`https://www.reddit.com/r/${this.state.subr}.json`)
        .then( res => {
            const posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts: posts });
        });
    }

    // Get the value
    handleChange(event) {
        this.setState({ subr: event.target.value })
    }
    
    render() {
        return (
            <div><br/><br/>
                <input type="text" onChange={this.handleChange} value={this.state.subr} placeholder="Enter a topic" />
                <h1>My Reddit API call: {`/r/${this.state.subr}`}</h1>
                <ul>
                    {this.state.posts.map(post => 
                        <li key={post.id}> {post.title} </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default APIcall;