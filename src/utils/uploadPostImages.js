import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

function createImagePath({ userId, fileName, index }) {
  const safeFileName = fileName.replace(/\s+/g, "_");
  const timestamp = Date.now();

  return `posts/${userId}/${timestamp}_${index}_${safeFileName}`;
}

export async function uploadPostImagesToFirebase({ userId, files }) {
  const uploadTasks = files.map(async (file, index) => {
    const path = createImagePath({
      userId,
      fileName: file.name,
      index,
    });

    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  });

  return Promise.all(uploadTasks);
}
