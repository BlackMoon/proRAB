module.exports = {
    extends: "universe",    
    rules: {     
      "arrow-parens": 0,
      "import/order":  ["error", {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'ignore',
      }],      
      "no-new-func": 0      
    }
  };