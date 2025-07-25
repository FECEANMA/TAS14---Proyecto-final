// auth-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import registerService from './registerConsul'; // archivo para registrarse

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await registerService('energy-service', 4002); // nombre y puerto
  await app.listen(4002);
}
bootstrap();
