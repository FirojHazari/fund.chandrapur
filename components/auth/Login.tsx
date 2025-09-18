
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password?: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-cyan-400 tracking-wider">
              COMMUNITY FUND NEXUS
            </h1>
            <p className="text-center text-slate-400 mt-2">Authorized Personnel Only</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer w-full bg-slate-900/50 border border-slate-700 text-cyan-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors duration-300"
                  placeholder="Username"
                  autoComplete="username"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-slate-900/50 border border-slate-700 text-cyan-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors duration-300"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;