// 打包命令脚本 使用esbulid进行打包
import * as esbuild from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as process from 'process';

// const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
await esbuild
    .build({
        bundle: true,
        entryPoints: [resolve(__dirname, '../', 'index.ts')],
        outfile: resolve(__dirname, '../../', 'dist/outfile.cjs'),
        format: 'cjs',
        platform: 'node',
        target: 'esnext',
        plugins: [],
    })
    .catch(() => process.exit(1));
