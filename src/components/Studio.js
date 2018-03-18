import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Critique from './Critique';

class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = { newIframe: '', iframes: [], activeIframe: '', critiques: [], content: '', activeIframeCritiques: [] };
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.critiquesRef = this.props.firebase.database().ref('critiques');
    this.postVideo = this.postVideo.bind(this);
    this.handleIframe = this.handleIframe.bind(this);
    this.activateIframe = this.activateIframe.bind(this);
    this.handleCritique = this.handleCritique.bind(this);
    this.pushCritique = this.pushCritique.bind(this);
    this.filterAndDisplayCritiques = this.filterAndDisplayCritiques.bind(this);
  }

  componentDidMount() {
    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      this.setState({ iframes: this.state.iframes.concat( iframe ) });
    });

    this.critiquesRef.on('child_added', snapshot => {
      const critique = snapshot.val();
      critique.key = snapshot.key;
      this.setState({ critiques: this.state.critiques.concat( critique ) });
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

  handleCritique(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
    console.log(this.state.content);
  }

  pushCritique() {
    console.log(this.state.content);
    const date = new Date();
    this.critiquesRef.push({
      content: this.state.content,
      timeAdded: [date.toLocaleDateString(), date.toLocaleTimeString()],
      iframeID: this.state.activeIframe.key,
      addedBy: [this.props.user.displayName, this.props.user.email, this.props.user.uid]
    });
  }

  activateIframe(iframe) {
    this.state.activeIframe.key === iframe.key ? this.setState({ activeIframe: '' }) : this.setState({ activeIframe: iframe });
    console.log(this.state.activeIframe);
    this.filterAndDisplayCritiques(iframe);
  }

  filterAndDisplayCritiques(activeIframe) {
    this.setState({ activeIframeCritiques: this.state.critiques.filter(critique => critique.iframeID == activeIframe.key) });
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
            <input className="profile-input" type="text" value={this.state.newIframe} onChange={this.handleIframe}></input>
            <button className="button" type="submit">Post</button>
          </form>
          {this.state.iframes.map(iframe =>
            <div key={iframe.key} className="video">
              <h5>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</h5>
              <div>{ReactHtmlParser(iframe.iframe)}</div>

              <button className="button" onClick={() => this.activateIframe(iframe)}>Critique</button>
              <div className={iframe.key === this.state.activeIframe.key ? "critique" : "no-show"}>
                <div className={iframe.key === this.state.activeIframe.key ? "form" : "no-show"}>
                  <form onSubmit={() => this.pushCritique()}>
                    <input className="profile-input" type="text" value={this.state.content} onChange={this.handleCritique}></input>
                    <button className="button" type="submit">Post</button>
                  </form>
                </div>
                {this.state.activeIframe.key === iframe.key ?
                  <div>{this.state.activeIframeCritiques.map(critique =>
                    <div key={critique.key}>{critique.addedBy[0] || critique.addedBy[1]}: {critique.content} {critique.timeAdded[0]} at {critique.timeAdded[1]}</div>
                  )}</div>: null

                }
                </div>
            </div>
          )}

        </div> : null
    );
  }
}

export default Studio;
