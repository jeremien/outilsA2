// appel des modules google news et wikipedia
const GoogleNewsRss = require('google-news-rss');
const wtf = require('wtf_wikipedia');
// appel du module générique
const modules = require('./module_fonctions');
const moment = require('moment');
// création de l'instance prompt
const prompt = require('prompt');
const Twit = require('twit');

const twitter = new Twit({

  consumer_key: '3pgwWc4MoOr8LnLpL6IfkRxDW',
  consumer_secret: 'a5Bn4lWY403A7iB3REPaZdImF0qS9j9qpJA53nOZHbXa3Y8OPh',
  access_token: '976063483-0a0vU6N7MUlnLHqCynC0FwLDG3Ken3wSpfbRQlFW',
  access_token_secret: 'KBI4q2o9cAB7zRnJ6orI1gnQAwu7GBRLzV4hMjkp8Y2zz'

});



// on démarre le prompt
prompt.start();


/*-------------------
démarrage du programme à partir d'un mot clé commun
---------------------*/

prompt.get(['occurence'], function(error, response) {

  if (error) throw error;

  // on cree une date
  let date = moment().format('DD_MM_YY');

  // on cree une occurence commune à toutes les recherches
  let occurence = response.occurence;


  /*-------------------
  recherche sur google news
  ---------------------*/
  // on cree notre objet news
  const news = new GoogleNewsRss();
  // on appelle une fonction de recherche avec l'occurence
  news.search(occurence).then(function(reponse) {
    // on declare une variable avec une chaine vide
    let resultat = "";
    // on boucle dans l'objet et on ecrit dans la chaine les reponses
    for (let identifiant in reponse) {
      resultat += `${reponse[identifiant].description}\n`;
    }
    // je nettoie mon texte
    resultat = modules.nettoyageTexte(resultat);
    // console.log(resultat)
    // on ecrit dans le fichier texte
    modules.ecrire_texte(resultat, `./corpus/${date}_${occurence}_news.txt`);
  })

  /*-------------------
  recherche sur wikipedia
  ---------------------*/

  wtf.from_api(occurence, "en", function(response) {
    // je récupère les données de wikipedia
    let data = wtf.plaintext(response);
    // je nettoie mon texte
    data = modules.nettoyageTexte(data);
    // console.log(data)
    // j'écris dans un fichier texte
    modules.ecrire_texte(data, `./corpus/${date}_${occurence}_wiki.txt`);

  });


  /*-----------------------
  recherche twitter
  -------------------------*/

  twitter.get('search/tweets', {
    q: occurence,
    count: 1,
    language: 'en'
  },
  function(error, data, response){
    console.log(data, response)
  })


});
