import React, {Component} from "react";
import Poll from "./Poll";
import '../../../assets/stylesheets/application.css'
import * as Routes from "../../utils/Routes"
import ballotBoxImage
  from '../../../assets/images/pexels-element-digital-1550337.jpg'
import axios from "axios";

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }


  // componentDidMount() {
  //
  // }
  //
  //
  // fetchList = async () => {
  //   try {
  //     console.log('in fetch list')
  //     const response = await axios.get('/polls');
  //     console.log('response',response)
  //     // this.setState({
  //     //   ...this.state, arrayOfUrls: response.data.urls
  //     // })
  //   } catch (error) {
  //     // this.setState({
  //     //
  //     //   ...this.state, errors: response.data.urls
  //     // })
  //     console.error(error);
  //   }
  // }

  polls = () => {
    return this.props.polls.map(poll => <Poll key={poll.poll_id}
                                              poll={poll}
                                              current_user={this.props.current_user}
                                              fetchList={this.fetchList} />)
  }


  render() {
    console.log('propzz', this.props)

    const listOfPolls = this.props.polls
    const currentUser = this.props.current_user

    return <div className='wrapper pt-5'>

      {/*when no polls exist*/}
      {(listOfPolls.length == 0) &&
      <div className='text-center'>
        <img  style={{width: '55%', marginTop: '20px'}} src={ballotBoxImage}/>
        <h3 className="py-3 text-crimson-red
olor: var(--crimson-red text-center">No polls published yet</h3>
      </div>}
      {/**/}
      {(currentUser == undefined) &&
      <h4 className='text-center text-crimson-red'>Login or signup to create/vote in a poll</h4>}
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
    </div>;
  }
}

export default Index;
