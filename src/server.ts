import express from "express";
import path from "path";
import cors from "cors";
import userRouter from "./api/user/user.routes";
import { requireAuth } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use CORS with specified options if not in production
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:3000"],
      credentials: true,
    })
  );
}

// Serve the index.html file from the public directory as the default route
// app.get("/**", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

// Use the middleware for all routes.
app.use(requireAuth);

// app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Use port 3030 if the PORT environment variable is not specified
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
