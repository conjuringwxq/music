import { defineConfig } from "umi";
import defaultSettings from "./config/defaultSettings";
import routes from "./config/router.config";
import proxy from "./config/proxy";

export default defineConfig({
  nodeModulesTransform: {
    type: "none"
  },
  antd: {},
  dva: {
    hmr: true
  },
  theme: {
    "primary-color": defaultSettings.primaryColor
  },
  routes,
  proxy
});
