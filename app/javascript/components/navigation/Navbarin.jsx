import React from "react";
import * as Routes from "../../utils/Routes";

class Navbarin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div>
        <nav className="navbar  bg-darkest-blue">
          <a className="navbar-brand font-weight-bold hvr-itm-col-white"
             href={Routes.root_path()}>
            Pollz
          </a>
          <div>
            <a className="navbar-brand font-weight-bold hvr-itm-col-white"
               href={Routes.login_path()}>
              Login
            </a>
            <a className="navbar-brand font-weight-bold hvr-itm-col-white"
               href={Routes.signup_path()}>
              Signup
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbarin;


