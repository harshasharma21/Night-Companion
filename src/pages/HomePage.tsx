import React from 'react';
import { Moon } from 'lucide-react';
import AuthModal from '../components/AuthModal';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-2">
            <Moon className="w-8 h-8" />
            <span className="text-2xl font-bold">NightCompanion</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="px-4 py-2 bg-white text-purple-900 rounded-lg hover:bg-white/90 transition font-medium"
            >
              Sign Up
            </button>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Never Adventure Alone
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Connect with like-minded companions for your nighttime adventures. Whether it's a late-night study session,
            evening jog, or social gathering, find your perfect companion here.
          </p>
          <button
            onClick={() => {
              setAuthMode('signup');
              setShowAuthModal(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(mode => (mode === 'signin' ? 'signup' : 'signin'))}
      />
    </div>
  );
}