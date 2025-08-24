import React from 'react';

const PlayerAvatar = ({ username, size = 'md' }) => {
  const generateInitials = (username) => {
    if (!username) return '?';
    
    // Remove numbers and special characters, keep only letters
    const cleanName = username.replace(/[^a-zA-Z]/g, '');
    
    if (cleanName.length === 0) {
      // If no letters, use first character of original username
      return username.charAt(0).toUpperCase();
    }
    
    if (cleanName.length === 1) {
      return cleanName.toUpperCase();
    }
    
    // Take first and last meaningful character
    return (cleanName.charAt(0) + cleanName.charAt(cleanName.length - 1)).toUpperCase();
  };

  const generateColor = (username) => {
    if (!username) return '#6366f1';
    
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc',
      '#e879f9', '#ec4899', '#f43f5e', '#fb7185', '#fda4af'
    ];
    
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const initials = generateInitials(username);
  const backgroundColor = generateColor(username);

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm`}
      style={{ backgroundColor }}
      title={username}
    >
      {initials}
    </div>
  );
};

export default PlayerAvatar;