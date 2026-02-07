
import imgBeethoven from '../assets/events/beethoven.jpg'
import imgStickerMini from '../assets/shop/stickers/sticker-mini.jpg'
import imgStickerMedium from '../assets/shop/stickers/sticker-medium.jpg'
import imgStickerLarge from '../assets/shop/stickers/sticker-large.jpg'
import imgStickerExclusive from '../assets/shop/stickers/sticker-exclusive.png'
import imgStickerMystery from '../assets/shop/stickers/sticker-mystery.jpg'
import imgVaquitaCorazon from '../assets/shop/plushies/vaquita-corazon.jpg'
import imgDiablo from '../assets/shop/plushies/diablo-rojo.jpg'
import imgOsoDorado from '../assets/shop/plushies/oso-dorado.jpg'
import imgOsoVintage from '../assets/shop/plushies/oso-vintage.jpg'
import imgConejoCarinoso from '../assets/shop/plushies/conejo-carinoso.jpg'
import imgMiniMueble from '../assets/shop/plushies/mini-mueble.jpg'
import imgConejoTeamo from '../assets/shop/plushies/conejo-teamo.jpg'
import imgOsoFelizDia from '../assets/shop/plushies/oso-feliz-dia.jpg'
import imgVaquitaAdorno from '../assets/shop/plushies/vaquita-adorno.jpg'

export const translations = {
    'es': {
        nav: {
            curations: 'Eventos',
            about: 'Nosotros',
            fuel: 'Apoyo',
            contact: 'Repertorio'
        },
        hero: {
            mantra: 'Descubre productos y servicios con esencia, creados para detener el tiempo y tocar el alma.'
        },
        about: {
            title: 'Acerca de Nosotros',
            lines: [
                'La FIL es más que un evento: es una revelación.',
                'Aquí lo clásico evoluciona y lo contemporáneo renace.',
                'Cuerdas y voces se fusionan en un espectáculo que no solo se escucha... se siente, se vive y se transforma.',
                'Un viaje donde el tiempo se diluye y la emoción lo envuelve todo.',
                'Si estás allí, formas parte de algo más.'
            ]
        },
        events: {
            title: 'Nuestros eventos',
            subtitle: 'Experiencias inmersivas que conectan el arte, la música y la tecnología.',
            program_card: {
                title: 'Programa 2026',
                desc: 'Descarga el programa completo de actividades, artistas y talleres.',
                download: 'Descargar PDF (2.4MB)'
            },
            btn_program: 'Descargar Programa',
            items: [
                {
                    id: 1,
                    name: 'Nuevos eventos',
                    date: 'Próximamente',
                    location: '...',
                    img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80'
                },
                {
                    id: 2,
                    name: 'Novena Sinfonía de Beethoven',
                    date: '19 y 21 de Marzo, 2026',
                    location: 'UTE Matriz y PUCE',
                    img: imgBeethoven
                }
            ]
        },
        shop: {
            title: 'Nuestra Colección',
            sticker: { title: 'Stickers', desc: 'Colección de vinilos vibrantes.' },
            plushie: { title: 'Peluches', desc: 'Diseños únicos hechos a mano.' },
            cookie: { title: 'Galletas', desc: 'Sabor casero con toque gourmet.' },
            promo: 'Promociones: 3x2 en Galletas de Avena',
            btn_catalog: 'Ver Detalles',
            btn_promo: 'Ver Promos',
            btn_order: 'Pedir por WhatsApp',
            price_from: 'desde',
            total: 'Total',
            items: 'artículos',
            msg_intro: 'Hola LA FIL, quiero pedir:',
            msg_total: 'Total estimado:',
            inventory: {
                stickers: [
                    { id: 's1', title: 'Mini', price: '0.25', desc: 'Pequeños pero con actitud.', img: imgStickerMini },
                    { id: 's2', title: 'Medianos', price: '0.50', desc: 'El equilibrio ideal entre estilo y presencia.', img: imgStickerMedium },
                    { id: 's3', title: 'Grandes', price: '1.00', desc: 'Imposibles de ignorar.', img: imgStickerLarge },
                    { id: 's4', title: 'Exclusivo LA FIL', price: '1.50', desc: 'Símbolo de elegancia y rebeldía creativa.', img: imgStickerExclusive },
                    { id: 's5', title: 'Pack Misterioso', price: '3.00', desc: 'Sobre con sorpresas únicas.', img: imgStickerMystery },
                    { id: 's6', title: 'Stickers Personalizables', price: '—', isCustom: true, desc: 'Haz realidad tus ideas con nuestra calidad premium.', img: imgStickerMystery }
                ],
                plushies: [
                    { id: 'p1', title: 'Vaquita Corazón', price: '2.99', desc: 'Ternura en cada detalle.', img: imgVaquitaCorazon },
                    { id: 'p2', title: 'Diablo Rojo', price: '2.50', desc: 'Picardía y suavidad.', img: imgDiablo },
                    { id: 'p3', title: 'Oso Dorado', price: '4.50', desc: 'Clásico con brillo premium.', img: imgOsoDorado },
                    { id: 'p4', title: 'Oso Vintage', price: '4.25', desc: 'Elegancia envuelta en suavidad.', img: imgOsoVintage },
                    { id: 'p5', title: 'Conejo Cariñoso', price: '4.50', desc: 'Delicado y dulce en cada detalle.', img: imgConejoCarinoso },
                    { id: 'p6', title: 'Mini Mueble', price: '9.00', desc: 'Para decorar tus figuras favoritas.', img: imgMiniMueble },
                    { id: 'p7', title: 'Conejo Te Amo', price: '8.00', desc: 'Un regalo con intención profunda.', img: imgConejoTeamo },
                    { id: 'p8', title: 'Oso de Feliz Día', price: '4.00', desc: 'Ideal para alegrar cualquier momento.', img: imgOsoFelizDia },
                    { id: 'p9', title: 'Vaquita de Adorno', price: '1.99', desc: 'Pequeña, adorable y con sonido.', img: imgVaquitaAdorno }
                ],
                cookies: [
                    { id: 'c1', title: 'Clásica de Chocolate', price: '1.50', desc: 'Nuestra receta original con chips de chocolate premium.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c2', title: 'Red Velvet', price: '1.50', desc: 'Elegancia y sabor en cada mordida.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c3', title: 'Double Chocolat', price: '1.50', desc: 'Pour les amateurs de cacao intense.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c4', title: 'Pack Surtido (x6)', price: '7.00', desc: 'Llévate la experiencia completa: 6 galletas surtidas a un precio especial.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' }
                ]
            }
        },
        crowdfunding: {
            title: 'Fondo Común',
            vision: 'Tu aporte impulsa nuestra expansión musical y técnica. Sé parte de la próxima vibración de LA FIL.',
            progress_label: 'Progreso',
            goals: {
                title: 'Metas 2026',
                items: [
                    { name: 'Vestuario', target: 500, current: 320 },
                    { name: 'Equipos', target: 800, current: 450 },
                    { name: 'Festivals', target: 1200, current: 280 }
                ]
            },
            contribution_amounts: [10, 25, 50, 100],
            custom_amount: 'Monto personalizado',
            select_goal: 'Selecciona una meta',
            select_amount: 'Selecciona tu aporte',
            join_button: 'Unirse',
            modal: {
                title: 'Datos Bancarios',
                subtitle: 'Realiza tu transferencia y envía el comprobante',
                whatsapp_button: 'Enviar Comprobante',
                whatsapp_message: 'Hola LA FIL, acabo de realizar un aporte para la meta de {goal}. Aquí adjunto mi comprobante',
                close: 'Cerrar'
            }
        },
        footer: {
            collab: 'Colectivo Artesanal de Quito',
            rights: 'Todos los derechos reservados.',
            address: 'Vía Nayón, Quito, Ecuador',
            connect: 'Conecta',
            explore: 'Explora',
            motto: 'Vive la música',
            location: 'Quito - Ecuador',
            legal_repertoire: 'Repertorio',
            legal_terms: 'Términos y Condiciones',
            terms_modal: {
                title: 'TÉRMINOS DE USO',
                body: 'Al navegar por aquí aceptas que todo lo que ves como los diseños y las fotos pertenecen a La Fil y están protegidos por derechos de autor. Es contenido para informarte y disfrutar de la música así que úsalo con respeto. No nos responsabilizamos si la tecnología falla un momento.',
                contact_intro: '¿Alguna duda?',
                contact_email: 'lafilec01@gmail.com',
                close: 'Entendido'
            }
        }
    },
    'en': {
        nav: {
            curations: 'Events',
            about: 'About Us',
            fuel: 'Support',
            contact: 'Repertoire'
        },
        hero: {
            mantra: 'Discover products and services with essence, created to stop time and touch the soul.'
        },
        about: {
            title: 'About Us',
            lines: [
                'LA FIL is more than an event: it is a revelation.',
                'Here the classical evolves and the contemporary is reborn.',
                'Strings and voices merge in a spectacle that is not only heard... it is felt, lived and transformed.',
                'A journey where time dissolves and emotion envelops everything.',
                'If you are there, you become part of something greater.'
            ]
        },
        events: {
            title: 'Events and Programming',
            subtitle: 'Sonic experiences that transform spaces',
            btn_details: 'View Details',
            btn_program: 'Download PDF',
            program_card: {
                title: 'Program Booklet',
                desc: 'Download the complete program of our events and activities'
            },
            items: [
                {
                    id: 1,
                    name: 'New events',
                    date: 'Coming soon',
                    location: '...',
                    img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80'
                },
                {
                    name: 'Beethoven\'s Ninth Symphony',
                    date: 'Mar 19 & 21, 2026',
                    location: 'UTE Matrix & PUCE',
                    img: imgBeethoven
                }
            ]
        },
        shop: {
            title: 'Our Collection',
            sticker: { title: 'Stickers', desc: 'Vibrant vinyl collection.' },
            plushie: { title: 'Plushies', desc: 'Unique handmade designs.' },
            cookie: { title: 'Cookies', desc: 'Homemade flavor with a gourmet touch.' },
            promo: 'Promotions: 3 for 2 on Oat Cookies',
            btn_catalog: 'View Details',
            btn_promo: 'View Promos',
            btn_order: 'Order via WhatsApp',
            price_from: 'from',
            total: 'Total',
            items: 'items',
            msg_intro: 'Hello LA FIL, I want to order:',
            msg_total: 'Estimated Total:',
            inventory: {
                stickers: [
                    { id: 's1', title: 'Mini', price: '0.25', desc: 'Small but with attitude.', img: imgStickerMini },
                    { id: 's2', title: 'Medium', price: '0.50', desc: 'Ideal balance between style and presence.', img: imgStickerMedium },
                    { id: 's3', title: 'Large', price: '1.00', desc: 'Impossible to ignore.', img: imgStickerLarge },
                    { id: 's4', title: 'LA FIL Exclusive', price: '1.50', desc: 'Symbol of elegance and creative rebellion.', img: imgStickerExclusive },
                    { id: 's5', title: 'Mystery Pack', price: '3.00', desc: 'Envelope with unique surprises.', img: imgStickerMystery },
                    { id: 's6', title: 'Custom Stickers', price: '—', isCustom: true, desc: 'Bring your ideas to life with our premium quality.', img: imgStickerMystery }
                ],
                plushies: [
                    { id: 'p1', title: 'Heart Cow', price: '2.99', desc: 'Tenderness in every detail.', img: imgVaquitaCorazon },
                    { id: 'p2', title: 'Red Devil', price: '2.50', desc: 'Mischief and softness.', img: imgDiablo },
                    { id: 'p3', title: 'Golden Bear', price: '4.50', desc: 'Classic with premium shine.', img: imgOsoDorado },
                    { id: 'p4', title: 'Vintage Bear', price: '4.25', desc: 'Elegancia wrapped in softness.', img: imgOsoVintage },
                    { id: 'p5', title: 'Affectionate Bunny', price: '4.50', desc: 'Delicate and sweet in every detail.', img: imgConejoCarinoso },
                    { id: 'p6', title: 'Mini Furniture', price: '9.00', desc: 'To decorate your favorite figures.', img: imgMiniMueble },
                    { id: 'p7', title: 'I Love You Bunny', price: '8.00', desc: 'A gift with deep intention.', img: imgConejoTeamo },
                    { id: 'p8', title: 'Happy Day Bear', price: '4.00', desc: 'Ideal to brighten any moment.', img: imgOsoFelizDia },
                    { id: 'p9', title: 'Decorative Cow', price: '1.99', desc: 'Small, adorable and with sound.', img: imgVaquitaAdorno }
                ],
                cookies: [
                    { id: 'c1', title: 'Classic Chocolate', price: '1.50', desc: 'Our original recipe with premium chocolate chips.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c2', title: 'Red Velvet', price: '1.50', desc: 'Elegancia and flavor in every bite.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c3', title: 'Double Chocolate', price: '1.50', desc: 'For intense cocoa lovers.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
                    { id: 'c4', title: 'Assorted Pack (x6)', price: '7.00', desc: 'Get the full experience: 6 assorted cookies at a special price.', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' }
                ]
            }
        },
        crowdfunding: {
            title: 'Common Fund',
            vision: 'We are an ensemble committed to choral excellence. Your contribution drives our musical and technical expansion.',
            progress_label: 'Progress',
            narrative: 'Your support allows sonic craftsmanship to continue evolving. Join the LA FIL common fund and be part of our next vibration.',
            goals: {
                title: '2026 Goals',
                items: [
                    { name: 'Wardrobe', target: 500, current: 320 },
                    { name: 'Equipment', target: 800, current: 450 },
                    { name: 'Festivals', target: 1200, current: 280 }
                ]
            },
            contribution_amounts: [10, 25, 50, 100],
            custom_amount: 'Custom amount',
            select_goal: 'Select a goal',
            select_amount: 'Select your contribution',
            join_button: 'Join',
            modal: {
                title: 'Bank Details',
                subtitle: 'Make your transfer and send the receipt',
                whatsapp_button: 'Send Receipt',
                whatsapp_message: 'Hello LA FIL, I just made a contribution for the {goal} goal. Here is my receipt',
                close: 'Close'
            }
        },
        footer: {
            collab: 'Quito Artisan Collaborative',
            rights: 'All Rights Reserved.',
            address: 'Vía Nayón, Quito, Ecuador',
            connect: 'Connect',
            explore: 'Explore',
            motto: 'Live the music',
            location: 'Quito - Ecuador',
            legal_repertoire: 'Repertoire',
            legal_terms: 'Terms and Conditions',
            terms_modal: {
                title: 'TERMS OF USE',
                body: 'By browsing here you accept that everything you see like designs and photos belongs to La Fil and is protected by copyright. It is content to inform you and enjoy the music so use it with respect. We are not responsible if technology fails for a moment.',
                contact_intro: 'Any questions?',
                contact_email: 'lafilec01@gmail.com',
                close: 'Got it'
            }
        }
    },
    'fr': {
        nav: {
            curations: "Événements",
            about: "À Propos",
            fuel: "Soutien",
            contact: "Répertoire"
        },
        hero: {
            mantra: `Découvrez des produits et services avec essence, créés pour arrêter le temps et toucher l'âme.`
        },
        about: {
            title: "À Propos de Nous",
            lines: [
                "LA FIL est plus qu'un événement : c'est une révélation.",
                "Ici le classique évolue et le contemporain renaît.",
                "Cordes et voix fusionnent dans un spectacle qui ne s'écoute pas seulement... il se ressent, se vit et se transforme.",
                "Un voyage où le temps se dissout et l'émotion enveloppe tout.",
                "Si vous êtes là, vous faites partie de quelque chose de plus grand."
            ]
        },
        events: {
            title: "Événements et Programmation",
            subtitle: "Expériences sonores qui transforment les espaces",
            btn_details: "Voir Détails",
            btn_program: "Télécharger PDF",
            program_card: {
                title: "Programme",
                desc: "Téléchargez le programme complet de nos événements et activités"
            },
            items: [
                {
                    id: 1,
                    name: "Nouveaux événements",
                    date: "Prochainement",
                    location: "...",
                    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
                },
                {
                    name: "Neuvième Symphonie de Beethoven",
                    date: "19 et 21 Mars 2026",
                    location: "UTE Matrice et PUCE",
                    img: imgBeethoven
                }
            ]
        },
        shop: {
            title: "Notre Collection",
            sticker: { title: "Stickers", desc: "Collection de vinyles vibrants." },
            plushie: { title: "Peluches", desc: "Designs uniques faits à la main." },
            cookie: { title: "Biscuits", desc: "Saveur maison avec une touche gastronomique." },
            promo: "Promotions : 3x2 sur les Biscuits à l'Avoine",
            btn_catalog: "Voir Détails",
            btn_promo: "Voir les Promos",
            btn_order: "Commander par WhatsApp",
            price_from: "dès",
            total: "Total",
            items: "articles",
            msg_intro: "Bonjour LA FIL, je souhaite commander :",
            msg_total: "Total estimé :",
            inventory: {
                stickers: [
                    { id: "s1", title: "Mini", price: "0.25", desc: "Petits mais avec de l'attitude.", img: imgStickerMini },
                    { id: "s2", title: "Moyens", price: "0.50", desc: "L'équilibre idéal entre style et présence.", img: imgStickerMedium },
                    { id: "s3", title: "Grands", price: "1.00", desc: "Impossibles à ignorer.", img: imgStickerLarge },
                    { id: "s4", title: "Exclusivité LA FIL", price: "1.50", desc: "Symbole d'élégance et de rébellion créative.", img: imgStickerExclusive },
                    { id: "s5", title: "Pack Mystère", price: "3.00", desc: "Enveloppe avec des surprises uniques.", img: imgStickerMystery },
                    { id: "s6", title: "Stickers Personnalisables", price: "—", isCustom: true, desc: "Donnez vie à vos idées avec notre qualité premium.", img: imgStickerMystery }
                ],
                plushies: [
                    { id: "p1", title: "Vache Cœur", price: "2.99", desc: "Tendresse dans chaque détail.", img: imgVaquitaCorazon },
                    { id: "p2", title: "Diablo Rouge", price: "2.50", desc: "Espièglerie et douceur.", img: imgDiablo },
                    { id: "p3", title: "Ours Doré", price: "4.50", desc: "Classique avec un éclat premium.", img: imgOsoDorado },
                    { id: "p4", title: "Ours Vintage", price: "4.25", desc: "Élégance enveloppée de douceur.", img: imgOsoVintage },
                    { id: "p5", title: "Lapin Affectueux", price: "4.50", desc: "Délicat et doux dans chaque détail.", img: imgConejoCarinoso },
                    { id: "p6", title: "Mini Meuble", price: "9.00", desc: "Pour décorer vos figurines préférées.", img: imgMiniMueble },
                    { id: "p7", title: "Lapin Je T'aime", price: "8.00", desc: "Un cadeau avec une intention profonde.", img: imgConejoTeamo },
                    { id: "p8", title: "Ours Joyeux Jour", price: "4.00", desc: "Idéal pour égayer n'importe quel moment.", img: imgOsoFelizDia },
                    { id: "p9", title: "Vache Décorative", price: "1.99", desc: "Petite, adorable et avec du son.", img: imgVaquitaAdorno }
                ],
                cookies: [
                    { id: "c1", title: "Chocolat Classique", price: "1.50", desc: "Notre recette originale aux pépites de chocolat premium.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80" },
                    { id: "c2", title: "Red Velvet", price: "1.50", desc: "Élégance et saveur à chaque bouchée.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80" },
                    { id: "c3", title: "Double Chocolat", price: "1.50", desc: "Pour les amateurs de cacao intense.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80" },
                    { id: "c4", title: "Pack Assorti (x6)", price: "7.00", desc: "Profitez de l'expérience complète : 6 biscuits assortis à un prix spécial.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80" }
                ]
            }
        },
        crowdfunding: {
            title: "Fonds Commun",
            vision: "Nous sommes un ensemble engagé dans l'excellence chorale. Votre contribution stimule notre expansion musicale et technique.",
            progress_label: "Progrès",
            narrative: "Votre soutien permet à l'artisanat sonore de continuer d'évoluer. Rejoignez le fonds commun de LA FIL et faites partie de notre prochaine vibration.",
            goals: {
                title: "Objectifs 2026",
                items: [
                    { name: "Residencia Sonora", target: 500, current: 320, img: "/src/assets/events/residencia.jpg" },
                    { name: "Neuvième Symphonie de Beethoven", target: 800, current: 450, img: imgBeethoven },
                    { name: "Festivals", target: 1200, current: 280 }
                ]
            },
            contribution_amounts: [10, 25, 50, 100],
            custom_amount: "Montant personnalisé",
            select_goal: "Sélectionnez un objectif",
            select_amount: "Sélectionnez votre contribution",
            join_button: "Rejoindre",
            modal: {
                title: "Coordonnées Bancaires",
                subtitle: "Effectuez votre virement et envoyez le reçu",
                whatsapp_button: "Envoyer le Reçu",
                whatsapp_message: "Bonjour LA FIL, je viens de faire une contribution pour l'objectif {goal}. Voici mon reçu",
                close: "Fermer"
            }
        },
        footer: {
            collab: "Collectif Artisanal de Quito",
            rights: "Tous droits réservés.",
            address: "Vía Nayón, Quito, Equateur",
            connect: "Connecter",
            explore: "Explorer",
            motto: "Vivez la musique",
            location: "Quito - Équateur",
            legal_repertoire: "Répertoire",
            legal_terms: "Termes et Conditions",
            terms_modal: {
                title: "CONDITIONS D'UTILISATION",
                body: "En naviguant ici vous acceptez que tout ce que vous voyez comme les designs et les photos appartient à La Fil et est protégé par le droit d'auteur. C'est du contenu pour vous informer et profiter de la musique alors utilisez-le avec respect. Nous ne sommes pas responsables si la technologie échoue un instant.",
                contact_intro: "Des questions ?",
                contact_email: "lafilec01@gmail.com",
                close: "Compris"
            }
        }
    }
}
