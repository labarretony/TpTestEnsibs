# Installation de l'application RHtest

## PréPrérequis
1. Vous devez disposer de Docker et docker-compose sur votre poste

2. Installer Git Bash depuis https://git-for-windows.github.io/ en mode par défaut

3. Redémarrer votre poste après installation

5. Créer un répertoire c:/Tptest

6. Se positionner dans le répertoire test et récupérer le code de l'application à mettre sous c:/Tptest:

`git clone https://github.com/labarretony/TpTestEnsibs.git`

Cette application est composée d'un backend disponible dans rhapi et d'un front disponible dans rhfront ainsi qu'un fichier docker-compose.yml

## Démarrage de l'application

Lancer un nouveau terminal Git bash et se positionner dans le répertoire Tptest

``` 
cd /c/Tptest
docker-compose up --build
```

Vous devez obtenir le message : rh-front  | 🚀 Serveur prêt sur http://localhost:8085
A noter que le backend est disposible sur le post 8086 et accessible par http://localhost:8086

A noter que si votre port 8086 est déjà occupé, vous pouvez changer la configuration dans les fichier de config


Tester le démarrage de l'application en ouvrant un navigateur (firefox ou chrome): http://localhost:8085

vous devez obtenir cet écran:

![Copie d'écran de l'application RhTest](/docs/ApplicationRhtest.jpg)


