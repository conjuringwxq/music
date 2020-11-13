module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  plugins: ["react-hooks"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off", // 开启后未被使用的变量会报错
    "no-prototype-builtins": "off", // 开启后将默认使用O bject.propertype 内置属性
    "no-new": "off",
    "no-param-reassign": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn", // <--- THIS IS THE NEW RULE
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "global-require": "off",
    "import/export": "off",
    "react/no-array-index-key": "off"
  }
};
