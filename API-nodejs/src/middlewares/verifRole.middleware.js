const User = require('../models/user.model');
const UserRole = require('../models/userRole.model');

const checkRoles = (roles) => async (req, res, next) => {
    try {
        if (!roles || roles.length === 0) {
            console.debug('[CHECK ROLES] Aucun rôle spécifié, accès autorisé.');
            return next();
        }

        const { accessToken } = req.decoded;

        if (!accessToken || accessToken === '') {
            return res.status(401).json({
                error: true,
                message: 'Accès non autorisé.'
            });
        }

        const isUserExists = await User.findOne({
            where: { accessToken },
            attributes: {
                exclude: ["password", "emailVerificationCode", "emailVerificationCodeExpiration"]
            }
        });


        if (!isUserExists) {
            return res.status(401).json({
                error: true,
                message: 'Une erreur est survenue, essayez de vous reconnecter.'
            });
        }

        const userRole = isUserExists.userRole;

        if (userRole === null) {
            return res.status(401).json({
                error: true,
                message: 'Vous n\'avez pas les droits pour effectuer cette action.'
            });
        }

        const currentRole = await UserRole.findOne({ where: { id: userRole } });

        if (!currentRole || !roles.includes(currentRole.label)) {
            return res.status(401).json({
                error: true,
                message: 'Vous n\'avez pas les droits pour effectuer cette action.'
            });
        }

        next();
    } catch (error) {
        console.error("[ROLE CHECK ERROR]", error);
        return res.status(500).json({
            error: true,
            message: 'Une erreur est survenue, essayez de vous reconnecter.'
        });
    }
}

module.exports = checkRoles;