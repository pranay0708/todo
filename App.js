import './App.css';
import { Provider } from "react-redux"
import { store } from './store/store';
import TodoComponent from './components/TodoComponent';

function App() {

  return (
    <Provider store={store}>
      <TodoComponent></TodoComponent>
    </Provider>
  );
}

export default App;
