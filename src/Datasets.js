import React, { Component } from 'react';

const fetched_datasets = [
  { name: 'SPMAuralA2010', type: 'PAM', files_type: '.wav', files_count: 1807, start_date: '2010-08-19', end_date: '2010-11-02' },
  { name: 'SPMAuralB2010', type: 'PAM', files_type: '.wav', files_count: 1807, start_date: '2010-08-19', end_date: '2010-11-02' },
  { name: 'SPM-ECMWF', type: 'Meteo', files_type: '.nc', files_count: 1, start_date: '2010-08-01', end_date: '2010-09-01' },
]

class Datasets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: []
    }
  }

  componentDidMount() {
    this.setState({
      datasets: fetched_datasets
    });
  }

  render() {
    const datasets = this.state.datasets.map(dataset => {
      return (
        <tr>
          <td>{dataset.name}</td>
          <td>{dataset.type}</td>
          <td>{dataset.files_type}</td>
          <td>{dataset.files_count}</td>
          <td>{dataset.start_date}</td>
          <td>{dataset.end_date}</td></tr>
      );
    });

    return (
      <div className="col-sm-9 border rounded">
        <h1>Datasets</h1>
        <table className="table table-bordered">
          <thead>
            <tr><th>Name</th><th>Type</th><th>File type</th><th>Number of files</th><th>Start Date</th><th>End Date</th></tr>
          </thead>
          <tbody>
            {datasets}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Datasets;
