export interface INote {
   readonly id: string;
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface INotes {
   readonly data: INote[];
   readonly count: number;
}