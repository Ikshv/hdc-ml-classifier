const fs = require('fs');

const readme = fs.readFileSync('README.md', 'utf-8');

const getMeta = (label) => {
  const match = readme.match(new RegExp(`<!--\\s*${label}:\\s*(.*?)\\s*-->`));
  return match ? match[1].trim() : '';
};

const data = {
  name: getMeta('PROJECT_TITLE'),
  slug: getMeta('PROJECT_SLUG'),
  tags: getMeta('PROJECT_TAGS').split(',').map(tag => tag.trim()),
  demo: getMeta('PROJECT_DEMO'),
  github: `https://github.com/${process.env.GITHUB_REPOSITORY}`,
  live: getMeta('PROJECT_LIVE') === 'true'
};

fs.writeFileSync('project.json', JSON.stringify(data, null, 2));
console.log('✅ project.json generated');
