export interface IMoment {
   id: string;
   readonly title: string;
   photo: string;
   readonly date: number;
   readonly location: string;
   readonly tag: string;
   createdAt: number;
}

export interface IMoments {
   readonly data: IMoment[];
   readonly tagsForFilter: string[];
   readonly count: number;
}