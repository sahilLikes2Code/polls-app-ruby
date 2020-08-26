import React, {Component} from 'react';
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {
        question: "",
        options_attributes: [
          {value: ''},
          {value: ''},
          {value: ''},
          {value: ''},
        ],
      },
      errors: null,
      message: null
    };
  }

  setQuestion = ({target: {name, value}}) => {
    this.setState({
      poll: {...this.state.poll, [name]: value},
    });
  };

  setOption = ({target: {name, value}}) => {
    //Fixme, name is being passed to pass index. Try to set a better way of achieving this
    this.setState({
      poll: {
        ...this.state.poll,
        options_attributes: this.state.poll.options_attributes.map((option, index) => {
          return index === Number(name) ? {value: value} : option
        })
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetchApi({
      url: Routes.polls_path(),
      method: "POST",
      body: {
        poll: this.state.poll,
      },
      onError: () => {
        this.setState({
          errors: ['Please enter a question with four options'],
          type: 'danger',
        });
      },
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        window.location.href = Routes.polls_path()
      },
    });
  };

  displayErrors() {

    const {errors} = this.state;
    const {type} = this.state;
    return (
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors} message={type}/>
          </div>
        )}
      </div>
    );
  }

  render() {
    console.log(this.state)
    const {message} = this.state;
    return (
      <div className="container">
        <h3 className="py-3">Create a poll</h3>
        {this.displayErrors()}
        {message ? (
          <div className="alert alert-success">{message}</div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  onChange={this.setQuestion}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="option1">Option 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="option1"
                  name="0"
                  onChange={this.setOption}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="option2">Option 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="option2"
                  name="1"
                  onChange={this.setOption}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="option3">Option 3</label>
                <input
                  type="text"
                  className="form-control"
                  id="option3"
                  name="2"
                  onChange={this.setOption}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="option4">Option 4</label>
                <input
                  type="text"
                  className="form-control"
                  id="option4"
                  name="3"
                  onChange={this.setOption}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-info">
              Create
            </button>
          </form>
        )}
      </div>
    );
  }
}


export default New;