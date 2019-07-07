import React from 'React';
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './src/screens/home';
import AddNoteScreen from './src/screens/addNote';
import EditNoteScreen from './src/screens/editNote';

import { Provider } from 'react-redux'

import store from './src/public/redux/store';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  AddNote: {
    screen: AddNoteScreen
  },
  EditNote: {
    screen: EditNoteScreen
  }, 
});

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
      
  render() {
    return(
          <Provider store={store}>
            <AppContainer />
          </Provider>
      );
    }
}

export default App;