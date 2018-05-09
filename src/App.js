import React, { Component } from 'react';
import './index.css';
import Layout from './components/Layout/Layout'
import Reviews from './containers/Reviews/Reviews'


class App extends Component {

  render() {
    return (
      <div className="zevioo-wrapper">
        <Layout>
          <Reviews/>
        </Layout>
      </div>
    );
  }
}

export default App;

