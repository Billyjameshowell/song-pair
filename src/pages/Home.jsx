import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4'>Welcome to Song Pair!</h1>
        <p className='text-lg mb-12'>Discover new music by comparing pairs of songs and deciding which one you like better.</p>
        <div className='flex justify-center gap-4'>
          <Link to='/vote' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Start Voting</Link>
          <Link to='/leaderboard' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>View Leaderboard</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;