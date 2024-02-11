const jwt = require("jsonwebtoken");
require("dotenv").config();

function AuthorizationService(req, res, next) {
	if (req.originalUrl.split("/").length - 1 == 1) {
		next();
	} else {
		const authorizationHeader = req.headers["authorization"];
		if (authorizationHeader == null) {
			res
				.status(400)
				.json({ Message: "Error: Authorization header is required" });
		} else {
			authorizationToken = authorizationHeader.split(" ")[1];
			jwt.verify(
				authorizationToken,
				process.env.JWT_SECRET_KEY,
				(err, decoded) => {
					if (err) {
						console.error("Token verification failed:", err);
						res.status(401).json({ Message: "Error: Authorization Failed" });
						return;
					}
					next();
				}
			);
		}
	}
}

module.exports = {
	authorizationService: AuthorizationService,
};
