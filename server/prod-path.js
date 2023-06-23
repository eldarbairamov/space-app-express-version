const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
   baseUrl: "./",
   paths: {
      "@src/*": [
         "dist/*"
      ]
   },
});
