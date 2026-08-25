export interface Photo {
  id: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
  storageKey: string;
  metadataKey: string;
  url: string;
}

export interface Gallery {
  id: string;
  name: string;
  type: 'Client Review' | 'Public' | 'Portfolio' | 'Draft';
  status: 'Active' | 'Published' | 'Draft';
  photoIds: string[];
  views: number;
  lastUpdatedAt: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'photographer' | 'client';
  createdAt: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}
