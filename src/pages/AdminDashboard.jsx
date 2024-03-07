import React, { useState, useEffect } from 'react';
import { useAction, useQuery, addSong, getAllSongs, saveUserSongSelections } from 'wasp/client/operations';

const AdminDashboardPage = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const addSongFn = useAction(addSong);
  const saveUserSongSelectionsFn = useAction(saveUserSongSelections);
  const { data: songs, error: songsError, isLoading: songsLoading } = useQuery(getAllSongs);

  useEffect(() => {
    if (songsError) {
      alert('Error loading songs');
    }
  }, [songsError]);

  const handleAddSong = async () => {
    try {
      await addSongFn({ title, artist, albumArt });
      setTitle('');
      setArtist('');
      setAlbumArt('');
      alert('Song added successfully!');
      // Optionally, refresh the song list if not auto-updated
    } catch (error) {
      alert('Failed to add song: ' + error.message);
    }
  };

  const handleSongSelectionChange = (songId) => {
    setSelectedSongIds(prevSelectedSongIds =>
      prevSelectedSongIds.includes(songId)
        ? prevSelectedSongIds.filter(id => id !== songId)
        : [...prevSelectedSongIds, songId]
    );
  };

  const saveSelections = async () => {
    try {
      await saveUserSongSelectionsFn({ selectedSongIds });
      alert('Selections saved successfully!');
    } catch (error) {
      alert('Failed to save selections: ' + error.message);
    }
  };

  if (songsLoading) return <div>Loading songs...</div>;

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h2 className='text-2xl font-bold mb-4'>Add New Song</h2>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Song title</span>
          </label>
          <input
            type='text'
            placeholder='Song title'
            className='input input-bordered w-full mb-4'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Artist name</span>
          </label>
          <input
            type='text'
            placeholder='Artist name'
            className='input input-bordered w-full mb-4'
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Album Art URL</span>
          </label>
          <input
            type='text'
            placeholder='Album Art URL'
            className='input input-bordered w-full mb-4'
            value={albumArt}
            onChange={(e) => setAlbumArt(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddSong}
          className='btn btn-primary'
        >
          Add Song
        </button>
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-4'>Manage Songs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {songs?.map((song) => (
            <div key={song.id} className='card bg-card-bg shadow-xl'>
              <figure className='px-10 pt-10'>
                <img src={song.albumArt} alt="Album Art" className='rounded-xl' />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title'>{song.title}</h2>
                <p>{song.artist}</p>
                <div className='card-actions'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Select Song</span> 
                    <input 
                      type='checkbox' 
                      className='checkbox checkbox-primary' 
                      checked={selectedSongIds.includes(song.id)} 
                      onChange={() => handleSongSelectionChange(song.id)} 
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={saveSelections}
          className='btn btn-primary mt-4'
        >
          Save Selections
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
