import { HttpError } from 'wasp/server'

export const getTwoSongs = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Fetch all songs that the logged-in user added
  const userSongs = await context.entities.Song.findMany({
    where: { userId: context.user.id }
  });

  const totalUserSongs = userSongs.length;

  if (totalUserSongs < 2) { throw new HttpError(422, 'Not enough songs added by the user.') }

  // Generate two unique random indices for user's songs
  let index1 = Math.floor(Math.random() * totalUserSongs);
  let index2;
  do {
    index2 = Math.floor(Math.random() * totalUserSongs);
  } while (index1 === index2);

  // Get the two unique songs using the indices
  const song1 = userSongs[index1];
  const song2 = userSongs[index2];

  return [song1, song2];
}


export const getTopSongs = async (args, context) => {
  const topSongs = await context.entities.Song.findMany({
    orderBy: { eloRating: 'desc' },
    take: 10
  })
  return topSongs;
}