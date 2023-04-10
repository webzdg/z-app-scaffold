import minimist from 'minimist';
import * as process from 'node:process';
import * as fs from 'node:fs';
import { resolve } from 'node:path';
/**
 * 获取命令行参数
 */
export function getCmdArgv() {
    return minimist(process.argv.slice(2), { string: ['_'] });
}

/**
 * 将路径中'\'替换成空
 * @param targetDir 需要格式化路径的地址
 */
export function formatTargetDir(targetDir?: string) {
    return targetDir?.trim().replace(/\/+$/g, '');
}

/**
 *
 * @param dir 目标路径
 */
export function emptyDir(dir: string) {
    // eslint-disable-next-line no-useless-return
    if (!fs.existsSync(dir)) return;

    for (const file of fs.readdirSync(dir)) {
        if (file === '.git') continue;
        fs.rmSync(resolve(dir, file), { recursive: true, force: true });
    }
}
