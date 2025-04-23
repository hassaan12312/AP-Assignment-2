// pages/movies/[id]/director/index.js
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export default function DirectorDisplay() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    () => (id ? `/api/movies/${id}/director` : null),
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading director data.</div>;
  if (!data) return <div>No data available.</div>;

  const { director, movies } = data;

  return (
    <div>
      <h2>Director Info</h2>
      <h4>Name: {director.name}</h4>
      <p>Biography: {director.biography}</p>

      <h3>Movies Directed</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href = {`/movies/${movie.id}`}>{movie.title} ({movie.releaseYear})</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
