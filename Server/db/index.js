const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://laibaijaz904_db_user:Laiba%401122@cluster0.1zuysff.mongodb.net/",
  )
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
