import React, { Component } from 'react';
import '../styles/Applause.css';

class Applause extends Component {
  constructor(props) {
    super(props);
    this.state = { applauses: [] };
    this.applauseRef = this.props.firebase.database().ref('applause');
    this.pushApplause = this.pushApplause.bind(this);
    this.getApplauseCounts = this.getApplauseCounts.bind(this);
  }

  componentDidMount() {
    this.applauseRef.on('child_added', snapshot => {
      const applause = snapshot.val();
      applause.key = snapshot.key;
      let applauses = this.state.applauses;
      applauses.push(applause);
      this.setState({ applauses: applauses });
    });
  }

  pushApplause() {
    if (this.props.user.uid !== this.props.activeIframe.userUID) {
      let a = {
        applause: 1,
        iframeID: this.props.activeIframe.key,
        addedBy: [this.props.user.displayName, this.props.user.email, this.props.user.uid]
      }
      this.applauseRef.push(a);
    } else {
      alert("Sorry, you can't applaud your own performance.");
    }
  }

  getApplauseCounts(iframe) {
    let counter = 0;
    this.state.applauses.forEach(applause => applause.iframeID === iframe.key ? counter++ : counter);
    return counter;
  }

  render() {
    return (
      <div className="Applause">
        <div onClick={() => this.pushApplause()} ><img className="Applause" src="/assets/clapping-hands.png"></img></div>
        <div className="applause-count">Applause Count: {this.getApplauseCounts(this.props.activeIframe)}</div>
      </div>
    );
  }
}

export default Applause;
