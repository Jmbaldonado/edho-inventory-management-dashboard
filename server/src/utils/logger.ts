import * as rTracer from 'cls-rtracer';
import winston from 'winston';

function createLogger(config: any) {
    const {
        formats = {},
        console: consoleConfig = {},
        files = [],
        levels = winston.config.npm.levels,
        colors,
    } = config || {};

    const _timestamp = winston.format.timestamp({
        format: formats.timestamp || 'YYYY-MM-DD HH:mm:ss',
    });
    const _print = winston.format.printf((info) => {
        const rid = rTracer.id();
        return rid
            ? `${info.timestamp} ${info.level}: [requestId: ${rid}] ${info.message}`
            : `${info.timestamp} ${info.level}: ${info.message}`;
    });

    if (colors) {
        winston.addColors(colors);
    }

    const _console = {
        ...consoleConfig,
        format: winston.format.combine(
            winston.format.colorize(),
            _timestamp,
            _print,
        ),
    };

    const logger = winston.createLogger({
        levels,
        transports: [new winston.transports.Console(_console)],
    });

    files.forEach((fileConfig) => {
        const { level: fileLevel, filename } = fileConfig;
        logger.add(
            new winston.transports.File({
                filename,
                level: fileLevel,
                format: winston.format.combine(
                    winston.format.align(),
                    _timestamp,
                    _print,
                ),
            }),
        );
    });

    return logger;
}

class Logger {
    private static instance: any;

    private constructor() {
        throw new Error('Use Logger.getInstance() instead');
    }

    static getInstance(config?: any) {
        if (!Logger.instance) {
            Logger.instance = createLogger(config);
        }
        return Logger.instance;
    }

    info(message: string) {
        Logger.getInstance().info(message);
    }

    error(message: string) {
        Logger.getInstance().error(message);
    }

    warn(message: string) {
        Logger.getInstance().warn(message);
    }
}

export default Logger;
