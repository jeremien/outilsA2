const tracery = require('tracery-grammar');
const fs = require('fs');

const generationText = (data) =>  {
    const grammar = tracery.createGrammar(data);
    grammar.addModifiers(tracery.baseEngModifiers);
    let phrase = grammar.flatten('#sentence#');
    let tableau = phrase.split("/");
    let index = tableau.length;
    let nombre_aleatoire = Math.floor(Math.random()*index);
    return tableau[nombre_aleatoire];
};

const generateTalk = (appRoot,file, callback) => {


    fs.readFile(`${appRoot}/bdd/${file}`, (error, data) => {

        if(!error) {
            data = JSON.parse(data);
            setInterval(function(){
                callback(undefined, generationText(data));
            },2000);
        } else {
            callback('unable to parse data');
        }
    });
};

module.exports = {
    generateTalk
};
