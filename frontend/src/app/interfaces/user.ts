export interface User {
  name: string;
  status_id: number;
  user_status: string;
  status_icon: string;
  discipline_points: number;
  profile_picture?: string;
  int_tasks?: number;
  int_weight?: number;
  int_smoke?: number;
}