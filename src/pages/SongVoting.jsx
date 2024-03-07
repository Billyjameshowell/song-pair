import React from 'react';
import { useQuery, useAction, getTwoSongs, updateSongRating } from 'wasp/client/operations';

const SongVotingPage = () => {
  const { data: songs, isLoading, error } = useQuery(getTwoSongs);
  const updateSongRatingFn = useAction(updateSongRating);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const voteForSong = (preferredSongId) => {
    const [song1, song2] = songs;
    updateSongRatingFn({ song1Id: song1.id, song2Id: song2.id, preferredSongId });
  };

  return (
    <div className='p-4 flex flex-wrap justify-center gap-8'>
      {songs.map((song, index) => (
        <div key={song.id} className='card w-96 bg-card-bg shadow-xl'>
          <figure className='px-10 pt-10'>
            <img src={song.albumArt} alt={song.title} className='rounded-xl h-48 object-cover' />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>{song.title}</h2>
            <p>{song.artist}</p>
            <div className='text-gray-600 mb-4'>Current ELO: {song.eloRating}</div>
            <div className='card-actions'>
              <button
                onClick={() => voteForSong(song.id)}
                className='btn btn-primary'
              >
                Pick this song
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongVotingPage;
