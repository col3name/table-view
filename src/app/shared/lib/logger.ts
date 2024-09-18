import { CustomError } from 'ts-custom-error';

export enum ErrorLevel {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARN = 'WANR',
}

export class ClientError extends CustomError {
  constructor(
    message: string,
    public additional = {}
  ) {
    super(message);

    this.additional = additional;
  }
}

type LogErrorOptions = {
  level: ErrorLevel;
  additional?: Record<string, unknown>;
};

export const logError = (options: LogErrorOptions, error: Error) => {
  // TODO can use external logger
  switch (options.level) {
    case ErrorLevel.ERROR: {
      console.error(error, options.additional);
      break;
    }
    case ErrorLevel.WARN: {
      console.warn(error, options.additional);
      break;
    }
    case ErrorLevel.INFO: {
      console.info(error, options.additional);
      break;
    }
  }
};
