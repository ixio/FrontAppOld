import nock from 'nock';
import yaml from 'js-yaml';
import fs from 'fs';

let api_urls;

try {
    api_urls= yaml.safeLoad(fs.readFileSync('test/fixtures/api_urls.yaml', 'utf8'));
} catch (e) {
    console.log(e);
}

Object.entries(api_urls).map(([url, json_fixture]) => {
	let fixture = require('../fixtures/' + json_fixture);
	nock(process.env.REACT_APP_API_URL).persist().get(url).reply(200, fixture);
});
