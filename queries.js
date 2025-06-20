//import MongoClient from mongodb
const { MongoClient } =require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';
// Helper function to connect to the books collection
async function connectDB() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}
//adding books 
async function addBook(book) {
    const books = await connectDB();
    const result = await books.insertOne(book);
    return result;
}

//finding books in a specific genre
async function findBooksByGenre(genre) {
    const books = await connectDB();
    const results = await books.find({ genre: genre }).toArray();
    return results;
}

//finding books published after a specific year
async function findBooksPublishedAfter(year) {
    const books = await connectDB();
    const results = await books.find({ publish_Year: { $gt: year } }).toArray();
    return results;
}

// finding books by a specific author
async function findBooksByAuthor(author) {
    const books = await connectDB();
    const results = await books.find({ author: author }).toArray();
    return results;
}

//updating the price of a specific book 
async function updateBookPrice(bookId, newPrice) {
    const books = await connectDB();
    const result = await books.updateOne(
        { _id: ObjectId(bookId) },
        { $set: { price: newPrice } }
    );
    return result;
}

//Deleting a book by its title 
async function deleteBookByTitle(title) {
    const books = await connectDB();
    const result = await books.deleteOne({ title: title });
    return result;
}   

// finding books that are in stock and published after 2010
async function findInStockBooksPublishedAfter2010() {
    const books = await connectDB();
    const results = await books.find({
        inStock: true,
        publish_Year: { $gt: 2010 }
    }).toArray();
    return results;
}

// finding books that are in stock and published after 2010
async function findInStockBooksPublishedAfter2010() {
    const books = await connectDB();
    const results = await books.find(
        {
            inStock: true,
            publish_Year: { $gt: 2010 }
        },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    return results;
}

// finding books that are in stock and published after 2010, sorted by price ascending
async function findInStockBooksPublishedAfter2010SortedByPriceAsc() {
    const books = await connectDB();
    const results = await books.find(
        {
            inStock: true,
            publish_Year: { $gt: 2010 }
        },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).sort({ price: 1 }).toArray();
    return results;
}

// finding books that are in stock and published after 2010, sorted by price descending
async function findInStockBooksPublishedAfter2010SortedByPriceDesc() {
    const books = await connectDB();
    const results = await books.find(
        {
            inStock: true,
            publish_Year: { $gt: 2010 }
        },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).sort({ price: -1 }).toArray();
    return results;
}

// finding books that are in stock and published after 2010, sorted by price ascending, with pagination
async function findInStockBooksPublishedAfter2010SortedByPriceAscPaginated(page = 1) {
    const books = await connectDB();
    const results = await books.find(
        {
            inStock: true,
            publish_Year: { $gt: 2010 }
        },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    )
    .sort({ price: 1 })
    .skip((page - 1) * 5)
    .limit(5)
    .toArray();
    return results;
}

// finding books that are in stock and published after 2010, sorted by price descending, with pagination
async function findInStockBooksPublishedAfter2010SortedByPriceDescPaginated(page = 1) {
    const books = await connectDB();
    const results = await books.find(
        {
            inStock: true,
            publish_Year: { $gt: 2010 }
        },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    )
    .sort({ price: -1 })
    .skip((page - 1) * 5)
    .limit(5)
    .toArray();
    return results;
}

// Aggregation pipeline to calculate the average price of books by genre
async function getAveragePriceByGenre() {
    const books = await connectDB();
    const results = await books.aggregate([
        {
            $group: {
                _id: "$genre",
                averagePrice: { $avg: "$price" }
            }
        },
        {
            $project: {
                _id: 0,
                genre: "$_id",
                averagePrice: 1
            }
        }
    ]).toArray();
    return results;
}

// Aggregation pipeline to find the author with the most books in the collection
async function getAuthorWithMostBooks() {
    const books = await connectDB();
    const results = await books.aggregate([
        {
            $group: {
                _id: "$author",
                bookCount: { $sum: 1 }
            }
        },
        { $sort: { bookCount: -1 } },
        { $limit: 1 },
        {
            $project: {
                _id: 0,
                author: "$_id",
                bookCount: 1
            }
        }
    ]).toArray();
    return results[0]; 
}

// Aggregation pipeline to group books by publication decade and count them
async function getBookCountByDecade() {
    const books = await connectDB();
    const results = await books.aggregate([
        {
            $project: {
                decade: {
                    $concat: [
                        { $toString: { $multiply: [ { $floor: { $divide: ["$publishedYear", 10] } }, 10 ] } },
                        "s"
                    ]
                }
            }
        },
        {
            $group: {
                _id: "$decade",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                decade: "$_id",
                count: 1
            }
        },
        { $sort: { decade: 1 } }
    ]).toArray();
    return results;
}

// Create an index on the title field for faster searches
async function createTitleIndex() {
    const books = await connectDB();
    const result = await books.createIndex({ title: 1 });
    return result;
}

// Create a compound index on author and publishedYear for faster searches
async function createAuthorPublishedYearIndex() {
    const books = await connectDB();
    const result = await books.createIndex({ author: 1, publish_Year: 1 });
    return result;
}

// Use the explain() method to demonstrate the performance improvement with your indexes
async function explainTitleSearch(title) {
    const books = await connectDB();
    const explanation = await books.find({ title: title }).explain("executionStats");
    return explanation;
}

async function explainAuthorPublishedYearSearch(author, year) {
    const books = await connectDB();
    const explanation = await books.find({ author: author, publish_Year: year }).explain("executionStats");
    return explanation;
}

module.exports = {
    addBook,
    findBooksByGenre,
    findBooksPublishedAfter,
    findBooksByAuthor,
    updateBookPrice,
    deleteBookByTitle,
    findInStockBooksPublishedAfter2010,
    findInStockBooksPublishedAfter2010SortedByPriceAsc,
    findInStockBooksPublishedAfter2010SortedByPriceDesc,
    findInStockBooksPublishedAfter2010SortedByPriceAscPaginated,
    findInStockBooksPublishedAfter2010SortedByPriceDescPaginated,
    getAveragePriceByGenre,
    getAuthorWithMostBooks,
    getBookCountByDecade,
    createTitleIndex,
    createAuthorPublishedYearIndex,
    explainTitleSearch,
    explainAuthorPublishedYearSearch
};