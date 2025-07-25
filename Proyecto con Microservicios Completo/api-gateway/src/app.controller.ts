// api-gateway/src/app.controller.ts
import { Controller, Get, Post, Req, Res, All } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import Consul from 'consul';

@Controller()
export class AppController {
  private consul = new Consul();

  constructor(private readonly http: HttpService) {}

  @All('*')
  async proxy(@Req() req, @Res() res) {
    const [_, service, ...rest] = req.url.split('/');
    const route = '/' + rest.join('/');

    const serviceInfo = await this.consul.agent.service.list();
    const instance = Object.values(serviceInfo).find(s => s.Service === service);

    if (!instance) return res.status(502).json({ error: 'Servicio no disponible' });

    const url = `http://${instance.Address}:${instance.Port}${route}`;
    const axiosConfig = {
      method: req.method,
      headers: req.headers,
      data: req.body,
      url
    };

    try {
      const response = await lastValueFrom(this.http.request(axiosConfig));
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error al comunicar con microservicio' });
    }
  }
}
