import React from 'react'
import { Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css';

import ListBooks from './ListBooks'; 
import SearchBooks from './SearchBooks'; 

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
  }
  
  changeBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then((booksShelfes) => {
      this.setState((state) => {
        state.books[book.shelf] = state.books[book.shelf].filter((bookInShelf) => (
          bookInShelf.id !== book.id
        ));
        book.shelf = shelf;
        state.books[shelf].push(book);
        return state;
      });
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      allBooks.forEach(book => {
        if (book.shelf === 'currentlyReading') {
          this.state.books.currentlyReading.push(book);
        }
        if (book.shelf === 'wantToRead') {
          this.state.books.wantToRead.push(book);
        }
        if (book.shelf === 'read') {
          this.state.books.read.push(book);
        }
    });
      this.setState(this.state);
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