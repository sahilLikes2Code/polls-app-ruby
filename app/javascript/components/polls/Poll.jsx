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
      },
      // successCallBack: () => {
      //   window.location.href = Routes.home_path();
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
    return (
      <div className="container">
        <h3 className="py-3">Vote here</h3>
        {this.displayErrors()}
        {message ? (
          <div className="alert alert-success">{message}</div>
        ) : (
          <div>
            <h1>{this.props.props.question}</h1>
            <ul>
              {this.props.props.options.map(option => {
                return <li key={option.id}
                >
                  <button value={option.id} onClick={this.handleClick} >{option.value}</button>
                </li>
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Poll;