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

