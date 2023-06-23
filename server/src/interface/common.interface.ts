export interface IDeleteItemBody {
   readonly limit: number;
   readonly searchKey: string;
}

export interface IQuery extends IDeleteItemBody {
}