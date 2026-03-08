/**
 * Lightweight logger utility for test execution tracing.
 * Enable debug logs with LOG_LEVEL=debug.
 */
class Logger {
  static levels = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  static get currentLevel() {
    const configured = (process.env.LOG_LEVEL || 'info').toLowerCase();
    return this.levels[configured] || this.levels.info;
  }

  static format(level, message, meta) {
    const timestamp = new Date().toISOString();
    const metadata = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metadata}`;
  }

  static debug(message, meta) {
    if (this.currentLevel <= this.levels.debug) {
      console.log(this.format('debug', message, meta));
    }
  }

  static info(message, meta) {
    if (this.currentLevel <= this.levels.info) {
      console.log(this.format('info', message, meta));
    }
  }

  static warn(message, meta) {
    if (this.currentLevel <= this.levels.warn) {
      console.warn(this.format('warn', message, meta));
    }
  }

  static error(message, meta) {
    if (this.currentLevel <= this.levels.error) {
      console.error(this.format('error', message, meta));
    }
  }
}

module.exports = Logger;
