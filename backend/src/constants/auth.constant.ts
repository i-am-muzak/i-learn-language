import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot();

export const jwtSecret = process.env.JWT_SECRET;