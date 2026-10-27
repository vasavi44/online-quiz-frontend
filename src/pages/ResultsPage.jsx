import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, RotateCcw, Clock, LayoutDashboard, AlertCircle } from 'lucide-react';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizResult = location.state?.quizResult;

  if (!quizResult) {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '600px', textAlign: 'center' }}>
        <div className="glass-card">
          <AlertCircle size={48} color="var(--primary-500)" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '12px' }}>No Active Quiz Result</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            It looks like you haven't submitted a quiz in this session yet. Take a quiz now to see your results!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/quiz" className="btn btn-primary">
              <RotateCcw size={16} /> Take Quiz
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              <LayoutDashboard size={16} /> Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage, questionResults } = quizResult;
  const incorrectCount = totalQuestions - score;

  const getScoreFeedback = () => {
    if (percentage >= 80) {
      return {
        title: 'Outstanding Performance! 🏆',
        message: 'Exceptional mastery across all computer science and web development topics.',
        color: 'var(--success-500)',
      };
    } else if (percentage >= 60) {
      return {
        title: 'Great Job! 👏',
        message: 'You have a solid foundation with good understanding of core concepts.',
        color: 'var(--primary-500)',
      };
    } else {
      return {
        title: 'Keep Practicing! 💡',
        message: 'Review the detailed answers below to master the concepts and retake the quiz.',
        color: 'var(--warning-500)',
      };
    }
  };

  const feedback = getScoreFeedback();

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      {/* Score Banner Card */}
      <div
        className="glass-card"
        style={{
          textAlign: 'center',
          padding: '40px 24px',
          marginBottom: '36px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--primary-gradient)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--primary-glow)',
            marginBottom: '18px',
          }}
        >
          <Award size={36} />
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: feedback.color }}>
          {feedback.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 28px auto' }}>
          {feedback.message}
        </p>

        {/* Score metrics */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              padding: '16px 28px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Final Score</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {score} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ {totalQuestions}</span>
            </div>
          </div>

          <div
            style={{
              padding: '16px 28px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Percentage</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-500)' }}>
              {percentage}%
            </div>
          </div>

          <div
            style={{
              padding: '16px 28px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Accuracy</div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
              <span className="pill pill-success">
                <CheckCircle2 size={13} /> {score} Correct
              </span>
              <span className="pill pill-danger">
                <XCircle size={13} /> {incorrectCount} Incorrect
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/quiz')}
            className="btn btn-primary"
            style={{ padding: '12px 28px' }}
          >
            <RotateCcw size={17} /> Retake Quiz
          </button>
          <Link to="/history" className="btn btn-secondary" style={{ padding: '12px 24px' }}>
            <Clock size={17} /> View History
          </Link>
          <Link to="/dashboard" className="btn btn-outline" style={{ padding: '12px 24px' }}>
            <LayoutDashboard size={17} /> Dashboard
          </Link>
        </div>
      </div>

      {/* Answer Review Section */}
      <div>
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '4px' }}>Question Breakdown & Answer Review</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Review correct answers and examine your selections below.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {questionResults && questionResults.map((qr, index) => {
            const isCorrect = qr.isCorrect;

            return (
              <div
                key={qr.questionId}
                className="glass-card"
                style={{
                  borderLeft: isCorrect ? '4px solid var(--success-500)' : '4px solid var(--error-500)',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: isCorrect ? 'var(--success-500)' : 'var(--error-500)',
                        color: '#fff',
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="pill pill-primary">{qr.topic || 'General'}</span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="pill pill-success">
                        <CheckCircle2 size={13} /> Correct Answer (+1)
                      </span>
                    ) : (
                      <span className="pill pill-danger">
                        <XCircle size={13} /> {qr.selectedOptionId ? 'Incorrect Answer (0)' : 'Not Answered (0)'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '18px', lineHeight: 1.5 }}>
                  {qr.questionText}
                </h3>

                {/* Options List with Visual Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {qr.options && qr.options.map((opt) => {
                    const isStudentChoice = qr.selectedOptionId === opt.id;
                    const isActualCorrect = opt.isCorrect;

                    let bg = 'rgba(255, 255, 255, 0.02)';
                    let border = '1px solid var(--border-subtle)';
                    let labelTag = null;

                    if (isActualCorrect) {
                      bg = 'rgba(16, 185, 129, 0.14)';
                      border = '1.5px solid var(--success-500)';
                      labelTag = (
                        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--success-500)', fontWeight: 700 }}>
                          ✓ Correct Answer
                        </span>
                      );
                    } else if (isStudentChoice && !isActualCorrect) {
                      bg = 'rgba(244, 63, 94, 0.14)';
                      border = '1.5px solid var(--error-500)';
                      labelTag = (
                        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--error-500)', fontWeight: 700 }}>
                          ✕ Your Answer (Incorrect)
                        </span>
                      );
                    }

                    return (
                      <div
                        key={opt.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: bg,
                          border: border,
                          transition: 'var(--transition)',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isActualCorrect ? '2px solid var(--success-500)' : (isStudentChoice ? '2px solid var(--error-500)' : '2px solid var(--border-subtle)'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: isActualCorrect ? 'var(--success-500)' : (isStudentChoice ? 'var(--error-500)' : 'transparent'),
                            color: '#fff',
                            fontSize: '0.75rem',
                          }}
                        >
                          {isActualCorrect ? '✓' : (isStudentChoice ? '✕' : '')}
                        </div>

                        <span
                          style={{
                            fontSize: '0.94rem',
                            fontWeight: isActualCorrect || isStudentChoice ? 600 : 400,
                            color: isActualCorrect ? '#34d399' : (isStudentChoice ? '#fb7185' : '#d1d5db'),
                          }}
                        >
                          {opt.optionText}
                        </span>

                        {labelTag}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
