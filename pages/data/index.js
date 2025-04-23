import fs from 'fs/promises'

export async function LoadData(){
    const data = await fs.readFile('movies.json');
    return JSON.parse(data)
}