# CODING STANDARDS - LLM INSTRUCTION SET

You are required to follow these coding standards for all JavaScript/TypeScript output. These rules are mandatory and non-negotiable.

## CORE DIRECTIVE
Generate deterministic, production-grade code with minimal stylistic entropy. Any violation of these rules constitutes incorrect output.

---

## RULE SET

### R1: VARIABLE DECLARATIONS
R1.1: NEVER use 'var' - FORBIDDEN
R1.2: ALWAYS use 'const' by default
R1.3: ONLY use 'let' when reassignment is REQUIRED

### R2: FUNCTIONS
R2.1: ALWAYS use arrow functions for non-class functions
R2.2: ALWAYS use explicit 'return' with braces {} - NO implicit returns for multi-line logic
R2.3: NEVER use 'function' keyword for standalone functions
R2.4: NEVER use function expressions with 'function' keyword

### R3: COMMENTS
R3.1: ALWAYS start comments with uppercase letter
R3.2: ALWAYS explain WHY, not WHAT - avoid stating the obvious

### R4: NAMING CONVENTIONS
R4.1: Use camelCase for variables and functions
R4.2: Use UPPER_SNAKE_CASE for configuration constants
R4.3: Boolean variables MUST use prefixes: is/has/can/should

### R5: CONTROL FLOW
R5.1: ALWAYS use strict equality (===) and (!==)
R5.2: PREFER guard clauses over nested conditionals
R5.3: MINIMIZE indentation depth

### R6: IMMUTABILITY
R6.1: NEVER mutate input parameters
R6.2: PREFER pure functions when possible

### R7: ERROR HANDLING
R7.1: ALWAYS handle errors explicitly
R7.2: NEVER swallow exceptions (empty catch blocks)

### R8: FORMATTING
R8.1: Use 2 spaces for indentation
R8.2: NO semicolons
R8.3: One blank line between logical blocks
R8.4: Max line length: 100 characters
R8.5: Use trailing commas in multi-line objects/arrays

### R9: ASYNC PATTERNS
R9.1: PREFER async/await over .then()

### R10: DETERMINISTIC CODE
R10.1: Code MUST be predictable
R10.2: Code MUST be pure when possible
R10.3: Side effects MUST be isolated
R10.4: Code MUST be easy to test

---

## VALIDATION CHECKLIST

Before finalizing any code output, verify:

- [ ] No 'var' declarations exist
- [ ] All non-class functions use arrow syntax
- [ ] All comments start with uppercase
- [ ] Strict equality used throughout
- [ ] Guard clauses preferred over nesting
- [ ] Input parameters not mutated
- [ ] Errors explicitly handled
- [ ] 2-space indentation applied
- [ ] No semicolons present
- [ ] Async/await used instead of .then()
- [ ] Boolean variables use proper prefixes

---

## EXAMPLES

### CORRECT PATTERNS
```javascript
const MAX_RETRIES = 3
let retryCount = 0

const calculateTotal = (items) => {
  if (!items?.length) return 0 // Guard clause

  return items.reduce((sum, item) => sum + item.price, 0)
}

const isValidUser = (user) => {
  // Check if user meets criteria
  return user?.isActive && user?.hasEmail
}
```

### INCORRECT PATTERNS
```javascript
var retryCount = 0 // VIOLATION: R1.1

function calculateTotal(items) { // VIOLATION: R2.1
  return items.reduce((sum, item) => sum + item.price, 0)
}

// validate input // VIOLATION: R3.1
const process = (data) => {
  if (data) {
    if (data.items) {
      if (data.items.length) { // VIOLATION: R5.2
        // nested logic
      }
    }
  }
}
```

