/**
 * Crée un élément du dom, lui ajoute du texte, le place comme dernier
 * enfant de parent et ajoute un attribut en utilisant le paramètre attribute
 * @param {String} markup_name
 * @param {String} text
 * @param {domElement} parent
 * @param {Array} attributes  (doit comprendre les propriétés name et value)
 * @returns domElement
 */
export default function createMarkup(
  markup_name,
  text,
  parent,
  attributes = []
) {
  const markup = document.createElement(markup_name);
  markup.textContent = text;
  parent.appendChild(markup);
  attributes.forEach((attribute) => {
    if (
      attribute &&
      attribute.hasOwnProperty("name") &&
      attribute.hasOwnProperty("value")
    ) {
      markup.setAttribute(attribute.name, attribute.value);
    }
  });

  return markup;
}

// création d'un formulaire
const formulaire = createMarkup("form", "", document.body);
//Régions
const labelRegion = createMarkup("label", "Région", formulaire, [
  {
    name: "for",
    value: "selectegion",
  },
]);
console.log(labelRegion);
const selectRegion = createMarkup("select", "", formulaire, [
  {
    name: "id",
    value: "selectRegion",
  },
]);

/* const optionRegion = createMarkup("option", "", selectRegion); */

async function getRegion() {
  return fetch(`https://geo.api.gouv.fr/regions`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Le serveur ne répond pas");
      } else return response.json();
    })
    .then((dataRegion) => {
      console.log(`dataRegion:`, dataRegion);
      dataRegion.forEach((itemRegion) => {
        createMarkup("option", `${itemRegion.nom}`, selectRegion, [
          { name: "value", value: `${itemRegion.code}` },
          { name: "name", value: `${itemRegion.nom}` },
        ]);
      });
    })
    .catch((error) => console.log(`erreure attrapée :`, error));
}
getRegion();

//Départements

const labelDepartement = createMarkup("label", "Département", formulaire, [
  {
    name: "for",
    value: "selectDepartement",
  },
]);
const selectDepartement = createMarkup("select", "", formulaire, [
  {
    name: "id",
    value: "selectDepartement",
  },
]);

async function getDepartement(regionChoisie) {
  return fetch(`https://geo.api.gouv.fr/regions/${regionChoisie}/departements`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Le serveur ne répond pas");
      } else return response.json();
    })
    .then((dataDepartement) => {
      console.log(`dataDepartement:`, dataDepartement);
      dataDepartement.forEach((itemDepartement) => {
        createMarkup("option", `${itemDepartement.nom}`, selectDepartement, [
          { name: "value", value: `${itemDepartement.code}` },
          { name: "name", value: `${itemDepartement.nom}` },
        ]);
      });
    })
    .catch((error) => console.log(`erreure attrapée :`, error));
}

selectRegion.onchange = async function (event) {
  event.preventDefault();
  console.log("Région changée");
  console.log("Région sélectionnée", selectRegion.value);

  getDepartement(selectRegion.value);
};

//Villes

const labelVille = createMarkup("label", "Ville", formulaire, [
  {
    name: "for",
    value: "selectVille",
  },
]);
const selectVille = createMarkup("select", "", formulaire, [
  {
    name: "id",
    value: "selectVille",
  },
]);

async function getVille(departementChoisi) {
  return fetch(
    `https://geo.api.gouv.fr/departements/${departementChoisi}/communes `
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Le serveur ne répond pas");
      } else return response.json();
    })
    .then((dataVille) => {
      console.log(`dataVille:`, dataVille);
      dataVille.forEach((itemVille) => {
        createMarkup("option", `${itemVille.nom}`, selectVille, [
          { name: "value", value: `${itemVille.code}` },
          { name: "name", value: `${itemVille.nom}` },
        ]);
      });
    })
    .catch((error) => console.log(`erreure attrapée :`, error));
}

selectDepartement.onchange = async function (event) {
  event.preventDefault();
  console.log("Dpt changé");
  console.log("Dpt sélectionné", selectDepartement.value);

  getVille(selectDepartement.value);
};

//nom, nombre d'habitant et code postal

const divVille = createMarkup("div", "", document.body, [
  { name: "class", value: "AfficheVille" },
]);

async function getAfficheVille(villeChoisie) {
  return fetch(`https://geo.api.gouv.fr/communes/${villeChoisie}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Le serveur ne répond pas");
      } else return response.json();
    })
    .then((dataVille) => {
      console.log(`dataVille:`, dataVille);
      createMarkup("h2", `${dataVille.nom}`, divVille);
      createMarkup("p", `Code postal : ${dataVille.codesPostaux}`, divVille);
      createMarkup("p", `Population : ${dataVille.population}`, divVille);
    })
    .catch((error) => console.log(`erreure attrapée :`, error));
}

selectVille.onchange = async function (event) {
  event.preventDefault();
  console.log("Dpt changé");
  console.log("Dpt sélectionné", selectDepartement.value);

  getAfficheVille(selectVille.value);
};
