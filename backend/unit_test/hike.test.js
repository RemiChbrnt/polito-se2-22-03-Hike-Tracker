const mockHikeDAO = require('./mockDAOs/mockHikeDAO');
const HikeService = require('../api/services/hikeService');
const service = new HikeService(mockHikeDAO);

const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

describe('get all hikes', () => {
	beforeEach(() => {
		mockHikeDAO.getHikes.mockReset();
		mockHikeDAO.getHikes.mockResolvedValue([
			{
				"id": 1,
				"title": "Sentiero per il Rocciamelone",
				"length": 9,
				"expTime": 6.5,
				"ascent": 1353,
				"difficulty": "pro",
				"startPt": {
					"id": 1,
					"name": "Rifugio La Riposa",
					"type": "hut",
					"latitude": 45.17880975856355,
					"longitude": 7.08152295397762,
					"country": "Italy",
					"province": "TO",
					"town": "Mompantero",
					"address": "Frazione La Riposa",
					"altitude": 2185
				},
				"endPt": {
					"id": 2,
					"name": "Rocciamelone",
					"type": "generic",
					"latitude": 45.203883238657625,
					"longitude": 7.076990054701778,
					"country": "Italy",
					"province": "TO",
					"town": "Usseglio",
					"address": null,
					"altitude": 3538
				},
				"description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti).",
				"referencePoints": [
					{
						"id": 1,
						"name": "Rifugio La Riposa",
						"type": "hut",
						"latitude": 45.17880975856355,
						"longitude": 7.08152295397762,
						"country": "Italy",
						"province": "TO",
						"town": "Mompantero",
						"address": "Frazione La Riposa",
						"altitude": 2185
					},
					{
						"id": 2,
						"name": "Rocciamelone",
						"type": "generic",
						"latitude": 45.203883238657625,
						"longitude": 7.076990054701778,
						"country": "Italy",
						"province": "TO",
						"town": "Usseglio",
						"address": null,
						"altitude": 3538
					},
					{
						"id": 3,
						"name": "Punto inventato #1",
						"type": "parkinglot",
						"latitude": 45.19880975856355,
						"longitude": 7.078090054701778,
						"country": "Italy",
						"province": "TO",
						"town": "fakeTown",
						"address": null,
						"altitude": 2500
					}
				]
			},
			{
				"id": 2,
				"title": "testingHikeWithAuthor1",
				"length": 4156,
				"expTime": 10.2,
				"ascent": 1879,
				"difficulty": "pro",
				"startPt": {
					"id": 1,
					"name": "Rifugio La Riposa",
					"type": "hut",
					"latitude": 45.17880975856355,
					"longitude": 7.08152295397762,
					"country": "Italy",
					"province": "TO",
					"town": "Mompantero",
					"address": "Frazione La Riposa",
					"altitude": 2185
				},
				"endPt": {
					"id": 2,
					"name": "Rocciamelone",
					"type": "generic",
					"latitude": 45.203883238657625,
					"longitude": 7.076990054701778,
					"country": "Italy",
					"province": "TO",
					"town": "Usseglio",
					"address": null,
					"altitude": 3538
				},
				"description": "Testing description, just to check that it works",
				"referencePoints": []
			}
		]
	);

	})

	test('getHikes', async () => {
		let res = await service.getHikes();
		expect(res.body).toEqual([
			
				{
					"id": 1,
					"title": "Sentiero per il Rocciamelone",
					"length": 9,
					"expTime": 6.5,
					"ascent": 1353,
					"difficulty": "pro",
					"startPt": {
						"id": 1,
						"name": "Rifugio La Riposa",
						"type": "hut",
						"latitude": 45.17880975856355,
						"longitude": 7.08152295397762,
						"country": "Italy",
						"province": "TO",
						"town": "Mompantero",
						"address": "Frazione La Riposa",
						"altitude": 2185
					},
					"endPt": {
						"id": 2,
						"name": "Rocciamelone",
						"type": "generic",
						"latitude": 45.203883238657625,
						"longitude": 7.076990054701778,
						"country": "Italy",
						"province": "TO",
						"town": "Usseglio",
						"address": null,
						"altitude": 3538
					},
					"description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti).",
					"referencePoints": [
						{
							"id": 1,
							"name": "Rifugio La Riposa",
							"type": "hut",
							"latitude": 45.17880975856355,
							"longitude": 7.08152295397762,
							"country": "Italy",
							"province": "TO",
							"town": "Mompantero",
							"address": "Frazione La Riposa",
							"altitude": 2185
						},
						{
							"id": 2,
							"name": "Rocciamelone",
							"type": "generic",
							"latitude": 45.203883238657625,
							"longitude": 7.076990054701778,
							"country": "Italy",
							"province": "TO",
							"town": "Usseglio",
							"address": null,
							"altitude": 3538
						},
						{
							"id": 3,
							"name": "Punto inventato #1",
							"type": "parkinglot",
							"latitude": 45.19880975856355,
							"longitude": 7.078090054701778,
							"country": "Italy",
							"province": "TO",
							"town": "fakeTown",
							"address": null,
							"altitude": 2500
						}
					]
				},
				{
					"id": 2,
					"title": "testingHikeWithAuthor1",
					"length": 4156,
					"expTime": 10.2,
					"ascent": 1879,
					"difficulty": "pro",
					"startPt": {
						"id": 1,
						"name": "Rifugio La Riposa",
						"type": "hut",
						"latitude": 45.17880975856355,
						"longitude": 7.08152295397762,
						"country": "Italy",
						"province": "TO",
						"town": "Mompantero",
						"address": "Frazione La Riposa",
						"altitude": 2185
					},
					"endPt": {
						"id": 2,
						"name": "Rocciamelone",
						"type": "generic",
						"latitude": 45.203883238657625,
						"longitude": 7.076990054701778,
						"country": "Italy",
						"province": "TO",
						"town": "Usseglio",
						"address": null,
						"altitude": 3538
					},
					"description": "Testing description, just to check that it works",
					"referencePoints": []
				}
			]);

		expect(res.status).toEqual(200);
	});

});

describe('Create a new hike', () => {
	const newHike = {
		"id" : 2,
		"title" : "testingHikeWithAuthor1",
		"length" : 4156,
		"expTime" : 10.2,
		"ascent" : 1879,
		"difficulty" : "pro",
		"startPt" : 1,
		"endPt" : 2,
		"description" : "Testing description, just to check that it works",
		"author" : "maurizio.merluzzo@donkeykong.com"
	};
	test('createHike', async () => {
		let res = await service.createHike(newHike);
		expect(mockHikeDAO.createHike.mock.calls[0][0]).toEqual(newHike);
		expect(res.status).toEqual(201);
	});
});
