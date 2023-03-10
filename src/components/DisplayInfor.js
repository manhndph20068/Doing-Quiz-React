import React, { useEffect } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
import { useState } from "react";

// class DisplayInfor extends React.Component {
//   render() {
//     const { listUsers } = this.props;

//     return (
//       <div className="display-infor-container">
//         {true && (
//           <>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={user.age > 50 ? "green" : "red"}>
//                   <div>My name`s {user.name}</div>
//                   <div>My age`s {user.age}</div>
//                   <div>My id`s {user.id}</div>
//                   <button
//                     onClick={() => {
//                       this.props.handleRemoveUser(user.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <hr></hr>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUsers } = props;

  const [isShowHideListUser, setShowListUser] = useState(true);

  const handlShowHideListUser = () => {
    setShowListUser(!isShowHideListUser);
  };

  useEffect(() => {
    if (listUsers.length === 0) {
      alert("your list user have been deleted all");
    }
    console.log("effect");
  }, [listUsers]);

  return (
    <div className="display-infor-container">
      <div>
        <span
          onClick={() => {
            handlShowHideListUser();
          }}
        >
          {isShowHideListUser ? "Hide list user" : "Show list user"}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={user.age > 50 ? "green" : "red"}>
                <div>My name`s {user.name}</div>
                <div>My age`s {user.age}</div>
                <div>My id`s {user.id}</div>
                <button
                  onClick={() => {
                    props.handleRemoveUser(user.id);
                  }}
                >
                  Delete
                </button>
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfor;
