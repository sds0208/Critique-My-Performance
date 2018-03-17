import React, { Component } from 'react';

class Critique extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', timeAdded: [], addedBy: '', critiques: [] };
    this.critiquesRef = this.props.firebase.database().ref('critiques');
    this.handleCritique = this.handleCritique.bind(this);
    this.pushCritique = this.pushCritique.bind(this);
  }

  componentDidMount() {
    this.critiquesRef.on('child_added', snapshot => {
      const critique = snapshot.val();
      critique.key = snapshot.key;
      this.setState({ critiques: this.state.critiques.concat( critique ) });
    });
  }

  //Users can add critique that will belong to the specific video it was added to.
  //Critique will be displayed below each video for that specific video.

  handleCritique(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  pushCritique(content) {
    console.log(this.state.content);
    const date = new Date();
    this.critiquesRef.push({
      content: content,
      timeAdded: [date.toLocaleDateString(), date.toLocaleTimeString()],
      iframeID: this.props.activeIframe.key,
      addedBy: this.props.user
    });
  }

  render() {
    return(
      <div className="Critique">
        <form onSubmit={() => this.pushCritique(this.state.content)}>
          <input className="profile-input" type="text" value={this.state.content} onChange={this.handleCritique}></input>
          <button className="button" type="submit">Critique</button>
        </form>
        <p>Critique will go here.</p>
      </div>
    );
  }
}

export default Critique;
