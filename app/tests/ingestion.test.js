import { loadWebsite, loadYoutube, loadData } from "../llm/ingestion.js";
import { getPDF } from '../utils/processPDF.js';

describe('Testing ingestion data sources', () => {
    test('recursive data', async () => {
        const url = 'https://www.curaihealth.com/about';

        const result = await loadWebsite(url);

        expect(typeof result).toBe('object');
        expect(result[0]).toHaveProperty('pageContent');
    })

    test('pdf data', async () => {
        const url = 'https://arxiv.org/pdf/2301.08801.pdf'
        const result = await getPDF(url);
        expect(typeof result).toEqual('object');
        expect(result[0]).toHaveProperty('pageContent');
    })

    test('Youtube data', async () => {
        const url = 'https://www.youtube.com/watch?v=b6e8CCPp2Kc&pp=ygUIZGVlcG1pbmQ%3D'

        const result = await loadYoutube(url);

        expect(typeof result).toBe('object');
        expect(result[0]).toHaveProperty('pageContent');
    })

    test('Load input data', async () => {
        const input = {youtube: [''], pdf: [''],websites: ['https://www.curaihealth.com/about','https://www.curaihealth.com/about']}

        const result = await loadData(input);

        expect(typeof result).toBe('object');
        expect(result[0]).toHaveProperty('pageContent');
    })


})