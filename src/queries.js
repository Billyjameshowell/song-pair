import { HttpError } from 'wasp/server'

export const getTwoSongs = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const totalSongs = await context.entities.Song.count()

  if (totalSongs < 2) { throw new HttpError(422, 'Not enough songs in the database.') }

  const song1Id = Math.floor(Math.random() * totalSongs) + 1;
  let song2Id;

  do {
    song2Id = Math.floor(Math.random() * totalSongs) + 1;
  } while (song1Id === song2Id);

  const song1 = await context.entities.Song.findUnique({ where: { id: song1Id } });
  const song2 = await context.entities.Song.findUnique({ where: { id: song2Id } });

  return [song1, song2];
}

export const getTopSongs = async (args, context) => {
  const topSongs = await context.entities.Song.findMany({
    orderBy: { eloRating: 'desc' },
    take: 10
  })
  return topSongs;
}