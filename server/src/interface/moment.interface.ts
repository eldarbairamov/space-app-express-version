export interface IMomentResponse {
   readonly id: string;
   readonly title: string;
   readonly date: number;
   readonly photo: string,
   readonly location: string;
   readonly tag: string;
   readonly createdAt: number;
}

export interface IMomentsResponse {
   readonly data: IMomentResponse[];
   readonly count: number;
   readonly tagsForFilter: (string | undefined)[];
}

export interface IUpdateMoment {
   readonly title: string,
   readonly location: string,
   readonly date: number
   readonly tag: string
}
