export interface Partner {
  id: number;
  icon: JSX.Element;
  name: string;
  link: string;
}

export interface PartnerDocument {
  id: number;
  title: string;
  subtitle: string;
  photo: string;
  documentItems: Partner[];
}

// Типы для расписания
export interface EducationLevel {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  educationLevel: number;
}

export interface Group {
  id: number;
  name: string;
  course?: {
    number: number;
  };
}

export interface Teacher {
  id: number;
  fullName: string;
}
