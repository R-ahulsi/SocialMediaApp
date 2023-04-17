export class Photo {

    constructor(
        public photo_id: number,
        public data: string,
        public user_id: string,
        public caption: string,
        public album_id: number,
        public date_posted: string
    ) {}
}