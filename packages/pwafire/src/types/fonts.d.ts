// Font Access API types
interface FontAccess {
  postscriptNames?: string[];
}

interface FontData {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
  blob: unknown;
}
