import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase/firebase.config";

export interface AuthRequest extends Request {
  userId: string;
}

// Create a middleware function to verify the ID token.
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the ID token from the `Authorization` header.
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  // Verify the ID token using the Firebase Admin SDK.
  try {
    const { uid } = await auth.verifyIdToken(idToken);
    if (!uid) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    // The ID token is valid.
    // You can use the decoded ID token to authenticate the user.
    // Store the `uid` in a property on the `req` object.
    req.body.userId = uid;
    next();
  } catch (error) {
    // The ID token is invalid.
    // You should return an error response.
    res.status(401).send({ error: "Unauthorized" });
  }
}
