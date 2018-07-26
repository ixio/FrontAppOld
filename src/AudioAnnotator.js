// @flow

import React, { Component } from 'react';

import './css/font-awesome-4.7.0.min.css';
import './css/audio-annotator/materialize.min.css';
import './css/audio-annotator/audio-annotator.css';

function load_script(script_url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = script_url;
  script.async = false;
  script.defer = true;
  if (!document.body) throw new Error("Unexpectedly missing <body>.");
  document.body.appendChild(script);
}

function run_script(script_code) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = script_code;
  script.async = false;
  script.defer = true;
  if (!document.body) throw new Error("Unexpectedly missing <body>.");
  document.body.appendChild(script);
}

type Props = {
  match: {
    params: {
      file_id: number,
      annotation_campaign_id: number
    }
  }
};

class AudioAnnotator extends Component<Props> {
  componentDidMount() {
    let file_id = this.props.match.params.file_id;
    let campaign_id = this.props.match.params.annotation_campaign_id;
    load_script("/audio-annotator/static/js/lib/jquery-2.2.3.min.js");
    load_script("/audio-annotator/static/js/lib/materialize.min.js");
    load_script("/audio-annotator/static/js/lib/wavesurfer.min.js");
    load_script("/audio-annotator/static/js/lib/wavesurfer.spectrogram.min.js");
    load_script("/audio-annotator/static/js/colormap/colormap.min.js");
    load_script("/audio-annotator/static/js/src/message.js");
    load_script("/audio-annotator/static/js/src/wavesurfer.regions.js");
    load_script("/audio-annotator/static/js/src/wavesurfer.drawer.extended.js");
    load_script("/audio-annotator/static/js/src/wavesurfer.labels.js");
    load_script("/audio-annotator/static/js/src/hidden_image.js");
    load_script("/audio-annotator/static/js/src/components.js");
    load_script("/audio-annotator/static/js/src/annotation_stages.js");
    load_script("/audio-annotator/static/js/src/main.js");
    if (!process.env.REACT_APP_API_URL) throw new Error('REACT_APP_API_URL missing in env');
    let script = `
      var dataUrl = '${process.env.REACT_APP_API_URL}/front_manager/audio_annotator/${campaign_id}/${file_id}';
      var postUrl = '${process.env.REACT_APP_API_URL}/front_manager/audio_annotator/${campaign_id}/${file_id}';
    `;
    run_script(script);
  }

  render() {
    return (
      <div>
        <div className="annotation">
            <div className="labels"></div>
            <div className="audio_visual"></div>
            <div className="play_bar"></div>
            <div className="hidden_img"></div>
            <div className="creation_stage_container"></div>
            <div className="submit_container"></div>
        </div>
      </div>
    );
  }
}

export default AudioAnnotator;
