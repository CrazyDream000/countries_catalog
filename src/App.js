import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//components
import Nav from './components/Nav';
import CountriesLists from './pages/CountriesLists';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="w-[100vw] h-[100vh] relative bg-slate-200">
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/:filterTxt" element={<CountriesLists/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
