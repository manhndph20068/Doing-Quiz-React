import React from "react";

class UserInfor extends React.Component {
  state = {
    name: "Manh",
    address: "HN",
    age: 18,
  };

  handleOnChange = (event) => {
    // console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    alert("me");
  };

  render() {
    return (
      <div>
        my name is {this.state.name} and iam from{this.state.address}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.handleOnChange(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfor;
