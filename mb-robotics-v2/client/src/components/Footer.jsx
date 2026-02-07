import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Moses Brown Robotics</h3>
          <p>Building a future of engineers since 2020.</p>
        </div>
        <div className="footer-links">
          <h4>Pages</h4>
          <Link to="/">Home</Link>
          <Link to="/game">The Game</Link>
          <Link to="/team">Meet the Team</Link>
          <Link to="/ylab">Y-Lab</Link>
        </div>
        <div className="footer-links">
          <h4>More</h4>
          <Link to="/schedule">Schedule</Link>
          <Link to="/results">Results</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/team/profiles">Team Profiles</Link>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Moses Brown Robotics Team 1784. All rights reserved.</p>
      </div>
    </footer>
  );
}
