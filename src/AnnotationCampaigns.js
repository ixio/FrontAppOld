import React, { Component } from 'react';

const fetched_annotation_campaigns = [
  { id: 1, name: 'SPM whale annotation', annotation_set: 1, datasets_count: 2, start: '2010-08-19', end: '2010-11-02', annotation_link: '#' },
]

class AnnotationCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotation_campaigns: []
    }
  }

  componentDidMount() {
    this.setState({
      annotation_campaigns: fetched_annotation_campaigns
    });
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
