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
      options: this.props.poll.options,
      errors: null,
      message: null,
      myVotedOption: null
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
  }


  handleClick = async (e) => {
    await this.setState({
      vote: {
        poll_id: Number(this.props.poll.poll_id),
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
      },
    });
    window.location.href = Routes.polls_path()
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
    console.log('poll propz', this.props)
    const currentUser = this.props.current_user
    const {message} = this.state;
    const loggedIn = Boolean(currentUser);
    const {poll} = this.props
    const voterIds = poll.voter_ids

    const optionsButtonStyle = {
      border: '2px solid #98C0D9',
      width: "200px",
      marginBottom: '15px',
      marginRight: '20px',
      background: '#293241',
      color: '#98C0D9',
      padding: '10px',
      textAlign: 'center'
    }

    const optionsStyle = {}
    const renderOptions = () => {
      return (
        <ul style={{paddingInlineStart: 0}}>
          {poll.options.map(option => {
            if (loggedIn && voterIds.includes(currentUser.user_id)) {
              console.log('voted')
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <button style={optionsButtonStyle}
                          disabled>{option.value}</button>
                  <span
                    className='font-weight-bolder'>{option.vote_count} {option.vote_count == 1 ? 'vote' : 'votes'}</span>

                </li>

              )
            } else if (loggedIn) {
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <button value={option.id}
                          onClick={this.handleClick}
                          style={optionsButtonStyle}>{option.value}</button>
                  <span style={{display: 'none'}}>{option.vote_count}</span>
                  {/*{option.vote_count && <span>{option.vote_count}<span>}*/}
                </li>
              )
            } else {
              return (
                <li key={option.id} style={{listStyle: 'none'}}>
                  <div style={optionsButtonStyle}><a>{option.value}</a></div>

                </li>
              )
            }
          })}
          {loggedIn &&
          <h3 className='pb-3'>Vote status: <span className='text-crimson-red'>
            {loggedIn && voterIds.includes(currentUser.user_id) ? "Already voted" : loggedIn ? "Yet to vote" : ""}
          </span>
          </h3>}
        </ul>
      )
    }

    return (
      <div className='text-dark-blue'>
        {this.displayErrors()}

        {/*Display each poll*/}
        <div>
          <h3 className='pb-2'>Question: {poll.question}</h3>
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : ("")}
          {renderOptions()}
          {/*{currentUser && currentUser.my_vote && <div className='text-left'>*/}
          {/*  <h4 className='text-left'>Already voted</h4>*/}
          {/*  <span>My vote: {currentUser.my_vote}</span>*/}
          {/*</div>}*/}
        </div>
      </div>
    )
  }
}

export default Poll;