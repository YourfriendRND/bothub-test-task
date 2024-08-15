export interface BookInterface {
    id?: string;
    title: string;
    author: string;
    publicationDate: Date;
    genres: string;
    addedBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}
