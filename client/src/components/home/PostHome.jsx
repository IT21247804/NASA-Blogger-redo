import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext';
import { Navigate, Link } from "react-router-dom";

function PostHome() {
  const { userLoggedIn } = useAuth();
  const [postLists, setPostList] = useState([]);
  const [error, setError] = useState(null); // State to manage the error message
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        // Handle Firebase error and set error state
        setError("Dear User you have exceed your posting quota. Please try again later like after 15min.");
        console.error("Firebase Error:", error);
      }
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="min-h-screen">
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
      <div className="container mx-auto py-12">
        <div className="mt-8">
          <Link to="/CreatePost" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Create Post
          </Link>
        </div>
        {error && <p className="text-red-600">{error}</p>} {/* Display error message if error state is not null */}
        {postLists.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 mt-4">
            <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
            <p className="text-gray-600 mb-4">{post.postText}</p>
            <h3 className="text-gray-700 font-bold italic">@{post.author.name}</h3>
            {userLoggedIn && post.author.id === auth.currentUser.uid && (
              <button
                onClick={() => deletePost(post.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostHome;
