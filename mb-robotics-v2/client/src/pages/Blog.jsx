import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const fallbackPosts = [
  {
    id: 1, title: 'Welcome to Moses Brown Robotics!', author: 'Team 1784',
    created_at: '2024-10-01T00:00:00',
    content: 'We are excited to launch our new website! This season, we are competing in VEX Robotics High Stakes with three teams: 1784X, 1784Y, and 1784Z. Stay tuned for tournament recaps, build updates, and more.',
  },
  {
    id: 2, title: 'High Stakes Season Kickoff', author: 'Team 1784',
    created_at: '2024-09-15T00:00:00',
    content: 'The 2024-2025 VEX Robotics season has officially begun! This year\'s game, High Stakes, challenges us to score rings on stakes, position mobile goals, and climb a central ladder. Our teams have already started prototyping their robots in the Y-Lab.',
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setPosts(data); })
      .catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Blog - MB Robotics</title>
        <meta name="description" content="News, tournament recaps, and updates from Moses Brown Robotics Team 1784." />
        <meta property="og:title" content="Blog - MB Robotics" />
        <meta property="og:description" content="Latest news and updates from the Moses Brown VEX Robotics team." />
      </Helmet>

      <section className="page-header section-dark">
        <h1>Blog</h1>
        <span className="section-label">News & Updates</span>
        <p className="page-subtitle">Tournament recaps, build logs, and team news</p>
      </section>

      <section className="section section-dark">
        <div className="section-container" style={{ maxWidth: '800px' }}>
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-meta">
                <span className="blog-date"><i className="fas fa-calendar"></i> {formatDate(post.created_at)}</span>
                <span className="blog-author"><i className="fas fa-user"></i> {post.author}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
