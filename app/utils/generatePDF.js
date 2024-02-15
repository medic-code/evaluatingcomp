import { jsPDF } from 'jspdf';
import { boldfont, regfont } from '../fonts/interfonts';

const formatTitles = (title) => {
    return title
        .replaceAll('_',' ')
        .split(' ')
        .map(word => {
            if (word) {
                return word[0].toUpperCase() + word.slice(1)
            }
            
        })
        .join(' ');
}

export default function generatePDF(data,name) {
    const lineHeight = 6;
    const margin = 20;
    
    const doc = new jsPDF();
    let img = new Image();
    img.src = 'logo.png';
  
    doc.addFileToVFS('inter-reg.ttf',regfont);
    doc.addFileToVFS('inter-bold.ttf',boldfont);
    doc.addFont('inter-reg.ttf','inter-reg','normal');
    doc.addFont('inter-bold.ttf','inter-bold','bold');

    const maxLineHeight = doc.internal.pageSize.height - margin;
    const paragraphs = Object.values(data);
    const titles = Object.keys(data).map(title => formatTitles(title));

    let height = margin;
    doc.addImage(img, 'png', 15,10);
    height += margin*1.5;
    doc.setFontSize(24);
    doc.text(formatTitles(name) + ' - Company Profile',40,height)
    height += lineHeight*3;
    paragraphs.forEach((paragraph,index) => {
        
        doc.setFontSize(16);

        if (height > maxLineHeight - 2*margin) {
            doc.addPage()
            height = margin;
        }
     
        if (titles[index] === 'summary') {
            doc.text(titles[index],margin,height)
            height += lineHeight*2;
        } else {
            doc.text(titles[index],margin,height)
            height += lineHeight*2;
        }
        
        doc.setFont('inter-reg', 'normal')
        doc.setFontSize(10.5);

        const lines = doc.splitTextToSize(paragraph, doc.internal.pageSize.width - 2*margin);
        lines.forEach(line => {
            if (height > maxLineHeight) {
                doc.addPage()
                height = margin;
            }
            doc.text(line, margin, height);
            height += lineHeight;
        });
        height += lineHeight;
    })
   doc.save('test.pdf');
}