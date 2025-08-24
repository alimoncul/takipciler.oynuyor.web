import React from 'react';

const DateFilter = ({ availableDates, selectedDate, onDateChange, onClear }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <label htmlFor="date-select" className="text-white font-medium">
            Tarihe Göre Filtrele:
          </label>
        </div>
        
        <div className="flex-1 flex items-center gap-3">
          <select
            id="date-select"
            value={selectedDate || ''}
            onChange={(e) => onDateChange(e.target.value || null)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent flex-1 sm:max-w-xs"
          >
            <option value="">Tüm Tarihler</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('tr-TR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </option>
            ))}
          </select>
          
          {selectedDate && (
            <button
              onClick={onClear}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 text-sm"
              title="Tarih filtresini temizle"
            >
              Temizle
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-400">
          {availableDates.length} maç günü mevcut
        </div>
      </div>
    </div>
  );
};

export default DateFilter;