import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";
import ExtraPage from "./components/ExtraPage";
import Fibonacci from "./components/Fib";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/extrapage">Extra Page</Link>
          <Routes>
          <Route path="/" element={<Fibonacci />} />
          <Route path="/extrapage" element={<ExtraPage />} />
          </Routes>
          </header>
      </div>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
