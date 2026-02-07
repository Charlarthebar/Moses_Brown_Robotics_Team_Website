import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import Lightbox from '../components/Lightbox';

const photos = [
  { src: '/images/2023-24TeamMediaDay.JPG', alt: 'Team at Media Day 2024', caption: 'Media Day (2024)' },
  { src: '/images/2023-24TeamAtRegionals.JPG', alt: 'Team at Southern New England Regionals', caption: 'At Southern New England Regionals (2024)' },
  { src: '/images/2023-24TeamOnStairs.JPG', alt: 'Team on Y-Lab stairs', caption: 'At home base, on Y-Lab stairs (2023)' },
  { src: '/images/2023-24TeamWorking.JPG', alt: 'Team working at tournament', caption: 'Team rigorously working at local tournament (2023)' },
  { src: '/images/GroundupTeamPhoto.jpg', alt: 'Ground up team photo at WPI', caption: 'Ground up Team Photo at WPI Tournament (2023)' },
  { src: '/images/TeamPhotoatWPI.jpg', alt: 'Team photo at WPI', caption: 'Team Photo at WPI Tournament (2023)' },
  { src: '/images/1784YTeam.jpg', alt: 'Team 1784Y at WPI', caption: 'Team 1784Y at WPI Tournament (2023)' },
  { src: '/images/WPIinaction.jpg', alt: 'Team 1784X competing at WPI', caption: 'Team 1784X at WPI Tournament (2023)' },
];

export default function MeetTheTeam() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <PageTransition>
      <Helmet>
        <title>Meet the Team - MB Robotics</title>
        <meta name="description" content="Meet the Moses Brown VEX Robotics Team 1784 - team photos and member showcase." />
        <meta property="og:title" content="Meet the Team - MB Robotics" />
        <meta property="og:description" content="Photos from tournaments and events by Moses Brown Robotics Team 1784." />
        <meta property="og:image" content="/images/2023-24TeamMediaDay.JPG" />
      </Helmet>

      <section className="page-header section-accent">
        <h1>Meet The Team</h1>
        <span className="section-label">Team Photos</span>
        <p className="page-subtitle">Moses Brown School Robotics Team (Team 1784)</p>
      </section>

      <section className="section section-accent">
        <div className="section-container">
          <div className="photo-grid">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="photo-card"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightboxIndex(i)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <p className="photo-caption">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </PageTransition>
  );
}
