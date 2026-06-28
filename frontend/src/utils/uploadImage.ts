import api from "../api";

export type UploadedFile = {
  filename: string;
  url: string;
};

export const uploadImages = async (
  files: FileList | File[]
): Promise<UploadedFile[]> => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("image", file);
  });

  const { data } = await api.post<UploadedFile[]>("/api/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
