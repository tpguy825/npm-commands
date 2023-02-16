"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var npm = /** @class */ (function () {
    function npm() {
        this.options = {
            stdio: "inherit"
        };
        this.args = process.argv.slice(2);
    }
    /** Sets the directory the command should be run in */
    npm.prototype.cwd = function (dir) {
        this.options.cwd = dir;
        return this;
    };
    /** Should the output be displayed in the console? */
    npm.prototype.output = function (value) {
        if (value === void 0) { value = true; }
        this.options.stdio = value ? "inherit" : "ignore";
        return this;
    };
    /** Arguments to run the command with
     * @example
     * npm().arguments({
     * 		"--no-save": "",
     * }).install("express")
     * // This will run `npm install express --no-save`
     *
     * npm().arguments({}).install("express", { save: true })
     * // This will run `npm install express --save` regardless of arguments passed to the script
     *
     * npm().arguments({}).install("express", { saveDev: true })
     * // This will run `npm install express --save-dev` regardless of arguments passed to the script
     *
     * npm().arguments(false).install("express")
     * // This will run `npm install express --no-save` if run with `node index.js --no-save`
     *
     * npm().arguments(false).install("express", { save: true, saveDev: true })
     * // This will run `npm install express --save` regardless of arguments passed to the script
     * // --save has priority over --save-dev
     */
    npm.prototype.arguments = function (args) {
        if (args === false) {
            this.args = [];
            return this;
        }
        this.args = Object.keys(args)
            // in case of yargs
            .filter(function (key) { return key !== "$0" && key !== "_"; })
            .map(function (key) {
            if (typeof args[key] !== "string") {
                // we already know it's an array but typescript doesn't think so
                return args[key]
                    .map(function (value) {
                    return value !== "" ? "--".concat(key, " ").concat(value) : "--".concat(key);
                })
                    .join(" ");
            }
            else {
                return args[key] !== "" ? "--".concat(key, " ").concat(args[key]) : "--".concat(key);
            }
        });
        return this;
    };
    npm.prototype.install = function (module, _a) {
        if (module === void 0) { module = ""; }
        var _b = _a === void 0 ? {} : _a, save = _b.save, saveDev = _b.saveDev;
        var saveMode = "";
        if (save) {
            saveMode = "--save";
        }
        else if (saveDev) {
            saveMode = "--save-dev";
        }
        try {
            return (0, child_process_1.execSync)("npm install ".concat(module, " ").concat(saveMode), this.options).toString();
        }
        catch (e) {
            return null;
        }
    };
    npm.prototype.installAsync = function (module, _a) {
        var _this = this;
        if (module === void 0) { module = ""; }
        var _b = _a === void 0 ? {} : _a, save = _b.save, saveDev = _b.saveDev;
        var saveMode = "";
        if (save) {
            saveMode = "--save";
        }
        else if (saveDev) {
            saveMode = "--save-dev";
        }
        return new Promise(function (resolve, reject) {
            try {
                (0, child_process_1.exec)("npm install ".concat(module, " ").concat(saveMode), _this.options, function (error, output) {
                    if (error) {
                        throw error;
                    }
                    return resolve(output);
                });
            }
            catch (e) {
                return reject(null);
            }
        });
    };
    npm.prototype.remove = function (module) {
        try {
            return (0, child_process_1.execSync)("npm remove ".concat(module), this.options).toString();
        }
        catch (e) {
            return null;
        }
    };
    npm.prototype.removeAsync = function (module) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                (0, child_process_1.exec)("npm remove ".concat(module), _this.options, function (error, output) {
                    if (error) {
                        throw error;
                    }
                    return resolve(output);
                });
            }
            catch (e) {
                return reject(null);
            }
        });
    };
    npm.prototype.link = function (module) {
        if (module === void 0) { module = ""; }
        try {
            return (0, child_process_1.execSync)("npm link ".concat(module), this.options).toString();
        }
        catch (e) {
            return null;
        }
    };
    npm.prototype.linkAsync = function (module) {
        var _this = this;
        if (module === void 0) { module = ""; }
        return new Promise(function (resolve, reject) {
            try {
                (0, child_process_1.exec)("npm link ".concat(module), _this.options, function (error, output) {
                    if (error) {
                        throw error;
                    }
                    return resolve(output);
                });
            }
            catch (e) {
                reject(null);
            }
        });
    };
    npm.prototype.unlink = function (module) {
        if (module === void 0) { module = ""; }
        try {
            return (0, child_process_1.execSync)("npm unlink ".concat(module), this.options).toString();
        }
        catch (e) {
            return null;
        }
    };
    npm.prototype.unlinkAsync = function (module) {
        var _this = this;
        if (module === void 0) { module = ""; }
        return new Promise(function (resolve, reject) {
            try {
                (0, child_process_1.exec)("npm unlink ".concat(module), _this.options, function (error, output) {
                    if (error) {
                        throw error;
                    }
                    return resolve(output);
                });
            }
            catch (e) {
                reject(null);
            }
        });
    };
    npm.prototype.run = function (script) {
        var args = this.args ? "-- ".concat(this.args.join(" ")) : "";
        try {
            return (0, child_process_1.execSync)("npm run ".concat(script, " ").concat(args), this.options).toString();
        }
        catch (e) {
            return null;
        }
    };
    npm.prototype.runAsync = function (script) {
        var _this = this;
        var args = this.args ? "-- ".concat(this.args.join(" ")) : "";
        return new Promise(function (resolve, reject) {
            try {
                (0, child_process_1.exec)("npm run ".concat(script, " ").concat(args), _this.options, function (error, output) {
                    if (error) {
                        throw error;
                    }
                    return resolve(output);
                });
            }
            catch (e) {
                return reject(null);
            }
        });
    };
    return npm;
}());
function default_1() {
    return new npm();
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map