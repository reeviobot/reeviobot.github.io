import { defineConfig } from "tinacms";

// Since no baseurl is set in _config.yml, we set this to '/'
const JEKYLL_BASEURL = "/"; 

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "_site",
    },
  },
  admin: {
    ui: {
      basePath: JEKYLL_BASEURL !== "/" ? `${JEKYLL_BASEURL}/admin` : "/admin",
    },
  },

  // --- IMPORTANT: Ensure this schema definition is complete ---
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts", 
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "layout", label: "Layout", options: ["post", "page", "default"], required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "/", 
        match: {
          include: "**/*.md",
          exclude: [
            "_posts/**/*",  
            "_site/**/*",   
            "_data/**/*",   
            "_layouts/**/*",
            "_includes/**/*",
            "_sass/**/*",   
            ".git/**/*",    
            ".forestry/**/*",
            "node_modules/**/*", 
          ],
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "layout", label: "Layout", options: ["page", "default", "post"], required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
  // --- End of schema definition ---
});