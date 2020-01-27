import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import builtins from "rollup-plugin-node-builtins";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const minify = process.env.MINIFY;
const format = process.env.FORMAT;
const es = format === "es";
const umd = format === "umd";
const cjs = format === "cjs";

let output;

if (es) {
  output = {
    file: "dist/vue-searchbox.es.js",
    format: "es"
  };
} else if (umd) {
  const globalsUMD = {
    vue: "Vue"
  };
  if (minify) {
    output = {
      file: "dist/vue-searchbox.umd.min.js",
      format: "umd",
      globals: globalsUMD
    };
  } else {
    output = {
      file: "dist/vue-searchbox.umd.js",
      format: "umd",
      globals: globalsUMD
    };
  }
} else if (cjs) {
  output = {
    file: "dist/vue-searchbox.cjs.js",
    format: "cjs"
  };
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`);
} else {
  throw new Error("no format specified. --environment FORMAT:xxx");
}

export default {
  input: "src/entry.js",
  output: Object.assign(
    {
      name: umd ? "VueSearchbox" : "vue-searchbox"
    },
    output
  ),
  external: umd
    ? Object.keys(pkg.peerDependencies || {})
    : [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
      ],
  plugins: [
    json(),
    umd
      ? resolve({
          mainFields: ["browser", "module"],
          browser: true,
          preferBuiltins: false
        })
      : {},
    umd
      ? commonjs({
          include: ["node_modules/**"]
        })
      : {},
    babel({
      ...(!umd && { exclude: "node_modules/**" }),
      babelrc: false,
      extensions: [".js", ".jsx", ".ts"],
      presets: [
        [
          "@babel/preset-env",
          {
            loose: true,
            modules: false
          }
        ],
        "@vue/babel-preset-jsx"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        ["@babel/plugin-proposal-class-properties", { loose: false }],
        "@babel/plugin-proposal-json-strings"
      ]
    }),
    umd
      ? replace({
          "process.env.NODE_ENV": JSON.stringify(
            minify ? "production" : "development"
          ),
          delimiters: ["", ""]
        })
      : null,
    umd ? globals() : {},
    umd ? builtins() : {},
    minify ? terser() : null
  ].filter(Boolean)
};
