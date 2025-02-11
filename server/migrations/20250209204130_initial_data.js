/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('first_name', 255);
      table.string('last_name', 255);
      table.string('email', 255).notNullable();
      table.string('password', 255).notNullable();
      table.enu('role', ['customer', 'store', 'admin']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('stores', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('name', 255).notNullable();
      table.string('address1', 255);
      table.string('address2', 255);
      table.string('city', 255);
      table.string('phone', 15);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('products', function(table) {
      table.increments('id').primary();
      table.integer('store_id').unsigned().references('id').inTable('stores');
      table.string('name', 255).notNullable();
      table.string('description', 255);
      table.decimal('price', 10, 2).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('orders', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.decimal('total', 10, 2).notNullable();
      table.enu('status', ['pending', 'completed', 'cancelled']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('order_items', function(table) {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders');
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.integer('quantity').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('inventories', function(table) {
      table.increments('id').primary();
      table.integer('store_id').unsigned().references('id').inTable('stores');
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.integer('quantity').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('payments', function(table) {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders');
      table.string('payment_gateway_code', 255).notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.enu('method', ['credit_card', 'paypal', 'bank_transfer']).notNullable();
      table.enu('status', ['pending', 'completed', 'failed']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('product_categories', function(table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.integer('category_id').unsigned().references('id').inTable('categories');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('reviews', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('product_id').unsigned().references('id').inTable('products');
      table.integer('rating').notNullable();
      table.string('comment', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('addresses', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('address1', 255).notNullable();
      table.string('address2', 255);
      table.string('city', 255).notNullable();
      table.string('state', 255).notNullable();
      table.string('zip', 10).notNullable();
      table.string('country', 255).notNullable();
      table.enu('type', ['billing', 'shipping']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('coupons', function(table) {
      table.increments('id').primary();
      table.string('code', 255).notNullable();
      table.decimal('discount', 10, 2).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('order_coupons', function(table) {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders');
      table.integer('coupon_id').unsigned().references('id').inTable('coupons');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema
    .dropTableIfExists('order_coupons')
    .dropTableIfExists('coupons')
    .dropTableIfExists('addresses')
    .dropTableIfExists('reviews')
    .dropTableIfExists('product_categories')
    .dropTableIfExists('categories')
    .dropTableIfExists('payments')
    .dropTableIfExists('inventories')
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('products')
    .dropTableIfExists('stores')
    .dropTableIfExists('users');
}