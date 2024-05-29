import './App.css'
import {Route, Routes} from "react-router-dom";
import CharacterPage from "./CharacterPage.tsx";
import HomePage from "./HomePage.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailsPage from "./CharacterDetailsPage.tsx";
import {useEffect, useState} from "react";
import {Character} from "./types/RickAndMortyCharacter.ts";
import axios from "axios";

export default function App() {
    const [characters, setCharacters] = useState<Character[]>([])

    useEffect(() => {
        loadAllCharacters()
    }, [])

    const loadAllCharacters = () => {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((response) => {
                setCharacters(response.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log("finally")
            })
    }

    const saveCharacter = (newCharacter: Character) => {
        axios.post("https://rickandmortyapi.com/api/character", newCharacter)
            .then((response) => {
                setCharacters([...characters, response.data])
                // loadAllCharacters()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <>
            <Header/>
            <button onClick={loadAllCharacters}>GET</button>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/characters" element={<CharacterPage characters={characters}
                                                                  saveCharacter={saveCharacter}/>}/>
                <Route path="/characters/:id" element={<CharacterDetailsPage characters={characters}/>}/>
            </Routes>
        </>
    );
}
