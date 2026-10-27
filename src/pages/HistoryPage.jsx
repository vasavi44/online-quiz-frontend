import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizApi } from '../api/quizApi';
import { Clock, Award, CheckCircle2, RotateCcw, Calendar, TrendingUp } from 'lucide-react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await quizApi.getHistory();
        setHistory(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quiz history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="pill pill-primary" style={{ marginBottom: '8px' }}>
            Academic Record
          </div>
          <h1 style={{ fontSize: '1.85rem' }}>Your Quiz Attempt History</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Review past scores, completion dates, and overall progress over time.
          </p>
        </div>

        <Link to="/quiz" className="btn btn-primary" style={{ padding: '12px 24px' }}>
          <RotateCcw size={16} /> Take New Quiz
        </Link>
      </div>

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 16px auto', width: 32, height: 32 }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading history records...</p>
        </div>
      ) : error ? (
        <div className="glass-card" style={{ textAlign: 'center', color: 'var(--error-500)', padding: '32px' }}>
          {error}
        </div>
      ) : history.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Award size={48} color="var(--primary-500)" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>No Quiz Attempts Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            You haven't completed any quizzes yet. Take your first quiz to record your progress!
          </p>
          <Link to="/quiz" className="btn btn-primary">
            Start Your First Quiz
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {history.map((attempt, index) => {
            const isHigh = attempt.percentage >= 80;
            const isMedium = attempt.percentage >= 60 && attempt.percentage < 80;

            return (
              <div
                key={attempt.id || index}
                className="glass-card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderLeft: isHigh
                    ? '4px solid var(--success-500)'
                    : isMedium
                    ? '4px solid var(--primary-500)'
                    : '4px solid var(--warning-500)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHigh ? 'var(--success-500)' : 'var(--primary-500)',
                      fontWeight: 700,
                    }}
                  >
                    #{history.length - index}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        Multiple Choice Examination
                      </span>
                      {isHigh ? (
                        <span className="pill pill-success">Mastery</span>
                      ) : isMedium ? (
                        <span className="pill pill-primary">Passed</span>
                      ) : (
                        <span className="pill" style={{ background: 'var(--warning-bg)', color: 'var(--warning-500)' }}>
                          Needs Practice
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Calendar size={13} />
                      {formatDate(attempt.submittedAt)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Score</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                      {attempt.score} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {attempt.totalQuestions}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '70px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Accuracy</div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        color: isHigh ? 'var(--success-500)' : 'var(--primary-500)',
                      }}
                    >
                      {attempt.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
