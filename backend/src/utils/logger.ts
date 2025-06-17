import winston from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

// Log directory path
const logDir = path.join(__dirname, "../..", "logs"); // Directory where log files will be stored
console.log("Log directory:", logDir);
// DailyRotateFile setup
const fileTransport = new DailyRotateFile({
    dirname: logDir, // Set log directory
    filename: "log_%DATE%.log", // Log file name pattern (e.g., log_10122002.log)
    datePattern: "DDMMYYYY", // Date pattern for log rotation
    zippedArchive: false, // Do not zip old logs
    maxSize: "20m", // Max size per log file
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.printf(({ timestamp, level, message }) => {
            // Format log message for file
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
});

// Create logger
export const logger = winston.createLogger({
    level: "info", // Minimum log level

    transports: [
        // Console FIRST
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Colorize output for console
                winston.format.timestamp(), // Add timestamp
                winston.format.printf(({ timestamp, level, message }) => {
                    // Format log message for console
                    return `[${timestamp}] ${level}: ${message}`;
                })
            )
        }),

        // File logging second
        fileTransport // Use daily rotating file transport
    ],
});
