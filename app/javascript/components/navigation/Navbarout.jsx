import React from 'react';
import * as Routes from "../../utils/Routes"
import {fetchApi} from '../../utils/API';

class Navbarout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = (e) => {
    e.preventDefault();
    let logout = confirm("Are you sure you want to logout?");
    if (logout) {
      fetchApi({
        url: Routes.logout_path(),
        method: 'DELETE',
        onError: response => {
        },
        onSuccess: response => {
        },
        successCallBack: () => {
          window.location.replace(Routes.login_path());
        }
      });
    }
  }

  render() {

    return (
      <div>
        <nav className="navbar bg-darkest-blue">
          <a className="navbar-brand font-weight-bold "
             href={Routes.root_path()}>
            Pollz
          </a>
          {/*<a className="navbar-brand font-weight-bold" href={Routes.create_polls_path()}>*/}
          {/*  Create a new poll*/}
          {/*</a>*/}
          <div className="nav justify-content-end">
            <a style={{pointerEvents: 'none'}}
               className="navbar-brand font-weight-bold text-light-blue">{this.props.username}
            </a>
            <a
              type="submit"
              className="navbar-brand font-weight-bold"
              onClick={this.handleLogout}>

              Logout
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbarout;
