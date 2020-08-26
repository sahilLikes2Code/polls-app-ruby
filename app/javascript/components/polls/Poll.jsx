import React, {Component} from 'react';
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: {
        //need to get both poll id and option id from front end
        poll_id: 0,
        option_id: 0,
      },
      options: this.props.props.options,
      errors: null,
      message: null
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError(response) {
    this.setState({

      errors: {
        errors: response.messages,
        type: response.type,
      },
    });
    // window.location.href = Routes.polls_path();
  }


  handleClick = async (e) => {

    await this.setState({
      vote: {
        poll_id: Number(this.props.props.poll_id),
        option_id: Number(e.target.value),
      }
    })

    fetchApi({
      url: Routes.votes_path(),
      method: "POST",
      body: {
        vote: this.state.vote
      },
      onError: this.handleError,
      onSuccess: (response) => {
        this.setState({message: response.messages});
        setTimeout(function (){window.location.href = Routes.polls_path(); 1500})
      },
      // successCallBack: () => {
      //
      // },
    });
  }

  displayErrors() {

    const {errors} = this.state;
    return (
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors.errors} message={errors.type}/>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {message} = this.state;
    const {options} = this.state;
    const loggedIn = this.props.props.logged_in;
    const totalVotes = this.props.props.total_votes;
    const voterIds = this.props.props.voter_ids;
    const userId = this.props.props.user_id;
    const renderOptions = () => {
      return (
        <ul>
          {options.map(option => {
            if (loggedIn && voterIds.includes(userId) ) {
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <a style={{marginRight: '20px'}}>{option.value}</a>
                  <span>{option.vote_count} {option.vote_count == 1 ? 'vote' : 'votes'}</span>
                </li>
              )
            } else if (loggedIn) {
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <button value={option.id}
                          onClick={this.handleClick}
                          style={{marginRight: '20px'}}>{option.value}</button>
                </li>
              )
            } else {
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <a>{option.value}</a>
                </li>
              )
            }
          })}
        </ul>
      )
    }

    return (
      <div className="container">
        {this.displayErrors()}
        <div>
          <h1>{this.props.props.question}</h1>
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : ("")}
          {renderOptions()}
        </div>
      </div>
    )
  }
}

export default Poll;