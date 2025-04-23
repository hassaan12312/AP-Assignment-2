import { LoadData } from "../data";
import { useRouter } from "next/router";

export async function getStaticProps(){
    const data = await LoadData();
    return{
        props: data
    }
}

export default function Movies(props){
    const router = useRouter();
    return(
        <div>
            <h1>ALL MOVIES</h1>
            {props.movies.map((val, index)=>(
                <li key={val.id}>
                    <a href={`/movies/${val.id}`}>
                        {val.title}
                    </a>
                </li>
            ))}
            <button onClick={()=>router.push('/genres')}>Filter by Genre</button>
        </div>
    )
}