import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;

const getEnv = (key) => {
  return ENV[`REACT_APP_${key}`];
};

const env = {
  fqdn: getEnv('SERVER_FQDN'),
  port: getEnv('SERVER_PORT'),
  refreshTimeMilliSeconds: getEnv('REFRESH_TIME_MS'),
  app: {
      host: getEnv('HOST'),
      title: getEnv('TITLE'),
      version: getEnv('VERSION'),
      year: getEnv('YEAR'),
      marquee: {
          text: getEnv('MARQUEE_TEXT'),
          loopTime: getEnv('MARQUEE_LOOP_TIME')
      }
  }
};

env.src = env.fqdn + ":" + env.port;

const AppEnvironment = () => env;

export default AppEnvironment();