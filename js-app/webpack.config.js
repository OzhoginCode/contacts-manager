import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default  {
    entry: './app/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    mode: 'none'
} 
