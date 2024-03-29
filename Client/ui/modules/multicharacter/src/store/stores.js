import { writable } from 'svelte/store';

export const active_state = writable(0);

export const s_nationalities = writable([]);
export const s_characters = writable([]);
export const s_scale = writable(1.0)
export const s_current_idx = writable();

export const s_active_popup = writable();