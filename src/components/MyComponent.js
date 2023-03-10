import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfo";

// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
//       {
//         id: 1,
//         name: "John",
//         age: 21,
//       },
//       {
//         id: 2,
//         name: "manh",
//         age: 46,
//       },
//       {
//         id: 3,
//         name: "devb",
//         age: 94,
//       },
//     ],
//   };

//   handleAddNewUser = (userObj) => {
//     console.log(userObj);
//     this.setState({ listUsers: [userObj, ...this.state.listUsers] });
//   };

//   handleRemoveUser = (userId) => {
//     let listUserClone = this.state.listUsers;
//     listUserClone = listUserClone.filter((item) => item.id !== userId);

//     this.setState({ listUsers: listUserClone });
//   };

//   render() {
//     return (
//       <>
//         <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//         <br></br>
//         <DisplayInfor
//           listUsers={this.state.listUsers}
//           handleRemoveUser={this.handleRemoveUser}
//         />
//       </>
//     );
//   }
// }

const MyComponent = () => {
  const [listUsers, setListUsers] = useState([
    {
      id: 1,
      name: "John",
      age: 21,
    },
    {
      id: 2,
      name: "manh",
      age: 46,
    },
    {
      id: 3,
      name: "devb",
      age: 94,
    },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };

  const handleRemoveUser = (userId) => {
    let listUserClone = listUsers;
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    setListUsers(listUserClone);
  };

  return (
    <>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <br></br>
      <DisplayInfor listUsers={listUsers} handleRemoveUser={handleRemoveUser} />
    </>
  );
};

export default MyComponent;
