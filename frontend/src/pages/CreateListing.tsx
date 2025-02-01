const CreateListing = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            />
            <button
              type="button"
              className="p-3  text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
