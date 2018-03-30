import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Critique from './Critique';

class Performances extends Component {
  constructor(props) {
    super(props);
    this.state = { newIframe: '', iframes: [], critiques: [], content: '', activeIframeCritiques: [] };
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.critiquesRef = this.props.firebase.database().ref('critiques');
    this.postVideo = this.postVideo.bind(this);
    this.handleIframe = this.handleIframe.bind(this);

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

  //deleteCritique(critique) {
  //}

  render() {
    return(
      <div className="Performances">
        <form onSubmit={() => this.postVideo()}>
          <input className="profile-input" type="text" value={this.state.newIframe} onChange={this.handleIframe}></input>
          <button className="button" type="submit">Post</button>
        </form>
        {this.state.iframes.map(iframe =>
          <div key={iframe.key} className="video">
            <h5>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</h5>
            <div>{ReactHtmlParser(iframe.iframe)}</div>

            <button className="button" onClick={() => this.props.activateIframe(iframe)}>Critique</button>
            <div className={iframe.key === this.props.activeIframe.key ? "critique" : "no-show"}>




                < Critique firebase={this.props.firebase} activeIframe={this.props.activeIframe} activateIframe={this.props.activateIframe} user={this.props.user}/>


              </div>
          </div>
        )}
      </div>
    );
  }
}

export default Performances;
