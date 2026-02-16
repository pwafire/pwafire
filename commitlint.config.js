module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Only allow feat, fix, chore types
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'ci', 'test', 'refactor', 'style']
    ],
    // Require scope (e.g., feat(clipboard))
    'scope-empty': [2, 'never'],
    // Subject must start with lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Max line length
    'header-max-length': [2, 'always', 100],
    // No period at end of subject
    'subject-full-stop': [2, 'never', '.'],
    // Subject must not be empty
    'subject-empty': [2, 'never'],
  }
};
