import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//   state = {};

//   handleOnChangeName = (event) => {
//     // console.log(event);
//     this.setState({ name: event.target.value });
//   };

//   handleOnChangeAge = (event) => {
//     // console.log(event.target.value);
//     this.setState({ age: event.target.value });
//   };

//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 101) + "random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };

//   render() {
//     return (
//       <div>
//         my name is {this.state.name} and iam from{this.state.address}
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <input
//             type="text"
//             // value={this.state.name}
//             onChange={(event) => this.handleOnChangeName(event)}
//           />
//           <label>Age</label>
//           <input
//             type="number"
//             value={this.state.age}
//             onChange={(event) => this.handleOnChangeAge(event)}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setaddress] = useState("");

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 101) + "random",
      name: name,
      age: age,
    });
  };

  return (
    <div>
      my name is {name} and iam {age}
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <input
          type="text"
          // value={this.state.name}
          onChange={(event) => handleOnChangeName(event)}
        />
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(event) => handleOnChangeAge(event)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfor;
