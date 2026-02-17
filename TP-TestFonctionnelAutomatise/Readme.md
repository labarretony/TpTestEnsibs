# TP - Construire son premier test fonctionnel automatisé

Dans ce TP, on cherche à vérifier que l'application graphique respecte les besoins du clients. On va donc enregistrer des scénarios utilisateur qui permettront de détecter les erreurs mais aussi de valider les fonctionnalités corrects (elles doivent le rester).

Pour corriger les bugs, les développeurs seront ensuite amené à retravailler sur l'application. Pour les testeurs, l'automate permettra de rapidement revalider l'application sans intervention humaine. 

Aujourd'hui, nous utiliserons le plugin Katalon Recorder (Selenium tests generator) qui permet de réaliser d'enregistrer des séquences d'actions (clic, saisie clavier), d'y ajouter des points de contrôles (présence d'un message d'erreur, ajout d'un utilisateur dans un tableau) et de les rejouer à volonté afin d'assurer la non regression de l'application sous test.
![Copie d'écran de l'application RhTest](/docs/ApplicationRhtest.jpg)

## Livrable

Le livrable de ce TP est un dossier de tests présentant :
- Les cas de test implémentés dans Selenium Ide et enregistré au format .zip


## Pré requis

 1. Installation de l'application RhTest
 2. Disposer du référentiel d'exigences
 3. Installer le plugin Chrome ou Firefox "Katalon Recorder (Selenium tests generator)" depuis la gestion des extension de votre navigateur

 Une fois le plugin installé, l'outil est disponible dans la liste des extension du navigateur

 ![Lancer Katalon](/docs/katalon/Katalalon.jpg)

## Présentation de Katalon

Katalon est une extension simple et facile d’utilisation qui permet de capturer un scénario utilisateur puis de le rejouer.
Il permet de comprendre rapidement l'intérêt des tests fonctionnels automatisés.

Une fois enregistrés, ces tests peuvent être sauvegardés au format .krecorder par défaut. Des exports sont égalememnt possibles d'autres format dans  permettent de prendre en charge des mlngages Java, PHP, Javascript, etc. Les tests peuvent aussi être joués sur différents navigateurs Chrome, Firefox, ou sur les mobiles. Les tests pourront d'ailleurs être exécuté en mode ligne de commande et inséré sans une CI


### Interface Graphique de Katalon


Une fois démarré, l'interface Selenium IDE se décompose en plusieurs sections

#### Barre d'outils

![Actions](/docs/Katalon/Bouton.jpg)

La barre d'outils contient des boutons qui permettent de contrôler l'exécution des cas de tests et notamment la rapidité d'exécution (il es parfois nécessaire de jouer sur la rapidité d'exécution).

#### Volets Cas de Test

![Menu](/docs/Katalon/Menu.jpg)

Dans ce volet, on organisera les cas de tests en fonction du référentiel d'exigences

#### Volets Détail du Cas de Test

![Cas](/docs/Katalon/CasTests.jpg)

Ce volet permet de détailler chacune des actions de test et des points de contrôle.  En éxécution il permet également de suivre chacune des étapes de test et leur résultat.

#### Volets Résultats et log

Le détail du résultat d'exécution est disponible avec un code couleur sur le pas de test ou dans le log.

![Execution](/docs/Katalon/Execution.jpg)

Dans le menu, on peut voir également la consolidation du résultat:

![Execution](/docs/Katalon/Resultat.jpg)


 
## Travail à réaliser

 - Automatiser les exigences critiques d'abord,
 - Nommer les cas de test en fonction des codes d'exigences
 - Suivre le réferentiel d'exigence pour : 
   - enregistrer la séquence utilisateur
   - ajouter un point de contrôle
 - Rejouer le test de façon unitaire pour vérifier qu'il retourne le résultat attendu (OK si fonctionnalité correctement implémentée, KO si différence avec réferentiel exigence)  

Une fois que l'ensemble des exigences sont enregistrées, rejouer la séquence complète.



## Pour aller plus loin

Katalon utilise la syntaxe Selenese (la syntaxe standard de Selenium IDE).
Vous utiliserez principalement les commandes suivantes,
 - `open` : ouvre une page à l'aide d'une URL.
 - `click` : effectue une opération de clic
 - 'wait for element present', attent la présence de l'élément sur la page.
 - `verify` : Effectue une vérification sur la page.



En plus des commandes disponibles via l'enregistrement, vous pouvez disposer de liste des commandes disponible en ajoutant un pas de test ou sur la documentation suivante :
https://docs.katalon.com/katalon-recorder/docs/overview.html


A noter que sur certain navigateurs, il ne sera pas possible d'insérer des nombres négatifs. Pour cela vous devrez utiliser une commande Runscript
Exemple pour un nombre de point = -4:
Command=runScript
Target= document.querySelector('input[name="newlevel"]').value = '-4'


A noter que dans le navigateur vous trouverez également les commandes contextuelles disponibles en sélectionnant un élémnet de votre page, click droit/Katalon recorder puis sélection une assertion.

Ceci permet de faciliter la mise en place de point de contrôle. Attention toutefois à cette méthode qui semble rapide et pourtant peut engendrer des problème de qualité. En effet l'enregistrement des proints de controles présume que le logiciel mis sous test et en bon état de fonctionnement, ce qui n'est pas le cas dans notre cas de figure...
