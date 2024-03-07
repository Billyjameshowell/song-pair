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
    <div className='p-4'>
      <div>
        <h2>Add New Song</h2>
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
      <div>
        <h2>Manage Songs</h2>
        {songs && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Album Art</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td><img src={song.albumArt} alt="Album Art" style={{ width: '50px', height: '50px' }} /></td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedSongIds.includes(song.id)}
                      onChange={() => handleSongSelectionChange(song.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          onClick={saveSelections}
          className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Save Selections
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
