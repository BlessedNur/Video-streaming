"use client"
import React, { useEffect, useState } from 'react'

function page() {
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/myapi/anime`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(movies);
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill , minmax(200px , 1fr))",gap:"1em"}}>
      {movies.map((movie) => (
        <div key={movie.id} style={{margin:"2em 0"}}>
          <img src={movie.images.jpg.large_image_url} alt={movie.title} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
          }} />
          <h4>{movie.titles[0].title }</h4>
          <h4>{(movie.score/2).toFixed(1)}</h4>
        </div>
      ))}
    </div>  
  )
}

export default page