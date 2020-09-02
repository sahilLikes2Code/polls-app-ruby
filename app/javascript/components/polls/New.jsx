import React, {Component} from 'react';
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import Errors from "../shared/Error";
import '../../../assets/stylesheets/application.css'

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
      errors: [],
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

  handleSubmit = async (event) => {

    event.preventDefault();

    await fetchApi({
      url: Routes.polls_path(),
      method: "POST",
      body: {
        poll: this.state.poll,
      },
      onError: () => {

        this.setState({
          errors: {
            errors: ['Please enter a question with four options'],
            type: 'danger',
          }
        });
      },
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        window.location.href = Routes.root_path()
      },
    });
  };

  displayErrors() {
    const {errors} = this.state;
    const {type} = this.state;
    return (
      <div>
        {errors.errors && (
          <Errors errors={errors.errors} message={errors.type}/>
        )}
      </div>
    );
  }

  render() {
    const {message} = this.state;
    return (
      <div className='bg-light-blue custom-height'>
        <div className="container text-center font-weight-bold">
          <h3 className="py-3">Create a poll</h3>
          {/*display errors if any*/}
          {this.displayErrors()}

          {/*display success message and user input form */}
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div className='d-flex flex-column align-items-center mb-3'>
                <div className='w-50 mb-3'>
                  <label htmlFor="question">Question</label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    name="question"
                    onChange={this.setQuestion}
                  />
                </div>
                <div className='w-50 mb-3'>
                  <label htmlFor="option1">Option 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option1"
                    name="0"
                    onChange={this.setOption}
                  />
                </div>
                <div className='w-50 mb-3'>
                  <label htmlFor="option2">Option 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option2"
                    name="1"
                    onChange={this.setOption}
                  />
                </div>
                <div className='w-50 mb-3'>
                  <label htmlFor="option3">Option 3</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option3"
                    name="2"
                    onChange={this.setOption}
                  />
                </div>
                <div className='w-50 mb-3'>
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
              <button type="submit"
                      className='text-crimson-red bg-darkest-blue'>
                Create
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}


export default New;