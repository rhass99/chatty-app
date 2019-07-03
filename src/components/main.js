import React, { Component } from 'react';
import Nav from './nav';
import Chat from './chat';
import FooterCMP from './footer';

class Main extends Component {

  handleAddMessage = () => {
    console.log("hi")
  }

  render (){
    
    return (
      <div>
        <Nav />
        <Chat />
        <FooterCMP />
      </div>
    )
  }
}

export default Main