import React, { Component } from 'react';

import Datasets from './Datasets'
import AnnotationCampaigns from './AnnotationCampaigns'

import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './css/bootstrap-4.1.1.min.css';
import './css/app.css';

class Navbar extends Component {
  render() {
    return (
      <div className="col-sm-3 border rounded">
        <h1>Navbar</h1>
        <ul>
          <li><Link to="/datasets">Datasets</Link></li>
          <li><Link to="/annotation_campaigns">Annotation campaigns</Link></li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-12"><h1>ODE FrontManager</h1></div>
        </div>
        <div className="row text-center h-100 main">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Datasets}/>
            <Route path='/datasets' component={Datasets}/>
            <Route path='/annotation_campaigns' component={AnnotationCampaigns}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
