const path = require("path");
const log = console.log;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withImages = require("next-images");

const nextConfig = () => {
  return withBundleAnalyzer(
    withImages({
      // next-image's default list excluding svg
      fileExtensions: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "ico",
        "webp",
        "jp2",
        "avif",
      ],
      compress: false,
      reactStrictMode: true,
      basePath: "",
      images: {
        domains: ["s3.amazonaws.com"],
      },
      trailingSlash: true,
      webpack: (config, { dev }) => {
        if (!dev) {
          config.devtool = "source-map";

          for (const plugin of config.plugins) {
            if (plugin.constructor.name === "UglifyJsPlugin") {
              plugin.options.sourceMap = true;
              break;
            }
          }

          if (config.optimization && config.optimization.minimizer) {
            for (const plugin of config.optimization.minimizer) {
              if (plugin.constructor.name === "TerserPlugin") {
                plugin.options.sourceMap = true;
                break;
              }
            }
          }
        }
        const oldAliases = config.resolve.alias;

        const stylesPath = path.resolve(__dirname, "./styles/");
        const dataPath = path.resolve(__dirname, "./data/");
        const primitivesPath = path.resolve(__dirname, "./primitives/");
        const contextPath = path.resolve(__dirname, "./context/");
        const componentsPath = path.resolve(__dirname, "./components/");
        const helpersPath = path.resolve(__dirname, "./helpers/");
        const srcPath = path.resolve(__dirname, "./src/");
        const imagesPath = path.resolve(__dirname, "./images/");
        const utilsPath = path.resolve(__dirname, "./utils/");
        const newResolveAlias = {
          "@data": dataPath,
          "@components": componentsPath,
          "@context": contextPath,
          "@primitives": primitivesPath,
          "@helpers": helpersPath,
          "@src": srcPath,
          "@styles": stylesPath,
          "@images": imagesPath,
          "@utils": utilsPath,
          ...oldAliases,
        };
        config.resolve.alias = newResolveAlias;
        return config;
      },
    })
  );
};

module.exports = nextConfig;
