export class Photo {

    constructor(
        public photo_id: string,
        public data: string,
        public user_id: string,
        public caption: string,
        public album_id: string,
        public date_posted: string
    ) {}
}