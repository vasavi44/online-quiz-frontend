import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizApi } from '../api/quizApi';
import { PlayCircle, Award, Target, TrendingUp, CheckCircle, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await quizApi.getHistory();
        setHistory(data);
      } catch (err) {
        console.error('Failed to load history on dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const totalAttempts = history.length;
  const bestScore = totalAttempts > 0 ? Math.max(...history.map((h) => h.score)) : 0;
  const avgPercentage =
    totalAttempts > 0
      ? (history.reduce((acc, h) => acc + h.percentage, 0) / totalAttempts).toFixed(1)
      : '0.0';

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Welcome Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div className="pill pill-primary" style={{ marginBottom: '12px' }}>
            Student Dashboard
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>
            Hello, {user?.name || 'Student'}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '580px' }}>
            Ready to test your knowledge? Take multiple-choice quizzes, get instant server-evaluated scores, and review answers with full explanations.
          </p>
        </div>

        <Link
          to="/quiz"
          className="btn btn-primary"
          style={{ padding: '16px 32px', fontSize: '1.05rem', borderRadius: '16px' }}
        >
          <PlayCircle size={22} />
          Start Quiz Now
        </Link>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--primary-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Quizzes Taken</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{loading ? '...' : totalAttempts}</div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Target size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Best Score</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success-500)' }}>
                {loading ? '...' : totalAttempts > 0 ? `${bestScore} / 10` : '—'}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--warning-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Accuracy</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {loading ? '...' : totalAttempts > 0 ? `${avgPercentage}%` : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Rules & Overview */}
      <div className="glass-card">
        <h2 style={{ fontSize: '1.35rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={20} color="var(--primary-500)" />
          Quiz Rules & Structure
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--success-500)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              <strong>10 Multiple-Choice Questions:</strong> Covers core Web Development, Java, SQL, React, and Data Structures.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--success-500)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              <strong>Single-Choice Answer:</strong> Select one best option per question. You can change your choice anytime before submitting.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--success-500)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              <strong>Strict Security:</strong> Correct answers are never sent to the browser prior to submission, preventing inspection cheating.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle size={18} color="var(--success-500)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              <strong>Instant Evaluation:</strong> The Spring Boot server calculates your score, percentage, and returns a question-by-question review.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
