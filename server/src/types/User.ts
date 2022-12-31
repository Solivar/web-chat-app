export interface User {
  id: string;
  name: string;
  hasJoinedRoom: boolean;
  messageLimitStartTime?: number;
  messageCountWhileLimited?: number;
}
