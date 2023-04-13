import { Module } from "@nestjs/common";
import { GalleryController } from "./controllers/gallery.controller";
import { FindByIdService } from "./services/findbyid.service";

@Module({
    controllers: [GalleryController],
    providers: [FindByIdService]
})
export class GalleryModule {}