import React, {Component} from "react";
import Poll from "./Poll";

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  polls = () => {
    return this.props.polls.map(poll => <Poll key={poll.poll_id} props={poll}/>)
  }


  render() {
    return <div>
      <h3 className="py-3">Vote here</h3>
      {this.polls()}
    </div>;
  }
}

export default Index;
