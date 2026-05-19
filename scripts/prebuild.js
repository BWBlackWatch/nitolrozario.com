const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const yamlPath = path.join(__dirname, '../data/projects.yaml');
const tsPath = path.join(__dirname, '../data/projects.ts');

const fileContents = fs.readFileSync(yamlPath, 'utf8');
const data = yaml.load(fileContents);

const tsContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Edit projects.yaml instead.
export const projectsData = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(tsPath, tsContent);
console.log("Successfully compiled projects.yaml to projects.ts");
