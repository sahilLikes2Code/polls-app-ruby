import React from "react";
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      errors: null,
      message: null
    };
  }


  handleChange = ({target: {name, value}}) => {
    this.setState({
      user: {...this.state.user, [name]: value},
    });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    fetchApi({
      url: Routes.create_session_path(),
      method: "POST",
      body: {
        login: this.state.user,
      },
      onError: () => {
        this.setState({errors: ['Invalid credentials, Please try again'], type: 'danger',});
        setTimeout(function (){window.location.href = Routes.login_path();}, 2000)
      },
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        window.location.href = Routes.polls_path();
      },
    });
  };


  displayErrors() {

    const {errors} = this.state;
    const {type} = this.state;
    return (
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors} message={type}/>
          </div>
        )}
      </div>
    );
  }


  render() {
    const {message} = this.state;
    return (
      <div className="container">
        <h3 className="py-3">Sign In</h3>
        {this.displayErrors()}
        {message ? (
          <div className="alert alert-success">{message}</div>
        ) : (
          <form onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        )}
      </div>
    );
  }
}


export default Login;
