// Struktur data untuk Custom Frames, Moments, dan Events
export interface CustomFrameItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface MomentItem {
  id: string;
  image: string;
  caption: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

// Kunci penyimpanan di LocalStorage browser
const FRAMES_KEY = "withcabox_custom_frames";
const MOMENTS_KEY = "withcabox_best_moments";
const EVENTS_KEY = "withcabox_exciting_events";

// --- CUSTOM FRAMES ---
export function getStoredFrames(defaultData: CustomFrameItem[]): CustomFrameItem[] {
  if (typeof window === "undefined") return defaultData;
  const saved = localStorage.getItem(FRAMES_KEY);
  return saved ? JSON.parse(saved) : defaultData;
}

export function saveStoredFrames(items: CustomFrameItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FRAMES_KEY, JSON.stringify(items));
}

// --- BEST MOMENTS ---
export function getStoredMoments(defaultData: MomentItem[]): MomentItem[] {
  if (typeof window === "undefined") return defaultData;
  const saved = localStorage.getItem(MOMENTS_KEY);
  return saved ? JSON.parse(saved) : defaultData;
}

export function saveStoredMoments(items: MomentItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOMENTS_KEY, JSON.stringify(items));
}

// --- EXCITING EVENTS ---
export function getStoredEvents(defaultData: EventItem[]): EventItem[] {
  if (typeof window === "undefined") return defaultData;
  const saved = localStorage.getItem(EVENTS_KEY);
  return saved ? JSON.parse(saved) : defaultData;
}

export function saveStoredEvents(items: EventItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(items));
}