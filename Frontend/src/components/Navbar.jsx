import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">WanderLust</h2>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Become a Host</a>
        <a href="#">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;

