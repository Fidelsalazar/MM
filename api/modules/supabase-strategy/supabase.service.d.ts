import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private readonly supabaseClient;
    constructor(supabaseClient: SupabaseClient);
    getDataFromTable(table: string): Promise<any[]>;
    saveEmail(email: string): Promise<null>;
}
