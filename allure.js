import { defineConfig } from "allure";

export default defineConfig({
  name: "Allure Report Example",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: "en",
      },
    },
  },
});
