// scripts/set-env.ts
const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${process.env['API_URL']}',
};
`;

fs.writeFileSync(targetPath, envConfigFile);
