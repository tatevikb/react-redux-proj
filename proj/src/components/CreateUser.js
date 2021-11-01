import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const CreateUser = ({ users, addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUserEmailExists = users.filter((user) =>
      user.email === email ? user : null
    );
    const checkUserPhoneExists = users.filter((user) =>
      user.phone === phone ? user : null
    );

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!");
    }
    if (checkUserEmailExists.length > 0) {
      return toast.error("This email already exists!");
    }
    if (checkUserPhoneExists.length > 0) {
      return toast.error("This phone number already exists!");
    }

    const data = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
      email,
      name,
      phone,
    };

    addUser(data);
    toast.success("User added successfully!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add User</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between my-2">
              <input
                className="btn btn-block btn-primary"
                type="submit"
                value="Add User"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state,
});
const mapDispatchToProps = (dispatch) => ({
  addUser: (data) => {
    dispatch({ type: "ADD_USER", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);