// Importer le module express
const express = require("express");
// Importer cors
const cors = require("cors");

// Importer l'instance de sequelize
const sequelize = require("./config/database.config");
const { Op } = require("sequelize");


// Importer body-parser
const bodyParser = require("body-parser");

// Créer l'instance express
const app = express();

const User = require("./src/models/user.model");
const { encryptPassword } = require("./src/utils/passwordHandler.utils");
const refreshAuthToken = require("./src/middlewares/refreshAuthToken");

const cron = require('node-cron');

// Configurer cors pour l'instance express
app.use(cors());

// Configurer body-parser pour l'instance express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le port et le stocker dans une variable
const port = 3030;

// Créer une route get sur la racine de notre application web
app.get('/', (req, res) => {
    // res.send("<script>console.log(\"Hello world!\")</script>");
    res.send("Hello world!");
});


// Posts routes 
app.use('/posts', require('./src/routes/post.routes'));
// Create : /posts/create
// Update : /posts/update
// GetAll : /posts
// GetById : /posts/:id
// Delete : /posts/delete

// Answer routes
app.use('/answer', require('./src/routes/answer.routes'));


// Users routes
app.use('/users', require('./src/routes/user.routes'));
// SignUp : /users/signup
// SignIn : /users/signin

app.post('/refresh-token', refreshAuthToken);

// UserRole routes
app.use('/userRole', require('./src/routes/userRole.routes'));
// GetAll : /fetch/all
// GetId : /fetch/:id
// Create : /create
// Update : /update/:id
//delete : /delete/:id

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}


cron.schedule('0 0 1 * *', async () => {
    console.log('Exécution du cronjob pour mettre à jour les comptes inactifs.');

    try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const usersToUpdate = await User.findAll({
            where: {
                updatedAt: {
                    [Op.lt]: oneYearAgo
                }
            }
        });

        for (const user of usersToUpdate) {
            const randomPassword = generateRandomPassword(30); 

            user.username = "deleted_account";
            user.email = "deleted_account@example.com";
            user.password = await encryptPassword(randomPassword);

            await user.save();
            console.log("utilisateur supprimé")
        }
    } catch (error) {
        console.error('Erreur lors de l’exécution du cronjob:', error);
    }
});

// Lancer le serveur
app.listen(port, async () => {
    try {
        console.log(`Server is running on port ${port}.`);
        // Synchroniser la base de données
        await sequelize.authenticate();
        console.log("Database is connected.");
    } catch (err) {
        console.log(err);
    }
});