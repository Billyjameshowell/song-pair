import { HttpError } from 'wasp/server'

export const addSong = async ({ title, artist, albumArt }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const newSong = await context.entities.Song.create({
    data: {
      title,
      artist,
      albumArt,
      userId: context.user.id
    }
  });
  return newSong;
}

export const updateSongRating = async ({ song1Id, song2Id, preferredSongId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const song1 = await context.entities.Song.findUnique({ where: { id: song1Id }});
  const song2 = await context.entities.Song.findUnique({ where: { id: song2Id }});

  if (!song1 || !song2 || ![song1.id, song2.id].includes(preferredSongId)) { throw new HttpError(400) };

  const newRatings = calculateElo(song1.eloRating, song2.eloRating, song1.id === preferredSongId);

  await context.entities.Song.update({ where: { id: song1Id }, data: { eloRating: newRatings[0] }});
  await context.entities.Song.update({ where: { id: song2Id }, data: { eloRating: newRatings[1] }});

  return {
    song1: await context.entities.Song.findUnique({ where: { id: song1Id }}),
    song2: await context.entities.Song.findUnique({ where: { id: song2Id }})
  };
}

function calculateElo(rating1, rating2, isPlayer1Winner) {
  const k = 32;
  const expectedScore1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  const expectedScore2 = 1 - expectedScore1;

  const newRating1 = isPlayer1Winner ? rating1 + k * (1 - expectedScore1) : rating1 + k * (0 - expectedScore1);
  const newRating2 = !isPlayer1Winner ? rating2 + k * (1 - expectedScore2) : rating2 + k * (0 - expectedScore2);

  return [Math.round(newRating1), Math.round(newRating2)];
}

// @src/actions.js

export const saveUserSongSelections = async ({ selectedSongIds }, context) => {
  if (!context.user) throw new HttpError(401, "User not authenticated");

  try {
    // First, find the current user to disconnect all existing selected songs
    const currentUser = await context.entities.User.findUnique({ where: { id: context.user.id } });
    if (!currentUser) throw new HttpError(404, "User not found");

    // Ensure selectedSongs is an array before proceeding
    currentUser.selectedSongs = currentUser.selectedSongs || [];

    // Disconnect existing selected songs
    await Promise.all(currentUser.selectedSongs.map(async (song) => {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          selectedSongs: { disconnect: { id: song.id } }
        }
      });
    }));

    // Connect the new selections
    await Promise.all(selectedSongIds.map(async (songId) => {
      await context.entities.User.update({
        where: { id: context.user.id },
        data: {
          selectedSongs: { connect: { id: songId } }
        }
      });
    }));

    return { success: true };
  } catch (error) {
    throw new HttpError(500, `Failed to save song selections: ${error.message}`);
  }
};



export const selectSong = async ({ songId }, context) => {
  if (!context.user) throw new HttpError(401, "User not authenticated");

  try {
    const existingSelection = await context.prisma.user.findUnique({
      where: { id: context.user.id },
      include: { selectedSongs: true }
    });

    const isSongSelected = existingSelection.selectedSongs.some(song => song.id === songId);

    if (isSongSelected) {
      // If the song is already selected, remove it
      await context.prisma.user.update({
        where: { id: context.user.id },
        data: { selectedSongs: { disconnect: { id: songId } } }
      });
    } else {
      // If the song is not selected, add it
      await context.prisma.user.update({
        where: { id: context.user.id },
        data: { selectedSongs: { connect: { id: songId } } }
      });
    }

    return { success: true };
  } catch (error) {
    throw new HttpError(500, `Failed to toggle song selection: ${error.message}`);
  }
};
