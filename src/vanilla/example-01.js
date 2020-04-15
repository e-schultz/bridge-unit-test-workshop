/* should we export these so we can test them? */
// comment out and remove from export
const findProductName = (productId, products) => {
  // return 'deprecated pretend we deleted';
  const product = products.find((product) => product.id === productId);
  return product
    ? product.description
    : `product not found for productId: ${productId}`;
};

const sortByCost = (a, b) => a.cost - b.cost;

const sortInventory = (items) => {
  return [...items].sort(sortByCost);
};

const getProductsWithName = (items, products) => {
  // const productMap = arrayToMap('id', 'description', products);
  return items.map((item) => {
    return {
      ...item,
      description: findProductName(item.productId, products),
    };
  });
};

const getProductsWithNameX = (items, products) => {
  const productMap = arrayToMap('id', 'description', products);
  return items.map((item) => {
    return {
      ...item,
      description: productMap[item.productId],
    };
  });
};

const getCheapestAndMostExpensiveByCategory = (categoryId, data) => {
  const { inventory } = data;
  // we don't want to mutate the source array
  const sorted = sortInventory(inventory);
  const filtered = filterByCategory(categoryId, sorted);
  const filteredWithName = getProductsWithName(filtered, data.products);

  return [filteredWithName[0], filteredWithName[filteredWithName.length - 1]];
};

const filterByCategory = (categoryId, items) => {
  return items.filter((item) => item.categoryId === categoryId);
};

const arrayToMap = (keyProp, valueProp, array) => {
  const itemMap = array.reduce((acc, value) => {
    return { ...acc, [value[keyProp]]: value[valueProp] };
  }, {});
  return itemMap;
};

const getProductMap = (products) => {
  return arrayToMap('id', 'description', products);
};

const getCategoryMap = (categories) => {
  return arrayToMap('id', 'categoryDescription', categories);
};

const getCheapestAndMostExpensiveByCategoryX = (categoryId, data) => {
  const { inventory } = data;
  const productMap = getProductMap(data.products);

  // console.log(productMap);

  const sortedInventory = [...inventory]
    .filter((item) => item.categoryId === categoryId)
    .sort((a, b) => a.cost - b.cost)
    .map((item) => ({ ...item, description: productMap[item.id] }));

  return [sortedInventory[0], sortedInventory[sortedInventory.length - 1]];
};

const getProductsByCategory = (categoryId, data) => {
  const productMap = getProductMap(data.products);
  const categoryMap = getCategoryMap(data.categories);
  return data.inventory
    .filter((product) => product.categoryId === categoryId)
    .map((product) => {
      return {
        ...product,
        description: productMap[product.productId],
        category: categoryMap[product.categoryId],
      };
    });
};

const getProductIdsByCategory = (categoryId, data) => {
  return data.inventory
    .filter((item) => item.categoryId === categoryId)
    .map(({ id }) => id);
};
export {
  getCheapestAndMostExpensiveByCategory,
  getCheapestAndMostExpensiveByCategoryX,
  findProductName,
  arrayToMap,
  getProductsByCategory,
  getProductIdsByCategory,
};
