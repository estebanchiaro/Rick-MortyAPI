import React from "react";
import { useState, useEffect } from "react";
import Character from "./Character";

function NavPage({page,setpage}){
    return (
    <header className="d-flex justify-content-between align-items-center">
      
        <button className="btn btn-primary btn-sm"
        onClick={()=>{
          console.log('click')  
          setpage(page-1)
        }}> Previous Page
        </button>
        <button className="btn btn-primary btn-sm"
        onClick={()=>{
          console.log('click')  
          setpage(page+1)
        }}>
            Next Page
        </button>
    </header>)
}

export default function CharacterList() {
  const [characters, setcharacters] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://rickandmortyapi.com/api/character?page="+page);
      const data = await response.json();
      setloading(false);
      setcharacters(data.results);
    }
    fetchData();
  }, [page]);

  return (
    <div className="container">
    <NavPage page={page} setpage={setpage}/>


      {loading ? (
        <h1 className="text-center">LOADING..</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage page={page} setpage={setpage}/>
    </div>
  );
}
