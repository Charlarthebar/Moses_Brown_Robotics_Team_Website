import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const fallbackProfiles = [
  { name: 'Team 1784X', role: 'Senior Team', grade: '12th', team: '1784X', bio: 'The senior team brings years of experience in VEX Robotics competition, leading the program with mentorship and advanced engineering.', photo_url: '/images/WPIinaction.jpg' },
  { name: 'Team 1784Y', role: 'Junior Team', grade: '11th', team: '1784Y', bio: 'The junior team combines growing expertise with fresh perspectives, consistently improving their competitive performance.', photo_url: '/images/1784YTeam.jpg' },
  { name: 'Team 1784Z', role: 'Freshman Team', grade: '9th', team: '1784Z', bio: 'The newest team members are eager learners, building their skills in engineering and programming from the ground up.', photo_url: '/images/2023-24TeamOnStairs.JPG' },
];

export default function TeamProfiles() {
  const [profiles, setProfiles] = useState(fallbackProfiles);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProfiles(data);
      })
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Team Profiles - MB Robotics</title>
        <meta name="description" content="Meet the individual teams and members of Moses Brown Robotics Team 1784." />
        <meta property="og:title" content="Team Profiles - MB Robotics" />
        <meta property="og:description" content="Individual profiles of Moses Brown VEX Robotics team members." />
      </Helmet>

      <section className="page-header section-dark">
        <h1>Team Profiles</h1>
        <span className="section-label">Our Teams</span>
        <p className="page-subtitle">The people behind the robots</p>
      </section>

      <section className="section section-dark">
        <div className="section-container">
          <div className="profiles-grid">
            {profiles.map((member, i) => (
              <div key={member.id || i} className="profile-card">
                <div className="profile-image-wrap">
                  <img src={member.photo_url || '/images/mosesbrownsymbol.avif'} alt={member.name} />
                </div>
                <div className="profile-info">
                  <h3>{member.name}</h3>
                  <span className="profile-role">{member.role}</span>
                  {member.team && <span className="profile-team">{member.team}</span>}
                  {member.grade && <span className="profile-grade">Grade {member.grade}</span>}
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
