# z-app-scaffold
自定义前端脚手架App/Monorepo工程

# 使用
## 安装
```
// 全局安装
npm i z-app-scaffold -g 
// or npx
npx z-app-scaffold

// or 需全局安装后才能使用
npx zcap
```

# 预制模版
> 该cli所有`template` 都含有`eslint + prettier + commitlint`
## 独立应用

该模版基于`vite + react`进行运用创建。

## 微前端应用

该模版待开发建设。目前不可用

## 基础架构

该模版只有基准的eslint等工具，没有集成任意前端框架。

# 开发&发包事项

1、 日常迭代，请切单独分支

```
git checkout -b fix/xxxx
```

2、 开发完成后确保通过测试后，提交 MR✅。

3、 MR 完成后，切回主分支并更新到最新代码，执行发版流程
更新版本
> 不要忘记git pull，确保本地是最新的代码及 git 信息完整，而且生成版本号及 CHANGELOG.md 的内容也是根据 git 的 tag 及 commit 生成的。
>不然npm run r可能会出现非预期的情况

```
# 此时你需要在主分支main上
git pull

# 注意该命令会自动生成changelog&版本控制
npm run r

```
4、发布到 npm

```
npm run p
```

# 注意

1、**当你运行npm run r生成`changelog`，该命令会自动根据提交的`commit`来决定是patch还是minor**

你可以参考`standard-version`来添加特定的参数进行版本控制

```
# 首次发版 不会更新version
npm run r -- --first-release
# patch / minor / major 
npm run r -- --release-as patch|minor|major
```

2、当你使用本脚手架进行项目创建，请注意查看当前运行目录下是否存在与你项目名相同的文件夹，可能会清空你原有文件夹内容