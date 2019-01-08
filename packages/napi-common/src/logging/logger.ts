import * as winston from 'winston';

export class Logger {
    private _overrideConsole: boolean;
    private _defaultLogger;

    constructor(loggingConfiguration, overrideConsole: boolean = false) {
        this._overrideConsole = overrideConsole;
        this._defaultLogger = process.env.NODE_ENV === 'production' ?
            this.configureProductionLogger() : this.configureLocalLogger();

        if (this._overrideConsole) {
            this.overrideConsole();
        }
    }

    private configureLocalLogger() {
        return winston.createLogger({
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
    }

    private configureProductionLogger() {
        return winston.createLogger({
            transports: [new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.simple(),
                    winston.format.timestamp(),
                    winston.format.json()
                )
            })]
        });
    }

    log(message?: any, ...optionalParams: any[]) {
        winston.log('info', message, optionalParams);
    }

    info(message?: any, ...optionalParams: any[]) {
        winston.log('info', message, optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        winston.log('warn', message, optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        winston.log('error', message, optionalParams);
    }

    verbose(message?: any, ...optionalParams: any[]) {
        winston.log('verbose', message, optionalParams);
    }

    debug(message?: any, ...optionalParams: any[]) {
        winston.log('debug', message, optionalParams);
    }

    private overrideConsole() {
        console.log = (...args) => this._defaultLogger.info.call(this._defaultLogger, ...args);
        console.info = (...args) => this._defaultLogger.info.call(this._defaultLogger, ...args);
        console.warn = (...args) => this._defaultLogger.warn.call(this._defaultLogger, ...args);
        console.error = (...args) => this._defaultLogger.error.call(this._defaultLogger, ...args);
        console.debug = (...args) => this._defaultLogger.debug.call(this._defaultLogger, ...args);
    }
}