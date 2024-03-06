import React from 'react';
import { useQuery, useAction, getTwoSongs, updateSongRating } from 'wasp/client/operations';

const SongVotingPage = () => {
  const { data: songs, isLoading, error } = useQuery(getTwoSongs);
  const updateSongRatingFn = useAction(updateSongRating);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const voteForSong = (preferredSongId) => {
    const [song1, song2] = songs;
    updateSongRatingFn({ song1Id: song1.id, song2Id: song2.id, preferredSongId });
  };

  return (
    // Use 'md:flex' to make the container a flexbox on medium screens and larger
    <div className='p-4 md:flex md:justify-center md:space-x-8'>
      {songs.map((song, index) => (
        // Cards take full width on mobile, half width on desktop
        <div key={song.id} className='bg-gray-100 p-4 mb-4 md:mb-0 md:w-1/2 rounded-lg flex flex-col items-center'>
          <div className='mb-2 text-lg font-bold'>{song.title}</div>
          <div className='mb-2 text-gray-600'>{song.artist}</div>
          <div className='mb-4 text-gray-600'>Current ELO: {song.eloRating}</div>
          <img src={song.albumArt} alt={song.title} className='w-32 h-32 mb-4'/>
          <button
            onClick={() => voteForSong(song.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Pick this song
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongVotingPage;
