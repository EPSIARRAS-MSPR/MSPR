const userRole = require('../models/userRole.model');

exports.getAll = async (req, res) => {
    try {
        const roles = await userRole.findAll();

        return res.status(200).json({
            error: false,
            message: "Les roles des utilisateurs ont bien été récupérés",
            data: roles
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await userRole.findOne({ where: { id: id } });

        if (!role) {
            return res.status(404).json({
                error: true,
                message: "Role introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Role récupéré.",
            data: role
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.Create = async (req, res) => {
    try {
        const { label } = req.body;

       if (!label) {
        return res.status(400).json({
            error: true,
            message: "Requête invalide"
        });
       }

       const isRoleExist = await userRole.findOne({ where: { label: label}});

       if (isRoleExist) {
        return res.status(400).json({
            error: true,
            message: "Ce role existe déjà"
        });
       }

       await new userRole({ label: label }).save();

       return res.status(201).json({
        error: false,
        message: "Role créé avec succès."
         });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }
}


exports.Update = async (req, res) => {
    try {
        const { label } = req.body;
        const { id } = req.params;

        if (!id || isNaN(id) || !label) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const role = await UserRole.findOne({ where: { id: id } });

        if (!role) {
            return res.status(404).json({
                error: true,
                message: "Le rôle utilisateur est introuvable."
            });
        }

        const isRoleExist = await UserRole.findOne({ where: { label: label } });

        if (isRoleExist) {
            return res.status(409).json({
                error: true,
                message: "Le rôle utilisateur existe déjà."
            });
        }

        const roleData = {
            label: label || role.label,
        }

        await role.update(roleData);

        return res.status(200).json({
            error: false,
            message: "Le rôle de l'utilisateur a bien été mise à jour."
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.DeleteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const userRole = await UserRole.findOne({ where: { id: id } });

        if (!userRole) {
            return res.status(404).json({
                error: true,
                message: "Le rôle utilisateur est introuvable."
            });
        }

        await userRole.destroy();

        return res.status(201).json({
            error: false,
            message: "Le rôle utilisateur a bien été supprimé."
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}
