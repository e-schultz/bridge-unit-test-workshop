/* eslint-disable no-unused-vars */
import {
  getCheapestAndMostExpensiveByCategoryX,
  getCheapestAndMostExpensiveByCategory,
  findProductName,
  arrayToMap,
  getProductsByCategory,
  getProductIdsByCategory,
} from '../vanilla/example-01';
const DATA = {
  inventory: [
    {
      id: 1,
      categoryId: 1,
      quantity: 1,
      productId: 1, // Apples
      cost: 1,
    },
    {
      id: 2,
      categoryId: 1,
      quantity: 10,
      productId: 2, // Banannas
      cost: 2,
    },
    {
      id: 3,
      categoryId: 1,
      quantity: 10,
      productId: 3, // Oranges
      cost: 1.5,
    },
    {
      id: 4,
      categoryId: 2,
      quantity: 5,
      productId: 4, // Wet Cat Food
      cost: 2.5,
    },
    {
      id: 5,
      categoryId: 2,
      quantity: 10,
      productId: 5, // Dry Cat Food
      cost: 5.5,
    },
    {
      id: 6,
      categoryId: 2,
      quantity: 10,
      productId: 6, // Cat Litter
      cost: 8.5,
    },
  ],
  products: [
    { id: 1, description: 'Apples' },
    { id: 2, description: 'Banannas' },
    { id: 3, description: 'Oranges' },
    { id: 4, description: 'Wet Cat Food' },
    { id: 5, description: 'Dry Cat Food' },
    { id: 6, description: 'Cat Litter' },
  ],
  categories: [
    { id: 1, categoryDescription: 'Fruit' },
    { id: 2, categoryDescription: 'Pet Supplies' },
  ],
};

describe('avoid testing implementation details', () => {
  // Given the data above, we know that Apples are the cheapest
  // and Bannas are the most expensive.
  //
  // Knowing this, we can arrange our test to verify that those are the results
  // that get returned.
  test('should get the cheapest and most expensive item', () => {
    // TODO: implement
    expect(1).toEqual(1);
  });

  // for the 'helper' functions - should we export those to make them easier to test?
  // lets look at `findProductName` for example

  test('should return the description of an item matching the product id', () => {
    const expected = 'Banannas';
    const actual = findProductName(2, DATA.products);
    expect(actual).toEqual(expected);
  });

  /*
   it is a good idea to try and keep functions small and single purpose,
   and break out code into smaller pieces - even if it's not intended to be reused
   to make code easier to follow, maintain and understand.
   
   However, if `findProductName` is never meant to be used by other developers and 
   just meant as an internal 'helper' function - it is a better idea
   to leave it as 'private', and test the behaviour of the 'public'
   functions that we expect people to use.

   For example, if we find another way to get the productName
   and no longer have that function, and decide to delete it
   the unit test for `findProductByName` would start to fail
   even though the behaviour we care about remains the same
  */

  test('should also get the cheapest and most product with product name', () => {
    /*
     for example - getCheapestAndMostExpensiveByCategoryX
     is a different implementation of the same functionality, but does not use many/any of the same
     helper methods as the first one
     if we had written tests for all of those other ones - the test suite starts to get
     brittle
    */
    const expectedMin = {
      id: 1,
      categoryId: 1,
      quantity: 1,
      productId: 1,
      cost: 1,
      description: 'Apples',
    };
    const expectedMax = {
      id: 2,
      categoryId: 1,
      quantity: 10,
      productId: 2,
      cost: 2,
      description: 'Banannas',
    };
    const [min, max] = getCheapestAndMostExpensiveByCategoryX(1, DATA);

    expect(min).toEqual(expectedMin);
    expect(max).toEqual(expectedMax);
  });

  // However, some helper functions that could be reusable can be worth testing.
  // For example:  compare `getProductMap` to `arrayToMap` in the vanilla/example-01.js folder
  //
  // * getProductMap is very specific to an implementation detail,
  // * however arrayToMap - this is pretty generic and reusable,
  //
  // Which function would there be more value in writing a unit test for?

  test('should convert an array to an object, using the provided keyProp and valueProp', () => {
    const expected = 1;
    const actual = 1;
    // TODO: proper test for arrayToMap 
    // what is the expected input?
    // what is the expected output?
    expect(actual).toEqual(actual);
  });

  // How do we handle a situation where the data returned, might have
  // more information than we need to validate our test case?
  //
  // This can happen if requirements change, that may cause 
  // additional data to be added to an object, and while writing
  // tests for that new functionality can be useful, it can also
  // cause existing tests to fail.
  //
  // we can use partial matchers to help solve this,
  // https://jestjs.io/docs/en/expect#expectobjectcontainingobject
  //
  // To show this, we will update `getCheapestAndMostExpensiveByCategoryX` 
  // to add the category name to the returned object.
  test('partial matchers', () => {
   
    const expectedMin = {
      id: 1,
      categoryId: 1,
      quantity: 1,
      productId: 1,
      cost: 1,
      description: 'Apples',
    };
    const expectedMax = {
      id: 2,
      categoryId: 1,
      quantity: 10,
      productId: 2,
      cost: 2,
      description: 'Banannas',
    };
    const [min, max] = getCheapestAndMostExpensiveByCategoryX(1, DATA);

    expect(min).toEqual(expectedMin);
    expect(max).toEqual(expectedMax);

  });
});

describe('array matchers', () => {
  test('should return all product ids in a given category', () => {
    const expected = [5, 4, 6];
    const actual = getProductIdsByCategory(2, DATA);
    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('should not include product Ids that are not in the category', () => {
    const notExpected = [1, 2, 3];
    const actual = getProductIdsByCategory(2, DATA);
    // remove the `filter` from getProductIdsByCategory and see how
    // above test passes, but this one fails
    expect(actual).toEqual(expect.not.arrayContaining(notExpected));
  });

  test('should return all products in a category with product name and category description', () => {
    const expected = [
      {
        id: 4,
        categoryId: 2,
        // quantity: 5,
        productId: 4,
        cost: 2.5,
        description: 'Wet Cat Food',
        category: 'Pet Supplies',
      },
      {
        id: 5,
        categoryId: 2,
        quantity: 10,
        productId: 5,
        cost: 5.5,
        description: 'Dry Cat Food',
        category: 'Pet Supplies',
      },
      {
        id: 6,
        categoryId: 2,
        quantity: 10,
        productId: 6,
        description: 'Cat Litter',
        category: 'Pet Supplies',
      },
    ];
    const actual = getProductsByCategory(2, DATA);
    expect(actual).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expected[0]),
        expect.objectContaining(expected[1]),
        expect.objectContaining(expected[2]),
      ])
    );
  });
});
