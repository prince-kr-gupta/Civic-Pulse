import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Roads');
  const [submitting, setSubmitting] = useState(false);

  const fetchIssues = () => {
    fetch('/api/issues')
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching issues:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newIssue = {
      title,
      description,
      category,
      status: 'Pending'
    };

    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setCategory('Roads');
        fetchIssues();
      } else {
        alert('Failed to submit issue');
      }
    } catch (err) {
      console.error('Error submitting issue:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'roads': return 'badge badge-roads';
      case 'electricity': return 'badge badge-electricity';
      case 'sanitation': return 'badge badge-sanitation';
      case 'water': return 'badge badge-water';
      default: return 'badge badge-other';
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🏛️ Civic Pulse</h1>
        <p>Empowering communities through transparent issue tracking</p>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h3 className="card-title">Report New Issue</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Issue Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="form-input"
                placeholder="e.g., Streetlight out on 4th Ave"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                className="form-textarea"
                placeholder="Provide details about the problem..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="Roads">Roads</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Water">Water</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="submit-btn"
            >
              {submitting ? 'Submitting Report...' : 'Submit Report'}
            </button>
          </form>
        </div>

        <div>
          <div className="feed-header">
            <h2>Community Feed</h2>
            <span className="issue-count">{issues.length} Issues</span>
          </div>

          {loading ? (
            <p className="empty-state">Loading live feed...</p>
          ) : issues.length === 0 ? (
            <p className="empty-state">No community issues found.</p>
          ) : (
            <div className="issues-grid">
              {issues.map((issue) => (
                <div key={issue._id} className="issue-card">
                  <div>
                    <div className="issue-top">
                      <h4 className="issue-title">{issue.title}</h4>
                      <span className={getCategoryBadgeClass(issue.category)}>
                        {issue.category}
                      </span>
                    </div>
                    <p className="issue-desc">{issue.description}</p>
                  </div>
                  <div className="issue-footer">
                    <span>Status:</span>
                    <span className="status-badge">⏳ {issue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}