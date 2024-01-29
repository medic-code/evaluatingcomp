import generatePDF from '../utils/generatePDF';
import {jsPDF} from 'jspdf';

jest.mock('jspdf', () => ({
    jsPDF: jest.fn().mockImplementation(() => ({
        save: jest.fn()
    })),
}));

describe('PDF generation and saving', () => {
    test('Should generate and save a pdf', () => {
        const paragraphs = [
            ['Title1',"This is the first paragraph. It might be quite long so it will wrap onto the next line automatically."],
            ['Title2',"This is the second paragraph, which will also need to be wrapped. Each paragraph is separated by some vertical space."]
        ];;

        generatePDF(paragraphs);

        const mockJsPDFInstsance = jsPDF.mock.instances[0];

        expect(mockJsPDFInstance.save).toHaveBeenCalled();
        expect(mockJsPDFInstance.save).toHaveBeenCalledWith('test.pdf');
    })
})