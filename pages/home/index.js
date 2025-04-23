import React from 'react'
import { useRouter } from 'next/router'
import { LoadData } from '../data'

export async function getStaticProps() {
    const parsed_data = await LoadData();
    
    //assuming a rating of > 8.0 is considered trending
    const top_rated = parsed_data.movies.filter((val, index)=>{
        return val.rating > 8.0
    })
    
    console.log(top_rated)
    
    return(
        {
            props: {top_movies: top_rated},
            revalidate: 60
        }
    )
}

const HomePage = (props) => { 
    const router = useRouter();

    function handleClick(){
        router.push('/genres')
    };

    return (
    <div>
        <h1>Top Rated Movies:</h1>
        {props.top_movies.map((val, index)=>(
            <h4 key={index}> Name: {val.title}, Year: {val.releaseYear}, Rating: {val.rating} </h4>
        ))}
        <button onClick = {handleClick}> Browse Genres </button>
    </div>
  )
}

export default HomePage