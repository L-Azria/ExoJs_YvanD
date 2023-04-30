/*
 * Crée un élément du dom, lui ajoute du texte, le place comme dernier
 * enfant de parent et ajoute un attribut en utilisant le paramètre attribute
 * @param {String} markup_name
 * @param {String} text
 * @param {domElement} parent
 * @param {Object} attribute  (doit comprendre les propriétés name et value)
 * @returns domElement
 */

function createMarkup(markup_name, text, parent, attribute) {
  const markup = document.createElement(markup_name);
  markup.textContent = text;
  parent.appendChild(markup);
  if (
    attribute &&
    attribute.hasOwnProperty("name") &&
    attribute.hasOwnProperty("value")
  ) {
    markup.setAttribute(attribute.name, attribute.value);
  }
  return markup;
}
// création du nav
const nav = createMarkup("nav", "", document.body);

// création des boutons dans nav
const tous = createMarkup("button", "Tous", nav, {
  name: "class",
  value: "boutonTous",
});
const html = createMarkup("button", "HTML", nav, {
  name: "class",
  value: "boutonHtml",
});
const css = createMarkup("button", "CSS", nav, {
  name: "class",
  value: "boutonCss",
});
const js = createMarkup("button", "JS", nav, {
  name: "class",
  value: "boutonJs",
});

// mise en page des boutons
nav.style.display = "flex";
nav.style.flexDirection = "row";
nav.style.justifyContent = "center";

let button = document.querySelectorAll("button");
console.log(button);
button.forEach((button) => {
  button.style.color = "white";
  button.style.backgroundColor = "green";
  button.style.display = "flex";
  button.style.flexDirection = "row";
  button.style.margin = "20px";
  button.style.borderRadius = "10%";
});

// création d'une section
const section = createMarkup("section", "", document.body);

// création des articles
for (i = 0; i < 5; i++) {
  let i = 1;
  const aCss = createMarkup("article", "Article sur les CSS", section, {
    name: "class",
    value: "css",
  });
}

for (i = 0; i < 5; i++) {
  let i = 1;
  const aHtml = createMarkup("article", "Article sur le HTML", section, {
    name: "class",
    value: "html",
  });
}

for (i = 0; i < 6; i++) {
  let i = 1;
  const aJs = createMarkup("article", "Article sur le JS", section, {
    name: "class",
    value: "js",
  });
}

// mise en page des articles
section.style.display = "flex";
section.style.flexFlow = "row wrap";
section.style.justifyContent = "center";

let article = document.querySelectorAll("article");
console.log(article);
article.forEach((article) => {
  article.style.color = "green";
  article.style.margin = "20px";
  article.style.padding = "20px";
  article.style.border = "black 1px solid";
  article.style.borderRadius = "5%";
  article.style.height = "10rem";
});

// hidden
/* let hCss = document.querySelectorAll(".css");
console.log(hCss); */

html.addEventListener("click", () => {
  document.querySelectorAll(".css").forEach((hCss) => {
    hCss.hidden = true;
  });
  document.querySelectorAll(".js").forEach((hJs) => {
    hJs.hidden = true;
  });
  document.querySelectorAll(".html").forEach((hHtml) => {
    hHtml.hidden = false;
  });
});

css.addEventListener("click", () => {
  document.querySelectorAll(".html").forEach((hHtml) => {
    hHtml.hidden = true;
  });
  document.querySelectorAll(".js").forEach((hJs) => {
    hJs.hidden = true;
  });
  document.querySelectorAll(".css").forEach((hCss) => {
    hCss.hidden = false;
  });
});

js.addEventListener("click", () => {
  document.querySelectorAll(".html").forEach((hHtml) => {
    hHtml.hidden = true;
  });
  document.querySelectorAll(".css").forEach((hCss) => {
    hCss.hidden = true;
  });
  document.querySelectorAll(".js").forEach((hJs) => {
    hJs.hidden = false;
  });
});

tous.addEventListener("click", () => {
  document.querySelectorAll(".html").forEach((hHtml) => {
    hHtml.hidden = false;
  });
  document.querySelectorAll(".css").forEach((hCss) => {
    hCss.hidden = false;
  });
  document.querySelectorAll(".js").forEach((hJs) => {
    hJs.hidden = false;
  });
});
