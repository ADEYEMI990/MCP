export interface Resume {
  name: string;
  positions: {
    title: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
  skills: string[];
}