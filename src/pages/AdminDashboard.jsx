import React, { useState } from 'react';
import { useAction, addSong } from 'wasp/client/operations';

const AdminDashboardPage = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const addSongFn = useAction(addSong);

  const handleAddSong = () => {
    addSongFn({ title, artist, albumArt });
    setTitle('');
    setArtist('');
    setAlbumArt('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Song title'
        className='px-2 py-2 border rounded text-lg mb-4'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Artist name'
        className='px-2 py-2 border rounded text-lg mb-4'
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type='text'
        placeholder='Album Art URL'
        className='px-2 py-2 border rounded text-lg mb-4'
        value={albumArt}
        onChange={(e) => setAlbumArt(e.target.value)}
      />
      <button
        onClick={handleAddSong}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Add Song
      </button>
    </div>
  );
}

export default AdminDashboardPage;