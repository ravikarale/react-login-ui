import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <React.Fragment>
          <h5>Hello {this.props.userDetails.first_name} {this.props.userDetails.last_name}</h5>
        </React.Fragment>
      </>
    );
  }
}
export default Dashboard;
