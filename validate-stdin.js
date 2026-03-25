const { Parser } = require('./dist/src/parser/parser.js');
const { ComprehensiveValidator } = require('./dist/src/parser/comprehensiveValidator.js');

let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const parser = new Parser(input);
    const ast = parser.parse();
    const validator = new ComprehensiveValidator();
    const allErrors = validator.validate(ast);
    // Only return actual errors (severity 0), skip unused-variable warnings
    const errors = allErrors.filter(e => e.severity === 0);
    console.log(JSON.stringify({ valid: errors.length === 0, errors }));
  } catch (e) {
    console.log(JSON.stringify({ valid: false, errors: [{ message: e.message, line: 0 }] }));
  }
});
