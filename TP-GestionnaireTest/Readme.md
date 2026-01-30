# TP - Travailler avec un gestionnaire de test

Dans ce TP, on cherche à outiller la gestion des exigences et des cas de test. Au delà de référencer les exigences et cas de test, il permet aussi d'organiser et piloter cette activité. 
En effet un outil permettra de connaitre plus facilement l'avancement de l'écriture des cas de test, distribuer les cas à exécuter entre différentes personnes, thématiser les cas, organiser les campagnes de test, mesurer l'avancement de l'exécution et faciliter la communication des résultats de test. 

Aujourd'hui, nous utiliserons l'outil Squash-tm, accessible et relativement facile d'utilisation, il permet de piloter de nombreux projets. Il est utilisé en entreprise. 

L’objectif du TP est de manipuler un outil de gestion de tests et suivre l'avancement de la campagne de test.


## Méthodologie et livrable

Vous avez travaillé sur les exigences et cas de test dans un tableur. Sur la base de ce fichier, vous allez implémenter les exigences et cas de tests dans Squashtm.
L’étudiant devra présenter, dans le dossier de tests, les résultats des tests à partir des graphiques fournis par l'outil.

 
## Pré requis

 1. Installation à partir de docker:

 Dans un répertoire de votre choix, copiez la section suivante dans un fichier docker-compose.yml

 ```
 services:
  squashtm-pg:
    container_name: squashtm-pg
    environment:
      POSTGRES_DB: squashtm
      POSTGRES_USER: squashtm
      POSTGRES_PASSWORD: MustB3Ch4ng3d
    image: postgres:17
    ports:
      - 5432:5432

  squashtm:
    container_name: squashtm
    image: squashtest/squash:12.0.3
    depends_on:
      - squashtm-pg
    environment:
      SPRING_PROFILES_ACTIVE: postgresql
      SPRING_DATASOURCE_URL: jdbc:postgresql://squashtm-pg:5432/squashtm
      SPRING_DATASOURCE_USERNAME: squashtm
      SPRING_DATASOURCE_PASSWORD: MustB3Ch4ng3d
    ports:
      - 8090:8080
    volumes:
      - squashtm-logs:/opt/squash-tm/logs


volumes:
  squashtm-logs:

  ```

  Ouvrir un terminal sur le répertoire et et exécuter: 
  ```
  docker compose up -d

  ```
 2. Attendre que le produit soit installé et la base configurée, puis dans un navigateur, lancer http://localhost:8090/squash

A noter que si votre port 8090 est déjà occupé, vous pouvez le changer dans le fichier .yml

L'application doit s'ouvrir dans votre navigateur

Recommmandation : il est vivement conseillé de modifier la section d'uathentification à la base de données.


## Guide d'utilisation 

0. Dans l'administration, commencez par créer un projet. Vous pouvez également créer un nouvel utilisateur, évitant ainsi l'utilisation du login admin.

1. Créer d'abord les exigences
   
	- Positionnez vous sur le domaine Exigence puis cliquer sur ajouter une exigence.

	- Remplissez les champs demandés. La zone description permet notamment de référencer ce que doit faire l'application, la fonctionnalité. 
 
2. Créer les cas de test dans un format classique
	- Positionnez vous sur le domaine Cas de test puis cliquer sur ajouter un cas de test
 
	- Remplissez les champs (a noter les pas de test seront décrits plus tard, dans notre TP, la zone descriptif permet par exemple de mentionner votre objectif de test.
 
	- Sur le cas de test, reliez votre cas à l'exigence en cliquant sur "Exigences vérifiées par ce cas de test"
 
	- Sur le cas de test, positionnez vous sur Prérequis et pas de test, zone dans laquelle vous pourrez lister les étapes et les points de contrôle.

	- Renseignez tous vos cas de test

3. Créer une campagne de test
	- Positionnez vous sur le domaine Exécution

	- Cliquez sur Ajouter une campagne

	- Positionnez vous sur la campagne et ajouter une itération

	- Positionnez vous sur l'itération puis sur la droite de l'écran cliquer sur Plan d'exécution puis Associer les cas de test.
 
	- Organisez votre/vos campagne(s) (vous avez également la possibilité d'ajouter des suites de test).

5.  Lancer l'exécution de vos campagnes de test et renseigner la statut de chacun de vos tests.
6.  Récuperer les statistiques d'avancement de couverture et de succès sur la campagne de test. 
