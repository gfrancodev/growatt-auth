export interface IGallery {
    findById(user_id: string): Promise<Gallery.Response[]>
    save(data: Gallery.Data): Promise<Gallery.Response>
}