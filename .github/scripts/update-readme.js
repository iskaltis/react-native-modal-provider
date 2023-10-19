const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../src');
const readmePath = path.join(__dirname, '../../README.md');
const prefixPath = path.join(__dirname, '../workflows/prefix.md');
const indexPath = path.join(__dirname, '../workflows/index.json');

function updateReadme() {
  let readmeContent = fs.readFileSync(prefixPath, 'utf8') + '\n\n';  // Read prefix.md content and append a couple of new lines

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));  // Read and parse index.json
  index.files.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (fs.existsSync(filePath)) {  // Check if file exists before processing
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const sections = fileContent.split('\n').reduce((acc, line) => {
        if (line.startsWith('//')) {
          acc.push({type: 'comment', content: line.slice(2).trim()});
        } else if (line.trim()) {
          acc[acc.length - 1].code = (acc[acc.length - 1].code || '') + line + '\n';
        }
        return acc;
      }, []);
      
      sections.forEach(section => {
        readmeContent += `### ${section.content}\n\n\`\`\`javascript\n${section.code}\n\`\`\`\n\n`;
      });
    } else {
      console.error(`File not found: ${filePath}`);
    }
  });

  fs.writeFileSync(readmePath, readmeContent);
}

updateReadme();