import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Comments = ({ videoId }) => {
  // Static data
  const staticComments = [
    { id: 1, comment: "Great video!" },
  ];

  const staticLikeCount = 10;

  // State initialization
  const [loading, setLoading] = useState(false);
  const [commentVideos, setCommentVideos] = useState(staticComments);
  const [commentText, setCommentText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(staticLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new comment to static comments
    setCommentVideos([...commentVideos, { id: commentVideos.length + 1, comment: commentText }]);
    setCommentText("");
    onClose();
  };

  return (
    <>
      <div className="container mx-auto max-w-full bg-[#5B5B5B] px-4 py-2 flex justify-between gap-4">
        <div className="card-footer flex gap-3 px-4 bg-black/30 rounded-xl font-bold shadow-lg text-gray-200 p-2">
          <div className="flex gap-4">
            <div>
              {isLiked ? (
                <AiFillHeart
                  size={25}
                  className="text-red-500 cursor-pointer"
                  onClick={() => setIsLiked(false)}
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setIsLiked(true)}
                />
              )}
            </div>
            <h4 className="font-bold">Likes: ({likeCount})</h4>
            <div>
              <h2 className="font-bold mb-4">Comments ({commentVideos.length})</h2>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md shadow-md max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Leave a Comment</h2>
              <p
                className="cursor-pointer text-xl"
                onClick={onClose}
              >
                X
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block font-medium text-gray-600 text-lg"
                >
                  Comment:
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  value={commentText}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-full bg-[#5B5B5B] px-4">
        <div className="bg-black/20 rounded-lg shadow-md overflow-auto h-[150px]">
          <div className="font-bold p-3 cursor-pointer border border-white">
            <button
              className="animate-pulse text-white "
              onClick={openModal}
            >
              Write Comment here......
            </button>
          </div>
          <div
            className="w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          ></div>

          <div>
            {commentVideos.map((data) => (
              <div
                key={data.id}
                className="flex items-start space-x-4 text-left mt-1"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <FaUserCircle className="p-2 px-4" />
                </div>
                <div>
                  <p className="px-2 font-semibold">{data.comment}</p>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
