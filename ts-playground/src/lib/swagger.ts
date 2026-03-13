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

        // ── Auth schemas ─────────────────────────────────────────────────────
        RegisterInput: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string", example: "john_doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
              example: "secret123",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "secret123",
            },
          },
        },
        AuthUser: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            username: { type: "string", example: "john_doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            rol: { type: "string", example: "USER" },
          },
        },
        RegisterResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                username: { type: "string", example: "john_doe" },
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                rol: { type: "string", example: "USER" },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2026-03-12T00:00:00.000Z",
                },
              },
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
                user: { $ref: "#/components/schemas/AuthUser" },
              },
            },
          },
        },
        ProfileResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                username: { type: "string", example: "john_doe" },
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                rol: { type: "string", example: "USER" },
                orders: { type: "array", items: { type: "object" } },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2026-03-12T00:00:00.000Z",
                },
              },
            },
          },
        },
        UnauthorizedResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            message: { type: "string", example: "Token expirado" },
          },
        },

        // ── Orders schemas ───────────────────────────────────────────────────
        OrderItem: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            orderId: { type: "integer", example: 1 },
            productId: { type: "integer", example: 3 },
            quantity: { type: "integer", example: 2 },
            unitPrice: { type: "number", format: "float", example: 1299.99 },
            products: { $ref: "#/components/schemas/Product" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            userId: { type: "integer", example: 1 },
            total: { type: "number", format: "float", example: 2599.98 },
            status: {
              type: "string",
              enum: ["PENDING", "COMPLETED", "CANCELLED"],
              example: "PENDING",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-12T00:00:00.000Z",
            },
            users: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                username: { type: "string", example: "john_doe" },
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
              },
            },
            order_items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
          },
        },
        OrderItemInput: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "integer", example: 3 },
            quantity: { type: "integer", minimum: 1, example: 2 },
          },
        },
        OrderCreateInput: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              minItems: 1,
              items: { $ref: "#/components/schemas/OrderItemInput" },
              example: [
                { productId: 1, quantity: 2 },
                { productId: 3, quantity: 1 },
              ],
            },
          },
        },
        OrderStatusUpdateInput: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["PENDING", "COMPLETED", "CANCELLED"],
              example: "COMPLETED",
            },
          },
        },
        OrderSuccessListResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Order" },
            },
          },
        },
        OrderSuccessItemResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/Order" },
          },
        },
        OrderDeleteResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            data: { type: "string", example: "Order deleted" },
          },
        },
        OrderNotFoundResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            data: { type: "string", example: "Order not found" },
          },
        },
        OrderBadRequestResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: false },
            data: {
              type: "string",
              example: "Se require al menos 1 item para crear la orden.",
            },
          },
        },
      },

      // ── Security schemes ───────────────────────────────────────────────────
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Ingresa el token JWT obtenido en /api/auth/login. Formato: **Bearer &lt;token&gt;**",
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PATHS — toda la documentación de endpoints va aquí
    // ─────────────────────────────────────────────────────────────────────────
    paths: {
      // ── Auth ─────────────────────────────────────────────────────────────
      "/api/auth/register": {
        post: {
          summary: "Registrar un nuevo usuario",
          tags: ["Auth"],
          description:
            "Crea una cuenta de usuario nueva. La contraseña se almacena encriptada con bcrypt. Retorna el usuario creado (sin la contraseña).",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Usuario registrado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RegisterResponse" },
                },
              },
            },
            500: {
              description: "Error interno del servidor (ej. email duplicado)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/login": {
        post: {
          summary: "Iniciar sesión",
          tags: ["Auth"],
          description:
            "Autentica al usuario con email y contraseña. Retorna un token JWT válido por 24 horas junto con la información básica del usuario.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Login exitoso — token JWT generado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginResponse" },
                },
              },
            },
            500: {
              description: "Credenciales inválidas u error interno",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/profile": {
        get: {
          summary: "Obtener perfil del usuario autenticado",
          tags: ["Auth"],
          description:
            "Retorna el perfil completo del usuario autenticado, incluyendo sus órdenes. **Requiere token JWT** en el header `Authorization: Bearer <token>`.",
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Perfil obtenido exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ProfileResponse" },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
                },
              },
            },
            404: {
              description: "Usuario no encontrado",
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
      },

      // ── Products ──────────────────────────────────────────────────────────
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
                  schema: {
                    $ref: "#/components/schemas/CategorySuccessListResponse",
                  },
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
                  schema: {
                    $ref: "#/components/schemas/CategorySuccessItemResponse",
                  },
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
                  schema: {
                    $ref: "#/components/schemas/CategorySuccessItemResponse",
                  },
                },
              },
            },
            404: {
              description: "Categoría no encontrada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CategoryNotFoundResponse",
                  },
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
                  schema: {
                    $ref: "#/components/schemas/CategorySuccessItemResponse",
                  },
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
          description: "Elimina permanentemente una categoría usando su ID.",
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
                  schema: {
                    $ref: "#/components/schemas/CategoryDeleteResponse",
                  },
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

      // ── Orders ───────────────────────────────────────────────────────────
      "/api/orders": {
        get: {
          summary: "Obtener todas las órdenes",
          tags: ["Orders"],
          description:
            "Retorna la lista completa de órdenes ordenadas por fecha de creación (más reciente primero), incluyendo el usuario y los items con sus productos. **Requiere token JWT.**",
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Lista de órdenes obtenida exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderSuccessListResponse",
                  },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
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
          summary: "Crear una nueva orden",
          tags: ["Orders"],
          description:
            "Crea una nueva orden para el usuario autenticado. Se debe enviar un array `items` con al menos un producto. El `total` se calcula automáticamente según el precio de cada producto y la cantidad solicitada. **Requiere token JWT.**",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderCreateInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Orden creada exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderSuccessItemResponse",
                  },
                },
              },
            },
            400: {
              description:
                "Petición inválida — se requiere al menos 1 item en el array",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderBadRequestResponse",
                  },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
                },
              },
            },
            500: {
              description:
                "Error interno del servidor (ej. producto no encontrado)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/orders/{id}": {
        get: {
          summary: "Obtener una orden por ID",
          tags: ["Orders"],
          description:
            "Retorna una orden específica con su usuario y los items con sus productos. **Requiere token JWT.**",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la orden",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Orden encontrada exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderSuccessItemResponse",
                  },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
                },
              },
            },
            404: {
              description: "Orden no encontrada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderNotFoundResponse",
                  },
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
          summary: "Eliminar una orden",
          tags: ["Orders"],
          description:
            "Elimina permanentemente una orden y todos sus items asociados. **Requiere token JWT.**",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la orden a eliminar",
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Orden eliminada exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderDeleteResponse",
                  },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
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

      "/api/orders/{id}/status": {
        patch: {
          summary: "Actualizar el estado de una orden",
          tags: ["Orders"],
          description:
            "Actualiza el campo `status` de una orden existente. Los valores permitidos son `PENDING`, `COMPLETED` y `CANCELLED`. **Requiere token JWT.**",
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "integer" },
              description: "ID numérico de la orden a actualizar",
              example: 1,
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderStatusUpdateInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Estado de la orden actualizado exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/OrderSuccessItemResponse",
                  },
                },
              },
            },
            401: {
              description: "No autorizado — token ausente, inválido o expirado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UnauthorizedResponse" },
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
