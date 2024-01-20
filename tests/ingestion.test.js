const { loadWebsite } = require("../llm/ingestion");

describe('Testing ingestion data sources', () => {
    test('recursive data', async () => {
        const url = 'https://www.curaihealth.com/about';

        const result = await loadWebsite(url);

        expect(typeof result).toBe('object');
        expect(result[0]).toHaveProperty('pageContent');
    })
})