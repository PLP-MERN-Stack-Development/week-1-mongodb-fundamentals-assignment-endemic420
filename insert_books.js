// Import MongoDB client
const { MongoClient }= require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db('plp_bookstore');
    const booksCollection = db.collection('books');

    // Check if collection already has documents
    const count = await booksCollection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await booksCollection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await booksCollection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await booksCollection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } 
}

// Run the function
insertBooks().catch(console.error);

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
