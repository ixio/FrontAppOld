import React from 'react';

import Datasets from './Datasets'
import AnnotationCampaigns from './AnnotationCampaigns'
import CreateAnnotationCampaign from './CreateAnnotationCampaign'
import AnnotationTasks from './AnnotationTasks'
import AudioAnnotator from './AudioAnnotator'

import { Switch, Route, Link } from 'react-router-dom';

import './css/bootstrap-4.1.1.min.css';
import './css/app.css';

const Navbar = () => (
  <div className="col-sm-3 border rounded">
    <h1>Navbar</h1>
    <ul>
      <li><Link to="/datasets">Datasets</Link></li>
      <li><Link to="/annotation_campaigns">Annotation campaigns</Link></li>
    </ul>
  </div>
);

const OdeApp = () => (
  <div className="container">
    <div className="row text-center">
      <div className="col-sm-12"><h1>ODE FrontManager</h1></div>
    </div>
    <div className="row text-center h-100 main">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Datasets} />
        <Route path='/datasets' component={Datasets} />
        <Route path='/annotation_campaigns' component={AnnotationCampaigns} />
        <Route path='/create_annotation_campaign' component={CreateAnnotationCampaign} />
      </Switch>
    </div>
  </div>
);

const App = () => (
    <Switch>
      <Route path='/annotation_tasks/:annotation_campaign_id' component={AnnotationTasks} />
      <Route path='/audio-annotator/:annotation_campaign_id/:file_id' component={AudioAnnotator} />
      <Route component={OdeApp} />
    </Switch>
);

export default App;
