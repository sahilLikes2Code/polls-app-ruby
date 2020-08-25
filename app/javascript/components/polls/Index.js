import React, {Component} from "react";
import Poll from "./Poll";

class Index extends Component {
  // this
  // props
  // this
  // props

  constructor(props) {
    super(props);

    this.state = {};
  }

  polls = () => {
    return this.props.polls.map(poll => <Poll key={poll.poll_id} props={poll}/>)
  }


  render() {
    return <div>
      {this.polls()}
    </div>;
  }
}

export default Index;
