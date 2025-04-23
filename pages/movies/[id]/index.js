import React from 'react'
import { useRouter } from 'next/router';
import { LoadData } from '@/pages/data';
import { notFound } from 'next/navigation';

export async function getStaticPaths(){
    const data = await LoadData();
    
    const paths = data.movies.map((val, index) => ({
        params: {id: val.id},
    }))

    return{
        paths, 
        fallback:false
    }
}

export async function getStaticProps({params}){
    const data = await LoadData();
    const movie_data = data.movies.find((m)=> m.id === params.id);
    
    if(!movie_data)
    {
        return{
            notFound: true,
        }
    }

    return{
        props: movie_data,
        revalidate: 60
    }
}

export default function MoviesDisplay(props){
    if(!props){
        return(
            <div>
                <h1>Not Found! </h1>
            </div>
        )
    }

    return(
        <div>
            <h4>
                <p>Title: {props.title}</p> 
                <p>Rating: {props.rating} </p>
                <p><a href={`/movies/${props.id}/director`}>Director: {props.directorId}</a></p>
                <p>Description: {props.description}</p>
                <p>Release Year: {props.releaseYear}</p>
            </h4>
        </div>
    )
}