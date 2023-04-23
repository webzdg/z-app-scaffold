#!/usr/bin/env node

/* eslint-disable no-console */
import { intro, outro, group, text, select, cancel, confirm, spinner } from '@clack/prompts';
import * as process from 'process';
import * as fs from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { green, lightMagenta, red, reset } from 'kolorist';
import gradient from 'gradient-string';
import { isValidProjectName, isPathEmpty } from './utils';
import { getCmdArgv, formatTargetDir, emptyDir, copy, specialFile, reWritePackage } from './helps';
import { BUSINESS } from './configs';
import type { ScaffoldOptions } from './typing/index';

const argv = getCmdArgv();

// 当前脚本运行的目录
const cwd = process.cwd();

async function init() {
    intro(
        `${gradient([
            { color: '#42d392', pos: 0 },
            { color: '#42d392', pos: 0.1 },
            { color: '#647eff', pos: 1 },
        ])('十年沉淀，@webzdg出品 👀～～～')}`,
    );

    // 创建项目的目录
    let targetDir = formatTargetDir(argv._[0]) || '';

    const commonOption: ScaffoldOptions = await group(
        {
            business: () =>
                select({
                    message: reset('选择所属应用或业务:'),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    options: BUSINESS.map((bus) => {
                        const color = bus.color;
                        return {
                            label: color(bus.name),
                            value: bus.value,
                        };
                    }),
                }),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            projectName: () =>
                text({
                    message: reset('项目名称：'),
                    initialValue: targetDir,
                    defaultValue: targetDir,
                    placeholder: '输入项目名称',
                    validate: (input: string) =>
                        isValidProjectName(input) ? void 0 : red('无效的项目名，格式为小写字母连字符，如：abc-def'),
                }),
            typescript: () =>
                confirm({
                    message: reset('是否使用TypeScript'),
                    initialValue: true,
                }),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            overwrite: ({ results: { projectName } }: { results: ScaffoldOptions }) => {
                if (!fs.existsSync(projectName) || isPathEmpty(projectName)) return null;
                return confirm({
                    message:
                        (projectName === '.' ? '当前目录' : `目标目录 "${projectName}" `) +
                        '不为空。 删除现有文件并继续？',
                    initialValue: true,
                });
            },
        },
        {
            onCancel: () => {
                cancel('用户取消操作');
                process.exit(0);
            },
        },
    );

    const { business, projectName, overwrite, typescript } = commonOption;

    targetDir = projectName ?? targetDir;

    // 当前生成项目的路径(包含文件名)
    const root = join(cwd, targetDir);

    /* ------------------------------------------------清理文件夹------------------------------------------------------ */
    if (overwrite) {
        const s = spinner();
        s.start('正在打扫战场1......');
        emptyDir(root);
        s.stop(red(`目标目录 "${targetDir}" 已清理完成.....`));
    } else if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true });
    } else if (overwrite === false) {
        // 用户取消覆盖
        throw new Error(red('✖') + ' Operation cancelled');
    }

    const { ignoreFile } = specialFile(business as any);

    // 模版文件地址
    // eslint-disable-next-line no-undef
    let templateDir = resolve(__dirname, `template/${business}`);
    if (typescript) {
        templateDir = templateDir.concat('-ts');
    }

    /**
     * 写入文件内容和复制文件的方法
     * @param file 文件
     * @param content 内容
     */
    const write = (file: string, content?: string) => {
        const targetPath = join(root, file);
        if (content) {
            fs.writeFileSync(targetPath, content);
        } else {
            copy(join(templateDir, file), targetPath);
        }
    };

    // 读取模板下的文件
    const files = fs.readdirSync(templateDir);

    /** 写入文件 */
    const writeFiles = () => {
        // 遍历并执行读写操作
        for (const file of files.filter((f) => !ignoreFile.includes(f))) {
            write(file);
        }
    };

    writeFiles();

    /* ------------------------------------------------修改package.json ----------------------------------------------- */

    reWritePackage(root, templateDir, commonOption);

    outro(`${green('项目创建成功 🎉')}～～～`);

    console.log('\n运行以下命令，开始开发😜\n');

    if (root !== cwd) {
        console.log(`  cd ${relative(cwd, root)}`);
    }

    console.log('  pnpm install');
    console.log('  pnpm run dev');
}

init()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
    })
    .finally(() => {
        process.exit(1);
    });
