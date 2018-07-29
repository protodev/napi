export interface ILogger {
    overrideConsole: boolean;
    info(message: string, ... args: any[]);
    trace(message: string, ... args: any[]);
    debug(message: string, ... args: any[]);
    warn(message: string, ... args: any[]);
    error(message: string, ... args: any[]);
}