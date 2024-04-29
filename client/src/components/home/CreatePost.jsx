import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase/firebase';
import {  Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'


function CreatePost() {
  const { userLoggedIn } = useAuth()
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  

  const postsCollectionRef = collection(db, "posts");
  // let navigate = useNavigate();


const createPost = async () => {
    const currentUser = auth.currentUser;
    const authorName = currentUser.displayName ? currentUser.displayName : currentUser.email;
  
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: authorName, id: currentUser.uid },
    });
  
  };
  





  return (
    <div>
    {!userLoggedIn && <Navigate to={'/login'} replace={true} />}
    <div className="flex justify-center items-center h-screen">
        <div className="createPostPage w-96 md:w-128"> {/* Adjust width using Tailwind CSS classes */}
            <div className="cpContainer p-6 md:p-8"> {/* Adjust padding using Tailwind CSS classes */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Create A Post</h1> {/* Adjust font size using Tailwind CSS classes */}
                <div className="inputGp mb-4">
                    <label className="block">Title:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-sky-600"
                        placeholder="Title..."
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp mb-4">
                    <label className="block">Post:</label>
                    <textarea
                        className="w-full h-40 px-3 py-2 border rounded-lg focus:outline-none focus:border-sky-600"
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button className="px-4 py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700" onClick={createPost}>
                    <i className="fas fa-arrow-right-to-bracket mr-2"></i> Submit Post
                </button>
            </div>
        </div>
    </div>
</div>

  );
}

export default CreatePost;