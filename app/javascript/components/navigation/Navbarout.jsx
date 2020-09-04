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

      <nav
        className="navbar bg-darkest-blue font-weight-bold hvr-itm-col-white text-light-blue">
        <a className="navbar-brand"
           href={Routes.root_path()}>
          Pollz
        </a>

        <div className="nav justify-content-end">
          <a style={{pointerEvents: 'none'}}
             className="navbar-brand">{this.props.username}
          </a>
          <a
            type="submit"
            className="navbar-brand"
            onClick={this.handleLogout}>

            Logout
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbarout;
