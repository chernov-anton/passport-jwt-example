const logger = {...console};
const stub = () => {
};

if (process.env.NODE_ENV !== 'development') {
  logger.log = stub;
  logger.warn = stub;
  logger.error = stub;
}

export default logger;