import React, {Component} from 'react';
import Main from './components/main';
import { Provider } from 'react-redux';
import store from './redux/index';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <Main />
      </Provider>
    );
  }
}
export default App;
