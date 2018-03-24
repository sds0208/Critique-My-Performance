import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Performances from './Performances';

class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIframe: '' };
    this.activateIframe = this.activateIframe.bind(this);
  }


  activateIframe(iframe) {
    this.state.activeIframe.key === iframe.key ? this.setState({ activeIframe: '' }) : this.setState({ activeIframe: iframe });
    console.log(this.state.activeIframe);
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
          < Performances firebase={this.props.firebase} activateIframe={this.activateIframe.bind(this)} activeIframe={this.state.activeIframe} user={this.props.user}/>
        </div> : null
    );
  }
}

export default Studio;
