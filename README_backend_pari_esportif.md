# Backend du projet Pari E-Sportif

## Technologies utilisées

Pour la partie backend du projet, j'ai utilisé **Strapi** comme CMS externe, car il est très utile et facile à prendre en main pour effectuer des opérations CRUD. La base de données est gérée avec **MySQL** et **Workbench**.

## Fonctionnement du backend

Découvrez l'interface admin de la plateforme via ce lien :
https://pari-e-sportif-backend-1.onrender.com

**Renseignez les informations suivantes pour accéder à l'interface admin : **

* Email : diabatefatoumata06@icloud.com
* Mot de passe : Avatar1212*

### Une fois, accedé à l'interface admin, vous avez la possibilité de :

* Créer, modifier et supprimer des équipes
* Créer, modifier et supprimer des matchs

### Structure et tables mises en place dans Strapi

Pour cette solution, les utilisateurs peuvent placer des paris uniquement sur des matchs de football. Dans Strapi, j'ai mis en place 4 tables :

1. **Team** : contient les informations sur les équipes
2. **Match** : contient les informations sur les matchs (date, heure, noms et cotes des équipes, état, etc.)
3. **User** : contient les informations sur les utilisateurs (noms, email, etc.)
4. **Bet** : contient les informations sur les paris effectués par les utilisateurs (montant, date, etc.)

Des données de test sont déjà présentes dans ces tables. Vous pouvez effectuer des opérations CRUD sur l'ensemble des tables via l'onglet "Content Manager".

Une fois un match créé avec deux équipes, ces informations sont affichées sur l'interface utilisateur (frontend).

## Fonctionnement côté utilisateur

Découvrez l'interface utilisateur : https://pari-e-sportif-frontend-vqvv.vercel.app

* Les utilisateurs peuvent visualiser les différents matchs
* Pour placer un pari, l'utilisateur doit être connecté

### Placement d'un pari (cas pratique)

1. L'utilisateur connecté sélectionne un match et accède à la page de pari pour effectuer son pari.



### Mise à jour des résultats (Super-Admin)

À la fin du match, le Super-Admin met à jour le match :

1. Modifier les champs **score_a** et **score_b** en indiquant le nombre de buts pour chaque équipe et cliquer sur **Save**. Le champ **resultat** se mettra automatiquement à jour :

   * **A** : score_a > score_b (TeamA a gagné)
   * **B** : score_b > score_a (TeamB a gagné)
   * **N** : score_a = score_b (match nul)

2.Mettre obligatoirement le champ **etat** à **TERMINE**  et cliquer obligatoirement sur le bouton **Publish** pour que les modifications s'appliquent et que l'envoi du résultat puisse se faire à la partie frontend.

**NB** : Assurez-vous que tous les champs sont correctement renseignés et cliquez sur **Publish** afin que les résultats soient accessibles sur la plateforme et que le calcul des gains et pertes des utilisateurs soit effectué.

Une fois publié, les utilisateurs peuvent consulter les résultats des matchs et visualiser leurs gains et pertes pour les paris effectués.
