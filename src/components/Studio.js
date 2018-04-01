import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Performances from './Performances';
import SignOut from './SignOut';

class Studio extends Component {

  render() {
    return (
      this.props.user ?
        <div className="Studio">
          <SignOut firebase={this.props.firebase} user={this.props.user}/>
          <h1>The Studio</h1>
          <div className="instructions-container">
            <div className="instructions">
              <h4>Guidelines for Performances and Critique:</h4>
              <ul>
                <li>Content must be appropriate for all audiences.</li>
                <li>Only helpful critique is allowed. Avoid mean or discouraging remarks.</li>
                <li>Any users who do not follow these guidelines will be removed, along with their content.</li>
                <li>Report any violations by emailing critiquemyperformance@gmail.com</li>
              </ul>
            </div>
            <div className="instructions">
              <h4>To post your performance:</h4>
              <ul>
                <li>Create a YouTube Video or SOUNDCLOUD Track.</li>
                <li>Click the Share button at the bottom of the video or track.</li>
                <li>Select the "Embed" option.</li>
                <li>Copy and paste the iframe here:</li>
              </ul>
            </div>
          </div>
          < Performances firebase={this.props.firebase} activateIframe={this.props.activateIframe.bind(this)} activeIframe={this.props.activeIframe} user={this.props.user} applaudIframe={this.props.applaudIframe} applaudedIframe={this.props.applaudedIframe}/>
        </div> : null
    );
  }
}

export default Studio;
