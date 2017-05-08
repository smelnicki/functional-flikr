import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve";

function ignoreDependencyWarnings(warning) {
    if (/external dependency/.test(warning)) {
        return;
    }

    console.error(warning);
}

export default {
    entry: "src/index.js",
    plugins: [ commonjs(), resolve() ],
    format: "cjs",
    dest: "dist/app.bundle.js",
    onwarn: ignoreDependencyWarnings,
};
