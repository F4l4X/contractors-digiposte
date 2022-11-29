import React from "react";
import { useState, useEffect } from "react";
import { fetchContractors } from "../api";
import Contractor from "./Contractors/Contractor/Contractor";


//import "./SearchBar.css";

const SearchBar = () => {
    const [datas, setDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:5003/contractors')
            .then((response) => response.json())
            .then((json) => setDatas(json))        
    }, [])

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value)
    }

    console.log(searchTerm);

    return (
        <>
            <div>
                <input 
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="Search for a contractor"
                    onChange={handleSearchTerm}
                />
            </div>
            <div className="search__results">
                {datas.filter((val) => {
                    return val.firstname.toLowerCase().includes(searchTerm.toLocaleLowerCase());
                }).map((val) => {
                    return <div className="search__results" key={val.id}>{val.firstname}</div>
                })}
                
            </div>
        </>
    );
}

export default SearchBar;