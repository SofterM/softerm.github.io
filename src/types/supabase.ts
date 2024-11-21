import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface PageView {
  id: number;
  page_id: string;
  count: number;
  created_at: string;
  updated_at: string;
}

export type PostgresChanges = RealtimePostgresChangesPayload<{
  old: Partial<PageView>;
  new: PageView;
}>;