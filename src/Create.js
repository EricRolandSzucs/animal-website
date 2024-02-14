import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

const Create = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [shelter, setShelter] = useState("1");
  const [gender, setGender] = useState("female");
  const [stature, setStature] = useState("");
  const [colors, setColors] = useState("");

  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const history = useHistory();

  const { auth } = useContext(AuthContext);

  const headers = {
    Authorization: "Bearer " + auth.accessToken,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("body", body);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("stature", stature);
    formData.append("colors", colors);
    formData.append("shelter", shelter);

    fetch("http://localhost:8800/announcements/", {
      method: "POST",
      headers,
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        history.push("/");
      })
      .catch((error) => {
        console.error("Error submitting combined data:", error);
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

        <label>Age:</label>
        <input
          type="number"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <label>Stature:</label>
        <input
          type="text"
          required
          value={stature}
          onChange={(e) => setStature(e.target.value)}
        />

        <label>Colors:</label>
        <input
          type="text"
          required
          value={colors}
          onChange={(e) => setColors(e.target.value)}
        />

        <label>Shelter:</label>
        <select value={shelter} onChange={(e) => setShelter(e.target.value)}>
          <option value="1">South Wilmington Street Center</option>
        </select>

        <label>Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>Add Announcement</button>
      </form>
    </div>
  );
};

export default Create;
