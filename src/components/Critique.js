import React, { Component } from 'react';

class Critique extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.critiquesRef = this.props.firebase.database().ref('critiques');

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




  render() {
    return(
      <div></div>
    );
  }
}

export default Critique;
