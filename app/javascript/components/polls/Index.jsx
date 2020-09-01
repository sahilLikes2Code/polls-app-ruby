import React, {Component} from "react";
import Poll from "./Poll";
import '../../../assets/stylesheets/application.css'
import * as Routes from "../../utils/Routes"
import ballotBoxImage
  from '../../../assets/images/pexels-element-digital-1550337.jpg'

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  polls = () => {
    return this.props.polls.map(poll => <Poll key={poll.poll_id}
                                              poll={poll}
                                              current_user={this.props.current_user}/>)
  }


  render() {
    console.log('propzz', this.props)

    const listOfPolls = this.props.polls
    const currentUser = this.props.current_user

    return <div>

      {/*when no polls exist*/}
      {(listOfPolls.length == 0) &&
      <div>
        <img style={{width: '55%', marginTop: '20px'}} src={ballotBoxImage}/>
        <h3 className="py-3 text-crimson-red
olor: var(--crimson-red text-center">No polls published yet</h3>
      </div>}
      {/**/}
      {(currentUser == undefined) &&
      <h4>Login or signup to create/vote in a poll</h4>}
      {/*Display polls*/}

      {(currentUser) &&
      <a className="navbar-brand font-weight-bold text-crimson-red"
         href={Routes.create_polls_path()}>
        Create a new poll
      </a>
      }
      {/*Display polls*/}
      <div className='pt-3'>{this.polls()}</div>
    </div>;
  }
}

export default Index;
