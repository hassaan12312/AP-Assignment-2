import { LoadData } from "@/pages/data";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const data = await LoadData();

  const movie = data.movies.find((m) => m.id.toString() === id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const director = data.directors.find((d) => d.id === movie.directorId);
  if (!director) return res.status(404).json({ message: "Director not found" });

  const directorMovies = data.movies.filter((m) => m.directorId === director.id);

  res.status(200).json({
    director,
    movies: directorMovies,
  });
}
