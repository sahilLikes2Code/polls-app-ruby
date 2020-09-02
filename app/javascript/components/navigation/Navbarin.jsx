import React from "react";
import * as Routes from "../../utils/Routes";

class Navbarin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <nav
        className="navbar  bg-darkest-blue hvr-itm-col-white font-weight-bold">
        <a className="navbar-brand  "
           href={Routes.root_path()}>
          Pollz
        </a>
        <div>
          <a className="navbar-brand  "
             href={Routes.login_path()}>
            Login
          </a>
          <a className="navbar-brand  "
             href={Routes.signup_path()}>
            Signup
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbarin;


