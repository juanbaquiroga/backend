import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    warnFile: { type: "file", filename: "warn.log" },
    errorFile: { type: "file", filename: "error.log" },
    loggerError: {type: "logLevelFilter", appender : "errorFile", level: "error"},
    loggerWarn: {type: "logLevelFilter", appender : "warnFile", level: "warn"},
    loggerConsole: {type: "logLevelFilter", appender : "console", level: "info"},
  },
  categories: {
    default: { appenders: ["loggerConsole", 'loggerWarn', 'loggerError'], level: "all" },
  },
});


const logger = log4js.getLogger();

export default logger;