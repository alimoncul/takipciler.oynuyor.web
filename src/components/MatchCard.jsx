import React from 'react';

const MatchCard = ({ match, onSelect, isSelected }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('tr-TR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWinner = () => {
    return match.standings?.[0];
  };


  const getMatchDuration = () => {
    if (!match.standings?.[0]?.survivedFor) return 'Unknown';
    return match.standings[0].survivedFor.formatted;
  };

  const winner = getWinner();

  return (
    <div
      onClick={() => onSelect(match)}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${isSelected
        ? 'border-game-primary shadow-lg shadow-game-primary/20'
        : 'border-transparent hover:border-gray-600 hover:bg-gray-700/50'
        }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">
              {match.totalPlayers}
            </h3>
            <h3 className="text-lg font-semibold text-white">
              Oyuncu
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(match.timestamp)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="px-2 py-1 bg-game-primary rounded-full text-xs font-medium">
            Kinetik Çarpışma
          </span>
          {winner && (
            <div className="flex items-center gap-3 bg-yellow-500/20 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-yellow-300 font-medium">KAZANAN</p>
                  <p className="text-sm font-semibold text-white truncate max-w-32">
                    {winner.displayName || winner.username}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;