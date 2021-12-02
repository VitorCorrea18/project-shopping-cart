require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const urlComputador = "https://api.mercadolibre.com/sites/MLB/search?q=computador";

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('verifica se fetchProducts é uma função', () => {
    const actual = typeof fetchProducts;
    const expected = 'function'; 
    expect(actual).toBe(expected);
  })

  it('verifica se a função fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('verifica se ao chamar a função fetchProducts com o argumento computador a função fetch utiliza o endpoint correto', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(urlComputador);
  })

  it('verifica se ao chamar a função com argumento "computador" retorna a estrutura de dados esperada', async () => {
    const actual = await fetchProducts('computador');
    expect(actual).toEqual(computadorSearch);
  })

  it('verifica se ao chamar a função sem argumento retorna o erro esperado', async () => {
    const error = new Error('You must provide an url');
    const actual = await fetchProducts();
    expect(actual).toEqual(error);
  })
});
