import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import AppViewer from './containers/AppViewer';
import ToolBar from './containers/ToolBar';
import styles from './App.module.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div className={styles.toolbar}>
          <ToolBar />
        </div>
        <AppViewer />
      </>
    );
  }
}

export default hot(module)(App);
