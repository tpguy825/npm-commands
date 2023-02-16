import { execSync, exec } from "child_process";

class npm {
	options: {
		cwd?: string;
		stdio: "inherit" | "ignore";
	};
	args: string[];

	constructor() {
		this.options = {
			stdio: "inherit",
		};
		this.args = process.argv.slice(2);
	}

	/** Sets the directory the command should be run in */
	cwd(dir: string | undefined): this {
		this.options.cwd = dir;
		return this;
	}

	/** Should the output be displayed in the console? */
	output(value: boolean = true): this {
		this.options.stdio = value ? "inherit" : "ignore";
		return this;
	}

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
	 * // This will run `npm install express --save`, aswell as arguments passed to the script
	 * // --save has priority over --save-dev
	 */
	arguments(args: { [key: string]: string | string[] } | false): this {
		if (args === false) {
			this.args = [];
			return this;
		}

		this.args = Object.keys(args)
			// in case of yargs
			.filter((key) => key !== "$0" && key !== "_")
			.map((key) => {
				if (typeof args[key] !== "string") {
					// we already know it's an array but typescript doesn't think so
					return (args[key] as string[])
						.map((value: string) => {
							return value !== "" ? `--${key} ${value}` : `--${key}`;
						})
						.join(" ");
				} else {
					return args[key] !== "" ? `--${key} ${args[key]}` : `--${key}`;
				}
			});
		return this;
	}

	install(module = "", { save, saveDev }: { save?: boolean; saveDev?: boolean } = {}): string | null {
		let saveMode = "";
		if (save) {
			saveMode = "--save";
		} else if (saveDev) {
			saveMode = "--save-dev";
		}

		try {
			return execSync(`npm install ${module} ${saveMode}`, this.options).toString();
		} catch (e) {
			return null;
		}
	}

	installAsync(module = "", { save, saveDev }: { save?: boolean; saveDev?: boolean } = {}): Promise<string> {
		let saveMode = "";
		if (save) {
			saveMode = "--save";
		} else if (saveDev) {
			saveMode = "--save-dev";
		}

		return new Promise((resolve, reject) => {
			try {
				exec(`npm install ${module} ${saveMode}`, this.options, (error, output) => {
					if (error) {
						throw error;
					}
					return resolve(output);
				});
			} catch (e) {
				return reject(null);
			}
		});
	}

	remove(module: string): string | null {
		try {
			return execSync(`npm remove ${module}`, this.options).toString();
		} catch (e) {
			return null;
		}
	}

	removeAsync(module: string): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				exec(`npm remove ${module}`, this.options, (error, output) => {
					if (error) {
						throw error;
					}
					return resolve(output);
				});
			} catch (e) {
				return reject(null);
			}
		});
	}

	link(module = ""): string | null {
		try {
			return execSync(`npm link ${module}`, this.options).toString();
		} catch (e) {
			return null;
		}
	}

	linkAsync(module = ""): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				exec(`npm link ${module}`, this.options, (error, output) => {
					if (error) {
						throw error;
					}
					return resolve(output);
				});
			} catch (e) {
				reject(null);
			}
		});
	}

	unlink(module = ""): string | null {
		try {
			return execSync(`npm unlink ${module}`, this.options).toString();
		} catch (e) {
			return null;
		}
	}

	unlinkAsync(module = ""): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				exec(`npm unlink ${module}`, this.options, (error, output) => {
					if (error) {
						throw error;
					}
					return resolve(output);
				});
			} catch (e) {
				reject(null);
			}
		});
	}

	run(script: string): string | null {
		const args = this.args ? `-- ${this.args.join(" ")}` : "";
		try {
			return execSync(`npm run ${script} ${args}`, this.options).toString();
		} catch (e) {
			return null;
		}
	}

	runAsync(script: string): Promise<string> {
		const args = this.args ? `-- ${this.args.join(" ")}` : "";
		return new Promise((resolve, reject) => {
			try {
				exec(`npm run ${script} ${args}`, this.options, (error, output) => {
					if (error) {
						throw error;
					}

					return resolve(output);
				});
			} catch (e) {
				return reject(null);
			}
		});
	}
}

export default function () {
	return new npm();
}

