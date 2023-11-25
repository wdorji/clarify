import { format } from "date-fns";
import {
  deleteObject,
  getDownloadURL as getStorageDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";

// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://amplify-ca8fd.appspot.com";

// Uploads image and returns the storage bucket
export async function uploadImage(
  image: Blob | Uint8Array | ArrayBuffer,
  uid: any
) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
  await uploadBytes(ref(storage, bucket), image);
  return bucket;
}

// Replaces existing image in storage and returns the storage bucket
export async function replaceImage(
  image: Blob | Uint8Array | ArrayBuffer,
  bucket: string | undefined
) {
  await uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export async function deleteImage(bucket: string | undefined) {
  await deleteObject(ref(storage, bucket));
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket: string | undefined) {
  return await getStorageDownloadURL(ref(storage, bucket));
}
