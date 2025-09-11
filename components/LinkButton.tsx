import React from 'react';

interface LinkButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl shadow-lg p-3 sm:p-4 my-2 flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-white/30 hover:to-white/20 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <div className="w-8 h-8 flex-shrink-0">{icon}</div>
      <span className="flex-grow text-center font-semibold text-sm sm:text-base tracking-wider">{text}</span>
    </button>
  );
};

export default LinkButton;
