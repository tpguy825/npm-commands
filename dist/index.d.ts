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
    /** Arguments to run the command with */
    arguments(args: {
        [key: string]: string | string[];
    } | boolean): this;
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
