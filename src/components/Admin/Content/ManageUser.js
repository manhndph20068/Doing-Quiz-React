import ModalCreateUser from "./ModalCreateUser";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="user-container">
        <div>
          <button> Add new User</button>
        </div>
        <div>
          Table user
          <ModalCreateUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
