import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/photos_types";

// Get all photos
export const getPhotos = async (userId: number) => {
	return await prisma.photo.findMany({
	  where: {
		userId: userId,
	  },
	  select: {
		id: true,
		title: true,
		url: true,
		comment: true,
	  },
	});
  };

// Get a single photo
export const getPhoto = async (photoId: number) => {
	return await prisma.photo.findUniqueOrThrow({
	  where: {
		id: photoId,
	  },
	  select: {
		id: true,
		title: true,
		url: true,
		comment: true,
		userId: true,
	  },
	});
  };

// Create a photo
export const createPhoto = async (data: CreatePhoto) => {
	return await prisma.photo.create({
	  data,
	});
  };

  export const updatePhoto = async (photoId: number, updateFields: Partial<UpdatePhoto>) => {
    return await prisma.photo.update({
        where: {
            id: photoId,
        },
        data: updateFields,
    });
};

