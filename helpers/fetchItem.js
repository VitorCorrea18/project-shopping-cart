const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  try {
    const item = await (await fetch(url)).json();
    return item;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
