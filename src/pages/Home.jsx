import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center text-white'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-8'>Welcome to Song Pair!</h1>
        <p className='text-lg mb-12'>Discover new music by comparing pairs of songs and deciding which one you like better.</p>
        <div className='flex justify-center gap-4 mb-12'>
          <Link to='/vote' className='btn btn-primary'>Start Voting</Link>
          <Link to='/leaderboard' className='btn btn-accent'>View Leaderboard</Link>
        </div>
        <h2 className='text-3xl font-bold mb-4'>What People are Saying</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Testimonial cards */}
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <p className='text-gray-900'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vestibulum leo id blandit. Integer nec urna ligula.</p>
            <p className='text-gray-500 mt-4'>- John Doe, Music Enthusiast</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <p className='text-gray-900'>Vivamus facilisis enim non nisi laoreet, eu interdum mi lacinia. Integer eu nulla ultrices, ullamcorper tortor vitae, suscipit nunc.</p>
            <p className='text-gray-500 mt-4'>- Jane Smith, Singer</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <p className='text-gray-900'>Nulla facilisi. Ut at pharetra ex. Morbi accumsan mi in massa malesuada, ut cursus tortor eleifend. </p>
            <p className='text-gray-500 mt-4'>- Michael Johnson, Music Producer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
