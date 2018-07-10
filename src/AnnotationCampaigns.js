import React, { Component } from 'react';
import request from 'superagent';

class AnnotationCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation_campaigns: []
    }
  }

  componentDidMount() {
    request.get(process.env.REACT_APP_API_URL + '/front_manager/annotation_campaigns').then(req => {
      this.setState({
        annotation_campaigns: req.body
      });
    })
  }

  render() {
    const annotation_campaigns = this.state.annotation_campaigns.map(annotation_campaign => {
      return (
        <tr key={annotation_campaign.id}>
          <td><a href="#">{annotation_campaign.name}</a></td>
          <td>Set n°{annotation_campaign.annotation_set}</td>
          <td>{annotation_campaign.datasets_count}</td>
          <td>{new Date(annotation_campaign.start).toDateString()}</td>
          <td>{new Date(annotation_campaign.end).toDateString()}</td>
          <td><a href={annotation_campaign.annotation_link}>link</a></td></tr>
      );
    });

    return (
      <div className="col-sm-9 border rounded">
        <h1>Annotation Campaigns</h1>
        <table className="table table-bordered">
          <thead>
            <tr><th>Name</th><th>Annotation Set</th><th>Number of datasets</th><th>Start Date</th><th>End Date</th><th>Annotation Link</th></tr>
          </thead>
          <tbody>
          {annotation_campaigns}
          </tbody>
        </table>
        <p><button className="btn btn-primary">New annotation campaign</button></p>
      </div>
    )
  }
}

export default AnnotationCampaigns;
