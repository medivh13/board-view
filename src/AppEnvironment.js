const env = {
  fqdn: "http://localhost",
  port: 3001,
  refreshTimeMilliSeconds: 3000,
  app: {
      host: 'http://localhost:3000',
      title: 'Fi-Board',
      version: 'v0.0.1',
      year: 2019,
      marquee: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper ipsum nec iaculis. Fusce leo dolor, tristique in mollis posuere, sodales non arcu. Integer tristique eu neque nec consequat. Suspendisse venenatis id enim feugiat commodo. Nunc tristique ante vitae dolor ultrices sodales. Aliquam fermentum diam a porta ultricies. Nullam hendrerit suscipit nisi, nec ullamcorper nisl dignissim vel. Vestibulum ac nibh egestas, cursus leo nec, convallis eros. Etiam eleifend in elit eget rutrum.',
          loopTime: '45s'
      }
  }
};

env.src = env.fqdn + ":" + env.port;

module.exports = env;