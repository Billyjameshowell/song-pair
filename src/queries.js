import { HttpError } from 'wasp/server'

export const getTwoSongs = async (args, context) => {
  if (!context.user) { throw new HttpError(401, 'Unauthorized') }

  try {
    // Fetch songs that the logged-in user has selected
    const selectedSongs = await context.entities.Song.findMany({
      where: {
        selectedBy: {
          some: {
            id: context.user.id,
          },
        },
      },
    });

    const totalSelectedSongs = selectedSongs.length;
    if (totalSelectedSongs < 2) {
      throw new HttpError(422, 'No songs selected by user. Select some songs first!');
    }

    // Generate two unique random indices for the selected songs
    let index1 = Math.floor(Math.random() * totalSelectedSongs);
    let index2;
    do {
      index2 = Math.floor(Math.random() * totalSelectedSongs);
    } while (index1 === index2);

    // Get the two unique songs using the indices
    const song1 = selectedSongs[index1];
    const song2 = selectedSongs[index2];

    return [song1, song2];
  } catch (error) {
    // Here we can log the error or handle it as necessary
    throw new HttpError(500, 'Internal Server Error');
  }
};



export const getTopSongs = async (args, context) => {
  const topSongs = await context.entities.Song.findMany({
    orderBy: { eloRating: 'desc' },
    take: 10
  })
  return topSongs;
}

export const getAllSongs = async (args, context) => {
  return await context.entities.Song.findMany({
    orderBy: {
      title: 'asc', // Sorts the songs by title in ascending order
    }
  });
}

