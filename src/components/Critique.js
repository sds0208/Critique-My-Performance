import React, { Component } from 'react';

class Critique extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', critiques: [], activeIframeCritiques: [] };
    this.critiquesRef = this.props.firebase.database().ref('critiques');
    this.handleCritique = this.handleCritique.bind(this);
    this.pushCritique = this.pushCritique.bind(this);
    this.getIframeCritiques = this.getIframeCritiques.bind(this);
  }

  componentDidMount() {
    this.critiquesRef.on('child_added', snapshot => {
      const critique = snapshot.val();
      critique.key = snapshot.key;
      let critiques = this.state.critiques;
      critiques.push(critique);
      this.setState({ critiques: critiques });
    });
  }

  handleCritique(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
    console.log(this.state.content);
  }

  pushCritique() {
    console.log(this.state.content);
    const date = new Date();
    let c = {
      content: this.state.content,
      timeAdded: [date.toLocaleDateString(), date.toLocaleTimeString()],
      iframeID: this.props.activeIframe.key,
      addedBy: [this.props.user.displayName, this.props.user.email, this.props.user.uid]
    }
    this.critiquesRef.push(c);
  }

  getIframeCritiques(iframe) {
    let critiqueArray = [];
    this.state.critiques.forEach(critique => critique.iframeID === iframe.key ? critiqueArray.push(critique) : critiqueArray);
    return critiqueArray;
  }

  render() {
    return(
      <div className="Critique">
        <form onSubmit={() => this.pushCritique()}>
          <input className="profile-input" type="text" value={this.state.content} onChange={this.handleCritique}></input>
          <button className="button" type="submit">Post</button>
        </form>
        <div>
        {this.getIframeCritiques(this.props.activeIframe).map(critique =>
          <div className="critique-line" key={critique.key}><span className="bold">{critique.addedBy[0] || critique.addedBy[1]}:</span> {critique.content}    <span className="bold">  - on  {critique.timeAdded[0]} at {critique.timeAdded[1]}</span></div>
        )}
        </div>
      </div>
    );
  }
}

export default Critique;
