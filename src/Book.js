import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookState: PropTypes.func.isRequired
  }

  render() {
    const { book, onChangeBookState } = this.props;

    let authors = '';
    if (book.authors) {
      authors = book.authors.join(',');
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => {onChangeBookState(book, event.target.value)}} value={book.shelf}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;