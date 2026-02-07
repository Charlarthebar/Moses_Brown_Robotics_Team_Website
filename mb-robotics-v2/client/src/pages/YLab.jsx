import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import Lightbox from '../components/Lightbox';

const ylabImages = [
  { src: '/images/ylab2.jpeg', alt: 'Y-Lab workspace overview', caption: 'Y-Lab main workspace' },
  { src: '/images/ylab.jpeg', alt: 'Y-Lab tools and equipment', caption: 'Tools and equipment' },
  { src: '/images/ylab4.jpg', alt: 'Y-Lab 3D printers area', caption: '3D printing area' },
  { src: '/images/ylab5.jpg', alt: 'Y-Lab woodworking area', caption: 'Woodworking area' },
  { src: '/images/ylab6.jpg', alt: 'Y-Lab project display', caption: 'Project display' },
  { src: '/images/ylabroboticswall.jpg', alt: 'Y-Lab robotics wall', caption: 'Robotics wall display' },
  { src: '/images/ylab3.jpeg', alt: 'Y-Lab collaborative workspace', caption: 'Collaborative workspace' },
];

export default function YLab() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <PageTransition>
      <Helmet>
        <title>The Y-Lab - MB Robotics</title>
        <meta name="description" content="The Moses Brown School Y-Lab - a 5,000 sq ft makerspace home to the Robotics team." />
        <meta property="og:title" content="The Y-Lab - MB Robotics" />
        <meta property="og:description" content="Explore the Moses Brown Y-Lab makerspace with 3D printers, laser cutters, and more." />
        <meta property="og:image" content="/images/ylab2.jpeg" />
      </Helmet>

      <section className="page-header section-accent">
        <h1>The Y-Lab</h1>
        <span className="section-label">Where Does Robotics Take Place?</span>
        <p className="page-subtitle">The Moses Brown School Y-Lab</p>
      </section>

      <section className="section section-accent">
        <div className="section-container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <p className="body-text">
            Robotics takes place in the <strong>Moses Brown School Y-Lab.</strong> The Y-Lab is a maker space
            with materials and tools for creating prototypes to solve problems, and a home for project-based
            learning in STEM and beyond.
          </p>
          <p className="body-text">
            The Y-Lab at Moses Brown is a 5,000-square-foot makerspace designed to foster "Expert Thinking,"
            a skill essential for 21st-century success. Equipped with both high-tech tools like 3D printers
            and laser routers, as well as low-tech materials, the Y-Lab encourages students to creatively
            problem-solve, collaborate, and independently explore solutions to complex challenges.
          </p>
          <a
            href="https://www.mosesbrown.org/about/campus/y-lab"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit the Official Y-Lab Page <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </section>

      <section className="section section-accent" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <div className="photo-grid three-col">
            {ylabImages.map((img, i) => (
              <div
                key={i}
                className="photo-card"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightboxIndex(i)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <p className="photo-caption">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={ylabImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </PageTransition>
  );
}
