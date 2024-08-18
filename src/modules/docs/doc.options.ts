export function createApiDocsOptions(url: string) {
    return {
            definition: {
                openapi: "3.0.1",
                info: {
                  title: "Схема Rest API для тестового задания от компании bothub",
                  version: "1.0.0",
                },
                schemes: ["http", "https"],
                servers: [{ url }],  
                paths: {
                    "/users/register": {
                        "post": {
                            "tags": ["Users"],
                            "summary": "Регистрация пользователя",
                            "description": "Отправка данных регистрации пользователя",
                            "requestBody": {
                                "required": true,
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/create-user-dto"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "201": {
                                    "description": "Created",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/user-rdo"
                                            }
                                        }
                                    }
                                },
                                "400": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/components/schemas/bad-request-error"
                                                }
                                            }
                                        }
                                    }
                                },
                                "409": {
                                    "description": "Conflict",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/conflict-user-error"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                    "/users/login": {
                        "post": {
                            "tags": ["Users"],
                            "summary": "Аутентификация пользователя",
                            "description": "Отправка данных для получения токена доступа",
                            "requestBody": {
                                "required": true,
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/login-user-dto"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/user-access-rdo"
                                            }
                                        }
                                    }
                                },
                                "400": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/components/schemas/bad-request-error"
                                                }
                                            }
                                        }
                                    }
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "404": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/entity-not-found"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                    "/users/me": {
                        "get": {
                            "tags": ["Users"],
                            "summary": "Получение информации о текущем пользователе",
                            "description": "Отправка данных для получения токена доступа",
                            "parameters": [
                                {
                                    "name": "authorization",
                                    "in": "header",
                                    "description": 'Токен доступа пользователя',
                                    "required": true,
                                    "type": "string",
                                    "example": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/user-rdo"
                                            }
                                        }
                                    }
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                    "/users/:id/role": {
                        "put": {
                            "tags": ["Users"],
                            "summary": "Изменение роли пользователя",
                            "description": "Отправка данных для изменения роли пользователя",
                            "parameters": [
                                {
                                    "name": "id",
                                    "description": "Идентификатор пользователя",
                                    "in": "path",
                                    "required": true,
                                    "type": "string",
                                    "example": "9c979079-49e7-45a7-bd50-312b2ff280cb"
                                },
                                {
                                    "name": "Authorization",
                                    "in": "header",
                                    "description": 'Токен доступа пользователя с правами администратора',
                                    "required": true,
                                    "type": "string",
                                    "example": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/user-rdo"
                                            }
                                        }
                                    }
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "403": {
                                    "description": "Forbidden",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/forbidden"
                                            }
                                        }
                                    }
                                },
                                "404": {
                                    "description": "Not Found",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/entity-not-found"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                    "/books": {
                        "post": {
                            "tags": ["Books"],
                            "summary": "Добавление новой книги в коллекцию",
                            "description": "Отправка данных для добавления новой книги",
                            "parameters": [
                                {
                                    "name": "Authorization",
                                    "in": "header",
                                    "description": 'Токен доступа пользователя с правами администратора',
                                    "required": true,
                                    "type": "string",
                                    "example": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            ],
                            "requestBody": {
                                "required": true,
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/book-dto"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "201": {
                                    "description": "Created",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/book-rdo"
                                            }
                                        }
                                    }
                                },
                                "400": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/components/schemas/bad-request-error"
                                                }
                                            }
                                        }
                                    }
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "403": {
                                    "description": "Forbidden",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/forbidden"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        },
                        "get": {
                            "tags": ["Books"],
                            "summary": "Получение списка книг из коллекции",
                            "description": "Запрос на получение списка книг", 
                            "parameters": [
                                {
                                    "name": "limit",
                                    "description": "Количество выгружаемых сущностей на странице",
                                    "in": "query",
                                    "type": "string",
                                    "example": "25"
                                },
                                {
                                    "name": "page",
                                    "description": "Номер страницы",
                                    "in": "query",
                                    "type": "string",
                                    "example": "3"
                                }
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/components/schemas/book-rdo"
                                                }
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                    "/books/:id": {
                        "get": {
                            "tags": ["Books"],
                            "summary": "Получение книги по id",
                            "description": "Получение детальной информации по книге", 
                            "parameters": [
                                {
                                    "name": "id",
                                    "description": "Идентификатор книги",
                                    "in": "path",
                                    "required": true,
                                    "type": "string",
                                    "example": "a09ef4d5-cad0-489e-8791-b7dd41a55a6f"
                                }
                            ],
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/book-rdo"
                                            }
                                        }
                                    }
                                },
                                "404": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/entity-not-found"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        },
                        "put": {
                            "tags": ["Books"],
                            "summary": "Обновление данных книги",
                            "description": "Запрос на обновление книги в коллекции", 
                            "parameters": [
                                {
                                    "name": "id",
                                    "description": "Идентификатор книги",
                                    "in": "path",
                                    "required": true,
                                    "type": "string",
                                    "example": "a09ef4d5-cad0-489e-8791-b7dd41a55a6f"
                                },
                                {
                                    "name": "Authorization",
                                    "in": "header",
                                    "description": 'Токен доступа пользователя с правами администратора',
                                    "required": true,
                                    "type": "string",
                                    "example": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            ],
                            "requestBody": {
                                "required": true,
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/book-dto"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "200": {
                                    "description": "OK",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/book-rdo"
                                            }
                                        }
                                    }
                                },
                                "400": {
                                    "description": "Bad Request",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/components/schemas/bad-request-error"
                                                }
                                            }
                                        }
                                    }
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "403": {
                                    "description": "Forbidden",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/forbidden"
                                            }
                                        }
                                    }
                                },
                                "404": {
                                    "description": "Not Found",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/entity-not-found"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        },
                        "delete": {
                            "tags": ["Books"],
                            "summary": "Удаление книги",
                            "description": "Запрос на удаление книги из коллекции по id", 
                            "parameters": [
                                {
                                    "name": "id",
                                    "description": "Идентификатор книги",
                                    "in": "path",
                                    "required": true,
                                    "type": "string",
                                    "example": "a09ef4d5-cad0-489e-8791-b7dd41a55a6f"
                                },
                                {
                                    "name": "Authorization",
                                    "in": "header",
                                    "description": 'Токен доступа пользователя с правами администратора',
                                    "required": true,
                                    "type": "string",
                                    "example": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            ],
                            "responses": {
                                "203": {
                                    "description": "No Content"
                                },
                                "401": {
                                    "description": "Unauthorized",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/unauthorized"
                                            }
                                        }
                                    }
                                },
                                "403": {
                                    "description": "Forbidden",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/forbidden"
                                            }
                                        }
                                    }
                                },
                                "404": {
                                    "description": "Not Found",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "$ref": "#/components/schemas/entity-not-found"
                                            }
                                        }
                                    }
                                },
                                "500": { 
                                    "description": "Internal server error" 
                                }
                            }
                        }
                    },
                },
                components: {
                    "schemas": {
                        "create-user-dto": {
                            properties: {
                                username: {
                                    type: "string",
                                    example: "Ivan Ivanov"
                                },
                                email: {
                                    type: "string",
                                    example: "admin@example.com"
                                },
                                password: {
                                    type: "string",
                                    example: "12345678qwepoi"
                                }
                            },
                            required: ["username", "email", "password"],
                        },
                        "login-user-dto": {
                            properties: {
                                email: {
                                    type: "string",
                                    example: "admin@example.com"
                                },
                                password: {
                                    type: "string",
                                    example: "12345678qwepoi"
                                }
                            },
                            required: ["email", "password"],
                        },
                        "user-rdo": {
                            properties: {
                                id: {
                                    type: "string",
                                    example: "9c979079-49e7-45a7-bd50-312b2ff280cb"
                                },
                                username: {
                                    type: "string",
                                    example: "Ivan Ivanov",
                                },
                                email: {
                                    type: "string",
                                    example: "admin@example.com"
                                },
                                isAdmin: {
                                    type: "boolean",
                                    example: false
                                },
                                registrationDate: {
                                    type: "string",
                                    example: "2024-08-15T12:17:25.364Z"
                                }
                            }
                        },
                        "user-access-rdo": {
                            properties: {
                                accessToken: {
                                    type: "string",
                                    example: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5ZjVjYjM4LWMwMGYtNGE4NS04YWE3LWM0YWI1ZDZhYzQ1YyIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTA4LTE2VDE0OjQ2OjQ1LjU4OFoiLCJpYXQiOjE3MjM4MTk2MjQsImV4cCI6MTcyMzg1NTYyNH0.cFbMhtw4f0CZOmzvEULpHyBbx3HVgP5TijuukTIv4v0"
                                }
                            }
                        },
                        "book-dto": {
                            properties: {
                                "title": {
                                    "type": "string",
                                    "example": "Преступление и наказание"
                                },
                                "author": {
                                    "type": "string",
                                    "example": "Ф.М. Достоевский"
                                },
                                "publicationDate": {
                                    "type": "string",
                                    "example": "1866",
                                },
                                "genres": {
                                    "type": "string",
                                    "example": "Роман",
                                }
                            }
                        },
                        "book-rdo": {
                            properties: {
                                "id": {
                                    "type": "string",
                                    "example": "7948adb2-1b29-4cb1-918e-93b2b90069df",
                                },
                                "title": {
                                    "type": "string",
                                    "example": "Преступление и наказание"
                                },
                                "author": {
                                    "type": "string",
                                    "example": "Ф.М. Достоевский"
                                },
                                "publicationDate": {
                                    "type": "string",
                                    "example": "1866-01-01T00:00:00.000Z"
                                },
                                "genres": {
                                    "type": "string",
                                    "example": ""
                                },
                                "addedBy": {
                                    "type": "string",
                                    "example": "96e266f8-21a9-476e-937d-235f5a1cb44a"
                                },
                                "updatedBy": {
                                    "type": "string",
                                    "example": "96e266f8-21a9-476e-937d-235f5a1cb44a"
                                },
                                "createdAt": {
                                    "type": "string",
                                    "example": "2024-08-15T17:39:30.725Z"
                                },
                                "updatedAt": {
                                    "type": "string",
                                    "example": "2024-08-15T17:39:30.725Z"
                                },
                            }
                        },
                        "bad-request-error": {
                            "required": ["field", "details"],
                            "properties": {
                                "field": {
                                    "type": "string",
                                    "description": "Название поля которое передано некорректно",
                                    "example": "username",
                                },
                                "details": {
                                    "schema": {
                                        "type": "array",
                                        "items": "string",
                                    },
                                    "description": "Список описаний ошибок",
                                    "example": ["username should not be empty"],
                                }
                            }
                        },
                        "conflict-user-error": {
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "User with email: admin@example.com already exist"
                                }
                            }
                        },
                        "entity-not-found": {
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "Entity not found"
                                }
                            }
                        },
                        "unauthorized": {
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "Invalid user token"
                                }
                            }
                        },
                        "forbidden": {
                            "properties": {
                                "error": {
                                    "type": "string",
                                    "example": "User must be admin, request decline"
                                }
                            }
                        }
                    },
                },
            },
            apis: [
                `./routes/example-route.ts`,
                "./dist/routes/example-route.js",
            ],
        }
    }