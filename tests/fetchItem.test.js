require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função;', () => {
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toBe(expected);
  })

  it('Executa a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    const endPoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })

  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const actual = await fetchItem("MLB1615760527");
    const expected = item;
    expect(actual).toEqual(expected);
  })

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = new Error('You must provide an url')
    const actual = await fetchItem();
    expect(actual).toEqual(error);
  })
});
