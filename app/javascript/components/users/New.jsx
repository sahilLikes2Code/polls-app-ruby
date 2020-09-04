import React, {Component} from "react";
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";
import '../../../assets/stylesheets/application.css'


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
        this.setState({message: response.messages, errors: null});
      },
      successCallBack: () => {
        window.location.href = Routes.root_path();
      },
    });
  }


  displayErrors() {
    const {errors} = this.state;

    return (
      <div>
        {errors && (
          <Errors errors={errors.errors} message={errors.type}/>
        )}
      </div>
    );
  }


  render() {
    const {message} = this.state;

    return (
        <div className="container font-weight-bolder">
          <h3 className="py-3 text-center">Sign Up</h3>
          {/*display errors if any*/}
          {this.displayErrors()}
          {/*display success message and user input form*/}
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div className='d-flex flex-column align-items-center mb-3'>
                <div className='w-50 mb-3' style={{margin: '0 auto'}}>
                  <label htmlFor="name">Userame</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                <div className='w-50 mb-3' style={{margin: '0 auto'}}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className='w-50 mb-3' style={{margin: '0 auto'}}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className='w-50 mb-3' style={{margin: '0 auto'}}>
                  <label htmlFor="password_confirmation"> Password
                    Confirmation</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='text-center'>
                <button type="submit"
                        className='text-crimson-red bg-darkest-blue py-1 px-2'>
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
    );
  }
}

export default New