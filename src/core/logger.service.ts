import log4js from 'log4js';
import dayjs from 'dayjs';
import chalk from 'chalk';
import { injectable } from 'inversify';
import { LoggerInterface } from '../types';
import { MAX_LOG_FILE_SIZE } from './dictionary/application.constants.js';

@injectable()
export class Logger implements LoggerInterface {
  private readonly consoleDateFormat: string = 'YYYY-MM-DD HH:mm:ss:SSS';
  
  private readonly outerLogger = log4js
    .configure({
      appenders: {
        everything: {
          type: 'file',
          filename: './logs/logs.log',
          maxLogSize: MAX_LOG_FILE_SIZE,
          layout: {
            type: 'pattern',
            pattern: '%d %p %f:%l %m%n',
          },
        },
      },
      categories: {
        default: {
          appenders: ['everything'],
          level: 'debug',
          enableCallStack: true,
        },
      },
    })
    .getLogger();
  public info(message: string, ...args: unknown[]): void {
    console.info(
      `${dayjs().format(this.consoleDateFormat)}`,
      chalk.bgGreen('INFO'),
      chalk.green(message),
      ...args,
    );
    this.outerLogger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(
      `${dayjs().format(this.consoleDateFormat)}`,
      chalk.bgYellow('WARN'),
      chalk.yellow(message),
      ...args,
    );
    this.outerLogger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(
      `${dayjs().format(this.consoleDateFormat)}`,
      chalk.bgRed('ERROR'),
      chalk.red(message),
      ...args,
    );
    this.outerLogger.error(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    console.debug(
      `${dayjs().format(this.consoleDateFormat)}`,
      chalk.bgCyan('DEBUG'),
      chalk.cyan(message),
      ...args,
    );
    this.outerLogger.debug(message, ...args);
  }

  public log(message: string, ...args: unknown[]): void {
    console.log(
      `${dayjs().format(this.consoleDateFormat)}`,
      chalk.bgMagenta('LOG'),
      chalk.magenta(message),
      ...args,
    );
  }
}
