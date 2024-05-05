
    const BASE_URL = 'https://pokeapi.co/api/v2/';

    const fetchPokemon = async (pokemon) => {
        try {
            const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
            const parsedResponse = await response.json();
            return parsedResponse;
        } catch (err) {
            console.error(err);
            throw new Error(`Falla en la entrega de tu POKEMON`);
        }
    };
    
    document.getElementById('tupokemon-btn')
        .addEventListener('click', async () => {
            const text = document.getElementById('poke-name').value.toLowerCase();
            try {
                const pokemon = await fetchPokemon(text);
                localStorage.setItem('PokeId', pokemon.id);
                console.log(pokemon.name);
                createCard(pokemon);
            } catch (error) {
                console.error(error);
            }
        });

    document.addEventListener('DOMContentLoaded', async () => {
        const storedId = localStorage.getItem('PokeId');
        const initialId = storedId ? parseInt(storedId) : 1;
        try {
            const pokemon = await fetchPokemon(initialId);
            console.log(pokemon.name);
            createCard(pokemon);
        } catch (error) {
            console.error(error);
        }
    });
    
    document.getElementById('anterior-btn')
        .addEventListener('click', async () => {
            try {
                let newId = parseInt(localStorage.getItem('PokeId')) - 1;
                newId = Math.max(1, newId); 
                localStorage.setItem('PokeId', newId);
                const pokemon = await fetchPokemon(newId);
                console.log(pokemon.name);
                createCard(pokemon);
            } catch (error) {
                console.error(error);
            }
        });
    
    document.getElementById('siguiente-btn')
        .addEventListener('click', async () => {
            try {
                let newId = parseInt(localStorage.getItem('PokeId')) + 1;
                localStorage.setItem('PokeId', newId);
                const pokemon = await fetchPokemon(newId);
                console.log(pokemon.name);
                createCard(pokemon);
            } catch (error) {
                console.error(error);
            }
        });
    
    const createCard = (pokemon) => {
        const cardContainer = document.getElementById('card-container');
        const card = document.createElement('div');
        const id = document.createElement('p');
        const nombre = document.createElement('p');
        const tipos = document.createElement('p');
        const altura = document.createElement('p');
        const peso = document.createElement('p');
        const imagen = document.createElement('img');
    
        
        id.textContent = `ID: ${pokemon.id}`;
        nombre.textContent = `Nombre: ${pokemon.name}`;
        tipos.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;
        altura.textContent = `Altura: ${pokemon.height}`;
        peso.textContent = `Peso: ${pokemon.weight}`; 
        imagen.src = pokemon.sprites.front_default; 
        imagen.alt = `Este es tu pokemon ${pokemon.name}`;
    
    
        card.classList.add('pokemon-card');
        id.classList.add('pokemon-id');
        nombre.classList.add('pokemon-nombre');
        tipos.classList.add('pokemon-tipos');
        altura.classList.add('pokemon-altura');
        peso.classList.add('pokemon-peso');
        imagen.classList.add('pokemon-imagen');
    
    
        card.appendChild(id);
        card.appendChild(nombre);
        card.appendChild(tipos);
        card.appendChild(altura);
        card.appendChild(peso);
        card.appendChild(imagen);

        cardContainer.innerHTML = ''; 
        cardContainer.appendChild(card);
    }