//import canonize from './canonize'
// check the "import" is work in Node v7
// повторить работу модулей
var express = require('express');
var fetch = require('isomorphic-fetch')
var Promise = require('bluebird');
const _ = require('lodash');

const can = require('./canonize');

var app = express();

const __DEV__ = true;

app.get('/canonize', (req, res)=>{
	return ( res.json({
		url: req.query.url,
		username: can.canonize(req.query.url),
	}));
});


async function getPokemons(url, i = 0) {
	//console.log('getPokemons', url);
	const response = await fetch(url);
	const page = await response.json();
	const pokemons = page.results;
	if (__DEV__ && i >= 2) {
		return pokemons;
	}
	if(page.next){
	const pokemons2	= getPokemons(page.next, i + 1);
		return [
			...pokemons,
			...pokemons2
		]
	}
	return pokemons;
}

async function getPokemon(url) {
	const response = await fetch(url);
	const pokemon = await response.json();
	return pokemon;
}

const baseUrl = 'https://pokeapi.co/api/v2';
const fields = ['id', 'name', 'weight', 'height'];
const pokemonsUrl = `${baseUrl}/pokemon`;
getPokemons(pokemonsUrl).then(pokemons => {
	console.log(pokemons.length);
});

app.get('/', async (req, res) => {
	try {
		const pokemonsUrl = `${baseUrl}/pokemon`;
		const pokemonsInfo = await getPokemons(pokemonsUrl);
		const pokemonsPromises = pokemonsInfo.slice(0, 2).map(info => {
			return getPokemon(info.url);
		});

		const pokemonsFull = await Promise.all(pokemonsPromises);
		const pokemons = pokemonsFull.map( (pokemon) => {
			return _.pick(pokemon, fields);
		});
		console.log(pokemons);
		return (res.json({
			pokemons
		}));
	} catch(err){
		console.log(err);
		return res.json({err});
	};

});

app.listen(3000, ()=>{
	console.log('Hi there!');
});

// If you want to run the code somewhere else, webpack can help and here is the simplest configuration I could work out:

// Full webpack example : https://github.com/stujo/javascript-async-await