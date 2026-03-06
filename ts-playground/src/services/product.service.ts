import prisma from "../lib/prisma";

interface Product {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  categoryId?: number;
}

export class ProductService {
  async getAll() {
    return await prisma.product.findMany({
      include: { category: true },
      orderBy: { createadAt: "desc" },
    });
  }

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async create(data: Product) {
    return await prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: number, data: Product) {
    return await prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async destroy(id: number) {
    return await prisma.product.delete({ where: { id } });
  }
}
