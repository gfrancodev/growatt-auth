import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaHelper } from "../../helpers/prisma.helper";
import { IGallery } from "../../interfaces/igallery";

@Injectable()
export class GalleryRepository implements IGallery {
    constructor(
        private prisma: PrismaHelper
    ){}

    async findById(user_id: string): Promise<Gallery.Response[]> {
        try {
            return await this.prisma.gallery.findMany({ where: {
                user_id
            }})
        } catch (error) {
            return []
        }
    }

    async save(data: Gallery.Data) {
        try {
            return await this.prisma.gallery.create({ data })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}