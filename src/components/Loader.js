import React, { Component } from 'react';
import Loading from './Loading.gif';

export default class Loader extends Component {

  render() {
    return (
      <div style={{margin: '100px', marginLeft: '600px', marginBottom: '320px'}}>
          <img src={Loading} alt='loading' />
      </div>
    )
  }
}
