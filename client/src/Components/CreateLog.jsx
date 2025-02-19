import React, { useState } from "react";
import { createTraveLog } from "../Features/TravelLogFeature";
import { useDispatch, useSelector } from "react-redux";
import useImageUpload from "../CustomHooks/useImageUpload";

const CreateLog = () => {
  const [place, setPlace] = useState({
    newPlace: "",
  });
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.travelLog);

  // console.log(travelLogs, isLoading);

  const [log, setLog] = useState({
    title: "",
    description: "",
    location: "",
    cost: "",
    date: "",
    placesToVisit: [],
  });

  const { error, handleImageChange, isUploading, uploadImages, uploadedUrls } =
    useImageUpload();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleToPlacesVisit = (e) => {
    const { value } = e.target;
    setPlace({
      newPlace: value,
    });
  };

  const handleAddPlace = (e) => {
    e.preventDefault();

    if (place.newPlace.trim()) {
      setLog({
        ...log,
        placesToVisit: [...log.placesToVisit, place.newPlace],
      });
    }
    setPlace({
      newPlace: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTraveLog({
        ...log,
        placesToVisit: JSON.stringify(log.placesToVisit),
        images: uploadedUrls,
      })
    );

    // console.log(log);
  };

  return (
    <div>
      <h1 className="text-center w-full mb-2 border-b-2">
        Share Your Experience
      </h1>
      <div>
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            onChange={handleChange}
            value={log.title}
            required
            name="title"
            placeholder="Title"
          />
          <input
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            onChange={handleChange}
            value={log.description}
            required
            name="description"
            placeholder="Description"
          />
          <input
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            onChange={handleChange}
            value={log.location}
            required
            name="location"
            placeholder="Location"
          />
          <input
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            onChange={handleChange}
            required
            value={log.cost}
            name="cost"
            placeholder="Cost"
          />
          <input
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="date"
            name="date"
            value={log.date}
            required
            onChange={handleChange}
            placeholder="Date"
          />
          <div className="flex justify-between items-center">
            <input
              type="text"
              onChange={handleToPlacesVisit}
              placeholder="Add a place to visit"
              value={place.newPlace}
              name="placesToVisit"
              className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="w-auto p-3 border-2 rounded-2xl text-sm cursor-pointer"
              type="button"
              onClick={(e) => handleAddPlace(e)}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {log.placesToVisit?.join(", ")}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="file"
            name="image"
            multiple={true}
            accept="image/*"
            id="image"
            onChange={(e) => handleImageChange(e)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg cursor-pointer"
          />
          <button
            type="button"
            onClick={uploadImages}
            disabled={isUploading}
            className="w-full px-6 p-2 border-2 rounded-2xl text-md cursor-pointer"
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
          <button
            className="w-full px-6 p-2 border-2 rounded-2xl text-md cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : " Create Log"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLog;
