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
                url: "https://footwearn-backend.vercel.app/"
            }
        ]
    },
    apis: ["./routes/*.ts"]
}