const app = require("./src/app");
const dotenv = require("dotenv");
const connectToDB = require("./src/config/db");
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});

connectToDB();
