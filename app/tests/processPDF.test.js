import { pdfValid, getPDF } from '../../utils/processPDF.js';


describe('Testing PDF ingestion', () => {
    describe('PDF to doc', () => {
        test('Returns a langchain doc', async () => {
            const url = 'https://arxiv.org/pdf/2301.08801.pdf'
            const result = await getPDF(url);
            expect(typeof result).toEqual('object');
            expect(result[0]).toHaveProperty('pageContent');
        })
    })

    describe('Testing valid pdf url', () => {
        test('pdf url is string and ends in pdf', () => {
            const url = 'https://arxiv.org/pdf/2301.08801.pdf'
    
            const result = pdfValid(url);
    
            expect(result).toEqual(true);
        })
    
        test('pdf url string is empty', () => {
            const url = '';
    
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    
        test('pdf url is null', () => {
            const url =  null;
    
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    
        test('pdf url string a few chars', () => {
            const url = 'a'
    
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    
        test('pdf url is not a string', () => {
            const url = [];
            
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    
        test('pdf url does not have filename pdf at end', () =>{
            const url = 'https://arxiv.org/pdf/';
    
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    
        test('pdf url must have http at start', () => {
            const url = '//arxiv.org/pdf/2301.08801.pdf';
    
            const result = pdfValid(url);
    
            expect(result).toEqual(false);
        })
    })
   
})