import { prisma } from "../lib/prisma";
import {
  categoriesCreateInput,
  categoriesUpdateInput,
} from "../generated/prisma/models";

export class CategoryService {
  async getAll() {
    return await prisma.categories.findMany({
      include: { products: true },
    });
  }

  async getById(id: number) {
    return await prisma.categories.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async create(data: categoriesCreateInput) {
    return await prisma.categories.create({
      data,
      include: { products: true },
    });
  }

  async update(id: number, data: categoriesUpdateInput) {
    return await prisma.categories.update({
      where: { id },
      data,
      include: { products: true },
    });
  }

  async destroy(id: number) {
    return await prisma.categories.delete({ where: { id } });
  }
}
