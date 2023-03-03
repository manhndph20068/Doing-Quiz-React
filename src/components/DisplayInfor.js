import React from "react";

class DisplayInfor extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <div>My name`s {name}</div>
        <div>My age`s 18</div>
      </div>
    );
  }
}

export default DisplayInfor;
