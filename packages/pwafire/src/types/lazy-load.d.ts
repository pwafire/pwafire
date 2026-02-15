// Lazy Load API types
interface LazyLoadResult {
  ok: boolean;
  message: string;
}

interface ImageOptions {
  src?: string;
  placeholder?: string | null;
}

interface BackgroundOptions {
  background?: string;
  placeholder?: string | null;
}

interface ScrollOptions {
  animation?: string;
  delay?: number;
  style?: "fade" | "slide" | "zoom" | "none";
}

interface InitOptions {
  images?: string;
  backgrounds?: string;
  animations?: string;
  style?: string;
}
