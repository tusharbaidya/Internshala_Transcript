import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2, Clock, Star } from 'lucide-react';
import { getHistory, getAnalysis, deleteAnalysis } from '../utils/api.js';
import AnalysisResult from '../components/AnalysisResult.jsx';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [loadingItem, setLoadingItem] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await getHistory();
      setHistory(data);
    } catch (err) {
      setError('Could not load history. Is MongoDB running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (item) => {
    setSelected(item._id);
    setLoadingItem(true);
    try {
      const { data } = await getAnalysis(item._id);
      setSelectedData(data);
    } catch (err) {
      setError('Could not load this analysis.');
    } finally {
      setLoadingItem(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteAnalysis(id);
    setHistory((prev) => prev.filter((h) => h._id !== id));
    if (selected === id) {
      setSelected(null);
      setSelectedData(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-ink-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* History list */}
      <div className="space-y-3">
        <h2 className="font-display text-2xl text-ink-900">Past Analyses</h2>
        {error && (
          <p className="text-sm text-clay-500 bg-clay-400/10 border border-clay-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {history.length === 0 ? (
          <div className="card p-8 text-center text-ink-400">
            <p className="font-display text-lg">No analyses yet</p>
            <p className="text-sm mt-1">Run your first analysis on the Analyze tab.</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelect(item)}
              className={`card p-4 cursor-pointer transition-all hover:border-ink-400 ${
                selected === item._id ? 'ring-2 ring-ink-900 border-ink-900' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3.5 h-3.5 text-ink-400" />
                    <span className="font-medium text-ink-800 text-sm">
                      Score: {item.rubricScore?.score ?? '—'}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-400">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {item.kpiMapping?.slice(0, 2).map((k, i) => (
                      <span key={i} className="text-xs bg-ink-100 text-ink-600 px-2 py-0.5 rounded-full">
                        {k.kpi}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(e, item._id)}
                  className="text-ink-300 hover:text-clay-500 transition-colors p-1 flex-shrink-0"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail view */}
      <div className="lg:col-span-2">
        {loadingItem ? (
          <div className="card p-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-ink-400" />
          </div>
        ) : selectedData ? (
          <AnalysisResult data={selectedData} />
        ) : (
          <div className="card p-10 text-center text-ink-300 min-h-80 flex flex-col items-center justify-center">
            <p className="font-display text-xl text-ink-400">Select an analysis</p>
            <p className="text-sm mt-1">Click any item on the left to view its full results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
