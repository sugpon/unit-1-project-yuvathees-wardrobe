import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src="/images/yuvatheesfull.png" alt="Yuvathees Wardrobe Logo" />
      </div>
      <div className = "header-2">
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/aboutus">About Us</a>
          <a href="/services">Services</a>
          <a href="/shipping">Shipping</a>
          <a href="/contactus">Contact Us</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
