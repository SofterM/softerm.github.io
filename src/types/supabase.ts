// src/types/supabase.ts
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface ViewRecord {
  id: number;
  page_id: string;
  count: number;
  visitor_ips: string[];
  created_at: string;
  updated_at: string;
}

export type PostgresChanges = RealtimePostgresChangesPayload<ViewRecord>;