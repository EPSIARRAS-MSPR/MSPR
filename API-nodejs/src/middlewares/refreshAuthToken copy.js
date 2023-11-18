const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const refreshAuthToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.split(' ')[1]) {
            return res.status(401).send("Entête d'autorisation manquant ou malformé pour le refresh token");
        }
        const accessToken = authHeader.split(' ')[1];

        const user = await User.findOne({ where: { accessToken: accessToken } });

        if (!user) {
            return res.status(403).send("Refresh Token invalide ou utilisateur non trouvé");
        }
        // javoue ton pere il a deja fait en nodejs ?
        // ouai qu'il explique la méthode du moins comme ca nous on l'adapte sur node c'est clair demandes lui on a le temps facon att jvais essayer de faire une autre methode jvais dupliquer tin f
        // Bah il m'appelle mais pas de suite mdrr  
        // Je te laisse faire  vas-y
        const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
        res.json({ accessToken: newAccessToken });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur interne du serveur");
    }
};

module.exports = refreshAuthToken;
