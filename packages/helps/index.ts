import minimist from 'minimist';
import * as process from 'node:process';
import * as fs from 'node:fs';
import { join, resolve } from 'node:path';
import type { ScaffoldOptions } from 'packages/typing';
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

/**
 * 复制文件到目标目录
 * @param srcDir 源目录
 * @param destDir 目标目录
 */
export function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = resolve(srcDir, file);
        const destFile = resolve(destDir, file);
        // eslint-disable-next-line no-use-before-define
        copy(srcFile, destFile);
    }
}

/**
 * 复制文件
 * @param src 源文件地址
 * @param dest 目标目录
 */
export function copy(src: string, dest: string) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    } else {
        fs.copyFileSync(src, dest);
    }
}

/**
 * 一些需要特别处理的文件过滤出来
 * ignoreFile 需要过滤掉的文件 不进行复制的
 */
export function specialFile(business?: 'app' | 'microfront' | 'frame') {
    return {
        ignoreFile: ['package.json'],
    };
}

/**
 * 重写packageJSon的name以及命令
 */
export function reWritePackage(rootPath: string, templatePath: string, commonOption: ScaffoldOptions) {
    const pkg = JSON.parse(fs.readFileSync(join(templatePath, 'package.json'), 'utf-8'));
    const { projectName } = commonOption;
    pkg.name = projectName;
    pkg.scripts.prepare = 'husky install';
    fs.writeFileSync(join(rootPath, 'package.json'), JSON.stringify(pkg, null, 2));
}
