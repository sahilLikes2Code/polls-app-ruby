import React from "react";
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";
import '../../../assets/stylesheets/application.css'

class New extends React.Component {
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
        this.setState({
          errors: ['Invalid credentials, Please try again'],
          type: 'danger',
        });
      },
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        window.location.href = Routes.root_path()
      },
    });
  };


  displayErrors() {

    const {errors} = this.state;
    const {type} = this.state;
    return (
      <div>
        {errors && (
          // <div className="mt-4">
          <Errors errors={errors} message={type}/>
          // </div>
        )}
      </div>
    );
  }


  render() {
    const {message} = this.state;
    const buttonStyle = {
      background: "none",
      border: 'none',
      textDecoration: 'underline'
    }
    return (
      <div className='bg-light-blue custom-height'>
        <div className='font-weight-bolder'>
          <h2 className="py-3 text-center">Sign In</h2>
          {this.displayErrors()}
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
            <form onSubmit={this.handleSubmit}>

              <div className='d-flex flex-column align-items-center mb-3'>
                <div className='w-50 mb-3'>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="w-50 mb-1">
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

              <div className='text-center'>
                <button type="submit"
                        className='text-crimson-red  bg-darkest-blue py-1 px-2'>
                  Sign In
                </button>
              </div>
            </form>
          )}
          <div className='mt-3 text-center'>Don't have an account? Sign up<button
              style={buttonStyle}
              className='hover-color-white pleft-5'
              onClick={() => window.location.href = Routes.signup_path()}>here
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default New;
