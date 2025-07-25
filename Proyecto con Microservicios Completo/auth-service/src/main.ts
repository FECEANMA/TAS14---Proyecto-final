// auth-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import registerService from './registerConsul'; // archivo para registrarse

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await registerService('auth-service', 4001); // nombre y puerto
  await app.listen(4001);
}
bootstrap();
