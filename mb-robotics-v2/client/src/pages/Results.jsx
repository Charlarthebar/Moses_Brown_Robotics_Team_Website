import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const fallbackResults = [
  { id: 1, name: 'Southern New England Regionals', date: '2024-03-02', location: 'Providence, RI', placement: 'Quarterfinalist', awards: 'Design Award', notes: 'Strong autonomous performance' },
  { id: 2, name: 'WPI Invitational', date: '2023-12-09', location: 'Worcester, MA', placement: 'Round of 16', awards: null, notes: 'First tournament of the season' },
  { id: 3, name: 'Fall Classic', date: '2023-11-04', location: 'Moses Brown School', placement: 'Semifinalist', awards: 'Excellence Award', notes: 'Home tournament' },
];

export default function Results() {
  const [results, setResults] = useState(fallbackResults);

  useEffect(() => {
    fetch('/api/tournaments')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setResults(data); })
      .catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Tournament Results - MB Robotics</title>
        <meta name="description" content="Tournament results and awards for Moses Brown VEX Robotics Team 1784." />
        <meta property="og:title" content="Tournament Results - MB Robotics" />
        <meta property="og:description" content="Competition history and awards for Moses Brown Robotics." />
      </Helmet>

      <section className="page-header section-accent">
        <h1>Tournament Results</h1>
        <span className="section-label">Competition History</span>
        <p className="page-subtitle">Our performance across VEX Robotics tournaments</p>
      </section>

      <section className="section section-accent">
        <div className="section-container" style={{ maxWidth: '900px' }}>
          <div className="results-list">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <div className="result-header">
                  <h3>{result.name}</h3>
                  <span className="result-placement">{result.placement}</span>
                </div>
                <div className="result-details">
                  <span><i className="fas fa-calendar"></i> {formatDate(result.date)}</span>
                  <span><i className="fas fa-map-marker-alt"></i> {result.location}</span>
                  {result.awards && <span className="result-award"><i className="fas fa-trophy"></i> {result.awards}</span>}
                </div>
                {result.notes && <p className="result-notes">{result.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
