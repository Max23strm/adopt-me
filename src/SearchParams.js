import{useState, useEffect, useContext} from 'react';
import ThemeContext from './ThemeContext';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS= ["bird", "cat", "dog", "reptile"];

const SearchParams=()=>{
    const [location, setLocation]= useState("");
    const [animal, setAnimal]= useState("");   
    const [breed, setBreed]= useState("");
    const [pets, setPets]=useState([]);
    const [breeds]=useBreedList(animal);   
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(()=>{
        requestPets();
    }, [])

    async function requestPets(){
        const res =await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json=await res.json();
        setPets(json.pets);
    }

    return(
        <div
            className='my-0 mx-auto w-11/12'
        >
            <form
            className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
            onSubmit={e=>{
                e.preventDefault();
                requestPets();
            }}>
                <label className='search-label' htmlFor="location">
                    Location
                    <input
                        className='search-control'
                        id="location"
                    onChange={ (e) =>setLocation(e.target.value)}
                    value={location}
                    placeholder="location"/>
                </label>
                <label className='search-label' htmlFor="animal">
                    Animal
                    <select
                        className='search-control' 
                        id="animal"
                        value={animal}
                        onChange={e=> setAnimal(e.target.value)}
                        onBlur={e=> setAnimal(e.target.value)}
                        >
                        <option />
                        {
                            ANIMALS.map(animal=>(
                                <option value={animal} key={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label className='search-label'htmlFor="breed">
                    Breed
                    <select id="breed"
                        className='search-control disabled:opacity-50'
                        disabled={!breeds.length}
                        value={breed}
                        onChange={e=> setBreed(e.target.value)}
                        onBlur={e=> setBreed(e.target.value)}
                        >
                        <option />
                        {
                            breeds.map(breed=>(
                                <option value={breed} key={breed}>
                                    {breed}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label className='search-label' htmlFor="theme">
                    Theme
                    <select
                    className='search-control'
                    value={theme}
                    onChange={(e)=> setTheme(e.target.value)}
                    onBlur={(e)=>setTheme (e.target.value)}>
                        <option value="DarkSlateGray">DarkSlateGray</option>
                        <option value="Peru">Peru</option>
                        <option value="ForestGreen">ForestGreen</option>
                        <option value="LightSeaGreen">LightSeaGreen</option>
                    </select>
                </label>
                
                <button className='rounded px-6 py-2 text-white hover:opacity-70 border-none' style={{backgroundColor:theme}}> Submit</button>
            </form>
            

            <Results pets={pets}/>
        </div>
    )
}

export default SearchParams;