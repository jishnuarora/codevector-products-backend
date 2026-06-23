const pool = require("./db");

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports"
];

async function seedProducts() {

  const batchSize = 1000;
  const totalProducts = 200000;

  for (
    let start = 1;
    start <= totalProducts;
    start += batchSize
  ) {

    const placeholders = [];
    const flatValues = [];

    let placeholderIndex = 1;

    for (
      let i = start;
      i < start + batchSize &&
      i <= totalProducts;
      i++
    ) {

      const category =
        categories[
          Math.floor(
            Math.random() *
            categories.length
          )
        ];

      const price =
        Math.floor(
          Math.random() *
          (100000 - 100 + 1)
        ) + 100;

      placeholders.push(
        `($${placeholderIndex},
          $${placeholderIndex + 1},
          $${placeholderIndex + 2})`
      );

      flatValues.push(
        `Product ${i}`,
        category,
        price
      );

      placeholderIndex += 3;
    }

    const query = `
      INSERT INTO products
      (name, category, price)
      VALUES
      ${placeholders.join(",")}
    `;

    await pool.query(
      query,
      flatValues
    );

    console.log(
      `Inserted ${
        Math.min(
          start + batchSize - 1,
          totalProducts
        )
      } products`
    );
  }

  console.log("Seeding Complete");

  await pool.end();
}

seedProducts()
  .catch(console.error);