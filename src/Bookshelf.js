import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired
  }

  render() {
    const { title, books, onChangeBookState } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {books.length === 0 && (
            <div className="no-books-shelf">
              <span>No books at the moment</span>
            </div>
          )}
          <ol className="books-grid">
            {books.map((book) => (
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

export default Bookshelf;