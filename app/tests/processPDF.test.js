import { pdfValid } from '../utils/processPDF.js';

describe('Testing PDF ingestion', () => {
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