/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {

    await knex('order_coupons').del();
    await knex('coupons').del();
    await knex('addresses').del();
    await knex('reviews').del();
    await knex('product_categories').del();
    await knex('categories').del();
    await knex('payments').del();
    await knex('inventories').del();
    await knex('order_items').del();
    await knex('orders').del();
    await knex('products').del();
    await knex('stores').del();
    await knex('users').del();

    await knex('users').insert([
      { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: '$2b$10$SdO/ZzaRiBCjBg7smRM3cOViXGYWrs9jwWS090cFZkwzNX3rLlBYO', role: 'customer' },
      { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', password: '$2b$10$SdO/ZzaRiBCjBg7smRM3cOViXGYWrs9jwWS090cFZkwzNX3rLlBYO', role: 'store' },
      { first_name: 'Admin', last_name: 'User', email: 'admin@example.com', password: '$2b$10$SdO/ZzaRiBCjBg7smRM3cOViXGYWrs9jwWS090cFZkwzNX3rLlBYO', role: 'admin' }
    ]);

    await knex('stores').insert([
      { user_id: 2, name: "Jane's Store", address1: '123 Main St', address2: 'Suite 100', city: 'Anytown', phone: '123-456-7890' }
    ]);

    await knex('products').insert([
      { store_id: 1, name: 'Product 1', description: 'Description for product 1', price: 19.99 },
      { store_id: 1, name: 'Product 2', description: 'Description for product 2', price: 29.99 }
    ]);

    await knex('orders').insert([
      { user_id: 1, total: 49.98, status: 'completed' }
    ]);

    await knex('order_items').insert([
      { order_id: 1, product_id: 1, quantity: 2, price: 19.99 },
      { order_id: 1, product_id: 2, quantity: 1, price: 29.99 }
    ]);

    await knex('inventories').insert([
      { store_id: 1, product_id: 1, quantity: 100 },
      { store_id: 1, product_id: 2, quantity: 50 }
    ]);

    await knex('payments').insert([
      { order_id: 1, payment_gateway_code: 'PAY123456', amount: 49.98, method: 'credit_card', status: 'completed' }
    ]);

    await knex('categories').insert([
      { name: 'Category 1' },
      { name: 'Category 2' }
    ]);

    await knex('product_categories').insert([
      { product_id: 1, category_id: 1 },
      { product_id: 2, category_id: 2 }
    ]);

    await knex('reviews').insert([
      { user_id: 1, product_id: 1, rating: 5, comment: 'Great product!' },
      { user_id: 2, product_id: 2, rating: 4, comment: 'Good quality.' }
    ]);

    await knex('addresses').insert([
      { user_id: 1, address1: '123 Main St', address2: 'Apt 1', city: 'Anytown', state: 'CA', zip: '12345', country: 'USA', type: 'billing' },
      { user_id: 2, address1: '456 Elm St', address2: '', city: 'Othertown', state: 'NY', zip: '67890', country: 'USA', type: 'shipping' }
    ]);

    await knex('coupons').insert([
      { code: 'DISCOUNT10', discount: 10.00 },
      { code: 'FREESHIP', discount: 5.00 }
    ]);

    await knex('order_coupons').insert([
      { order_id: 1, coupon_id: 1 }
    ]);
};