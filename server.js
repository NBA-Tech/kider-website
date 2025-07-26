const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const { CONFIG } = require("./src/config/config");
const { getSettingDetails } = require("./src/services/settingService");
const { getEventData } = require("./src/services/eventService");
const { getStaffDetails } = require("./src/services/staffService");

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
  const staffData=settingDetails?.setting?.filter((item) => item.type === "staff_info")
  let eventDetails=[]
  let staffDetails=[]
  if(eventData?.length>0){
    const payload={
      filters:{
        event_id:eventData[0].event_ids
      },
      get_all:true
    }
    const events = await getEventData(headers, payload);
    if(!events?.success){
      //handle error
      return
    }
    eventDetails=events?.events
  }

  if(staffData?.length>0){
    const payload={
      filters:{
        staff_id:staffData[0].staff_ids
      },
      get_all:true
    }
    const staff = await getStaffDetails(headers, payload);
    if(!staff?.success){
      //handle error
      return
    }
    staffDetails=staff?.staffs
  }

  return res.render("index",{carouselData:carouselData || [],eventDetails:eventDetails || [],staffDetails:staffDetails || []});
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running at http://localhost:${CONFIG.PORT}`);
});
