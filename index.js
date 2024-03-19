const {
  RAGApplicationBuilder,
  YoutubeSearchLoader,
  SitemapLoader,
  WebLoader,
} = require("@llm-tools/embedjs");
const LanceDb = require("./lance-db");
require("dotenv").config();

async function init() {
  try {
    console.log("start");
    const ragApplication = await new RAGApplicationBuilder()
      .addLoader(new YoutubeSearchLoader({ searchString: "Tesla cars" }))
      .addLoader(
        new SitemapLoader({ url: "https://tesla-info.com/sitemap.xml" })
      )
      .addLoader(
        new WebLoader({ url: "https://en.wikipedia.org/wiki/Tesla,_Inc." })
      )
      .setVectorDb(new LanceDb({ path: ".db" }))
      .build();
    console.log("end");
    console.log(
      await ragApplication.query("Tell me about the history of Tesla?")
    );
  } catch (error) {
    console.log(error);
  }
}

init();
