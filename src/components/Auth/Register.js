import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    let data = await postRegister(email, username, password);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Dont have any account yet ?
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </button>
      </div>
      <div className="title col-4 mx-auto">Register</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group ">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group ">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group ">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span> forgot paasword</span>
        <div>
          <button onClick={() => handleRegister()}>Register</button>
        </div>
        <div className="back">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            Go to homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
