import {cp,mkdir,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const src=path.resolve('node_modules/@electric-sql/pglite/dist'),dest=path.resolve('public/vendor/pglite');
await mkdir(dest,{recursive:true});
const assets=[];
async function copy(dir,rel=''){for(const entry of await readdir(dir,{withFileTypes:true})){const r=path.join(rel,entry.name);if(entry.isDirectory()){await copy(path.join(dir,entry.name),r);continue;}if(!/\.(?:js|mjs|wasm|data|json|bin)$/i.test(entry.name))continue;await mkdir(path.dirname(path.join(dest,r)),{recursive:true});await cp(path.join(dir,entry.name),path.join(dest,r));assets.push('/vendor/pglite/'+r.split(path.sep).join('/'));}}
await copy(src);
if(!assets.includes('/vendor/pglite/index.js')||!assets.some(x=>x.endsWith('.wasm')))throw Error('PGlite browser assets missing');
await writeFile('public/vendor/assets.json',JSON.stringify(assets));
console.log('Prepared '+assets.length+' offline engine assets.');
