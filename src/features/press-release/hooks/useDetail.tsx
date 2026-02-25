import { useQuery } from "@tanstack/react-query";
import { PressReleaseType } from "@/features/press-release/types/pressRelease.type";
import ArticleService from "@/features/press-release/services/pressRelease.service";

function usePressReleaseDetail(params: Record<string, string | number> = {}, slug: string) {
    const { data, isLoading } =  useQuery<{data: PressReleaseType}>({
        queryKey: ["press-release", slug, params],
        queryFn: async () => {
          return await ArticleService.getOne(slug, params)
        },
      })

    return {
      data: data?.data,   
      isLoading   
    };
  }
  
  export default usePressReleaseDetail;