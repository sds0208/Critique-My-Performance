import React, { Component } from 'react';

class Critique extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', timeAdded: [], addedBy: '' };
    this.handleCritique = this.handleCritique.bind(this);
    this.postCritique = this.postCritique.bind(this);
  }

  //Users will add critique that will belong to the specific video it was added to.
  //Critique will be displayed below each video for that specific video.

  handleCritique(event) {
    event.preventDefault();
    this.setState({ critique: event.target.value });
  }

  postCritique() {
    this.props.pushCritique(this.state.content);
  }

  render() {
    return(
      <div className="Critique">
        <form onSubmit={() => this.postCritique()}>
          <input className="profile-input" type="text" value={this.state.content} onChange={this.handleCritique}></input>
          <button className="button" type="submit">Critique</button>
        </form>
        <p>Critique will go here.</p>
      </div>
    );
  }
}

export default Critique;
