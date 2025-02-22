/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('order_coupons').del();
  await knex('coupons').del();
  await knex('reviews').del();
  await knex('payments').del();
  await knex('inventories').del();
  await knex('order_items').del();
  await knex('orders').del();
  await knex('products').del();
  await knex('stores').del();
  await knex('users').del();

  await knex('users').insert([
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: '$2b$10$SdO/ZzaRiBCjBg7smRM3cOViXGYWrs9jwWS090cFZkwzNX3rLlBYO', role: 'customer', verified: true },
    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', password: '$2b$10$SdO/ZzaRiBCjBg7smRM3cOViXGYWrs9jwWS090cFZkwzNX3rLlBYO', role: 'store', verified: true }
  ]);

  await knex('stores').insert([
    { id: 1, user_id: 2, name: "Jane's Store", address1: '123 Main St', address2: 'Suite 100', city: 'Anytown', phone: '123-456-7890' }
  ]);

  await knex('products').insert([
    { id: 1, name: 'Product 1', description: 'Description for product 1', distillery: 'Distillery 1', ml: 750, alc: 40.00, category: 'Whiskey', image: 'https://placehold.co/200x150' },
    { id: 2, name: 'Product 2', description: 'Description for product 2', distillery: 'Distillery 2', ml: 750, alc: 40.00, category: 'Vodka', image: 'https://placehold.co/200x150' }
  ]);

  await knex('orders').insert([
    { id: 1, user_id: 1, total: 49.98, status: 'completed', address1: '123 Main St', address2: 'Apt 1', town: 'Anytown', city: 'Hong Kong'}
  ]);

  await knex('order_items').insert([
    { order_id: 1, product_id: 1, price: 100.99, quantity: 2 },
    { order_id: 1, product_id: 2, price: 100.99, quantity: 2 }
  ]);

  await knex('inventories').insert([
    { store_id: 1, product_id: 1, unit_price: 100.99, quantity: 100 },
    { store_id: 1, product_id: 2, unit_price: 100.99, quantity: 50 }
  ]);

  await knex('payments').insert([
    { order_id: 1, payment_gateway_code: 'PAY123456', amount: 49.98, method: 'credit_card', status: 'completed' }
  ]);

  await knex('reviews').insert([
    { user_id: 1, product_id: 1, rating: 5, comment: 'Great product!' },
    { user_id: 2, product_id: 2, rating: 4, comment: 'Good quality.' }
  ]);

  await knex('coupons').insert([
    { id: 1, code: 'DISCOUNT10', discount: 10.00 },
    { id: 2, code: 'FREESHIP', discount: 5.00 }
  ]);

  await knex('order_coupons').insert([
    { order_id: 1, coupon_id: 1 }
  ]);
};