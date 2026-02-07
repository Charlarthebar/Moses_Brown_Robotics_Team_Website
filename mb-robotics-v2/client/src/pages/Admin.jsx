import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useToast } from '../components/Toast';

export default function Admin() {
  const addToast = useToast();
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('team');

  // Data states
  const [teamMembers, setTeamMembers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Form states
  const [teamForm, setTeamForm] = useState({ name: '', role: '', grade: '', team: '', bio: '', photo_url: '', display_order: 0 });
  const [tournamentForm, setTournamentForm] = useState({ name: '', date: '', location: '', placement: '', awards: '', notes: '' });
  const [blogForm, setBlogForm] = useState({ title: '', content: '', author: 'Team 1784', published: true });

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        addToast('Logged in!', 'success');
      } else {
        addToast(data.error || 'Login failed', 'error');
      }
    } catch { addToast('Login error', 'error'); }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
  };

  // Fetch data when logged in
  useEffect(() => {
    if (!token) return;
    const fetchAll = async () => {
      try {
        const [t, tr, b, c] = await Promise.all([
          fetch('/api/team').then(r => r.json()),
          fetch('/api/tournaments').then(r => r.json()),
          fetch('/api/blog').then(r => r.json()),
          fetch('/api/contact', { headers }).then(r => r.json()),
        ]);
        if (Array.isArray(t)) setTeamMembers(t);
        if (Array.isArray(tr)) setTournaments(tr);
        if (Array.isArray(b)) setBlogPosts(b);
        if (Array.isArray(c)) setContacts(c);
      } catch {}
    };
    fetchAll();
  }, [token]);

  const addTeamMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/team', { method: 'POST', headers, body: JSON.stringify(teamForm) });
      if (res.ok) {
        const member = await res.json();
        setTeamMembers([...teamMembers, member]);
        setTeamForm({ name: '', role: '', grade: '', team: '', bio: '', photo_url: '', display_order: 0 });
        addToast('Team member added!', 'success');
      }
    } catch { addToast('Error adding member', 'error'); }
  };

  const deleteTeamMember = async (id) => {
    await fetch(`/api/team/${id}`, { method: 'DELETE', headers });
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    addToast('Deleted', 'success');
  };

  const addTournament = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tournaments', { method: 'POST', headers, body: JSON.stringify(tournamentForm) });
      if (res.ok) {
        const t = await res.json();
        setTournaments([t, ...tournaments]);
        setTournamentForm({ name: '', date: '', location: '', placement: '', awards: '', notes: '' });
        addToast('Tournament added!', 'success');
      }
    } catch { addToast('Error adding tournament', 'error'); }
  };

  const deleteTournament = async (id) => {
    await fetch(`/api/tournaments/${id}`, { method: 'DELETE', headers });
    setTournaments(tournaments.filter(t => t.id !== id));
    addToast('Deleted', 'success');
  };

  const addBlogPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blog', { method: 'POST', headers, body: JSON.stringify(blogForm) });
      if (res.ok) {
        const p = await res.json();
        setBlogPosts([p, ...blogPosts]);
        setBlogForm({ title: '', content: '', author: 'Team 1784', published: true });
        addToast('Post created!', 'success');
      }
    } catch { addToast('Error creating post', 'error'); }
  };

  const deleteBlogPost = async (id) => {
    await fetch(`/api/blog/${id}`, { method: 'DELETE', headers });
    setBlogPosts(blogPosts.filter(p => p.id !== id));
    addToast('Deleted', 'success');
  };

  if (!token) {
    return (
      <PageTransition>
        <Helmet><title>Admin Login - MB Robotics</title></Helmet>
        <section className="page-header section-dark">
          <h1>Admin Panel</h1>
          <span className="section-label">Authentication Required</span>
        </section>
        <section className="section section-dark">
          <div className="section-container" style={{ maxWidth: '400px' }}>
            <form className="contact-form" onSubmit={handleLogin}>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" required value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
              <button type="submit">Log In</button>
            </form>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet><title>Admin Dashboard - MB Robotics</title></Helmet>
      <section className="page-header section-dark">
        <h1>Admin Dashboard</h1>
        <button className="btn-secondary" onClick={logout} style={{ marginTop: '1rem' }}>Log Out</button>
      </section>
      <section className="section section-dark">
        <div className="section-container">
          <div className="admin-tabs">
            {['team', 'tournaments', 'blog', 'contacts'].map(tab => (
              <button key={tab} className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            ))}
          </div>

          {activeTab === 'team' && (
            <div className="admin-section">
              <h2>Team Members</h2>
              <form className="admin-form" onSubmit={addTeamMember}>
                <input placeholder="Name" required value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} />
                <input placeholder="Role (e.g. Captain)" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} />
                <input placeholder="Grade" value={teamForm.grade} onChange={e => setTeamForm({...teamForm, grade: e.target.value})} />
                <input placeholder="Team (e.g. 1784X)" value={teamForm.team} onChange={e => setTeamForm({...teamForm, team: e.target.value})} />
                <input placeholder="Photo URL" value={teamForm.photo_url} onChange={e => setTeamForm({...teamForm, photo_url: e.target.value})} />
                <textarea placeholder="Bio" value={teamForm.bio} onChange={e => setTeamForm({...teamForm, bio: e.target.value})} />
                <button type="submit">Add Member</button>
              </form>
              <div className="admin-list">
                {teamMembers.map(m => (
                  <div key={m.id} className="admin-item">
                    <span><strong>{m.name}</strong> — {m.role} ({m.team})</span>
                    <button className="btn-danger" onClick={() => deleteTeamMember(m.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div className="admin-section">
              <h2>Tournaments</h2>
              <form className="admin-form" onSubmit={addTournament}>
                <input placeholder="Tournament Name" required value={tournamentForm.name} onChange={e => setTournamentForm({...tournamentForm, name: e.target.value})} />
                <input type="date" required value={tournamentForm.date} onChange={e => setTournamentForm({...tournamentForm, date: e.target.value})} />
                <input placeholder="Location" value={tournamentForm.location} onChange={e => setTournamentForm({...tournamentForm, location: e.target.value})} />
                <input placeholder="Placement" value={tournamentForm.placement} onChange={e => setTournamentForm({...tournamentForm, placement: e.target.value})} />
                <input placeholder="Awards" value={tournamentForm.awards} onChange={e => setTournamentForm({...tournamentForm, awards: e.target.value})} />
                <textarea placeholder="Notes" value={tournamentForm.notes} onChange={e => setTournamentForm({...tournamentForm, notes: e.target.value})} />
                <button type="submit">Add Tournament</button>
              </form>
              <div className="admin-list">
                {tournaments.map(t => (
                  <div key={t.id} className="admin-item">
                    <span><strong>{t.name}</strong> — {t.placement}</span>
                    <button className="btn-danger" onClick={() => deleteTournament(t.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="admin-section">
              <h2>Blog Posts</h2>
              <form className="admin-form" onSubmit={addBlogPost}>
                <input placeholder="Title" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                <input placeholder="Author" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} />
                <textarea placeholder="Content" rows={5} required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                <label style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm({...blogForm, published: e.target.checked})} /> Published
                </label>
                <button type="submit">Create Post</button>
              </form>
              <div className="admin-list">
                {blogPosts.map(p => (
                  <div key={p.id} className="admin-item">
                    <span><strong>{p.title}</strong> by {p.author}</span>
                    <button className="btn-danger" onClick={() => deleteBlogPost(p.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="admin-section">
              <h2>Contact Submissions</h2>
              <div className="admin-list">
                {contacts.map(c => (
                  <div key={c.id} className="admin-item contact-item">
                    <div>
                      <strong>{c.name}</strong> ({c.email})
                      <p>{c.message}</p>
                      <small>{new Date(c.created_at).toLocaleString()}</small>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No contact submissions yet.</p>}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
