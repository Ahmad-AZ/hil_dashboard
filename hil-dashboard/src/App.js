import './App.css';
import Index from './components/IndexNew';
import Calendar from './components/Calendar'
import Gencalendar from './components/Gcalendar'
import Genhilcalendar from './components/Hilscalendar'
import SearchResult from './components/SearchResult'
import Gen5 from './components/Gen5';
import Gen6 from './components/Gen6';
import {  Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calendar/:name" element={<Calendar />} />
        <Route path="/calendar/" element={<Calendar />} />
        <Route path="/gencalendar/" element={<Gencalendar />} />
        <Route path="/gencalendar/:name" element={<Genhilcalendar />} />
        <Route path="/search/:name" element={<SearchResult />} />
        <Route path="/gen5/" Component={Gen5}/>
        <Route path="/gen6/" Component={Gen6}/>


    </Routes>
    
  );
}

export default App;
