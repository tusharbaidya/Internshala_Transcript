import { Outlet, NavLink } from 'react-router-dom';
import { Brain, History, Zap } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-ink-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink-900 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-ink-50" />
            </div>
            <div>
              <span className="font-display text-lg text-ink-900 leading-none block">Fellow Analyzer</span>
              <span className="text-xs text-ink-400 leading-none">DeepThought Assessment Tool</span>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100'
                }`
              }
            >
              <Zap className="w-3.5 h-3.5" />
              Analyze
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100'
                }`
              }
            >
              <History className="w-3.5 h-3.5" />
              History
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-ink-400">Powered by Ollama · llama3.2</span>
          <span className="text-xs text-ink-400">⚠ AI output is a draft — always apply your own judgment</span>
        </div>
      </footer>
    </div>
  );
}
