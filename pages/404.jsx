import { useRouter } from "next/router"

export default function Error(){
    const router = useRouter();
    return(
        <div>
            <h1>PAGE NOT FOUND!!!!!!    :|  :|</h1>
            <button onClick={()=>{router.push("/home")}}>GO Home</button>
        </div>
    )
}