import { intro, outro, group, text, select, cancel, confirm } from '@clack/prompts';
import * as process from 'process';
import * as fs from 'node:fs';
import { join } from 'node:path';
import { green, lightMagenta, red, reset } from 'kolorist';
import gradient from 'gradient-string';
import { isValidProjectName, isPathEmpty } from './utils';
import { getCmdArgv, formatTargetDir, emptyDir } from './helps';
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
            typescript: () =>
                confirm({
                    message: reset('是否使用TypeScript'),
                    initialValue: true,
                }),
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

    if (overwrite) {
        outro(`\n${lightMagenta('正在打扫战场......')}\n`);
        emptyDir(root);
    }

    outro(`${green('项目创建成功 🎉')}～～～`);
}

init()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
    })
    .finally(() => {
        process.exit(1);
    });
