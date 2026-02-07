import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <section className="page-404">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </section>
    </PageTransition>
  );
}
