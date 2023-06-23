import { UserDocument } from "@src/model";
import { IMomentsResponse } from "@src/interface";
import { MomentRepository } from "@src/repository";
import { allMomentsPresenter } from "@src/presenter/moment.presenter";

export const getMomentsService = async (userId: UserDocument["id"], searchKey: string, limit: string | number): Promise<IMomentsResponse> => {

   // Find all moments / by search key
   const [ moments, count, allMoments ] = await Promise.all([
      MomentRepository.find({ ownerId: userId }, searchKey, limit),
      MomentRepository.count({ ownerId: userId }, searchKey),
      MomentRepository.findAllByUserId(userId),
   ]);

   // Defined unique tags
   const tags = allMoments?.map(moment => moment.tag);
   const uniqueTags = Array.from(new Set(tags?.flat()));

   // Return presented data to client
   return {
      data: allMomentsPresenter(moments),
      tagsForFilter: uniqueTags,
      count,
   };

};