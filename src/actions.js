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