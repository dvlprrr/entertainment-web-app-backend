import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseInitializerService } from "./defaultTags/defaultTags";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  const initializerService = app.get(DatabaseInitializerService);
  await initializerService.initialize();
}
bootstrap();
