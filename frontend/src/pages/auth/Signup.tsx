import React, { useEffect, useState } from "react";
import { signup } from "../../services/auth.service";
import "./auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await signup(name, email, password);
      localStorage.setItem("token", data.token);
      setSuccess("Account created. You are now signed in.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-hero">
          <h1>Create your BillFlow workspace.</h1>
          <p>Build a secure home for your invoices, receipts, and monthly insights.</p>
          <div className="auth-hero-badges">
            <div className="auth-hero-badge">Smart analytics</div>
            <div className="auth-hero-badge">Collaborative ready</div>
            <div className="auth-hero-badge">Encrypted storage</div>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12h16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h2>Sign up</h2>
          <p>Start with a free account and upgrade anytime.</p>
          {error && <div className="auth-alert error">{error}</div>}
          {success && <div className="auth-alert success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="auth-actions">
              <button className="auth-button" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Signup"}
              </button>
              <a className="auth-link" href="/login">
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
