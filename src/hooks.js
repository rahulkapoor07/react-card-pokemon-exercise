import { useEffect, useState} from "react";
import axios from "axios";
// import {v4 as uuid} from "uuid";

const useFlip = ()=>{
    const [state, setState] = useState(true);
    const handleClick = ()=>{
        setState(state=> !state);
    }
    return [state, handleClick];
}

const useLocalStorage = (key, defaultValue = [])=>{
    const [state, setState] = useState(()=>{
        let value = window.localStorage.getItem(key) || defaultValue;
        return value;
    });
    useEffect(()=>{
        window.localStorage.setItem(key, state);
    }, [state]);
    return [state, setState];
}

const useAxios = (keyToLS, url) => {
    // const [data, setData] = useState([]);
    const [data, setData] = useLocalStorage(keyToLS);

    const handleClick = async (formatter = data=>data, restOfUrl = "") =>{
        const res = await axios.get(`${url}${restOfUrl}`);
        setData(data => [...data, formatter(res.data)]);
    }
    const removeElements = ()=> {
        setData(data => []);
    }
    return [data, handleClick, removeElements];
}



export {useFlip, useAxios, useLocalStorage}; 

