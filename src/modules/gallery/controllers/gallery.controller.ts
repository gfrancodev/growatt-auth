import { Controller, Get, HttpCode, Request, UseGuards } from "@nestjs/common";
import { FindByIdService } from "../services/findbyid.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtGuard } from "src/modules/shared/guards/jwt.guard";

@Controller('v1/gallery')
export class GalleryController {
    constructor(
        private readonly findByIdService: FindByIdService
    ){}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Get()
    async findById(@Request() req) {
        return await this.findByIdService.execute(req.user.id)
    }
}