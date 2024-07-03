import express, { response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import firestore from "./firebase";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("응 내용~~");
});

app.get("/med", async (req, res) => {
  try {
    let sendData = [];

    await firestore
      .collection("Medicine")
      .get()
      .then((response) =>
        response.forEach((doc) => {
          sendData.push({
            refKey: doc.id,
            item_name: doc.data().item_name,
            entp_name: doc.data().entp_name,
          });
        })
      );
    return res.json(sendData);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
