import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext';
import {  Navigate } from "react-router-dom";

function PostHome() {
  const { userLoggedIn } = useAuth();
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className=" min-h-screen">
      {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
      <div className="container mx-auto py-12 ">
        <div className="container m-auto grid gap-4">
          {postLists.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
              <p className="text-gray-600 mb-4">{post.postText}</p>
              <h3 className="text-gray-700">@{post.author.name}</h3>
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
    </div>
  );
}

export default PostHome;

