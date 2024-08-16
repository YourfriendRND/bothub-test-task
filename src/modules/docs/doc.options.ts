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
                    "/users/registration": {
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
                                    "name": "Authorization",
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
                        "bad-request-error": {
                            required: ["message"],
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Передан некорректный формат данных"
                                }
                            }
                        },
                        "unauthorized": {
                            required: ["message"],
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Ошибка авторизации, параметр X-Access-Token передан некорректно"
                                }
                            }
                        },
                    },
                },
            },
            apis: [
                `./routes/example-route.ts`,
                "./dist/routes/example-route.js",
            ],
        }
    }