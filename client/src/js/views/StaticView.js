import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.title = ``;
      this.content = ``;
      this.setStaticViewDetails();
    }

    async setStaticViewDetails(){

      switch(location.pathname){

        case '/cookies':

          this.setWindowDetails(`Zobbies - Cookies`, 'cookies');
          this.title = 'Utilisation des Cookies';
          this.content = `
              <p class="uppercase bold"><em>Cookie de Connexion</em><p class="paragraph">
              <p class="paragraph">
                Nous utilisons un cookie de connexion pour assurer la continuité de votre session utilisateur sur notre site. Ce cookie est essentiel au fonctionnement de notre site et vous permet de rester connecté pendant que vous naviguez entre les différentes pages.
              </p>
              <p class="italic medium"><span class="underline">Nom du cookie</span> : token</p>
              <p class="italic medium"><span class="underline">Objectif</span> : Connexion de l'utilisateur</p>
              <p class="paragraph">                
                Ce cookie est utilisé pour maintenir votre session utilisateur active après que vous vous soyez connecté. Il permet à notre site de vous reconnaître et de vous offrir une expérience continue et sécurisée.
              </p>
              <p class="italic medium"><span class="underline">Durée de vie</span> : Ce cookie a une durée de vie de 2 heures</p>
              <p class="paragraph">
                Après cette période, il expirera automatiquement, et vous serez déconnecté.
              </p>
              <p class="italic medium"><span class="underline">Caractère essentiel</span> : Absolu</p>
              <p class="paragraph">
                Ce cookie est strictement nécessaire pour le bon fonctionnement de notre site. Par conséquent, il ne peut pas être désactivé sans affecter la fonctionnalité du site.
              </p>
              <p class="italic medium"><span class="underline">Collecte de données personnelles</span> : Aucune</p>
              <p class="paragraph">
                Ce cookie ne collecte ni ne stocke aucune information personnelle à des fins de marketing ou de suivi.<p class="paragraph">
              <p class="paragraph">
                <strong>En utilisant Zobbies, vous acceptez l'utilisation de ce cookie pour la gestion de votre session utilisateur.</strong>
              </p>  
            `;

        break

        case '/privacy-policy':
          
          this.setWindowDetails(`Zobbies - Privacy policy`, 'privacy-policy');
          this.title = 'Privacy policy';
          this.content = `
             <p class="paragraph">Bienvenue sur <strong><em><a href="/" data-link>Zobbies</a></em></strong>.
             
             <p class="paragraph">
              Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles. Cette politique de confidentialité décrit les types d'informations que nous collectons, la manière dont nous les utilisons, et les mesures que nous prenons pour les protéger.
            </p>

            <p class="italic bold space">1. Collecte des informations</p>

            <p class="paragraph">
              Lorsque vous vous inscrivez sur notre site, nous collectons les informations personnelles suivantes :
            </p>
            <ul class="data">
                <li>Nom</li>
                <li>Prénom</li>
                <li>Date de naissance</li>
                <li>Genre</li>
                <li>Pays</li>
                <li>Adresse e-mail</li>
                <li>Nom d'utilisateur</li>
            </ul>
            </p>
            <p class="paragraph">Après votre inscription, vous avez la possibilité de compléter votre profil en ajoutant :</p>
            <ul>
                <li>Une biographie de présentation</li>
                <li>Une photo ou un avatar</li>
            </ul>
            <p class="paragraph">Vos messages échangés sur le site sont également stockés dans notre base de données.</p>

            <p class="italic bold space">2. Utilisation des informations</p>

            <p class="paragraph">Les informations collectées sont utilisées exclusivement pour :</p>
            <ul>
                <li>Gérer votre compte et vous permettre de vous connecter au site.</li>
                <li>Personnaliser votre profil utilisateur et vous permettre de vous exprimer sur le site.</li>
                <li>Faciliter la communication entre les utilisateurs du site.</li>
            </ul>

            <p class="italic bold space">3. Cookies</p>

           <p class="paragraph">
              Nous n'utilisons qu'un seul cookie pour gérer votre session de connexion. Ce cookie est essentiel pour vous permettre de rester connecté pendant votre navigation sur le site. Nous ne stockons aucun autre cookie ni ne suivons votre activité sur le site ou ailleurs.
           </p>

            <p class="italic bold space">4. Sécurité des informations</p>

            <p class="paragraph">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction. Toutes les données que vous nous fournissez sont stockées de manière sécurisée dans notre base de données.
            </p>

            <p class="italic bold space">5. Partage des informations</p>

            <p class="paragraph">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Vos informations restent strictement confidentielles et sont utilisées uniquement dans le cadre de votre utilisation du site.
            </p>

            <p class="italic bold space">6. Absence de publicité</p>

            <p class="paragraph">
              Nous n'affichons aucune publicité sur le site et nous ne partageons pas vos données avec des annonceurs ou des réseaux publicitaires.
            </p>

            <p class="italic bold space">7. Vos droits</p>

            <p class="paragraph">
              Vous avez le droit d'accéder à vos informations personnelles, de les rectifier, de les supprimer ou de limiter leur traitement. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <strong><a href="mailto:fbastaraud@yahoo.fr">fbastaraud@yahoo.fr</a></strong>.
            </p>

            <p class="italic bold space">8. Modifications de cette politique</p>

            <p class="paragraph">
              Nous pouvons mettre à jour cette politique de confidentialité de temps en temps pour refléter les changements dans nos pratiques ou pour des raisons légales. Nous vous informerons de toute modification importante par le biais de notre site.
            </p>

            <p class="italic bold space">9. Contactez-nous</p>

            <p class="paragraph">
              Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, n'hésitez pas à nous contacter à l'adresse suivante : <strong><a href="mailto:fbastaraud@yahoo.fr">fbastaraud@yahoo.fr</a></strong>.
            </p>

          `;

        break

        case '/conditions-of-use':
          
          this.setWindowDetails(`Zobbies - Conditions of use`, 'conditions-of-use');
          this.title = 'Conditions of use';
          this.content = `
          
              <p class="paragraph">Bienvenue sur <strong><em><a href="/" data-link>Zobbies</a></em></strong>

              <p class="paragraph">En accédant à ce site et en l'utilisant, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.</p>

              <p class="italic bold space">1. Acceptation des conditions</p>

              <p class="paragraph">En utilisant ce Site, vous acceptez de respecter ces conditions d'utilisation, ainsi que toutes les lois et règlements applicables. Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis. Il est de votre responsabilité de consulter régulièrement ces conditions pour être informé de tout changement.</p>

              <p class="italic bold space">2. Inscription et compte utilisateur</p>

              <p class="paragraph">Pour accéder à certaines fonctionnalités du Site, vous devez vous inscrire en fournissant les informations demandées, telles que votre nom, prénom, date de naissance, genre, pays, adresse e-mail, et nom d'utilisateur. Vous devez fournir des informations exactes et à jour. Vous êtes responsable de la confidentialité de vos informations de connexion et de toutes les activités réalisées sous votre compte.</p>

              <p class="italic bold space">3. Utilisation du site</p>

              <p class="paragraph">Vous vous engagez à utiliser le Site uniquement à des fins légales et conformément aux présentes conditions. Vous ne devez pas :</p>
              <ul>
                  <li>Utiliser le Site d'une manière qui pourrait endommager, désactiver, surcharger ou altérer le Site ou interférer avec l'utilisation d'autres utilisateurs.</li>
                  <li>Utiliser le Site pour transmettre du contenu illégal, offensant, diffamatoire ou nuisible.</li>
                  <li>Accéder au Site de manière non autorisée, y compris en utilisant des moyens techniques pour contourner les mesures de sécurité du Site.</li>
              </ul>

              <p class="italic bold space">4. Propriété intellectuelle</p>

              <p class="paragraph">Tout le contenu du Site, y compris les textes, graphiques, logos, images, vidéos, et autres matériels, est la propriété de <strong><em>Zobbies</em></strong> ou de sa créatrice <strong><em><a href="https://florence-b.com" target="_blank">Florence Bastaraud</a></em></strong> et est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, distribuer, modifier, ou créer des œuvres dérivées de tout contenu sans l'autorisation expresse de <strong><em>Zobbies</em></strong>.</p>

              <p class="italic bold space">5. Contenu généré par les utilisateurs</p>

              <p class="paragraph">Vous pouvez être invité à soumettre des contenus tels que des messages, des biographies, ou des photos.</p>

              <p class="italic bold space">6. Confidentialité</p>

              <p class="paragraph">La collecte et l'utilisation de vos informations personnelles sont régies par notre <a href="/privacy-policy" data-link>Politique de Confidentialité</a>. Nous vous encourageons à la lire attentivement pour comprendre comment vos données sont protégées.</p>

              <p class="italic bold space">7. Limitation de responsabilité</p>

              <p class="paragraph"><strong><em>Zobbies</em></strong> ne peut être tenu responsable des dommages directs, indirects, accessoires, spéciaux ou conséquents découlant de votre utilisation du Site ou de votre incapacité à l'utiliser. Nous ne garantissons pas que le Site sera exempt d'erreurs ou que son accès sera ininterrompu.</p>

              <p class="italic bold space">8. Modifications du site</p>

              <p class="paragraph"><strong><em>Zobbies</em></strong> se réserve le droit de modifier, suspendre ou interrompre tout ou partie du Site à tout moment sans préavis. Nous ne serons pas responsables envers vous ou un tiers pour toute modification, suspension ou interruption du Site.</p>

              <p class="italic bold space">9. Droit applicable</p>

              <p class="paragraph">Les présentes conditions d'utilisation sont régies par et interprétées conformément aux lois en vigueur dans la France. Tout litige découlant de ou en relation avec ces conditions sera soumis aux juridictions compétentes de la France.</p>

              <p class="italic bold space">10. Contact</p>

              <p class="paragraph">Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : <strong><a href="mailto:fbastaraud@yahoo.fr">fbastaraud@yahoo.fr</a></strong>.</p>

          
          `;

        break

        case '/disclaimers':
          
          this.setWindowDetails(`Zobbies - Disclaimers`, 'disclaimers');
          this.title = 'Disclaimers';
          this.content = `

            <p class="paragraph">Bienvenue sur <strong><em><a href="/" data-link>Zobbies</a></em></strong>

            <p class="paragraph">Afin de garantir une expérience agréable et respectueuse pour tous les utilisateurs, nous vous demandons de respecter les règles suivantes lors de votre utilisation du site.</p>

            <p class="italic bold space">1. Respect des autres utilisateurs</p>

            <p class="paragraph">Nous vous encourageons à interagir avec les autres membres de la communauté de manière respectueuse et courtoise. Les comportements suivants sont interdits :</p>
            <ul>
                <li>Harceler, menacer ou intimider d'autres utilisateurs.</li>
                <li>Publier des propos offensants, discriminatoires, haineux ou abusifs.</li>
                <li>Diffuser des informations fausses ou trompeuses.</li>
            </ul>

            <p class="italic bold space">2. Contenu approprié</p>

            <p class="paragraph">Le contenu que vous publiez sur le site doit être approprié et conforme aux lois en vigueur. Il est interdit de :</p>
            <ul>
                <li>Publier du contenu pornographique, violent ou autrement inapproprié.</li>
                <li>Partager des informations protégées par des droits d'auteur sans autorisation.</li>
                <li>Utiliser le site pour diffuser du spam ou des publicités non sollicitées.</li>
            </ul>

            <p class="italic bold space">3. Confidentialité et sécurité</p>

            <p class="paragraph">Respectez la confidentialité des autres utilisateurs en ne divulguant pas leurs informations personnelles sans leur consentement. Ne tentez pas d'accéder de manière non autorisée aux comptes ou aux informations d'autres utilisateurs.</p>

            <p class="italic bold space">4. Utilisation du site</p>

            <p class="paragraph">Utilisez le site de manière responsable et conforme à son usage prévu. Vous ne devez pas :</p>
            <ul>
                <li>Interférer avec le fonctionnement normal du site ou perturber son accès pour les autres utilisateurs.</li>
                <li>Utiliser des méthodes automatisées pour extraire des données du site sans autorisation.</li>
                <li>Transmettre des virus, logiciels malveillants ou tout autre code nuisible.</li>
            </ul>

            <p class="italic bold space">5. Modération et sanctions</p>

            <p class="paragraph">Nous nous réservons le droit de modérer le contenu publié sur le site et de prendre des mesures en cas de non-respect des règles. Les sanctions peuvent inclure :</p>
            <ul>
                <li>La suppression de contenu inapproprié.</li>
                <li>Le blocage temporaire ou permanent de comptes utilisateurs.</li>
                <li>La suspension ou la fermeture d'accès à certaines fonctionnalités du site.</li>
            </ul>

            <p class="italic bold space">6. Signalement d'abus</p>

            <p class="paragraph">Si vous constatez des violations de ces règles ou des comportements inappropriés, veuillez nous en informer à l'adresse suivante : <strong><a href="mailto:fbastaraud@yahoo.fr">fbastaraud@yahoo.fr</a></strong>.</p>

            <p class="italic bold space">7. Modifications des règles</p>

            <p class="paragraph">Nous nous réservons le droit de modifier ces règles de bonne conduite à tout moment. Les changements seront publiés sur cette page, et il est de votre responsabilité de consulter régulièrement les règles pour rester informé des éventuelles mises à jour.</p>

            <p class="italic bold space">8. Acceptation des règles</p>

            <p class="paragraph">En utilisant notre site, vous acceptez de respecter ces règles de bonne conduite. Si vous ne pouvez pas vous conformer à ces règles, nous vous demandons de ne pas utiliser le site.</p>

          
          `;

        break

        case '/genesis':
          
          this.setWindowDetails(`Zobbies - Genesis`, 'genesis');
          this.title = 'Genesis';
          this.content = `
            <p class="paragraph italic">Hello!<p class="paragraph">
            <p class="paragraph">
              <strong><em><a href="/" data-link>Zobbies</a></em></strong> est un mini réseau social dédié a toutes personnes souhaitant tisser des liens, ou tout simplement discuter, avec des personnes ayant un intérêt commun sur un sujet précis, par le bias de channels collectives.
            <p class="paragraph">
            <p class="paragraph">
              Le projet a été conçu et développé par moi même, <strong><em><a href="https://florence-b.com" target="_blank">Florence Bastaraud</a></em></strong>, dans l'optique de <strong><em>développer une single page application sans framework</em></strong>.
            </p>
            <p class="paragraph">
              Amoureuse de Javascript, j'ai voulu revenir aux sources le temps d'un projet, et sortir des sentiers battus des frameworks et librairies, en mettant en place un routing client fluide et modulaire à l'aide de l'API History et en exploitant d'autres concepts clés pour ce projet.
            </p>`
          ;

        break
        default:
          '';
        break;

      }

    }


    async getHtml() {

      return `
            <div class="static wrapper">

              <div class="static__main">

                  <h1 class="static__main--title">${this.title}</h1>

                  <div class="static__main--content">${this.content}</div>

              </div>
              
            </div>
        `;
    }
}