export type Notification = {
  id: string
  title: string
  body: string
  data: Record<string, number | string> | null
  isRead: boolean
  createdAt: string
  userId: string
}