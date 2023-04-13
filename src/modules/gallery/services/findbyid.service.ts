import { Inject, Injectable } from "@nestjs/common";
import { IGallery } from "src/modules/shared/interfaces/igallery";

@Injectable()
export class FindByIdService {
    constructor(
        @Inject('Gallery')
        private readonly gallery: IGallery
    ){}

    async execute(id: string) {
        return await this.gallery.findById(id)
    }
}