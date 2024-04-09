import prisma from "../prisma";
import { CreateAlbum, UpdateAlbum } from "../types/albums_types";

// Get all albums
export const getAlbums = async (userId: number) => {
    const albums = await prisma.album.findMany({
        where: {
            userId: userId
        }
    });
    return albums;
};

// Get a single album
export const getAlbum = async (albumId: number) => {
  return await prisma.album.findUnique({
    where: {
      id: albumId,
    },
    include: {
      photos: true,
    },
  });
};

// Create a album
export const createAlbum = async (data: CreateAlbum, userId: number) => {
	if (!userId) {
	  throw new Error("Ooops, userId is required to create an album");
	}

	return await prisma.album.create({
	  data: {
		title: data.title,
		userId: userId,
	  },
	});
  };

// Update a album
export const updateAlbum = async (albumId: number, data: UpdateAlbum) => {
	return await prisma.album.update({
		where: {
			id: albumId,
		},
		data,
	});
}

// Link a photo to an album
export const addPhotoToAlbum = async (photoId: number, albumId: number) => {
	await prisma.album.update({
	  where: {
		id: albumId,
	  },
	  data: {
		photos: {
		  connect: {
			id: photoId,
		  },
		},
	  },
	  include: {
		photos: true,
	  },
	});

	return null;
  };
