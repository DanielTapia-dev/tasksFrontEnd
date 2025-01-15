export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  creationDate?: {
    seconds: number;
    nanoseconds: number;
  };
}
