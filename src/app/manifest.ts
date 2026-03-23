import type { MetadataRoute } from "next";
import { getLocalizedPath, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Klein Ockenburgh",
    description:
      "Official website of Bed & Breakfast Klein Ockenburgh in The Hague.",
    start_url: getLocalizedPath(siteConfig.defaultLocale),
    display: "standalone",
    background_color: "#f7f0dc",
    theme_color: "#1d2b1c",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
