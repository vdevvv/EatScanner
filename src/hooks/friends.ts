import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {friendsService} from "../services/friends.service";
import {handleApiError} from "../utils/handleApiError";

export const useMyFriends = (search: string, page: number) => {
  return useQuery({
    queryKey: ["my-friends", search, page],
    queryFn: () => friendsService.getMyFriends({search, page}),
  })
}

export const useRemoveFriend = () => {
  const queryKey = ['my-friends'];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => friendsService.removeFriend(friendId),
    onSuccess: () => queryClient.invalidateQueries({queryKey}),
    onError: (error) => handleApiError(error)
  })
}