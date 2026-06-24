export const DEFAULT_ROOM_IMAGE = "/uploads/default-room.jpeg";
export const DEFAULT_USER_AVATAR = "/uploads/user-default.jpg";

export const getImageUrl = (image?: string, fallback = DEFAULT_ROOM_IMAGE) => {
  if (!image) {
    return fallback;
  }

  if (image.startsWith("/uploads/")) {
    return image;
  }

  const filename = image.replace(/\\/g, "/").split("/").pop();

  return filename ? `/uploads/${filename}` : fallback;
};
