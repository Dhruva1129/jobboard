const fs = require('fs'); 
const data = fs.readFileSync('src/data/jobs.ts', 'utf8'); 
const skills = new Set(); 
const regex = /techStack:\s*\[(.*?)\]/g; 
let match; 
while ((match = regex.exec(data)) !== null) { 
  match[1].split(',').forEach(s => skills.add(s.trim().replace(/['"]/g, ''))); 
} 
console.log(Array.from(skills).filter(s => s.length > 0));
