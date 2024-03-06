import React from 'react';
import { useQuery, getTopSongs } from 'wasp/client/operations';




const LeaderboardPage = () => {
  const { data: songs, isLoading, error } = useQuery(getTopSongs);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Top Songs</h1>
      {songs.map((song, index) => (
        <div key={song.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{index + 1}. {song.title}</div>
          <div>by {song.artist}</div>
          <div>ELO: {song.eloRating}</div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardPage;
