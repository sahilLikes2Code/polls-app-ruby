import React, {Component} from "react";
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: null,
        message: null
      }
    };
    this.handleError = this.handleError.bind(this);
  }


  handleChange = ({target: {name, value}}) => {
    this.setState({
      user: {...this.state.user, [name]: value},
    });
  };

  handleError(response) {
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetchApi({
      url: Routes.users_path(),
      method: "POST",
      body: {
        user: this.state.user,
      },
      onError: this.handleError,
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        window.location.href = Routes.polls_path();
      },
    });
  }

  displayErrors() {
    const {errors} = this.state;

    return (
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors.errors} message={errors.type}/>
          </div>
        )}
      </div>
    );
  }


  render() {
    const {message} = this.state;

    return (
      <div className="container">
        <h3 className="py-3">Sign Up</h3>
        {this.displayErrors()}
        {message ? (
          <div className="alert alert-success">{message}</div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="password_confirmation">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password_confirmation"
                  name="password_confirmation"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-info">
              Sign Up
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default New