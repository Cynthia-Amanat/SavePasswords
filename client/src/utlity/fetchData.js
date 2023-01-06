import { useState , useEffect } from "react"
const FetchData = ( url , method )=>{
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();
const [data, setData] = useState(false);

useEffect(()=>{
    const fetchDataFromApi =async ()=>{
        try{
            setIsLoading(true)
            const response = await fetch(url , method)
            const result = response.json
            setData(result) 
        }catch(err){
            setError(err.message)
            console.log(err.message)
            setIsLoading(false)
        }
    }
    fetchDataFromApi()
},[url , method])
return { isLoading , error , data}

}
export default FetchData