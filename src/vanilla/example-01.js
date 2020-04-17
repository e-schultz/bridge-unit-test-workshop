/* should we export these so we can test them? */
// comment out and remove from export
const findProductName = (productId, products = []) => {
  // return 'deprecated pretend we deleted';
  const NOT_FOUND = `product not found for productId: ${productId}`;

  const product = products.find((product) => product.id === productId);
  return product ? product.description : NOT_FOUND;
};

const findCategoryName = (categoryId, categories) => {
  // return 'deprecated pretend we deleted';
  const category = categories.find((category) => category.id === categoryId);
  return category
    ? category.categoryDescription
    : `categoryId not found for categoryId: ${categoryId}`;
};

const sortByCost = (a, b) => a.cost - b.cost;

const sortInventory = (items) => {
  return [...items].sort(sortByCost);
};

const getProductsWithName = (items, products) => {
  // const productMap = arrayToMap('id', 'description', products);
  if (!products) {
    return undefined;
  }
  return items.map((item) => {
    return {
      ...item,
      description: findProductName(item.productId, products),
    };
  });
};

const getProducstWithCategoryName = (items, departments) => {
  // const productMap = arrayToMap('id', 'description', products);
  return items.map((item) => {
    return {
      ...item,
      department: findCategoryName(item.categoryId, departments),
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

const filterByCategory = (categoryId, items) => {
  return items.filter((item) => item.categoryId === categoryId);
};

/*
Converts an array with objects like:
[{
    id: '_1',
    description: 'Text'
}]

into an object, with the keyProp being the value to turn into the key, and valueProp the property
to be used as a value.

{
    _1: 'Text'
}
 */
const arrayToMap = (keyProp = 'id', valueProp = 'description', array) => {
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

const getCheapestAndMostExpensiveByCategory = (categoryId, data) => {
  const { inventory } = data;
  const products = data.products || [];
  // we don't want to mutate the source array
  const sorted = sortInventory(inventory);
  const filtered = filterByCategory(categoryId, sorted);
  const filteredWithName = filtered.map((item) => {
    const { description } = products.find(
      (product) => product.id === item.productId
    ) || { description: 'not found' };

    return { ...item, description };
  });

  return [filteredWithName[0], filteredWithName[filteredWithName.length - 1]];
};

const getCheapestAndMostExpensiveByCategoryX = (categoryId, data) => {
  const { inventory } = data;
  const productMap = getProductMap(data.products);
  const categoryMap = getCategoryMap(data.categories);
  const sortedInventory = [...inventory]
    .filter((item) => item.categoryId === categoryId)
    .sort((a, b) => a.cost - b.cost)
    .map((item) => ({
      ...item,
      description: productMap[item.productId],
      category: categoryMap[item.categoryId],
    }));

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
  // findProductName,
  arrayToMap,
  getProductsByCategory,
  getProductIdsByCategory,
};

/*
Update to get the categoryName
const getCheapestAndMostExpensiveByCategory = (categoryId, data) => {
  const { inventory } = data;
  // we don't want to mutate the source array
  const sorted = sortInventory(inventory);
  const filtered = filterByCategory(categoryId, sorted);
  const filteredWithName = getProductsWithName(filtered, data.products);
  const filteredWithCategoryName = getProducstWithCategoryName(
    filteredWithName,
    data.categories
  );
  
  return [
    filteredWithCategoryName[0],
    filteredWithCategoryName[filteredWithCategoryName.length - 1],
  ];
};
*/
