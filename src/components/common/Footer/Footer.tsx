import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">Music Platform</h3>
            <p className="footer-description">
              Discover and share your favorite music.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/playlists/public" className="footer-link">Browse Playlists</Link>
              <Link to="/playlists/create" className="footer-link">Create Playlist</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; Who am i kidding i am not a lawyer. steal the whole site if you want.
          </p>
        </div>
      </footer>
  );
};

export { Footer };