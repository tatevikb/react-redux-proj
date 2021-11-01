import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ users, deleteUser }) => {
    return (
      <div className="container">
        <div className="row d-flex flex-column">
          <Link to="/add" className="btn btn-outline-primary my-5 ml-auto ">
            Add User
          </Link>
          <div className="col-md-10 mx-auto my-4">
            <table className="table table-hover">
              <thead className="table-header bg-dark text-white">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, id) => (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Link
                          to={`/edit/${user.id}`}
                          className="btn btn-sm btn-primary mr-1"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          className="btn btn-sm btn-danger" style={{marginLeft: "10px"}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th>No users found</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
    users: state,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    deleteUser: (id) => {
      dispatch({ type: "DELETE_USER", payload: id });
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);

  