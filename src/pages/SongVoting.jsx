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
    <div className='p-4'>
      {songs.map((song, index) => (
        <div key={song.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{song.title}</div>
          <div>{song.artist}</div>
          <img src={song.albumArt} alt={song.title} className='w-32 h-32'/>
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
