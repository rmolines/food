export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

type Tables = Database["public"]["Tables"];
export type Categories = Tables["categories"]["Row"];
export type Types = Tables["types"]["Row"];
export type Reviews = Tables["reviews"]["Row"];
export type Profiles = Tables["profiles"]["Row"];

export interface Database {
	public: {
		Tables: {
			categories: {
				Row: {
					emoji: string | null;
					id: number;
					name: string | null;
				};
				Insert: {
					emoji?: string | null;
					id: number;
					name?: string | null;
				};
				Update: {
					emoji?: string | null;
					id?: number;
					name?: string | null;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					full_name: string | null;
					id: string;
					instagram: string | null;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					full_name?: string | null;
					id: string;
					instagram?: string | null;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					full_name?: string | null;
					id?: string;
					instagram?: string | null;
					updated_at?: string | null;
					username?: string | null;
				};
			};
			restaurants: {
				Row: {
					address: string | null;
					avatar_url: string | null;
					created_at: string | null;
					id: number;
					instagram: string | null;
					name: string | null;
				};
				Insert: {
					address?: string | null;
					avatar_url?: string | null;
					created_at?: string | null;
					id?: number;
					instagram?: string | null;
					name?: string | null;
				};
				Update: {
					address?: string | null;
					avatar_url?: string | null;
					created_at?: string | null;
					id?: number;
					instagram?: string | null;
					name?: string | null;
				};
			};
			reviews: {
				Row: {
					category: number | null;
					created_at: string | null;
					creator: string | null;
					images_info: Json | null;
					rating: number | null;
					restaurant: Json | null;
					review: string | null;
					title: string | null;
					type: number | null;
					uuid: string;
				};
				Insert: {
					category?: number | null;
					created_at?: string | null;
					creator?: string | null;
					images_info?: Json | null;
					rating?: number | null;
					restaurant?: Json | null;
					review?: string | null;
					title?: string | null;
					type?: number | null;
					uuid?: string;
				};
				Update: {
					category?: number | null;
					created_at?: string | null;
					creator?: string | null;
					images_info?: Json | null;
					rating?: number | null;
					restaurant?: Json | null;
					review?: string | null;
					title?: string | null;
					type?: number | null;
					uuid?: string;
				};
			};
			types: {
				Row: {
					id: number;
					name: string | null;
				};
				Insert: {
					id: number;
					name?: string | null;
				};
				Update: {
					id?: number;
					name?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
