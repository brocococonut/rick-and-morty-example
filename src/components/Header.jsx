import React from 'react';
import { Link } from "react-router-dom";

export default function Header () {
  return (
    <header className="sticky">
      <Link to="/" className="logo">Home</Link>
    </header>
  )
}
