import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const fallbackEvents = [
  { id: 1, title: 'Regular Practice', event_date: '2025-02-11', event_time: '3:15 - 4:45 PM', location: 'Y-Lab', event_type: 'practice', description: 'Weekly practice session' },
  { id: 2, title: 'Regular Practice', event_date: '2025-02-12', event_time: '3:15 - 4:45 PM', location: 'Y-Lab', event_type: 'practice', description: 'Weekly practice session' },
  { id: 3, title: 'Regular Practice', event_date: '2025-02-13', event_time: '3:15 - 4:45 PM', location: 'Y-Lab', event_type: 'practice', description: 'Weekly practice session' },
  { id: 4, title: 'Southern NE Regional', event_date: '2025-03-01', event_time: '8:00 AM - 5:00 PM', location: 'TBD', event_type: 'tournament', description: 'Southern New England Regional Championship' },
  { id: 5, title: 'VEX Worlds Qualifier', event_date: '2025-04-05', event_time: '8:00 AM - 6:00 PM', location: 'TBD', event_type: 'tournament', description: 'VEX Robotics World Championship qualifier' },
];

const typeColors = {
  practice: '#28a745',
  tournament: '#dc3545',
  meeting: '#ffc107',
};

export default function Schedule() {
  const [events, setEvents] = useState(fallbackEvents);

  useEffect(() => {
    fetch('/api/schedule')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setEvents(data); })
      .catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Schedule - MB Robotics</title>
        <meta name="description" content="Practice times, tournaments, and upcoming events for Moses Brown Robotics." />
        <meta property="og:title" content="Schedule - MB Robotics" />
        <meta property="og:description" content="View the Moses Brown Robotics team schedule and upcoming events." />
      </Helmet>

      <section className="page-header section-dark">
        <h1>Schedule</h1>
        <span className="section-label">Upcoming Events</span>
        <p className="page-subtitle">Tuesdays, Wednesdays, Thursdays &mdash; 3:15 - 4:45 PM</p>
      </section>

      <section className="section section-dark">
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <div className="schedule-legend">
            <span><i className="fas fa-circle" style={{ color: typeColors.practice }}></i> Practice</span>
            <span><i className="fas fa-circle" style={{ color: typeColors.tournament }}></i> Tournament</span>
            <span><i className="fas fa-circle" style={{ color: typeColors.meeting }}></i> Meeting</span>
          </div>
          <div className="schedule-list">
            {events.map((event) => (
              <div key={event.id} className="schedule-card">
                <div className="schedule-type-bar" style={{ backgroundColor: typeColors[event.event_type] || '#6c757d' }}></div>
                <div className="schedule-info">
                  <h3>{event.title}</h3>
                  <p className="schedule-date">
                    <i className="fas fa-calendar"></i> {formatDate(event.event_date)}
                  </p>
                  <p className="schedule-time">
                    <i className="fas fa-clock"></i> {event.event_time}
                  </p>
                  <p className="schedule-location">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </p>
                  {event.description && <p className="schedule-desc">{event.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
