import React, { useState } from 'react';
import PlayerAvatar from './PlayerAvatar';

const MatchDetails = ({ match }) => {
  const [activeTab, setActiveTab] = useState('standings');
  const [searchTerm, setSearchTerm] = useState('');

  if (!match) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center">
        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-400 text-lg">Detayları görmek için bir maç seçin</p>
      </div>
    );
  }

  const winner = match.standings?.[0];
  const topKillers = [...(match.standings || [])]
    .sort((a, b) => (b.eliminations || 0) - (a.eliminations || 0))
    .slice(0, 5);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'standings', label: 'Sıralama', icon: '🏆' },
    { id: 'stats', label: 'İstatistikler', icon: '📊' }
  ];

  // Filter standings based on search term
  const filteredStandings = match.standings?.filter(player => {
    const displayName = player.displayName || player.username || '';
    return displayName.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      {/* Match Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Kinetik Çarpışma - {match.totalPlayers} Oyuncu
            </h2>
            <p className="text-gray-400">{formatTime(match.timestamp)}</p>
          </div>

          {winner && (
            <div className="flex items-center gap-3 bg-yellow-500/20 rounded-lg px-4 py-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-yellow-300 font-medium text-sm">ŞAMPİYON</p>
                <p className="text-white font-semibold">
                  {winner.displayName || winner.username}
                </p>
                <p className="text-yellow-200 text-sm">
                  {winner.eliminations} eleme • {winner.survivedFor?.formatted}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Match Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-game-primary">{match.totalPlayers}</p>
            <p className="text-gray-400 text-sm">Oyuncu</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-400">
              {match.standings?.reduce((total, player) => total + (player.eliminations || 0), 0) || 0}
            </p>
            <p className="text-gray-400 text-sm">Eleme</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-400">
              {winner?.survivedFor?.formatted || 'N/A'}
            </p>
            <p className="text-gray-400 text-sm">Süre</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-400">
              {topKillers[0]?.eliminations || 0}
            </p>
            <p className="text-gray-400 text-sm">En Çok Öldüren</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 border-b-2 ${activeTab === tab.id
              ? 'border-game-primary text-game-primary'
              : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'standings' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-xl font-semibold text-white">Final Sıralaması</h3>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Oyuncu ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent w-full sm:w-64"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  title="Aramayı temizle"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStandings.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-400">
                  {searchTerm ? `"${searchTerm}" için sonuç bulunamadı` : 'Oyuncu bulunamadı'}
                </p>
              </div>
            ) : (
              filteredStandings.map((player, index) => {
                // Find original index for proper ranking
                const originalIndex = match.standings?.findIndex(p => p.username === player.username) || 0;
                return (
                  <div
                    key={`${player.username}-${index}`}
                    className={`flex items-center justify-between p-3 rounded-lg ${originalIndex === 0
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : originalIndex < 3
                        ? 'bg-gray-700/30'
                        : 'bg-gray-800/30'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${originalIndex === 0
                        ? 'bg-yellow-500 text-yellow-900'
                        : originalIndex === 1
                          ? 'bg-gray-400 text-gray-900'
                          : originalIndex === 2
                            ? 'bg-amber-600 text-amber-100'
                            : 'bg-gray-600 text-gray-200'
                        }`}>
                        {player.position || originalIndex + 1}
                      </div>

                      <PlayerAvatar username={player.username} size="sm" />

                      <div>
                        <p className="text-white font-medium">
                          {player.displayName || player.username}
                        </p>
                        {player.timeOfDeath && (
                          <p className="text-gray-400 text-sm">
                            {player.timeOfDeathFormatted?.elapsedTime}'de elendi
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-red-400 font-semibold">{player.eliminations || 0}</p>
                        <p className="text-gray-500">Öldürme</p>
                      </div>
                      <div className="text-center">
                        <p className="text-blue-400 font-semibold">
                          {player.survivedFor?.formatted || 'N/A'}
                        </p>
                        <p className="text-gray-500">Yaşadı</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Maç İstatistikleri</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Killers */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span>🗡️</span>
                En Çok Öldürenler
              </h4>
              <div className="space-y-2">
                {topKillers.slice(0, 5).map((player, index) => (
                  <div key={player.username} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <PlayerAvatar username={player.username} size="xs" />
                      <span className="text-white text-sm">{player.displayName || player.username}</span>
                    </div>
                    <span className="text-red-400 font-semibold">{player.eliminations || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Survival Stats */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span>⏱️</span>
                Yaşam İstatistikleri
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">En Uzun Yaşayan:</span>
                  <span className="text-green-400 font-semibold">
                    {winner?.survivedFor?.formatted || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">İlk Elenen:</span>
                  <span className="text-red-400 font-semibold">
                    {match.standings?.[match.standings.length - 1]?.survivedFor?.formatted || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ortalama Yaşam:</span>
                  <span className="text-blue-400 font-semibold">
                    {match.standings?.length > 0
                      ? `${Math.round(match.standings.reduce((sum, p) => sum + (p.survivedFor?.totalSeconds || 0), 0) / match.standings.length)}s`
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetails;