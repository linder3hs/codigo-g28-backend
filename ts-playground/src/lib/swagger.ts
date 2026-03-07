import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TS Playground API",
      version: "1.0.0",
      description:
        "API REST construida con Express, TypeScript y Prisma (PostgreSQL)",
      contact: {
        name: "Equipo Backend G28",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // SCHEMAS reutilizables
    // ─────────────────────────────────────────────────────────────────────────
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Electrónica" },
            description: {
              type: "string",
              nullable: true,
              example: "Dispositivos electrónicos y accesorios",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Laptop Gamer" },
            description: {
              type: "string",
              nullable: true,
              example: "Laptop de alto rendimiento",
            },
            price: { type: "number", format: "float", example: 1299.99 },
            stock: { type: "integer", example: 15 },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-06T00:00:00.000Z",
            },
            categoryId: { type: "integer", nullable: true, example: 1 },
            categories: { $ref: "#/components/schemas/Category" },
          },
        },
        ProductCreateInput: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string", example: "Laptop Gamer" },
            description: {
              type: "string",
              nullable: true,
              example: "Laptop de alto rendimiento",
            },
            price: { type: "number", format: "float", example: 1299.99 },
            stock: { type: "integer", example: 15 },
            categoryId: { type: "integer", nullable: true, example: 1 },
          },
        },
        ProductUpdateInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Laptop Gamer Pro" },
            description: {
              type: "string",
              nullable: true,
              example: "Versión mejorada",
            },
            price: { type: "number", format: "float", example: 1499.99 },
            stock: { type: "integer", example: 10 },
            categoryId: { type: "integer", nullable: true, example: 2 },
          },
        },
        SuccessListResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
          },
        },
        SuccessItemResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/Product" },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            message: { type: "string", example: "Product eliminado" },
          },
        },
        NotFoundResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            message: { type: "string", example: "Producto no encontrado" },
          },
        },
        CategoryCreateInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Electrónica" },
            description: {
              type: "string",
              nullable: true,
              example: "Dispositivos electrónicos y accesorios",
            },
          },
        },
        CategoryUpdateInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Electrónica y Gadgets" },
            description: {
              type: "string",
              nullable: true,
              example: "Descripción actualizada",
            },
          },
        },
        CategorySuccessListResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        CategorySuccessItemResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/Category" },
          },
        },
        CategoryDeleteResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            message: { type: "string", example: "Categoría eliminada" },
          },
        },
        CategoryNotFoundResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            message: { type: "string", example: "Categoría no encontrada" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            error: { type: "string", example: "Internal server error" },
          },
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PATHS — toda la documentación de endpoints va aquí
    // ─────────────────────────────────────────────────────────────────────────
    paths: {
      "/api/products": {
        get: {
          summary: "Obtener todos los productos",
          tags: ["Products"],
          description:
            "Retorna la lista completa de productos ordenados por fecha de creación (más reciente primero), incluyendo su categoría.",
          responses: {
            200: {
              description: "Lista de productos obtenida exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessListResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          summary: "Crear un nuevo producto",
          tags: ["Products"],
          description:
            "Crea un nuevo producto en el catálogo. Los campos `name` y `price` son obligatorios.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductCreateInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Producto creado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessItemResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/products/{id}": {
        get: {
          summary: "Obtener un producto por ID",
          tags: ["Products"],
          description:
            "Retorna un producto específico con su categoría usando su ID.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico del producto",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Producto encontrado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessItemResponse" },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/NotFoundResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          summary: "Actualizar un producto existente",
          tags: ["Products"],
          description:
            "Actualiza los campos de un producto existente. Solo se actualizan los campos enviados en el body.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico del producto a actualizar",
              example: 1,
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductUpdateInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Producto actualizado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessItemResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Eliminar un producto",
          tags: ["Products"],
          description:
            "Elimina permanentemente un producto del catálogo usando su ID.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico del producto a eliminar",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Producto eliminado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DeleteResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/categories": {
        get: {
          summary: "Obtener todas las categorías",
          tags: ["Categories"],
          description:
            "Retorna la lista completa de categorías incluyendo sus productos asociados.",
          responses: {
            200: {
              description: "Lista de categorías obtenida exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategorySuccessListResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          summary: "Crear una nueva categoría",
          tags: ["Categories"],
          description:
            "Crea una nueva categoría. El campo `name` es obligatorio y debe ser único.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CategoryCreateInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Categoría creada exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategorySuccessItemResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/categories/{id}": {
        get: {
          summary: "Obtener una categoría por ID",
          tags: ["Categories"],
          description:
            "Retorna una categoría específica con sus productos asociados usando su ID.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la categoría",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Categoría encontrada exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategorySuccessItemResponse" },
                },
              },
            },
            404: {
              description: "Categoría no encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategoryNotFoundResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          summary: "Actualizar una categoría existente",
          tags: ["Categories"],
          description:
            "Actualiza los campos de una categoría existente. Solo se actualizan los campos enviados en el body.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la categoría a actualizar",
              example: 1,
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CategoryUpdateInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Categoría actualizada exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategorySuccessItemResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Eliminar una categoría",
          tags: ["Categories"],
          description:
            "Elimina permanentemente una categoría usando su ID.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la categoría a eliminar",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Categoría eliminada exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CategoryDeleteResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  // No necesitamos escanear ningún archivo de rutas
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
