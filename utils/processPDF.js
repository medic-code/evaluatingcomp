/*
Problem:
Current implementation of langchain does not allow for easy url downloading of pdf's
It has good support for pdf's in folders but I would rather be able to take pdfs 
from the web in addition to pdf foledrs

Input: String (url)
Output: Array of formatted langchain docs 

Rules
1. Must process a url as a string
2. No restriction of limited size of pdf's currently 
3. Can use existing pdf parsers like pdfparse for parsing 
4. Output must be an array of langchain docs to be processed for embedding
5. The langchain docs structure has an object of pageContent value for storing strings of the docuemnts
and an optional metadata key for storing source of the information
5.1 For source of information it should be fine for the specific url itself
6. It should be a valid PDF link 

Example
Input: https://arxiv.org/pdf/2301.08801.pdf
Output: [{ pageContent: "foo", metadata: { source: "1" }]

Data Structures and Algorithms 

High level
1. Validate url 
1. Get binary data from url link using axios
2. Convert to blob 
2. Parse binary data into a usable format for the PDFloader
3. Return Create a new document 

Unit Tests 
1. Validate link url 
1.1 A web link that has pdf at the end and is a string 
1.2 A web link that does not have a pdf 
1.3 An argument that is not a string 

1. Axios gets the data in blob format 
2.1 Requires mocking
2. PDFloader returns a new document based upon text in the pdf
2.1 Requires mocking 

Integration tests
1. function provides a document of url off an array and pageContent.

*/
const axios = require('axios');
const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const fs = require('fs').promises;

function pdfValid(url) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\.pdf)$', 'i');
    
    
    return !!urlPattern.test(url);
}

// Example usage:
async function getPDF(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    
    const blob = new Blob([response.data],{ type: 'application/octet-stream' })
    const pdfLoader = new PDFLoader(blob);
    
    const docs = await pdfLoader.load();
    return docs;
}

getPDF('https://arxiv.org/pdf/2301.08801.pdf')

module.exports = { pdfValid, getPDF };