// eslint-disable-next-line no-undef
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-min-length': [2, 'always', 4],
        'subject-max-length': [2, 'always', 200],
        'type-enum': [
            2,
            'always',
            ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'issue'],
        ],
        'subject-case': [0],
    },
};
