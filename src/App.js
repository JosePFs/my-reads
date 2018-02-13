import React from 'react'
import { Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css';

import ListBooks from './ListBooks'; 
import SearchBooks from './SearchBooks'; 

class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  changeBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then((booksShelfes) => {
      this.setState((state) => ({
        books: this.state.books.map((book) => {
          for (let [shelf, booksIds] of Object.entries(booksShelfes)) {
            if (booksIds.find((bookId) => (
              bookId === book.id
            ))) {
              book.shelf = shelf;
              return book;              
            }
          }
          book.shelf = 'none';
          return book;
        })
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onChangeBookState={this.changeBookState}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            books={books}
            onChangeBookState={this.changeBookState}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;