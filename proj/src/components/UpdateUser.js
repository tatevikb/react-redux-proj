import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateUser = ({ users, updateUser}) => {
  const { id } = useParams();
  const history = useHistory();
  const currentUser = users.find(
    (user) => user.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPhone(currentUser.phone);
  }, [currentUser]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUserEmailExists = users.filter((user) =>
      user.email === email && user.id !== currentUser.id
        ? user
        : null
    );
    const checkUserPhoneExists = users.filter((user) =>
      user.phone === phone && user.id !== currentUser.id
        ? user
        : null
    );

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkUserEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkUserPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentUser.id,
      email,
      name,
      phone,
    };

    updateUser(data);
    toast.success("User updated successfully!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-green ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentUser ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No User Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => {
    dispatch({ type: "UPDATE_USER", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);