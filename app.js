const {addBook,findBooksByGenre,findBooksPublishedAfter,findBooksByAuthor,updateBookPrice,deleteBookByTitle,findInStockBooksPublishedAfter2010,findInStockBooksPublishedAfter2010SortedByPriceAsc,findInStockBooksPublishedAfter2010SortedByPriceDesc,findInStockBooksPublishedAfter2010SortedByPriceAscPaginated,findInStockBooksPublishedAfter2010SortedByPriceDescPaginated,getAveragePriceByGenre,getAuthorWithMostBooks,getBookCountByDecade,createTitleIndex,createAuthorPublishedYearIndex,explainTitleSearch,explainAuthorPublishedYearSearch} = require('./insert_books.js');

const command = process.argv[2];

if (command === 'addBook'){
    const [title, author, genre, publishedYear, price, inStock, pages, publisher] = process.argv.slice(3);
    const book = {
        title,
        author,
        genre,
        publishedYear: parseInt(publishedYear),
        price: parseInt(price),
        inStock: inStock === 'true',
        pages: parseInt(pages),
        publisher
    };
    addBook(book)
        .then(result => console.log('Book added:', result))
        .catch(err => console.error('Error adding book:', err));
}
else if (command === 'findBooksByGenre') {
    const genre = process.argv[3];
    findBooksByGenre(genre)
        .then(books => console.log('Books in genre:', books))
        .catch(err => console.error('Error finding books by genre:', err));
}
else if (command === 'findBooksPublishedAfter') {
    const year = parseInt(process.argv[3]);
    findBooksPublishedAfter(year)
        .then(books => console.log('Books published after', year, ':', books))
        .catch(err => console.error('Error finding books published after:', err));
}
else if (command === 'findBooksByAuthor') {
    const author = process.argv[3];
    findBooksByAuthor(author)
        .then(books => console.log('Books by author:', books))
        .catch(err => console.error('Error finding books by author:', err));
}
else if (command === 'updateBookPrice') {
    const [title, newPrice] = process.argv.slice(3);
    updateBookPrice(title, parseInt(newPrice))
        .then(result => console.log('Book price updated:', result))
        .catch(err => console.error('Error updating book price:', err));
}
else if (command === 'deleteBookByTitle') {
    const title = process.argv[3];
    deleteBookByTitle(title)
        .then(result => console.log('Book deleted:', result))
        .catch(err => console.error('Error deleting book:', err));
}
else if (command === 'findInStockBooksPublishedAfter2010') {
    findInStockBooksPublishedAfter2010()
        .then(books => console.log('In-stock books published after 2010:', books))
        .catch(err => console.error('Error finding in-stock books published after 2010:', err));
}
else if (command === 'findInStockBooksPublishedAfter2010SortedByPriceAsc') {
    findInStockBooksPublishedAfter2010SortedByPriceAsc()
        .then(books => console.log('In-stock books published after 2010 sorted by price ascending:', books))
        .catch(err => console.error('Error finding in-stock books published after 2010 sorted by price ascending:', err));
}
else if (command === 'findInStockBooksPublishedAfter2010SortedByPriceDesc') {
    findInStockBooksPublishedAfter2010SortedByPriceDesc()
        .then(books => console.log('In-stock books published after 2010 sorted by price descending:', books))
        .catch(err => console.error('Error finding in-stock books published after 2010 sorted by price descending:', err));
}
else if (command === 'findInStockBooksPublishedAfter2010SortedByPriceAscPaginated') {
    const page = parseInt(process.argv[3]);
    const limit = parseInt(process.argv[4]);
    findInStockBooksPublishedAfter2010SortedByPriceAscPaginated(page, limit)
        .then(books => console.log('In-stock books published after 2010 sorted by price ascending (paginated):', books))
        .catch(err => console.error('Error finding in-stock books published after 2010 sorted by price ascending (paginated):', err));
}
else if (command === 'findInStockBooksPublishedAfter2010SortedByPriceDescPaginated') {
    const page = parseInt(process.argv[3]);
    const limit = parseInt(process.argv[4]);
    findInStockBooksPublishedAfter2010SortedByPriceDescPaginated(page, limit)
        .then(books => console.log('In-stock books published after 2010 sorted by price descending (paginated):', books))
        .catch(err => console.error('Error finding in-stock books published after 2010 sorted by price descending (paginated):', err));
}
else if (command === 'getAveragePriceByGenre') {
    getAveragePriceByGenre()
        .then(averagePrices => console.log('Average price by genre:', averagePrices))
        .catch(err => console.error('Error getting average price by genre:', err));
}
else if (command === 'getAuthorWithMostBooks') {
    getAuthorWithMostBooks()
        .then(author => console.log('Author with most books:', author))
        .catch(err => console.error('Error getting author with most books:', err));
}
else if (command === 'getBookCountByDecade') {  
    getBookCountByDecade()
        .then(counts => console.log('Book count by decade:', counts))
        .catch(err => console.error('Error getting book count by decade:', err));
}