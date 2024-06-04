import React,{ useEffect, useState} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const listMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    },[]);  

    // async function getMovies(){
    //     try{
    //         const moviesCollection = collection(db, 'movies');
    //         const querySnapshot = await getDocs(moviesCollection);
    //         console.log(querySnapshot);
    //     }catch(e){
    //         console.log(e);
    //     } 
    // }
    
    function getMovies(){
        const movieCollection = collection(db, 'movies');
        getDocs(movieCollection)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h1>List Movies</h1>
        </div>
    )
}