import * as winston from 'winston';

export class Logger {
    private _overrideConsole: boolean = false;
    private _httpLogger;
    private _defaultLogger;

    constructor(loggingConfiguration, overrideConsole?: boolean) {
        this._overrideConsole = overrideConsole;
        this._defaultLogger = winston.createLogger({
            transports: [new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                    winston.format.timestamp(),
                    winston.format.printf(msg => {
                        return `${msg.timestamp} - ${msg.level} ${msg.className ? `| ${msg.className}` : ''} |${msg.trace ? ` ${msg.trace} |` : ''} ${msg.message}`
                    })
                )
            })]
        });
        
        if (this._overrideConsole) {
            this.overrideConsole();
        }
    }

    private overrideConsole() {
        console.log = (...args) => this._defaultLogger.info.call(this._defaultLogger, ...args);
        console.info = (...args) => this._defaultLogger.info.call(this._defaultLogger, ...args);
        console.warn = (...args) => this._defaultLogger.warn.call(this._defaultLogger, ...args);
        console.error = (...args) => this._defaultLogger.error.call(this._defaultLogger, ...args);
        console.debug = (...args) => this._defaultLogger.debug.call(this._defaultLogger, ...args);
    }
}