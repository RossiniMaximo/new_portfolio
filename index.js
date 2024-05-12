function getData() {
  const data = fetch(
    "https://cdn.contentful.com/spaces/v0f7iosuzuih/environments/master/entries?access_token=vzoHwFgBKwy1C-ZQ960lkkk42_tfFNbG3QAighG92G8"
  )
    .then((res) => res.json())
    .then((data) => {
      return { complete: data, items: data.items };
    });
  return data;
}

function parseData(data) {
  let counter = 0;
  const proyectsList = [];

  for (let item of data.items) {
    let newProyect = {};
    newProyect.title = item.fields.title;
    newProyect.description = item.fields.description.content.map((content) => {
      return content.content[0].value;
    });
    newProyect.img = data.complete.includes.Asset[counter].fields.file.url;
    newProyect.linkUrl = item.fields.url;
    proyectsList.push(newProyect);
    counter++;
  }
  return proyectsList;
}

function renderData(newProyect) {
  const cardsContainer = document.querySelector(".proyects");
  newProyect.map((p) => {
    const templateEl = document.querySelector("#cards_template");
    const imgEl = templateEl.content.querySelector(".card_img");
    const titleEl = templateEl.content.querySelector(".card_title");
    const descriptionEl = templateEl.content.querySelector(".card_description");
    const linkEl = templateEl.content.querySelector(".card_show_more");
    titleEl.textContent = p.title;
    descriptionEl.textContent = p.description;
    linkEl.href = p.linkUrl;
    imgEl.src = p.img;
    const clone = document.importNode(templateEl.content, true);
    cardsContainer.appendChild(clone);
  });
}

function main() {
  const data = getData().then((data) => {
    const newProyects = parseData(data);
    renderData(newProyects);
  });
}
main();
