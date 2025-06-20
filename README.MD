# insert_books.js Script Documentation

This script (`queries.js`) is designed to help you interact with a MongoDB database for a bookstore application. It demonstrates how to insert sample book data and perform basic CRUD (Create, Read, Update, Delete) operations using the MongoDB Node.js driver.

## Features

- **Insert Sample Data:**  
  Populates the `books` collection in the `plp_bookstore` database with a set of sample book documents.
- **Helper Functions:**  
  Includes reusable functions to add, find, update, and delete books in the database.
- **Connection Management:**  
  Uses a helper function to connect to the MongoDB database and collection.

## Script Breakdown

### 1. Sample Data

The script starts with an array of book objects, each containing fields like `title`, `author`, `genre`, `published_year`, `price`, `in_stock`, `pages`, and `publisher`.

### 2. Main Insert Function

- **`insertBooks()`**  
  Connects to MongoDB, checks if the `books` collection already exists, drops it if it does, and then inserts the sample data. It prints the inserted books to the console.

### 3. Helper Functions

- **`connectDB()`**  
  Connects to the MongoDB server and returns the `books` collection object for further operations.

- **`addBook(book)`**  
  Adds a single book document to the collection.

- **`findBooksByGenre(genre)`**  
  Finds all books in the collection that match a specific genre.

- **`findBooksPublishedAfter(year)`**  
  Finds all books published after a given year.

- **`findBooksByAuthor(author)`**  
  Finds all books by a specific author.

- **`updateBookPrice(bookId, newPrice)`**  
  Updates the price of a book by its ID.

- **`deleteBookByTitle(title)`**  
  Deletes a book from the collection by its title.

## How to Use

1. **Install Dependencies:**  
   Make sure you have Node.js installed. Then, install the MongoDB Node.js driver:
   ```bash
   npm install mongodb