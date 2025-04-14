"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pwa/lazy-load/index.ts
var lazy_load_exports = {};
__export(lazy_load_exports, {
  lazyLoad: () => lazyLoad,
  loadBackground: () => loadBackground,
  loadImage: () => loadImage,
  loadOnScroll: () => loadOnScroll
});
module.exports = __toCommonJS(lazy_load_exports);
var loadImage = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { src = "data-src", placeholder = null } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (placeholder) {
      elements.forEach((el) => {
        if (el instanceof HTMLImageElement) {
          el.src = placeholder;
        }
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (el instanceof HTMLImageElement) {
            const dataSrc = el.getAttribute(src);
            if (dataSrc)
              el.src = dataSrc;
          }
          el.classList.add("loaded");
          el.removeAttribute(src);
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Images set up for lazy loading" };
  } catch (error) {
    throw error;
  }
};
var loadBackground = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { background = "data-background", placeholder = null } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (placeholder) {
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          if (placeholder.startsWith("#") || placeholder.startsWith("rgb")) {
            el.style.backgroundColor = placeholder;
          } else {
            el.style.backgroundImage = `url('${placeholder}')`;
          }
        }
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (el instanceof HTMLElement) {
            const dataBg = el.getAttribute(background);
            if (dataBg)
              el.style.backgroundImage = `url('${dataBg}')`;
          }
          el.classList.add("loaded");
          el.removeAttribute(background);
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Background images set up for lazy loading" };
  } catch (error) {
    throw error;
  }
};
var loadOnScroll = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { animation = "visible", delay = 0, style = "fade" } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (style !== "none" && !document.getElementById("pwafire-lazy-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "pwafire-lazy-styles";
      styleEl.textContent = `
          .pwafire-fade { opacity: 0; transition: opacity 0.6s ease-out; }
              .pwafire-fade.visible { opacity: 1; }
                .pwafire-slide {
                      opacity: 0;
                      transform: translateY(20px);
                      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                  }
                  .pwafire-slide.visible { opacity: 1; transform: translateY(0); }

                  .pwafire-zoom {
                      opacity: 0;
                      transform: scale(0.9);
                      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                  }
                  .pwafire-zoom.visible { opacity: 1; transform: scale(1); }
              `;
      document.head.appendChild(styleEl);
    }
    elements.forEach((el) => {
      if (style !== "none")
        el.classList.add(`pwafire-${style}`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (delay > 0) {
            setTimeout(() => el.classList.add(animation), index * delay);
          } else {
            el.classList.add(animation);
          }
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.15
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Elements set up for scroll reveal" };
  } catch (error) {
    throw error;
  }
};
var lazyLoad = async (options) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const {
      images = ".lazy-image",
      backgrounds = ".lazy-background",
      animations = ".reveal-on-scroll",
      style = "fade"
    } = options || {};
    const promises = [];
    if (document.querySelector(images)) {
      promises.push(loadImage(images));
    }
    if (document.querySelector(backgrounds)) {
      promises.push(loadBackground(backgrounds));
    }
    if (document.querySelector(animations)) {
      promises.push(
        loadOnScroll(animations, {
          style: style ?? "fade"
        })
      );
    }
    if (!promises.length) {
      return { ok: false, message: "No elements found to lazy load" };
    }
    await Promise.all(promises);
    return { ok: true, message: "Lazy loading initialized" };
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lazyLoad,
  loadBackground,
  loadImage,
  loadOnScroll
});
