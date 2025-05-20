import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <section>
      <h2>NavBar</h2>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/AboutUs'>AboutUs</Link></li>
        <li><Link to='/Shipping'>Shipping</Link></li>
        <li><Link to='/Services'>Services</Link></li>
        <li><Link to='/ContactUs'>ContactUs</Link></li>
    </ul>
    </section>
  );
};

export default NavBar;