import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';

class ListBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired
  }

  render() {
    const { books, onChangeBookState } = this.props;
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    books.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
      }
      if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
      }
      if (book.shelf === 'read') {
        read.push(book);
      }
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            title='Currently Reading'
            books={currentlyReading}
            onChangeBookState={onChangeBookState}
          />
          <Bookshelf
            title='Want to Read'
            books={wantToRead}
            onChangeBookState={onChangeBookState}
          />
          <Bookshelf
            title='Read'
            books={read}
            onChangeBookState={onChangeBookState}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;