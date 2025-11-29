import "./LoginPage.css"
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const username = location.state?.loggedInUsername
  return (
    <div>Welcome, {username}</div>
  );
}
