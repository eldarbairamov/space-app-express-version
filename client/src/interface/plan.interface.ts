export interface IPlan {
   readonly id: string;
   readonly title: string;
   readonly lastModified: number;
}

export interface IPlans {
   readonly data: IPlan[];
   readonly count: number;
}

