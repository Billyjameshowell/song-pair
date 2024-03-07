import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center '> {/* Darker background */}
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4 text-white'>Welcome to Song Pair!</h1>
        <p className='text-lg mb-12 text-gray-300'>Discover new music by comparing pairs of songs and deciding which one you like better.</p>
        <div className='flex justify-center gap-4'>
          <Link to='/vote' className='btn btn-primary'>Start Voting</Link>
          <Link to='/leaderboard' className='btn btn-accent'>View Leaderboard</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
