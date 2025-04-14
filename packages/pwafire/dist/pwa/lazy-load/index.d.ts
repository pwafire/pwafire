declare const loadImage: (element: string, options?: ImageOptions) => Promise<LazyLoadResult>;
declare const loadBackground: (element: string, options?: BackgroundOptions) => Promise<LazyLoadResult>;
declare const loadOnScroll: (element: string, options?: ScrollOptions) => Promise<LazyLoadResult>;
declare const lazyLoad: (options?: InitOptions) => Promise<LazyLoadResult>;

export { lazyLoad, loadBackground, loadImage, loadOnScroll };
