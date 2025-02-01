import { app } from "../firebase";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false
  );
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImageDelete = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((url) => url !== imageUrl),
    }));
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploadError(false);
      setUploadingImages(true);
      const storage = getStorage(app);

      const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const fileName = new Date().getTime() + (file as any).name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {}, // You can add progress tracking here
            (error) => reject(error), // Reject if an error occurs
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url); // Resolve the promise with the URL
              } catch (err) {
                reject(err); // Reject if getDownloadURL fails
              }
            }
          );
        });
      });

      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({
            ...prev,
            imageUrls: prev.imageUrls.concat(urls as any),
          }));
          setImageUploadError(false);
          setUploadingImages(false);
        })
        .catch((err) => {
          setImageUploadError(
            "An error occurred while uploading images(2mb max per image)"
          );
          setUploadingImages(false);

          console.error("Error uploading images:", err);
        });
    } else {
      setUploadingImages(false);
      setImageUploadError("You can upload a maximum of six(6) images");
    }
  };

  return (
    <main className=" mx-auto max-w-4xl p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex gap-4 flex-col sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
            maxLength={62}
            minLength={10}
            id="name"
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            id="description"
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            required
            id="address"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border p-3 rounded-lg"
                required
                id="bedrooms"
                min={"1"}
                max={"10"}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border p-3 rounded-lg"
                required
                id="bathrooms"
                min={"1"}
                max={"10"}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border p-3 rounded-lg"
                required
                id="regularPrice"
                min={"1"}
                max={"10"}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">{"$ / month"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border p-3 rounded-lg"
                required
                id="discountedPrice"
                min={"1"}
                max={"10"}
              />
              <div className="flex flex-col items-center">
                <p>Discouted price</p>
                <span className="text-xs">{"$ / month"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gay-600 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              className="p-3 border-gray-300 border rounded w-full"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles([...e.target.files])}
            />
            <button
              disabled={uploadingImages}
              type="button"
              onClick={handleImageSubmit}
              className="p-3  text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploadingImages ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0
            ? formData.imageUrls.map((url, i) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    className="w-20 h-20 object-contain rounded-lg"
                    src={url}
                    alt="listing-image"
                  />
                  <button
                    onClick={() => handleImageDelete(url)}
                    className="text-red-700 p-3 rounded-lg uppercase hover:opacity-95"
                  >
                    Delete
                  </button>
                </div>
              ))
            : null}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
