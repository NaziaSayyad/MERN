
import './App.css';
import Barchart from './components/Barchart';

// components
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

function App() {
  return (
    <div>
     
      <Header />
      <TodoForm />
      <Todos />
      <Barchart />
    </div>
  );
}

export default App;
