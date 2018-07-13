import React, { Component } from 'react';
import request from 'superagent';

import { Link } from 'react-router-dom';

class AnnotationTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    let annotation_campaign_id = this.props.match.params.annotation_campaign_id;
    request.get(process.env.REACT_APP_API_URL + '/front_manager/annotation_tasks/' + annotation_campaign_id).then(req => {
      this.setState({
        tasks: req.body,
      });
    })
  }

  render() {
    const tasks = this.state.tasks.map(task => {
      let status;
      switch (task.status) {
        case -1:
          status = "Unprocessed";
          break;
        case 0:
          status = "Started";
          break;
        case 1:
          status = "Finished";
          break;
      }

      return (
        <tr key={task.id}>
          <td>{task.filename}</td>
          <td>{status}</td>
          <td><Link to={task.link}>link</Link></td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="col-sm-12 text-center">
          <h1>Annotation tasks</h1>
          <table className="table table-bordered">
            <thead>
              <tr><th>Filename</th><th>Status</th><th>Annotation Link</th></tr>
            </thead>
            <tbody>
              {tasks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AnnotationTasks;
