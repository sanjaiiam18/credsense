import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filepath));
    } else if (filepath.endsWith('.js') || filepath.endsWith('.jsx')) {
      results.push(filepath);
    }
  });
  return results;
}

const files = walk('./src');

const replacements = [
  { from: /text-gray-400/g, to: 'text-slate-500' },
  { from: /text-gray-500/g, to: 'text-slate-400' },
  { from: /text-gray-300/g, to: 'text-slate-600' },
  { from: /text-white/g, to: 'text-slate-900' },
  { from: /bg-\[\#121214\]/g, to: 'bg-white' },
  { from: /border-white\/5/g, to: 'border-slate-200' },
  { from: /border-white\/10/g, to: 'border-slate-200' },
  { from: /border-white\/20/g, to: 'border-slate-300' },
  { from: /bg-white\/5/g, to: 'bg-slate-50' },
  { from: /bg-white\/10/g, to: 'bg-slate-100' },
  { from: /bg-zinc-800/g, to: 'bg-slate-200' },
  { from: /bg-background/g, to: 'bg-slate-50' },
  { from: /border-glass-border/g, to: 'border-slate-300' },
  { from: /bg-black\/50/g, to: 'bg-white' },
  { from: /bg-black\/40/g, to: 'bg-slate-50' },
  { from: /bg-black\/20/g, to: 'bg-slate-50' },
  { from: /bg-glass/g, to: 'bg-white' },
  
  // Specific chart / svg stroke colors for dark mode
  { from: /stroke="#333"/g, to: 'stroke="#e2e8f0"' },
  { from: /stroke="#27272a"/g, to: 'stroke="#e2e8f0"' },
  { from: /stroke="#888"/g, to: 'stroke="#64748b"' },
  { from: /fill: '#888'/g, to: "fill: '#64748b'" },
  { from: /stroke="#666"/g, to: 'stroke="#cbd5e1"' },
  { from: /backgroundColor: '#111'/g, to: "backgroundColor: '#ffffff'" },
  { from: /borderColor: '#333'/g, to: "borderColor: '#e2e8f0'" },
  { from: /borderColor: '#e2e8f0', borderRadius: '8px' }/g, to: "borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }" },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  // Fix text-white on buttons with primary colors
  content = content.replace(/bg-primary([^"']*)text-slate-900/g, 'bg-primary$1text-white');
  content = content.replace(/bg-blue-500([^"']*)text-slate-900/g, 'bg-blue-500$1text-white');
  content = content.replace(/text-slate-900([^"']*)bg-primary/g, 'text-white$1bg-primary');
  content = content.replace(/text-slate-900([^"']*)bg-blue-500/g, 'text-white$1bg-blue-500');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
