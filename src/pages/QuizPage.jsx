import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizApi } from '../api/quizApi';
import Alert from '../components/Alert';
import { Send, AlertTriangle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: selectedOptionId }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await quizApi.getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load quiz questions. Please verify your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectOption = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalCount = questions.length;
  const isAllAnswered = totalCount > 0 && answeredCount === totalCount;

  const handleSubmitAttempt = (e) => {
    e.preventDefault();
    if (!isAllAnswered) {
      setConfirmSubmitOpen(true);
    } else {
      performSubmission();
    }
  };

  const performSubmission = async () => {
    setConfirmSubmitOpen(false);
    setSubmitting(true);
    setError('');

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedOptionId: selectedAnswers[q.id] || null,
      }));

      const result = await quizApi.submitQuiz(formattedAnswers);

      // Navigate to results page passing the evaluation result in router state
      navigate('/results', { state: { quizResult: result }, replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Quiz submission failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 16px auto', width: 36, height: 36 }}></div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading exam questions securely...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '600px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <AlertTriangle size={48} color="var(--error-500)" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '12px' }}>Unable to Load Quiz</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            <RotateCcw size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      {/* Sticky Progress Bar */}
      <div
        className="glass-card"
        style={{
          padding: '18px 24px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'sticky',
          top: '72px',
          zIndex: 90,
        }}
      >
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Exam Progress
          </span>
          <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>
            Answered {answeredCount} of {totalCount} Questions
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 240px', maxWidth: '360px' }}>
          <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', height: '10px', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${totalCount > 0 ? (answeredCount / totalCount) * 100 : 0}%`,
                height: '100%',
                background: 'var(--primary-gradient)',
                borderRadius: '9999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-500)', minWidth: '40px' }}>
            {totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0}%
          </span>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Confirmation Modal if Unanswered Questions */}
      {confirmSubmitOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--warning-bg)',
                  color: 'var(--warning-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Unanswered Questions</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
              You have answered <strong>{answeredCount}</strong> out of <strong>{totalCount}</strong> questions.
              Unanswered questions will be evaluated as incorrect. Do you want to submit anyway?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setConfirmSubmitOpen(false)}
              >
                Review Answers
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={performSubmission}
                disabled={submitting}
              >
                {submitting ? <div className="spinner" style={{ width: 16, height: 16 }}></div> : 'Yes, Submit Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmitAttempt}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {questions.map((q, index) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;

            return (
              <div
                key={q.id}
                id={`question-${q.id}`}
                className="glass-card"
                style={{
                  borderLeft: isAnswered ? '4px solid var(--primary-500)' : '4px solid var(--border-subtle)',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: isAnswered ? 'var(--primary-500)' : 'var(--bg-tertiary)',
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
                    <span className="pill pill-primary">{q.topic || 'General'}</span>
                  </div>
                  {isAnswered ? (
                    <span style={{ fontSize: '0.82rem', color: 'var(--success-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> Selected
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Not answered</span>
                  )}
                </div>

                {/* Question Text */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '20px', lineHeight: 1.5 }}>
                  {q.questionText}
                </h3>

                {/* Options (Radio List) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {q.options.map((opt) => {
                    const isSelected = selectedAnswers[q.id] === opt.id;

                    return (
                      <label
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-md)',
                          background: isSelected ? 'rgba(99, 102, 241, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1.5px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                          userSelect: 'none',
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleSelectOption(q.id, opt.id)}
                          style={{
                            accentColor: 'var(--primary-500)',
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                          }}
                        />
                        <span style={{ fontSize: '0.96rem', color: isSelected ? '#ffffff' : '#d1d5db', fontWeight: isSelected ? 600 : 400 }}>
                          {opt.optionText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action Bar */}
        <div
          style={{
            marginTop: '36px',
            padding: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>Ready to complete your examination?</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {isAllAnswered
                ? 'All questions answered! Click submit to calculate your score.'
                : `${totalCount - answeredCount} question(s) remaining unanswered.`}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '1rem' }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18 }}></div>
                Calculating Score...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Quiz
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizPage;
