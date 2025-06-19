import { pointApi } from "@/api/point"
import { useAuthStore } from "@/stores/auth"
import { useQuery } from "@tanstack/vue-query"
import { storeToRefs } from "pinia"
import { computed } from "vue"

export function useSelfSchool() {
  const authStore = useAuthStore()

  const { uid } = storeToRefs(authStore)

  return useQuery({
    enabled: computed(() => !!uid.value),
    queryKey: ['self-school', uid],
    queryFn: () => pointApi.getBonusBySchoolByWeek({ uid: Number(uid.value) }),
    select: (data) => data.data.school_name,
  })
}
