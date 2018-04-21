import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Applause from './Applause';
import Critique from './Critique';
import '../styles/Performances.css';

class Performances extends Component {
  constructor(props) {
    super(props);
    const initialState = { newIframe: '', iframes: [], critiques: [], content: '', activeIframeCritiques: [] };
    this.state = initialState;
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.postVideo = this.postVideo.bind(this);
    this.handleIframe = this.handleIframe.bind(this);
  }

  componentDidMount() {

    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      let frames = this.state.iframes;
      frames.push(iframe);
      this.setState({ iframes: frames });
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
        userEmail: this.props.user.email,
        applause: 0
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
    return(
      <div className="Performances">
        <form onSubmit={() => this.postVideo()}>
          <input className="profile-input" type="text" value={this.state.newIframe} onChange={this.handleIframe}></input>
          <button className="button" type="submit">Post</button>
        </form>
        {this.state.iframes.map(iframe =>
          <div key={iframe.key} className="video">
            <p>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</p>
            <div className="iframe">{ReactHtmlParser(iframe.iframe)}</div>
            <button className="button" onClick={() => this.props.activateIframe(iframe)}>Critique</button>
            <div className={iframe.key === this.props.activeIframe.key ? "critique" : "no-show"}>
              < Applause firebase={this.props.firebase} user={this.props.user} activeIframe={this.props.activeIframe} activateIframe={this.props.activateIframe} />
              < Critique firebase={this.props.firebase} activeIframe={this.props.activeIframe} activateIframe={this.props.activateIframe} user={this.props.user}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Performances;
