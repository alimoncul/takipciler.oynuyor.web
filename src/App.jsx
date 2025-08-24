import React, { useState } from 'react';
import { useMatchData } from './hooks/useMatchData';
import MatchCard from './components/MatchCard';
import MatchDetails from './components/MatchDetails';
import DateFilter from './components/DateFilter';
import PlayerAvatar from './components/PlayerAvatar';
import page_logo from './assets/page_logo.png';

function App() {
  const { matches, loading, error, getMatchesByDate, getAvailableDates } = useMatchData();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredMatches = getMatchesByDate(selectedDate);
  const availableDates = getAvailableDates();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedMatch(null); // Clear selected match when changing date
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-game-primary mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Maç geçmişi yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-red-500/10 border border-red-500/20 rounded-xl p-8">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 14.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-red-400 text-lg font-semibold mb-2">Maçlar Yüklenirken Hata</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-4 mb-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-black rounded-full p-3">
                <img src={page_logo} alt="Logo" className="w-20 h-20" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Maç Geçmişi
              </h1>
            </div>

            {/* Brand Link */}
            <div className="flex items-center gap-2 text-game-primary hover:text-game-secondary transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-mono tracking-wider"><a href='https://www.instagram.com/takipciler.oynuyor/'>takipciler.oynuyor</a></span>
            </div>
          </div>
          <p className="text-gray-400 text-lg">
            Yarışma sonuçlarınızı buradan detaylı görüntüleyin
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">Maç Bulunamadı</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Henüz hiç maç dosyası yok gibi görünüyor. Maç geçmişinizi burada görmek için birkaç oyun oynayın!
            </p>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-3">Beklenen Dosya Konumu:</h3>
              <code className="text-sm text-game-primary bg-gray-900/50 rounded-lg px-3 py-2 block">
                results/public/matches/*.json
              </code>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Panel - Match List */}
            <div className="xl:col-span-1">
              {/* Date Filter */}
              {availableDates.length > 1 && (
                <DateFilter
                  availableDates={availableDates}
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  onClear={handleClearDate}
                />
              )}

              {/* Match Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    {selectedDate ? 'Seçilen Tarihteki Maçlar' : 'Son Maçlar'}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {filteredMatches.length} maç
                  </span>
                </div>

                {filteredMatches.length === 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400">Seçilen tarihte maç bulunamadı</p>
                  </div>
                ) : (
                  filteredMatches.map((match, index) => (
                    <MatchCard
                      key={match.fileName || index}
                      match={match}
                      onSelect={handleMatchSelect}
                      isSelected={selectedMatch?.fileName === match.fileName}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right Panel - Match Details */}
            <div className="xl:col-span-2">
              <MatchDetails match={selectedMatch} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Maç Geçmişi Görüntüleyici</p>
          <p className="mt-1">
            React, Vite ve Tailwind CSS ile Alim Öncül tarafından geliştirildi
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;