import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfo";

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfor />
        <br></br>
        <DisplayInfor name="pp" />
      </div>
    );
  }
}

export default MyComponent;
