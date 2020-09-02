import React, {Component} from "react";
import Poll from "./Poll";
import '../../../assets/stylesheets/application.css'
import * as Routes from "../../utils/Routes"
import ballotBoxImage
  from '../../../assets/images/pexels-element-digital-1550337.jpg'

import axios from 'axios'

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      props: this.props
    })
  }

  fetchList = async () => {
    // console.log('in fetch list function')
    try {
      var response = await axios.get('/polls.json')
      console.log('response', response)
      await this.setState({
        // props: 1
        props: response.data
      })
    } catch {
      console.error('error');
    }
    console.log('state in fetch list', this.state)
  }


  polls = () => {
    return this.state.props && this.state.props.polls.map(poll => <Poll
      key={poll.poll_id}
      poll={poll}
      current_user={this.state.props.current_user}
      fetchList={this.fetchList}
    />)
  }


  render() {
    // console.log('propzz', this.props)
    // console.log('state', this.state)

    const listOfPolls = this.props.polls
    const currentUser = this.props.current_user

    return <div className='wrapper pt-5'>

      {/*when no polls exist*/}
      {(listOfPolls.length == 0) &&
      <div className='text-center'>
        <img style={{width: '55%', marginTop: '20px'}} src={ballotBoxImage}/>
        <h3 className="py-3 text-crimson-red
olor: var(--crimson-red text-center">No polls published yet</h3>
      </div>}
      {/**/}
      {(currentUser == undefined) &&
      <h4 className='text-center text-crimson-red'>Login or signup to
        create/vote in a poll</h4>}
      {/*Display polls*/}

      {(currentUser) &&
      <div className='text-center'>
        <a className="navbar-brand font-weight-bold text-crimson-red "
           href={Routes.create_polls_path()}>
          <h2> Create a new poll</h2>
        </a>
      </div>
      }
      {/*Display polls*/}
      <div className='pt-3'>{this.polls()}</div>

      {/*  test button */}
      {/*<button onClick={this.fetchList}>fetch state filling props</button>*/}
    </div>;
  }
}

export default Index;
