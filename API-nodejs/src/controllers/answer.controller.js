const Answer = require('../models/answer.model');

exports.Create = async (req, res) => {
    try {
        const { content } = req.body;
        const { id: postedBy, id: answerOf } = req.decoded;

        if (!answerOf || !content) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const answerData = {
            answerOf: answerOf,
            content: content,
            postedBy: postedBy
        }

        await new Answer(answerData).save();

        return res.status(201).json({
            error: false,
            message: "La réponse a été créé avec succès.",
            data: answerData
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error
        });
    }

}


exports.GetAllById = async (req, res) => {
    try {
        const { answerOf } = req.params;
        
        if (!answerOf || isNaN(answerOf)) {
            return res.status(400).json({
                error: true,
                message: error
            });
        }

        const answer = await Answer.findAll({ where: { answerOf : answerOf } });

        if (!answerOf) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le post a été récupéré.",
            answer: answer
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }

}


exports.Update = async (req, res) => {
    try {
        const { content, id} = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const answer = await Answer.findOne({ where: { id: id } });

        if (!answer) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        const answerData = {
            content: content ? content : answer.content,
        }

        await answer.update(answerData);

        return res.status(200).json({
            error: false,
            message: "Le post a bien été mis à jour."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.Delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const answer = await Answer.findOne({ where: { id: id } });

        if (!answer) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        await answer.destroy();
        return res.status(200).json({
            error: true,
            message: "Le post a bien été supprimé."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}