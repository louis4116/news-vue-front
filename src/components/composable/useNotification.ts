import { ElNotification } from 'element-plus'

type NotificationStatus = 'success' | 'warning' | 'info' | 'error'

export const useNotification = (
  type: NotificationStatus,
  title: string,
  e: any,
  duration = 3000,
) => {
  ElNotification[type]({
    type: type,
    title,
    message: e,
    duration,
  })
}
