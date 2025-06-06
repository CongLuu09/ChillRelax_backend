import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",  
    info: {
      title: "ChillRelax API",
      version: "1.0.0",
      description: `
  ChillRelax API documentation.<br/><br/>
  <a href="http://localhost:3000/admin" 
     style="
       display: inline-block;
       padding: 8px 16px;
       background-color: #007bff;
       color: white;
       text-decoration: none;
       border-radius: 4px;
       font-size: 16px;
       cursor: pointer;">
     Truy cập Admin Panel tại đây
  </a>
`,

    },
  },
  apis: ["./src/routes/*.ts"], 
};

export const swaggerSpec = swaggerJsdoc(options);
