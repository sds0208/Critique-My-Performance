import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = { newIframe: '', iframes: [] };
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.postVideo = this.postVideo.bind(this);
    this.handleIframe = this.handleIframe.bind(this);
  }

  componentDidMount() {
    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      this.setState({ iframes: this.state.iframes.concat( iframe ) });
    });
  }

  postVideo() {
    const date = new Date();
    if (this.state.newIframe.includes("youtube") || this.state.newIframe.includes("soundcloud")) {
      this.iframesRef.push({
        iframe: this.state.newIframe,
        timeAdded: [date.toLocaleDateString(), date.toLocaleTimeString()],
        userUID: this.props.user.uid,
        userName: this.props.user.displayName,
        userEmail: this.props.user.email
      });
    } else {
      alert("This is not a valid YouTube or SOUNDCLOUD iframe. Please try again.");
    }

  }

  handleIframe(event) {
    event.preventDefault();
    this.setState({ newIframe: event.target.value.replace("></iframe>", "/>") });
  }

  render() {
    return (
      this.props.user ?
        <div className="Studio">
          <h1>The Studio</h1>
          <p>To post your performance:</p>
          <ul>
            <li>Create a YouTube Video or SOUNDCLOUD Track.</li>
            <li>Click the Share button at the bottom of the video or track.</li>
            <li>Select the "Embed" option.</li>
            <li>Copy and paste the iframe here:</li>
          </ul>
          <form onSubmit={() => this.postVideo()}>
            <input type="text" value={this.state.newIframe} onChange={this.handleIframe}></input>
            <button type="submit">Post</button>
          </form>

          {this.state.iframes.map(iframe =>
            <div key={iframe.key} className="video">
              <h5>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</h5>
              {ReactHtmlParser(iframe.iframe)}
              <div>Critique will go here.</div>
            </div>
          )}

        </div> : null 
    );
  }
}

export default Studio;
