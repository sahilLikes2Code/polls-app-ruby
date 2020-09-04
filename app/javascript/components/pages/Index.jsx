import React, {Component} from "react";
import Poll from "../polls/Poll";
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
    try {
      const response = await axios.get(Routes.polls_path_json());
      await this.setState({
        props: response.data
      })
    } catch {
      console.error('error');
    }
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
    const listOfPolls = this.props.polls
    const currentUser = this.props.current_user
    const imageStyle = {width: '55%', marginTop: '20px'}

    return (
        <div className='text-center wrapper font-weight-bold text-crimson-red '>
          <div className='pt-5'>
            {/*display this if no polls exist*/}
            {(listOfPolls.length === 0) &&
            <div>
              <img style={imageStyle} src={ballotBoxImage}
                   alt='ballot-box'/>
              <h3 className="py-3 ">No polls published yet</h3>
            </div>}

            {/*display this if user not logged in*/}
            {(currentUser === undefined) &&
            <h4 className=''>Login or signup to
              create/vote in a poll</h4>}

            {/*display prompt to create poll if user logged in*/}
            {(currentUser) &&
            <div>
              <a className="navbar-brand text-crimson-red hover-color-white"
                 href={Routes.create_polls_path()}>
                <h2> Create a new poll</h2>
              </a>
            </div>
            }

            {/*display polls*/}
            <div
              className='pt-3 text-left font-weight-bolder text-darkest-blue'>{this.polls()}</div>
          </div>
        </div>
    )
  }
}

export default Index;
