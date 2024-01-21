async function docAsString(docs) {
    return docs.map((doc) => {
        return `<doc>\n${doc.pageContent}</doc>`
    }).join('\n');
}

export default docAsString;