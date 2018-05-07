const fs = require('fs');

/*-------------------------
fonction pour écrire dans un fichier texte
---------------------------*/
const ecrireTexte = (phrase, fichier) => {

    // on enleve l'espace dans l'occurence
    fichier = fichier.replace(/\s/g, '-');
    // création du flux
    fichier = fs.createWriteStream(fichier, {
        flags: 'a'
    });
    // écriture du fichier
    fichier.write(phrase) ;
};

// fonction pour nettoyer le texte
const nettoyageTexte = (texte) => {
    // passer les chaînes de caractères en minuscule
    texte = texte.toLowerCase();
    // chercher et effacer la ponctuation avec les regex
    texte = texte.replace(/[.,#!$%&;:{}=\-_`~()'"”“'?…]/g,' ');
    // on enlève http
    texte = texte.replace(/(?:https?|ftp):\/\/[\n\S]+/g,'');
    // éliminer tous les chiffres
    texte = texte.replace(/\d+/g, '');
    // éliminer tous les mots de moins de 3 lettres
    texte = texte.replace(/(\b(\w{1,3})\b(\s|$))/g, '');
    // on garde que le latin
    texte = texte.replace(/[^\u0000-\u007F]/g, '');
    // on efface @+ (à tester)
    texte = texte.replace(/@([\s]*\S+)/g, '');
    // on efface @+ (à tester)
    texte = texte.replace(/#([\s]*\S+)/g, '');

    // on sépare ligne à ligne
    texte = texte.replace(/\n\n/g,'\n').replace(/\s/g,'\n');

    // on retourne la chaine de caractère modifiée
    return texte;
};

module.exports = {
    ecrireTexte,
    nettoyageTexte
};
