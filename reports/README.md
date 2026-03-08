# Reports Directory

This directory contains custom test reports and reporting utilities.

## Purpose

- Store custom report templates
- Generate specialized test reports
- Archive historical test results
- Integration with external reporting tools

## Usage

```javascript
const { generateCustomReport } = require('../reports/customReporter');

test.afterAll(async () => {
  await generateCustomReport();
});
```

## Report Types

- HTML reports (handled by Playwright)
- JSON reports for CI/CD
- Custom dashboards
- Performance reports
- Coverage reports

## Note

Playwright automatically generates reports in `playwright-report/` and `test-results/` directories. This folder is for additional custom reporting needs.