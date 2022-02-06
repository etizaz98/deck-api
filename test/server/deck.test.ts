import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';
import { server, app } from '../../src/bin/server';

use(chaiHttp)

// 	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 	/**
// 	 * Collections API - Standard
// 	 */
// 	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('deck API - Standard: ', (): void => {
	it('get a deck', (done) => {
		request(server)
			.get(`${app.locals.baseUri}/deck/opendeck?deckId=d7aafb54-131e-45a9-a41a-e7609607f95d`).then(data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => { done(err) })
	});

	it('should return invalid parameters', (done) => {
		request(server)
			.get(`${app.locals.baseUri}/deck/opendeck?`).then(data => {
				expect(data.status).to.equal(400)
				done()
			}).catch(err => { done(err) })
	});

	it('should add a deck ', (done: Function): void => {
		request(server)
			.post(`${app.locals.baseUri}/deck`).send({
				"type": "FULL",
				"shuffled": true
			}
			).then(data => {
				expect(data.status).to.equal(201);
				done();
			}).catch(err => {
				done(err);
			})
	});

	it('post a invalid request ', (done: Function): void => {
		request(server)
			.post(`${app.locals.baseUri}/deck`).send({}).then(data => {
				expect(data.status).to.equal(400);
				done();
			}).catch(err => {
				done(err);
			})
	});
});