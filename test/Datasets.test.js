import assert from 'assert';
import React from 'react';
import { mount, shallow } from 'enzyme';
import nock from 'nock';

import Datasets from '../src/Datasets';

describe('testing Datasets component', function () {
    this.timeout(20000);

    before(function () {
        process.env.REACT_APP_API_URL = 'http://localhost:7232/data.ode.org/v1';
    });

    it('mounts properly with title', () => {
        let wrapper = mount(<Datasets />);
        assert(wrapper.text().includes('Datasets'), 'Title "Datasets" not found');
        wrapper.unmount();
    });

    it('shows the correct datasets', () => {
        let datasets = [
            {"id":1,"name":"SPMAuralA2010","files_type":".wav","start_date":"2010-08-18T22:00:00.000Z","end_date":"2010-11-01T23:00:00.000Z","type":"PAM","files_count":"2"},
            {"id":2,"name":"SPMAuralB2010","files_type":".wav","start_date":"2010-08-18T22:00:00.000Z","end_date":"2010-11-01T23:00:00.000Z","type":"PAM","files_count":"1"},
            {"id":3,"name":"SPM-ECMWF","files_type":".nc","start_date":"2010-07-31T22:00:00.000Z","end_date":"2010-08-31T22:00:00.000Z","type":"Meteo data","files_count":"1"}
        ];
        nock('http://localhost:7232').persist().get('/data.ode.org/v1/front_manager/datasets').reply(200, datasets);
        let wrapper = shallow(<Datasets />, { disableLifecycleMethods: true });
        return wrapper.instance().componentDidMount().then(() => {
            wrapper.update();
            let lines = wrapper.find('tr');
            assert(lines.length === 4, 'There should be 4 lines, 1 for the header and 1 for each of the 3 datasets');
            lines.slice(1).map((line, index) => {
                assert(line.text().includes(datasets[index].name), 'Line number ' + index + ' should have name ' + datasets[index].name);
            });
            wrapper.unmount();
        });
    });
});
