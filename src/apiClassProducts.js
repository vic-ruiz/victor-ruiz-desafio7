import knex from "knex";

export default class Container {
  constructor(options, table) {
    this.knex = knex(options);
    this.table = table;
  }

  async findAll() {
    try {
      const products = await this.knex.from(this.table).select("*");
      return products;
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  async getById(id) {
    try {
      const data = await this.knex.from(this.table).select("*").where("id", id);
      return data;
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  async save(product) {
    try {
      const element = await this.knex.from(this.table).insert(product);
      return element;
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  async deleteAll() {
    try {
      return await this.knex.from(this.table).del();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedElement = await this.knex
        .from(this.table)
        .where("id", id)
        .del();
      return deletedElement;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
