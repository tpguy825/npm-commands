declare class npm {
    options: {
        cwd?: string;
        stdio: "inherit" | "ignore";
    };
    args: string[];
    constructor();
    /** Sets the directory the command should be run in */
    cwd(dir: string | undefined): this;
    /** Should the output be displayed in the console? */
    output(value?: boolean): this;
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
    arguments(args: {
        [key: string]: string | string[];
    } | false): this;
    install(module?: string, { save, saveDev }?: {
        save?: boolean;
        saveDev?: boolean;
    }): string | null;
    installAsync(module?: string, { save, saveDev }?: {
        save?: boolean;
        saveDev?: boolean;
    }): Promise<string>;
    remove(module: string): string | null;
    removeAsync(module: string): Promise<string>;
    link(module?: string): string | null;
    linkAsync(module?: string): Promise<string>;
    unlink(module?: string): string | null;
    unlinkAsync(module?: string): Promise<string>;
    run(script: string): string | null;
    runAsync(script: string): Promise<string>;
}
export default function (): npm;
export {};
//# sourceMappingURL=index.d.ts.map