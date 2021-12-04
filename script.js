function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// adiciona um event listener em cada botão "adicionar ao carrinho", que procura o id do item clicado
// usando a função getSkuFromProductItem e dando como argumento o parentNode do item, que é a section em que
// se encontra os dados do produto. Com o itemId uso a função (helper)fetchItem para buscar o objeto do produto
// que será passado como parâmetro para a função createCartItemElement.
function addItemClickListener() {
  const buttons = document.querySelectorAll('.item__add');
  const cartSection = document.querySelector('.cart__items');

  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const itemID = getSkuFromProductItem(target.parentNode);
    cartSection.appendChild(createCartItemElement(await fetchItem(itemID)));
  }));
}

// a função fetchedData busca de forma assincrona as informação do produto buscado (no caso 'computador'),
// o array desestruturado de data 'results' é onde estará todos os produtos retornados pela API.
// Ao rodar um loop (forEach) no array results, se insere na itemSection cada produto usando a função 'createProductItemElement'
// dentro da HOF 'appendChild'. 
const fetchedData = async () => {
  const data = await fetchProducts('computador');
  const { results } = await data;
  const itemSection = document.querySelector('.items');
  results.forEach((element) => itemSection.appendChild(createProductItemElement(element)));
};

const addCart = async () => {

};

window.onload = async () => {
  await fetchedData();
  addItemClickListener();
 };
