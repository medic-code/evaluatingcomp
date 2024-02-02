const formatTitles = (title) => {
    return title
        .replaceAll('_',' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
}

export default formatTitles;