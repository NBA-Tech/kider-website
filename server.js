const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const { CONFIG } = require("./src/config/config");
const { getSettingDetails } = require("./src/services/settingService");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));

app.get("/", async (req, res) => {
  const headers={
    "content-type": "application/json",
  }
  const settingDetails = await getSettingDetails(headers);

  if(!settingDetails?.success){
    //handle error
    return
  }
  const carouselData=settingDetails?.setting?.filter((item) => item.type === "home_carousel")
  const eventData=settingDetails?.setting?.filter((item) => item.type === "event_info")
  console.log(carouselData)
  return res.render("index",{carouselData:carouselData || []});
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running at http://localhost:${CONFIG.PORT}`);
});
