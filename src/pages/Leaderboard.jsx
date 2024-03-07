import React from 'react';
import { useQuery, getTopSongs } from 'wasp/client/operations';

const LeaderboardPage = () => {
  const { data: songs, isLoading, error } = useQuery(getTopSongs);

  if (isLoading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-500'>Error: {error}</div>;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold text-center mb-6 text-white'>Top Songs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {songs?.map((song, index) => (
          <div key={song.id} className='card bg-card-bg shadow-xl hover:shadow-2xl transition-shadow'>
            <div className='card-body'>
              <span className={`badge badge-lg ${index < 3 ? 'badge-secondary' : 'badge-primary'} mr-2`}>{index + 1}</span>
              <h2 className='card-title text-xl'>
                {song.title}
              </h2>
              <p className='text-md text-gray-400'>by {song.artist}</p>
              <p className='badge badge-outline badge-lg'> ELO: {song.eloRating} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
