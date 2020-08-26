import React from "react";
import * as Routes from "../../utils/Routes";

class Navbarin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-dark bg-info">
          <a className="navbar-brand" href={Routes.polls_path()}>
            Pollz
          </a>
          <a className="navbar-brand" href={Routes.create_polls_path()}>
            Create a new poll
          </a>
          <div>
            <a className="navbar-brand" href={Routes.login_path()}>
              Login
            </a>
            <a className="navbar-brand" href={Routes.signup_path()}>
              Signup
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbarin;


