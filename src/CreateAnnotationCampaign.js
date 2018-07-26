// @flow

import React, { Component } from 'react';
import request from 'superagent';
import * as utils from './utils';

type datasets_type = {
  [?number]: {
    id: number,
    name: string
  }
};

type annotation_sets_type = {
  [?number]: {
    id: number,
    tags: {
      annotationTag: Array<string>
    }
  }
};

type AddDatasetsProps = {
  chosen_datasets: datasets_type,
  dataset_options: datasets_type,
  onDelClick: (dataset_id: number) => void,
  onSelectChange: (event: SyntheticEvent<HTMLInputElement>) => void
};

class AddDatasets extends Component<AddDatasetsProps> {
  render() {
    let chosen_datasets = utils.objectValues(this.props.chosen_datasets).map(dataset => {
      return(
        <div className="col-sm-3 border rounded" key={dataset.id}>
          {dataset.name} <button className="btn btn-danger" onClick={() => this.props.onDelClick(dataset.id)}>x</button>
        </div>
      )
    });

    let select_dataset;
    if (Object.keys(this.props.dataset_options).length > 0) {
      let dataset_options = utils.objectValues(this.props.dataset_options).map(dataset => {
        return (
          <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
        );
      });
      select_dataset = (
        <div className="col-sm-3">
          <select value='placeholder' className="form-control" onChange={this.props.onSelectChange}>
            <option value='placeholder' disabled>Select a dataset</option>
            {dataset_options}
          </select>
        </div>
      )
    }

    return (
      <div className="form-group row">
        {chosen_datasets}
        {select_dataset}
      </div>
    )
  }
}

type ShowAnnotationSetProps = {
  annotation_sets: annotation_sets_type,
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void
};

type ShowAnnotationSetState = {
  selected: number,
  tags: Array<string>
};

class ShowAnnotationSet extends Component<ShowAnnotationSetProps, ShowAnnotationSetState> {
  state = {
    selected: 0,
    tags: []
  }

  handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
    let id = parseInt(event.currentTarget.value, 10);
    this.setState({
      selected: id,
      tags: this.props.annotation_sets[id].tags.annotationTag
    });
    this.props.onChange(event);
  }

  render() {
    let options = Object.keys(this.props.annotation_sets).map(id => {
      return (
        <option key={id} value={id}>Annotation Set n°{id}</option>
      );
    });

    return (
      <div className="form-group">
        <div className="col-sm-4 offset-sm-4">
          <select value={this.state.selected} className="form-control" onChange={this.handleOnChange}>
            <option value={0} disabled>Select an annotation set</option>
            {options}
          </select>
        </div>
        <div className="col-sm-12 border rounded">
          {this.state.tags.join(', ')}
        </div>
      </div>
    )
  }
}

type Props = {
  history: {
    push: (url: string) => void
  }
};

type State = {
  new_ac_name: string,
  new_ac_desc: string,
  new_ac_datasets: datasets_type,
  new_ac_start: string,
  new_ac_end: string,
  new_ac_annotation_set: number,
  dataset_choices: datasets_type,
  annotation_set_choices: annotation_sets_type
};

class CreateAnnotationCampaign extends Component<Props, State> {
  state = {
    new_ac_name: '',
    new_ac_desc: '',
    new_ac_datasets: {},
    new_ac_start: '',
    new_ac_end: '',
    new_ac_annotation_set: 0,
    dataset_choices: {},
    annotation_set_choices: {}
  }

  handleNameChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({new_ac_name: event.currentTarget.value});
  }

  handleDescChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({new_ac_desc: event.currentTarget.value});
  }

  handleAddDataset = (event: SyntheticEvent<HTMLInputElement>) => {
    let dataset_id = parseInt(event.currentTarget.value, 10);
    let dataset_choices = Object.assign({}, this.state.dataset_choices);
    let new_ac_datasets = Object.assign({}, this.state.new_ac_datasets);
    new_ac_datasets[dataset_id] = dataset_choices[dataset_id];
    delete dataset_choices[dataset_id];
    this.setState({
      new_ac_datasets: new_ac_datasets,
      dataset_choices: dataset_choices
    });
  }

  handleRemoveDataset = (dataset_id: number) => {
    let dataset_choices = Object.assign({}, this.state.dataset_choices);
    let new_ac_datasets = Object.assign({}, this.state.new_ac_datasets);
    dataset_choices[dataset_id] = new_ac_datasets[dataset_id];
    delete new_ac_datasets[dataset_id];
    this.setState({
      new_ac_datasets: new_ac_datasets,
      dataset_choices: dataset_choices
    });
  }

  handleStartChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({new_ac_start: event.currentTarget.value});
  }

  handleEndChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({new_ac_end: event.currentTarget.value});
  }

  handleAnnotationSetChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({new_ac_annotation_set: parseInt(event.currentTarget.value, 10)});
  }

  handleSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    let res = {
      name: this.state.new_ac_name,
      desc: this.state.new_ac_desc,
      datasets: Object.keys(this.state.new_ac_datasets),
      start: this.state.new_ac_start,
      end: this.state.new_ac_end,
      annotation_set: this.state.new_ac_annotation_set,
    };
    if (!process.env.REACT_APP_API_URL) throw new Error('REACT_APP_API_URL missing in env');
    request.post(process.env.REACT_APP_API_URL + '/front_manager/create_annotation_campaign')
    .send(res)
    .then(() => {
      this.props.history.push('/annotation_campaigns')
    }).catch(error => { alert(error) });
    event.preventDefault();
  }

  componentDidMount() {
    if (!process.env.REACT_APP_API_URL) throw new Error('REACT_APP_API_URL missing in env');
    request.get(process.env.REACT_APP_API_URL + '/front_manager/create_annotation_campaign').then(req => {
      this.setState({
        dataset_choices: utils.arrayToObject(req.body.datasets, 'id'),
        annotation_set_choices: utils.arrayToObject(req.body.annotation_sets, 'id')
      });
    })
  }

  render() {
    return (
      <div className="col-sm-9 border rounded">
        <h1>Create Annotation Campaign</h1>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" value={this.state.new_ac_name} onChange={this.handleNameChange} placeholder="Campaign Name" />
          </div>

          <div className="form-group">
            <textarea className="form-control" value={this.state.new_ac_desc} onChange={this.handleDescChange} placeholder="Description" />
          </div>

          <AddDatasets dataset_options={this.state.dataset_choices} chosen_datasets={this.state.new_ac_datasets} onSelectChange={this.handleAddDataset} onDelClick={this.handleRemoveDataset} />

          <div className="form-group row">
            <div className="col-sm-6">
              <input className="form-control" type="text" value={this.state.new_ac_start} onChange={this.handleStartChange} placeholder="Start Date" />
            </div>
            <div className="col-sm-6">
              <input className="form-control" type="text" value={this.state.new_ac_end} onChange={this.handleEndChange} placeholder="End Date" />
            </div>
          </div>

          <ShowAnnotationSet annotation_sets={this.state.annotation_set_choices} onChange={this.handleAnnotationSetChange} />

          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateAnnotationCampaign;
