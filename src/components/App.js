import React, { useState, useEffect } from 'react';
 

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { 
  Register,
  Login,
  Products,

} from './';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
<Router>
   <div className='app-container'>
    <nav>
     <h1 className="frontPageTitle">SPORTY</h1>
     <h4 className="sportydiscription">A Sports Collectibles Shop</h4>
     <div className="buttons">
      <>
      <Link to="/products" className="gg-home"></Link>
       <Link to="/login" className="loginBtn">Login</Link>
       <Link to="/register" className="registerBtn">Register</Link>
       <button className="gg-shopping-cart"></button>
      </>
     </div>
    </nav>
    <Routes>
   
     <Route path="/products" element={<Products />} />
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
    </Routes>
   </div>
  </Router>
    
  
  );
};

export default App;
