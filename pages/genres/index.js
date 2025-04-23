import { LoadData } from "../data";

export async function getServerSideProps({ query }) {
  const data = await LoadData();
  const genres = data.genres;

  const selectedGenreId = query.genre;
  const selectedGenre = genres.find((genre) => genre.id === selectedGenreId);
  
  const filteredMovies = selectedGenreId
    ? data.movies.filter((movie) => movie.genreId === selectedGenreId)
    : data.movies;

  return {
    props: {
      genres,
      filteredMovies,
      selectedGenre: selectedGenre ? selectedGenre.name : null,
    },
  };
}

export default function GenresPage({ genres, filteredMovies, selectedGenre }) {
  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <a href={`/genres?genre=${genre.id}`}>
              {genre.name}
            </a>
          </li>
        ))}
      </ul>

      <h2>
        {selectedGenre
          ? `Movies in ${selectedGenre} genre`
          : 'All Movies'}
      </h2>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <a href={`/movies/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
