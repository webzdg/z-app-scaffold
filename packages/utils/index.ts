import * as fs from 'node:fs';

/**
 * 验证是否项目名是否正确 只能类似abc-abd项目名
 * @param projectName 项目名
 */
export function isValidProjectName(projectName: string) {
    return /^[a-z][a-z0-9-]*$/.test(projectName);
}

/**
 * 判断路径内是否时候空文件夹 不包含.git文件夹
 * @param path 目录文件
 */
export function isPathEmpty(path: string) {
    const files = fs.readdirSync(path);
    return files.length === 0 || (files.length === 1 && files[0] === '.git');
}
