import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getDocs(collection(db, "movies"));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);
  return (
    <>
      <Auth />

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
