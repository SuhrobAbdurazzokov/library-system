"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config_1 = require("../config");
const all_filter_exception_1 = require("../infrastructure/exception/all.filter.exception");
class Application {
    static async start() {
        const PORT = config_1.config.API_PORT;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api/v1';
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        }));
        app.useGlobalFilters(new all_filter_exception_1.AllExceptionFilter());
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('Library')
            .setDescription('t.me/@suhrobswe')
            .setVersion('1.0.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup(globalPrefix, app, document);
        await app.listen(PORT, () => console.log(`Server running on port:`, PORT));
    }
}
exports.Application = Application;
//# sourceMappingURL=app.service.js.map