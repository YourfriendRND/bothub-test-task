import { Expose } from 'class-transformer';

export class BookRDO {
    @Expose()
    public id!: string;

    @Expose()
    public title!: string;

    @Expose()
    public author!: string;

    @Expose()
    public publicationDate!: string;

    @Expose()
    public genres!: string;

    @Expose()
    public addedBy!: string;

    @Expose()
    public updatedBy!: string;

    @Expose()
    public createdAt!: Date;

    @Expose()
    public updatedAt!: Date;
}
