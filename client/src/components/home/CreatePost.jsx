import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../firebase/firebase';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'


function CreatePost() {
  const { userLoggedIn } = useAuth()
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();


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
            {! userLoggedIn && (<Navigate to={'/login'} replace={true} />)}
   <div className="flex justify-center items-center h-screen">
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  </div>
  </div>
  );
}

export default CreatePost;