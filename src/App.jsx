import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);

  useEffect(() => {
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
    getMovies();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(collection(db, "movies"), {
        title: newMovieTitle,
        releasedDate: newMovieReleaseDate,
        receivedAnOscar: newMovieReceivedAnOscar,
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(newMovieTitle, newMovieReleaseDate, newMovieReceivedAnOscar);

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
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "blue" }}>
              Title: {movie.title}
            </h1>
            <p>Released Date: {movie.releasedDate}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
