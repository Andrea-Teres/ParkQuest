import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import NavBar from "/components/NavBar";
import Login from "/pages/Login";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Login />
    </div>
  );
}

export default App;