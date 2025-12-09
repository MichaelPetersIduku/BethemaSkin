import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      toast.success('Welcome back, admin!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Admin Login</h1>
          <p className="text-neutral-600">Sign in to manage Bethema Skin</p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-neutral-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3 hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-1">Demo credentials:</p>
            <p className="text-sm">Username: <span className="font-mono">admin</span></p>
            <p className="text-sm">Password: <span className="font-mono">admin123</span></p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
