import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

import Book from './Book';

class SearchBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    query: ''
  }

  search = (query) => {
    BooksAPI.search(query.trim()).then((books) => {
      if (books && !books.error) {
        this.setState(({books}));        
      }
    });
    this.setState(({
      query: query.trim()          
    }));
  };

  render() {
    const { onChangeBookState } = this.props;
    const { query, books } = this.state;
    
    const bookShelf = books.map((book) => {
      const bookInShelf = this.props.books.find((bookIn) => (
        bookIn.id === book.id
      ));
      if (bookInShelf) {
        book.shelf = bookInShelf.shelf;
        return book;              
      }
      book.shelf = 'none';
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query.length > 0 && bookShelf.length === 0 && (
            <div className="search-not-found">
              <span>No results</span>  
            </div>
          )}
          <ol className="books-grid">
          {bookShelf.map((book) => (
              <li key={book.id}>
                <Book 
                  book={book}
                  onChangeBookState={onChangeBookState}
                />
              </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;