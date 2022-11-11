const mockHikeDAO = require('../api/mockDAOs/mockHikeDAO');
const HikeService = require('../api/services/hikeService');
const service = new HikeService(true);

//const { useStrictConsistency } = require('../modules/useStrictConsistency');

describe('getHikes', () => {
	beforeEach(() => {
		//useStrictConsistency(true);

		mockHikeDAO.getHikes.mockReset();
		// mockHikeDAO.getAllSkus.mockReturnValue([
		// 	{
		// 		"ID": 1,
		// 		"DESCRIPTION": "a new sku",
		// 		"WEIGHT": 100.0,
		// 		"VOLUME": 50.0,
		// 		"PRICE": 10.99,
		// 		"NOTES": "first SKU",
		// 		"AVAILABLEQUANTITY": 48,
		// 		"POSITION_ID": "800234523412"
		// 	},
		// 	{
		// 		"ID": 2,
		// 		"DESCRIPTION": "a new sku",
		// 		"WEIGHT": 100.0,
		// 		"VOLUME": 50.0,
		// 		"PRICE": 10.99,
		// 		"NOTES": "second SKU",
		// 		"AVAILABLEQUANTITY": 50,
		// 		"POSITION_ID": "800234523413"
		// 	}
		// ]);


		// mockTestDescriptorsDbInterface.getTestDescriptorsIdBySKUid.mockReset();
		// mockTestDescriptorsDbInterface.getTestDescriptorsIdBySKUid.mockReturnValue(new Promise((resolve, reject) => {
		// 	resolve([{ "ID": 1 }, { "ID": 3 }, { "ID": 4 }]);
		// }));
	})

	test('get all hikes', async () => {
		let res = await service.getHikes();
		expect(res).toEqual([
			[{
                "title": "Sentiero per il Rocciamelone",
                "length": 9,
                "expTime": 6.5,
                "ascent": 1353,
                "difficulty": "pro",
                "startPt": 1,
                "endPt": 2,
                "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
            },
            {
                "title": "testTitle",
                "length": 123,
                "expTime": 6.5,
                "ascent": 1000,
                "difficulty": "pro",
                "startPt": 1,
                "endPt": 2,
                "description": "testDescription"
            },
            {
                "title": "testingTitle1",
                "length": 1234.5,
                "expTime": 6.5,
                "ascent": 1000,
                "difficulty": "pro",
                "startPt": 1,
                "endPt": 2,
                "description": "Testing description, just to check that it works"
            }]
        ]);
	});

});
