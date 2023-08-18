import path from 'path'
export const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Footwearn API",
            version: "1.0.0",
            description: "API correspondiente al E-Shop de zapatillas de Footwearn"
        },
        servers: [
            {
                url: "http://localhost:8001"
            }
        ]
    },
    apis: ["./routes/*.ts"]
}