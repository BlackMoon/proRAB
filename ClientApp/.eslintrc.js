module.exports = {
    extends: "universe",    
    rules: {     
      "arrow-parens": 0,
      "import/order":  ["error", {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'ignore',
      }],      
      "no-console": ["error", { allow: ["debug", "warn", "error"] }],
      "no-new-func": 0      
    }
  };