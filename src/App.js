import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveDrawer from '../src/ResponsiveDrawer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ResponsiveDrawer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;