import prisma from "../prisma";
import { PhotoId } from "../types/photos_types";
import { AlbumId } from "../types/albums_types";

export const createUser = async (data: any) => {
	try {
	  const user = await prisma.user.create({
		data: {
		  first_name: data.first_name,
		  last_name: data.last_name,
		  email: data.email,
		  password: data.password,
		},
	  });

	  return user;
	} catch (error) {
	  console.error("Error when trying to create User:", error);
	  throw error;
	}
  };

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
			where: {
				email,
			},
		});
}

export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
			where: {
				id,
			},
		});
}

// Get users photos
export const getUserPhotos = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
	});

	return user.photos;
}

// Get users albums
export const getUserAlbums = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
	});

	return user.albums;
}

// Add photos to user
export const addUserPhotos = async (userId: number, photoIds: PhotoId | PhotoId[]) => {
	const user = await prisma.user.update({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
		data: {
			photos: {
				connect: photoIds,
			},
		},
	});

	return user.photos;
}

// Add albums to user
export const addUserAlbums = async (userId: number, albumIds: AlbumId | AlbumId[]) => {
	const user = await prisma.user.update({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
		data: {
			albums: {
				connect: albumIds,
			},
		},
	});

	return user.albums;
}
