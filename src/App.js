import Header from './components/Header';
import HistoryLog from './components/HistoryLog';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
  const [count, setCount] = useState(0);
  const [saved, setSaved] = useLocalStorage('counterHistory', []);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const save = () => {
    const date = new Date();
    const dateLine = date.toString().split(' ').slice(1, 5).join(' ');
    const countDateItem = {
      id: uuidv4(),
      value: count,
      date: dateLine,
    }
    setSaved([countDateItem, ...saved]);
  }
  const clearHistory = () => {
    setSaved([]);
  };
  const removeHistoryItem = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  }

  return (
    <div className="counter-app">
      <Header />
      <div className="counter-section">
        <div className="d-flex align-items-center mb-3">
          <button className="btn btn-primary" onClick={decrement}>-1</button>
          <span className="counter-value">{count}</span>
          <button className="btn btn-primary" onClick={increment}>+1</button>
        </div>
        <div className="bottom-actions-container">
          <button className="btn btn-danger" onClick={reset}>Reset</button>
          <button disabled={saved.length === 0} className="btn btn-danger" onClick={clearHistory}>Clear History</button>
          <button className="btn btn-success" onClick={save}>Save</button>
        </div>
      </div>
      <HistoryLog saved={saved} onRemove={removeHistoryItem} />
    </div>
  );
}

export default App;
