import React, {Component} from 'react';
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";
import axios from 'axios'

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: {
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

    try{
      await this.setState({
        vote: {
          poll_id: Number(this.props.poll.poll_id),
          option_id: Number(e.target.value),
        }
      })

      await fetchApi({
        url: Routes.votes_path(),
        method: "POST",
        body: {
          vote: this.state.vote
        },
        onError: this.handleError,
        onSuccess: (response) => {
          this.setState({message: response.messages});
          setTimeout( async () => {
           await this.setState({message: null});
          }, 3000)
        },
      });
    }
    catch(error) {
      console.log(error)
    }

    this.props.fetchList()
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
    const {poll} = this.props
    const {message} = this.state;
    const currentUser = this.props.current_user
    const loggedIn = Boolean(currentUser)
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
    const ulStyle = {paddingInlineStart: 0}
    const liStyle = {listStyle: 'none'}
    const anchorStyle = {pointerEvents: 'none'}


    const renderOptions = () => {
      return (
        <ul style={ulStyle}>
          {poll.options.map(option => {
            if (loggedIn && voterIds.includes(currentUser.user_id)) {
              return (
                <li key={option.id} style={liStyle}>
                  <button style={optionsButtonStyle}
                          disabled>{option.value}</button>
                  <span>{option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}</span>

                </li>

              )
            } else if (loggedIn) {
              return (
                <li key={option.id} style={liStyle}>
                  <button value={option.id}
                          onClick={this.handleClick}
                          style={optionsButtonStyle}>{option.value}</button>
                  {/*<span style={{display: 'none'}}>{option.vote_count}</span>*/}
                  {/*{option.vote_count && <span>{option.vote_count}<span>}*/}
                </li>
              )
            } else {
              return (
                <li key={option.id} style={liStyle}>
                  <div style={optionsButtonStyle}><a className='font-weight-light text-light-blue' style={anchorStyle}>{option.value}</a></div>
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
        {/*display errors if any*/}
        {this.displayErrors()}

        {/*display each poll*/}
        <div>
          <h3 className='pb-2'>Question: {poll.question}</h3>
          {message ? (
            <div className="alert alert-success font-weight-light">{message}</div>
          ) : ("")}
          {renderOptions()}
        </div>
      </div>
    )
  }
}

export default Poll;