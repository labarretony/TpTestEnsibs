require('dotenv').config();
const express = require('express');
const axios = require('axios');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();

// --- CONFIGURATION ---
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

if (!API_URL) {
    console.error('❌ ERREUR: API_URL manquante dans le fichier .env');
    process.exit(1);
}

// --- MIDDLEWARES ---
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuration de la session (nécessaire pour Flash)
app.use(session({
    secret: 'mon_secret_super_secure', 
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Injection automatique des messages dans toutes les vues
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    res.locals.levelmessage = req.flash('levelmessage');
    next();
});

/* ----------------- ROUTES ------------------ */

app.get('/', (req, res) => res.redirect('/salarie'));

// Liste des salariés
app.get('/salarie', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/api/rechercher`, { params: { mode: 'all' } });
        res.render('salarie', { 
            data: response.data, 
            nbsalaries: response.data.length,
            servapi: API_URL
        });
    } catch (err) {
        req.flash('levelmessage', 'alert');
        req.flash('message', 'Impossible de contacter l\'API.');
        res.render('salarie', { data: [], nbsalaries: 0, servapi: API_URL });
    }
});

// Ajouter ou Modifier (Logique unifiée)
app.post('/salarie/ajouter/', async (req, res) => {
    const isUpdate = req.body.OP !== "Ajouter";
    const endpoint = isUpdate ? '/api/modifier' : '/api/ajouter';

    try {
        const response = await axios.post(`${API_URL}${endpoint}`, null, {
            params: { 
                id: req.body.newid, 
                name: req.body.newsalarie, 
                lastname: req.body.newlastname, 
                salary: req.body.newsalary, 
                level: req.body.newlevel 
            }
        });
        req.flash('levelmessage', 'info');
        req.flash('message', response.data || 'Opération réussie');
    } catch (err) {
        req.flash('levelmessage', 'alert');
        req.flash('message', 'Erreur API: ' + (err.response?.data || 'Serveur injoignable'));
    }
    res.redirect('/salarie');
});

// Suppression
app.get('/salarie/supprimer/:id', async (req, res) => {
    try {
        await axios.delete(`${API_URL}/api/supprimer`, { params: { id: req.params.id } });
        req.flash('levelmessage', 'info');
        req.flash('message', 'Salarié supprimé');
    } catch (err) {
        req.flash('levelmessage', 'alert');
        req.flash('message', 'Échec de la suppression');
    }
    res.redirect('/salarie');
});


// Page de suppression de la liste de tous les salariés
app.get('/deleteall', async (req, res) => {
    try {
        console.log('Appel API deleteall (DELETE)');
        // On utilise axios.delete pour correspondre à app.delete de l'API
        await axios.delete(`${API_URL}/api/deleteall`);
            console.log(`${API_URL}/api/deleteall`);
        
        req.flash('levelmessage', 'info');
        req.flash('message', 'Tous les salariés ont été supprimés');
    } catch (error) {
        console.error('Erreur deleteall:', error.message);
        req.flash('levelmessage', 'alert');
        req.flash('message', 'Erreur lors de la suppression globale');
    }
    res.redirect('/salarie');
});

// Page d'initialisation avec un jeu de données
app.get('/datatest', async (req, res) => {
    try {
        console.log('Appel API datatest (DELETE)');
        console.log(`${API_URL}/api/datatest`);
        // On utilise axios.delete car votre API définit cette route en app.delete
        await axios.delete(`${API_URL}/api/datatest`);
        
        req.flash('levelmessage', 'info');
        req.flash('message', 'Les salariés ont été initialisés à partir du jeu de tests');
    } catch (error) {
        console.error('Erreur datatest:', error.message);
        req.flash('levelmessage', 'alert');
        req.flash('message', 'Erreur lors de l\'initialisation');
    }
    res.redirect('/salarie');
});


// Recherche / Filtre
app.post('/salariefiltre', async (req, res) => {
    const search = req.body.rechsalarie;
    if (!search) return res.redirect('/salarie');

    try {
        const response = await axios.get(`${API_URL}/api/rechercher`, { params: { name: search } });
        const data = response.data;
        
        if (data.length === 0) {
            req.flash('levelmessage', 'alert');
            req.flash('message', `Aucun résultat pour "${search}"`);
        }
        
        res.render('salarie', { 
            data, 
            nbsalaries: data.length, 
            servapi: API_URL 
        });
    } catch (err) {
        res.redirect('/salarie');
    }
});



// 404
app.use((req, res) => res.status(404).send('Page introuvable !'));

// Démarrage
app.listen(PORT, () => console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`));