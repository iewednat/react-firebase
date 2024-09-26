import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const getMovies = async () => {
    try {
      const data = await getDocs(collection(db, "movies"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const onSubmitMovie = async () => {
    try {
      await addDoc(collection(db, "movies"), {
        title: newMovieTitle,
        releasedDate: newMovieReleaseDate,
        receivedAnOscar: newMovieReceivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    console.log(id);
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle }, { merge: true });
    getMovies();
  };

  return (
    <>
      <Auth />
      <div>
        <input
          placeholder="Movie Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date"
          type="number"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieReceivedAnOscar}
          onChange={(e) => setNewMovieReceivedAnOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Add Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              Title: {movie.title}
            </h1>
            <p>Released Date: {movie.releasedDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input
              placeholder="Edit title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update title
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
