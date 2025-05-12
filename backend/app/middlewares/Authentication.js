import jwt from "jsonwebtoken";

export default function authenticationUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        const tokenData = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = tokenData.userId;
        req.role = tokenData.role;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}
