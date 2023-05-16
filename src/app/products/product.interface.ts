export interface IProduct {
     id: number,
     name: string | null,
     code: string | null,
     releaseDate: string | null,
     description: string | null,
     price: number | null,
     rating: number | null,
     imageUrl: string | null,
     tags: string[],
}