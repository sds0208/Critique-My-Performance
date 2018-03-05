import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Iframe from 'react-iframe';

class Studio extends Component {
  render() {
    return (
      <div className="Studio">
        <div className="video-div">
          <Iframe url="https://www.youtube.com/embed/UN6_A_QyigU"
          width="560" height="315"
          position="static"
          className="video"
          allowfullscreen />
        </div>
        <div className="video-div">
          <Iframe url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/130628931&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          width="560" height="315"
          position="static"
          className="video" />
        </div>
      </div>
    );
  }
}

export default Studio;
