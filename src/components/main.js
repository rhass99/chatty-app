import React, { Component } from 'react';
import NavCMP from './nav';
import Chat from './chat';
import FooterCMP from './footer';

class Main extends Component {


  render (){   
    return (
      <div>
        <NavCMP />
        <Chat />
        <FooterCMP />
      </div>
    )
  }
}

export default Main