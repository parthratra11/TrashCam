const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

// config.resolver.sourceExts.push("cjs");

// config.resolver.sourceExts = process.env.RN_SRC_EXT
//   ? [
//       ...process.env.RN_SRC_EXT.split(",").concat(config.resolver.sourceExts),
//       "cjs",
//     ] // <-- cjs added here
//   : [...config.resolver.sourceExts, "cjs"]; // <-- cjs added here

// config.resolver.sourceExts.push("js", "json", "ts", "tsx", "cjs");

module.exports = withNativeWind(config, { input: "./global.css" });
