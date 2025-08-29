import './styles/styles.css';

import Todo from './components/Todo/Todo.tsx';

function App() {
  return (
    <div className="layout">
      <h1 className="heading">ToDo List</h1>
      <Todo />
    </div>
  );
}

export default App;
