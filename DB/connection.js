const mongoose = require("mongoose");

const connectionString = process.env.DATABASE;

mongoose
   .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("MongoDB connected successfully🍀");
   })
   .catch((err) => {
      console.log("MongoDB conncention failed⚡:", err);
   });
   