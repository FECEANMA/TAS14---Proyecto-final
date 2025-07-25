import Consul from 'consul';

const consul = new Consul();

export default function registerService(name: string, port: number) {
  return new Promise((resolve, reject) => {
    consul.agent.service.register({
      name,
      address: 'host.docker.internal',
      port,
      check: {
        http: `http://host.docker.internal:${port}/health`,
        interval: '10s'
      }
    }, (err) => (err ? reject(err) : resolve(true)));
  });
}
