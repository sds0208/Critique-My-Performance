import React, { Component } from 'react';

class Critique extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', critiques: [], activeIframeCritiques: [] };
    this.critiquesRef = this.props.firebase.database().ref('critiques');
    this.handleCritique = this.handleCritique.bind(this);
    this.pushCritique = this.pushCritique.bind(this);
    this.filterAndDisplayCritiques = this.filterAndDisplayCritiques.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIframe !== this.props.activeIframe) {
      this.filterAndDisplayCritiques( nextProps.activeIframe );
    }
  }

  //Users can add critique that will belong to the specific video it was added to.
  //Critique will be displayed below each video for that specific video when selected

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
    this.setState({ activeIframeCritiques: this.state.activeIframeCritiques.concat( c ), critiques: this.state.critiques.concat( c )});
  }

  filterAndDisplayCritiques(activeIframe) {
    this.setState({ activeIframeCritiques: this.state.critiques.filter(critique => critique.iframeID === activeIframe.key) });
  }

  render() {
    return(
      <div className="Critique">
        <form onSubmit={() => this.pushCritique()}>
          <input className="profile-input" type="text" value={this.state.content} onChange={this.handleCritique}></input>
          <button className="button" type="submit">Post</button>
        </form>
        <div>
        {this.state.activeIframeCritiques.map(critique =>
          <div className="critique-line" key={critique.key}><span className="bold">{critique.addedBy[0] || critique.addedBy[1]}:</span> {critique.content}    <span className="bold">  - on  {critique.timeAdded[0]} at {critique.timeAdded[1]}</span></div>
        )}
        </div>
      </div>
    );
  }
}

export default Critique;
