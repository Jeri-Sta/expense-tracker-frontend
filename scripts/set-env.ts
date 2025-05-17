// scripts/set-env.ts
const fs = require('fs');
require('dotenv').config(); // <-- carrega as variáveis do .env

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${process.env['API_URL']}',
};
`;

console.log('API_URL:', process.env['API_URL']);
fs.writeFileSync(targetPath, envConfigFile);
