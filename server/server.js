import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinay from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

// initialize express
const app = express();

// connect to db
await connectDB();
await connectCloudinay();

app.use(
  cors({
    origin: [
      "https://edemy-frontend-xi.vercel.app",
      "https://edemyy.vercel.app",
      "https://edemy-frontend-gsf5bhjh8-tirthppatel222-gmailcoms-projects.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("Edemy API is working fine!");
});
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// import connectDB from "./configs/mongodb.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import educatorRouter from "./routes/educatorRoutes.js";
// import courseRouter from "./routes/courseRoute.js";
// import userRouter from "./routes/userRoutes.js";

// import { clerkMiddleware } from "@clerk/express";
// import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// (async () => {
//   try {
//     // Connect to external services
//     await connectDB();
//     connectCloudinary();

//     // Middlewares
//     app.use(cors());
//     app.use(express.json());
//     app.use(clerkMiddleware());
//     app.use(
//       clerkMiddleware({
//         publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
//         secretKey: process.env.CLERK_SECRET_KEY,
//       })
//     );

//     // Routes
//     app.get("/", (req, res) => {
//       res.send("Edemy API is working fine!");
//     });

//     app.post("/clerk", express.json(), clerkWebhooks);
//     app.post(
//       "/stripe",
//       express.raw({ type: "application/json" }),
//       stripeWebhooks
//     );

//     app.use("/api/educator", educatorRouter);
//     app.use("/api/course", courseRouter);
//     app.use("/api/user", userRouter);

//     // Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`✅ Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Server failed to start:", error);
//   }
// })();

// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// import connectDB from "./configs/mongodb.js";
// import connectCloudinary from "./configs/cloudinary.js";

// import educatorRouter from "./routes/educatorRoutes.js";
// import courseRouter from "./routes/courseRoute.js";
// import userRouter from "./routes/userRoutes.js";

// import { clerkMiddleware } from "@clerk/express";
// import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// (async () => {
//   try {
//     // Connect to MongoDB and Cloudinary
//     await connectDB();
//     connectCloudinary();

//     // Middlewares
//     app.use(cors());
//     app.use(express.json());

//     app.use(
//       clerkMiddleware({
//         publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
//         secretKey: process.env.CLERK_SECRET_KEY,
//       })
//     );

//     // Routes
//     app.get("/", (req, res) => {
//       res.send("✅ Edemy API is working fine!");
//     });

//     app.post("/clerk", express.json(), clerkWebhooks);
//     app.post(
//       "/stripe",
//       express.raw({ type: "application/json" }),
//       stripeWebhooks
//     );

//     app.use("/api/educator", educatorRouter);
//     app.use("/api/course", courseRouter);
//     app.use("/api/user", userRouter);

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`✅ Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Server failed to start:", error);
//   }
// })();
