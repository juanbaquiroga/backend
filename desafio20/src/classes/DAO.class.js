import CustomError from "./CustomError.class.js";

export default class DAO {
  async getAll() {
    throw new CustomError(500, "getAll() not implemented in sub classes");
  }

  async getOne() {
    throw new CustomError(500, "getOne() not implemented in sub classes");
  }

  async create() {
    throw new CustomError(500, "create() not implemented in sub classes");
  }

  async delete() {
    throw new CustomError(500, "delete() not implemented in sub classes");
  }

  async update() {
    throw new CustomError(500, "update() not implemented in sub classes");
  }

  async deleteAll() {
    throw new CustomError(500, "deleteAll() not implemented in sub classes");
  }
}
