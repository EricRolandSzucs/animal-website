import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

const Create = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const history = useHistory();

  const { auth } = useContext(AuthContext);
  const { setAuth } = useContext(AuthContext);

  // ... your component logic

  const headers = {
    "Authorization": "Bearer " + auth.accessToken
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const announcement = { name, body, image};

  //   fetch('http://localhost:8800/announcements/', {
  //         method: 'POST',
  //         headers,
  //         credentials: 'include',
  //         body: JSON.stringify(announcement)
  //       }).then(() => {
  //         history.push('/');
  //   });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('body', body);
    formData.append('breed', breed);
  
    fetch('http://localhost:8800/announcements/', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      history.push('/');
    })
    .catch(error => {
      console.error('Error submitting combined data:', error);
    });
  };

  return (
    <div className="create">
      <h2>Add a New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Breed:</label>
        <input 
          type="text" 
          required 
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>Add Announcement</button>
      </form>
    </div>
  );
}
 
export default Create;