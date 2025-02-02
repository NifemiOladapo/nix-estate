import { app } from "../firebase";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "rent",
    imageUrls: [],
    parking: false,
    furnished: false,
    bedrooms: 0,
    bathrooms: 0,
    offer: false,
    regularPrice: 40,
    discountedPrice: 0,
    address: "",
  });
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false
  );
  const [uploadingImages, setUploadingImages] = useState(false);

  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setError(data.message);
      }

      setError(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      return setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "rent" || e.target.id === "sale") {
      return setFormData((prev) => ({ ...prev, type: e.target.id }));
    }
    if (e.target.type === "checkbox") {
      return setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }
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
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
            maxLength={62}
            minLength={10}
            id="name"
          />
          <textarea
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            id="description"
          />
          <input
            value={formData.address}
            onChange={handleInputChange}
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            required
            id="address"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                checked={formData.type === "sale"}
                onChange={handleInputChange}
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={formData.type === "rent"}
                onChange={handleInputChange}
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={formData.parking}
                onChange={handleInputChange}
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={formData.furnished}
                onChange={handleInputChange}
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={formData.offer}
                onChange={handleInputChange}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-2">
              <input
                onChange={handleInputChange}
                type="number"
                className="border p-3 rounded-lg"
                required
                id="bedrooms"
                min={"1"}
                max={"10"}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                onChange={handleInputChange}
                type="number"
                className="border p-3 rounded-lg"
                required
                value={formData.bathrooms}
                id="bathrooms"
                min={"1"}
                max={"10"}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleInputChange}
                type="number"
                className="border p-3 rounded-lg"
                required
                id="regularPrice"
                min={"40"}
                max={"10000000"}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span hidden={formData.type === "sale"} className="text-xs">
                  {"$ / month"}
                </span>
                <span hidden={formData.type === "rent"} className="text-xs">
                  {"$"}
                </span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  onChange={handleInputChange}
                  type="number"
                  className="border p-3 rounded-lg"
                  required
                  value={formData.discountedPrice}
                  id="discountedPrice"
                  min={"1"}
                  max={"10000000"}
                />
                <div className="flex flex-col items-center">
                  <p>Discouted price</p>
                  <span hidden={formData.type === "sale"} className="text-xs">
                    {"$ / month"}
                  </span>
                  <span hidden={formData.type === "rent"} className="text-xs">
                    {"$"}
                  </span>
                </div>
              </div>
            )}
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
            ? formData.imageUrls.map((url, _) => (
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
          <button
            disabled={loading || uploadingImages}
            className="p-3 disabled:opacity-80 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
