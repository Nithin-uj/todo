import React from "react";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/path2" element={<Home/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
