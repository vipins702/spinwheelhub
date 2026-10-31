
export interface WheelTemplate {
    id: string; // The URL slug
    title: string;
    h1?: string; // Action-oriented H1
    seoTitle: string;
    description: string;
    definition?: string; // For SEO/LLM Snippets
    keywords: string;
    category: 'Utility' | 'Entertainment' | 'Gaming' | 'Life' | 'Food' | 'Education' | 'Sports';
    options: string[];
    colors?: string[]; // Optional override
    about?: { heading: string; paragraphs: string[] }[]; // Unique on-page content (avoids duplicate pages)
    faqs?: { q: string; a: string }[]; // Page-specific FAQ (replaces the generic one)
}

export const wheelTemplates: WheelTemplate[] = [
    // --- RELATIONSHIPS (New) ---
    {
        id: 'couple-activity',
        title: 'Couple Date Night Ideas',
        h1: 'Spin for Random Date Night Ideas',
        seoTitle: 'Date Night Wheel | Random Couple Activity Generator',
        description: 'Stuck in a rut? Spin the wheel to find a fun, romantic, or adventurous date night idea.',
        definition: 'A Date Night Wheel is a random activity generator designed for couples to spontaneously choose their next romantic outing or evening plan.',
        keywords: 'date night ideas, couple wheel, relationship activities, romantic spinner',
        category: 'Life',
        options: ['Movie Night', 'Cook Together', 'Stargazing', 'Board Games', 'Massage Night', 'Walk in Park', 'Video Games', 'Fancy Dinner', 'Picnic', 'Karaoke']
    },
    {
        id: 'who-pays-dinner',
        title: 'Who Pays for Dinner?',
        h1: 'Who Pays the Bill? Spin to Decide',
        seoTitle: 'Who Pays the Bill Wheel | Random Payment Generator',
        description: 'The fairest way to settle the bill. Spin the wheel to decided who pays tonight!',
        definition: 'The Who Pays for Dinner Wheel is a fair, random decision maker used by friends and couples to determine who covers the bill at a restaurant.',
        keywords: 'who pays bill, bill splitter, random payer, relationship games',
        category: 'Life',
        options: ['You Pay', 'Partner Pays', 'Split 50/50', 'Dine and Dash (Joke)', 'Loser of Rock Paper Scissors Pays']
    },

    // --- FOOD EXPANSION (New) ---
    {
        id: 'what-for-lunch',
        title: 'What to Eat for Lunch?',
        h1: 'Pick Your Lunch Randomly',
        seoTitle: 'Lunch Picker Wheel | Random Lunch Generator',
        description: 'Can\'t decide on lunch? Find a quick and delicious meal idea instantly.',
        definition: 'A Lunch Picker Wheel is a decision tool that randomly selects a meal type to help overcome decision fatigue during lunch breaks.',
        keywords: 'lunch picker, what for lunch, random lunch generator, food spinner',
        category: 'Food',
        options: ['Sandwich', 'Salad', 'Leftovers', 'Burger', 'Tacos', 'Sushi', 'Pizza Slice', 'Soup', 'Wrap', 'Smoothie']
    },
    {
        id: 'dessert-picker',
        title: 'Dessert Picker',
        h1: 'Spin for a Sweet Treat',
        seoTitle: 'Random Dessert Generator | Sweet Treat Wheel',
        description: 'Satisfy your sweet tooth. Spin to choose your dessert!',
        definition: 'The Dessert Picker Wheel randomly selects a sweet treat or dessert option, perfect for solving post-dinner indecision.',
        keywords: 'dessert picker, sweet treat wheel, cake or ice cream',
        category: 'Food',
        options: ['Ice Cream', 'Chocolate Cake', 'Cookies', 'Fruit Salad', 'Donuts', 'Cheesecake', 'Brownies', 'Pie', 'Yogurt', 'Candy']
    },
    {
        id: 'healthy-snack',
        title: 'Healthy Snack Generator',
        h1: 'Choose a Healthy Snack Instantly',
        seoTitle: 'Healthy Snack Picker | Random Nutrition Wheel',
        description: 'Eat better with the random healthy snack generator. Good for you and fun to spin.',
        definition: 'A Healthy Snack Generator is a wellness tool that suggests nutritious snack options randomly to encourage better eating habits.',
        keywords: 'healthy snack picker, nutrition wheel, diet helper, healthy food generator',
        category: 'Food',
        options: ['Apple & Peanut Butter', 'Greek Yogurt', 'Almonds', 'Carrots & Hummus', 'Protein Bar', 'Banana', 'Hard Boiled Egg', 'Edamame', 'Berries']
    },

    // --- UTILITY ---
    {
        id: 'yes-no',
        title: 'Yes or No',
        h1: 'Yes or No Wheel: Spin for a Random Answer',
        seoTitle: 'Yes or No Wheel: Free Yes/No Generator | SpinWheelHub',
        description: 'Free yes or no wheel: spin for an instant random Yes or No answer. A fair 50/50 yes/no generator for quick decisions. No sign-up, works on any device.',
        definition: 'A Yes or No Wheel is a random yes/no generator: a two-slice spinner that lands on "Yes" or "No" with an equal 50/50 chance, like a digital coin flip.',
        keywords: 'yes or no wheel, yes no wheel, yes or no generator, yes no generator, yes or no wheel spinner, random yes or no',
        category: 'Utility',
        options: ['Yes', 'No'],
        about: [
            {
                heading: 'What is a Yes or No Wheel?',
                paragraphs: [
                    'The yes or no wheel is the simplest decision maker there is: a spinner split into a "Yes" slice and a "No" slice. Ask your question, spin, and the wheel picks an answer for you. Because both slices are the same size, each spin has an equal 50/50 chance of landing on Yes or No.',
                    'People use a yes no wheel when they are stuck on a small choice, want to settle a friendly argument, or just want a fun way to let chance decide. It works like flipping a coin, but it is easier to see, more fun to watch, and you can change the answers.'
                ]
            },
            {
                heading: 'How to use the yes or no generator',
                paragraphs: [
                    '1. Think of a yes-or-no question, such as "Should I order pizza tonight?" 2. Click Spin (or tap the wheel). 3. Wait for the wheel to stop and read your answer. That\'s it. No sign-up, no download, and it works on phones, tablets and computers.',
                    'Want more than two answers? Open Manual Entry and add options like "Maybe", "Ask again later" or "Definitely". Adding Maybe turns it into a yes, no or maybe wheel, and each answer still gets an equal share of the wheel.'
                ]
            },
            {
                heading: 'Ideas for questions to ask',
                paragraphs: [
                    'Everyday choices: Should I go to the gym today? Should I watch one more episode? Should we eat out tonight?',
                    'Games and parties: use the yes no spinner for truth-or-dare style challenges, classroom games, or deciding who goes first. Teachers use it as a quick random yes or no answer for class polls and warm-up activities.',
                    'A note on big decisions: the wheel is great for small, low-stakes choices. For important decisions, use it as a tiebreaker. Sometimes the answer you were hoping for tells you what you really want.'
                ]
            },
            {
                heading: 'Yes or no wheel vs. coin flip',
                paragraphs: [
                    'Both give a 50/50 answer. A coin flip only ever has two sides, while the yes or no wheel can be customized with extra answers, shows a history of your recent spins, and can remove an answer after it is picked. If you prefer heads or tails, try our coin flip wheel.'
                ]
            }
        ],
        faqs: [
            { q: 'Is the yes or no wheel really random?', a: 'Yes. Each spin uses your browser\'s random number generator to pick a random stopping point, and the Yes and No slices are exactly the same size, so each answer has an equal 50% chance.' },
            { q: 'Can I add "Maybe" to the yes or no wheel?', a: 'Yes. Open Manual Entry, type Maybe (or any other answer), and press Enter. The wheel updates instantly and every answer gets an equal slice.' },
            { q: 'Is this yes no generator free?', a: 'Yes. The yes or no wheel is 100% free, needs no account, and works in any modern browser on phone, tablet or desktop.' },
            { q: 'What is the difference between a yes or no wheel and a coin flip?', a: 'Both give a 50/50 result. The wheel lets you add more answers, keeps a history of recent results, and is easier to share on screen with a class or group.' },
            { q: 'Can I use the yes or no spinner in a classroom?', a: 'Yes. Teachers often project the yes or no spinner for quick polls, games and random decisions. Use the size slider to make the wheel bigger on a projector.' }
        ]
    },
    {
        id: 'random-number-1-10',
        title: 'Random Number 1-10',
        h1: 'Pick a Number from 1 to 10',
        seoTitle: 'Random Number Wheel 1-10 | Number Picker | SpinWheelMaster',
        description: 'Pick a random number between 1 and 10 instantly. Great for games, lotteries, and random selection.',
        definition: 'The Random Number Wheel (1-10) is a digital spinner that fairly selects a single integer between 1 and 10 for games or teaching.',
        keywords: 'number picker wheel, random number 1-10, number spinner, rng wheel',
        category: 'Utility',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
        id: 'coin-flip',
        title: 'Heads or Tails (Coin Flip)',
        h1: 'Flip a Coin Online',
        seoTitle: 'Heads or Tails Wheel | Coin Flip Simulator | SpinWheelMaster',
        description: 'Flip a coin online with our Heads or Tails wheel. The fairest way to make binary decisions.',
        definition: 'The Heads or Tails Wheel simulates a real coin toss, providing a 50/50 chance of landing on either side for unbiased decisions.',
        keywords: 'coin flip, heads or tails, coin toss, flip a coin wheel',
        category: 'Utility',
        options: ['Heads', 'Tails']
    },
    {
        id: 'dice-roll',
        title: 'Dice Roll (D6)',
        h1: 'Roll a Die (D6) Online',
        seoTitle: 'Roll a Die Wheel | Virtual Dice Roller | SpinWheelMaster',
        description: 'Roll a six-sided die online. Perfect for board games, D&D, and tabletop RPGs when you lose your dice.',
        definition: 'A Virtual Dice Roller Wheel simulates rolling a standard six-sided die (D6), essential for board games and RPGs.',
        keywords: 'dice roller, roll a die, d6 spinner, visual dice',
        category: 'Utility',
        options: ['1', '2', '3', '4', '5', '6']
    },
    {
        id: 'raffle-number-1-100',
        title: 'Raffle Number (1-100)',
        h1: 'Draw a Raffle Winner (1-100)',
        seoTitle: 'Raffle Number Generator 1-100 | Contest Picker | SpinWheelMaster',
        description: 'Pick a random winner from 1 to 100. Ideal for small raffles, classroom contests, and giveaways.',
        definition: 'The Raffle Number Generator Wheel selects a random winning number between 1 and 100, used primarily for contests and giveaways.',
        keywords: 'raffle picker, random number 1-100, number generator, contest winner',
        category: 'Utility',
        options: Array.from({ length: 100 }, (_, i) => (i + 1).toString())
    },

    // --- GAMING (Roblox/Fortnite) ---
    {
        id: 'roblox-game-picker',
        title: 'What Roblox Game to Play?',
        h1: 'Spin for a Random Roblox Game',
        seoTitle: 'Roblox Game Picker Wheel | Random Obby & Tycoon Selector',
        description: 'Can\'t decide what to play on Roblox? Spin to find a popular game like Blox Fruits, Brookhaven, or Adopt Me!',
        definition: 'A Roblox Game Picker is a fan-made tool that randomly suggests popular Roblox experiences like Blox Fruits or Brookhaven to play next.',
        keywords: 'roblox game picker, what to play on roblox, random roblox game, roblox spinner',
        category: 'Gaming',
        options: ['Blox Fruits', 'Brookhaven RP', 'Adopt Me!', 'Tower of Hell', 'Pet Simulator 99', 'Murder Mystery 2', 'Royale High', 'BedWars', 'Doors', 'MeepCity', 'Jailbreak', 'Piggy']
    },
    {
        id: 'fortnite-drop',
        title: 'Fortnite Drop Location',
        h1: 'Where to Land in Fortnite?',
        seoTitle: 'Fortnite Drop Spot Picker | Where to Land Season 5',
        description: 'Random Fortnite Drop Location generator. Spice up your match by landing somewhere random!',
        definition: 'The Fortnite Drop Location Wheel randomly selects a landing zone on the Fortnite map to add variety and challenge to gameplay.',
        keywords: 'fortnite drop picker, where to land fortnite, random drop spot, fortnite wheel',
        category: 'Gaming',
        options: ['Tilted Towers', 'Pleasant Park', 'Retail Row', 'Salty Springs', 'Lazy Lake', 'Misty Meadows', 'Risky Reels', 'Craggy Cliffs', 'Steamy Stacks', 'Holly Hedges']
    },
    {
        id: 'pokemon-type',
        title: 'Random Pokemon Type',
        h1: 'Generate a Random Pokemon Type',
        seoTitle: 'Pokemon Type Picker | Random Type Generator',
        description: 'Generate a random Pokemon type for your next Nuzlocke run or challenge.',
        definition: 'A Pokemon Type Wheel randomly generates one of the 18 elemental types, useful for Nuzlocke challenges or team building.',
        keywords: 'pokemon type generator, random pokemon type, nuzlocke helper',
        category: 'Gaming',
        options: ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy']
    },
    {
        id: 'random-pokemon',
        title: 'Random Pokemon',
        h1: 'Random Pokemon Generator: Spin for a Pokemon',
        seoTitle: 'Random Pokemon Generator: Spin All 251 (Gen 1 & 2) | SpinWheelHub',
        description: 'Spin the wheel to get a random Pokemon from Gen 1 and Gen 2 (Kanto and Johto, 251 Pokemon). Use it for Nuzlocke runs, draft games, drawing ideas and trivia.',
        definition: 'This Random Pokemon Generator is a wheel with all 251 Pokemon from the first two generations (Kanto and Johto). Each spin picks one at random.',
        keywords: 'random pokemon generator, random pokemon, pokemon wheel, random pokemon wheel, pokemon picker, gen 1 pokemon generator',
        category: 'Gaming',
        options: ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi'],
        about: [
            {
                heading: 'Which Pokemon are on the wheel?',
                paragraphs: [
                    'All 251 Pokemon from Gen 1 (Kanto, #001 Bulbasaur to #151 Mew) and Gen 2 (Johto, #152 Chikorita to #251 Celebi). Legendaries and Mythicals are included. Every Pokemon gets the same size slice, so Magikarp is just as likely as Mewtwo.',
                    'Want only Gen 1? Hit Clear All, then paste the first 151 names into Manual Entry. You can also delete the legendaries if you want a fairer pick for a challenge run.'
                ]
            },
            {
                heading: 'Things to do with a random Pokemon',
                paragraphs: [
                    'Nuzlocke and randomizer runs: spin to choose your starter, or the one Pokemon you are allowed to use for the next gym.',
                    'Draft battles with friends: take turns spinning to build a team of six. Turn on "Exclude after spin" so nobody gets the same Pokemon.',
                    'Drawing and trivia: spin and draw it from memory, or name its type and evolution before you look it up. Want a type instead of a Pokemon? Use the Pokemon type wheel.'
                ]
            }
        ],
        faqs: [
            { q: 'How many Pokemon does the generator include?', a: '251: every Pokemon from Gen 1 (Kanto) and Gen 2 (Johto), from Bulbasaur to Celebi.' },
            { q: 'Are legendary Pokemon included?', a: 'Yes. Articuno, Zapdos, Moltres, Mewtwo, Mew, the legendary beasts, Lugia, Ho-Oh and Celebi are all on the wheel. Remove them from the Options list if you don\'t want them.' },
            { q: 'Can I get a team of 6 random Pokemon?', a: 'Yes. Turn on "Exclude after spin" and spin six times. Each Pokemon is taken off the wheel once it is picked, so your team has no repeats.' },
            { q: 'Is this an official Pokemon tool?', a: 'No. This is a free fan-made tool and is not affiliated with Nintendo, Game Freak or The Pokemon Company.' }
        ]
    },

    // --- ENTERTAINMENT ---
    {
        id: 'truth-or-dare',
        title: 'Truth or Dare',
        h1: 'Truth or Dare? Spin the Wheel',
        seoTitle: 'Truth or Dare Wheel | Online Party Game',
        description: 'The classic Truth or Dare game on a wheel. Spin to decide your fate!',
        definition: 'The Truth or Dare Wheel is a digital version of the classic party game that randomly assigns "Truth" or "Dare" to players.',
        keywords: 'truth or dare wheel, party game spinner, sleepover games',
        category: 'Entertainment',
        options: ['Truth', 'Dare']
    },
    {
        id: 'twister-moves',
        title: 'Twister Spinner',
        h1: 'Spin for Your Next Twister Move',
        seoTitle: 'Twister Game Spinner | Left Hand Green, Right Foot Red',
        description: 'Lost your Twister spinner? Use this digital version to play right now.',
        definition: 'The Twister Spinner is an online replacement for the physical game spinner, directing players to place limbs on specific colored spots.',
        keywords: 'twister spinner, twister wheel, board game replacement',
        category: 'Entertainment',
        options: ['Left Hand Green', 'Right Hand Green', 'Left Foot Green', 'Right Foot Green', 'Left Hand Red', 'Right Hand Red', 'Left Foot Red', 'Right Foot Red', 'Left Hand Yellow', 'Right Hand Yellow', 'Left Foot Yellow', 'Right Foot Yellow', 'Left Hand Blue', 'Right Hand Blue', 'Left Foot Blue', 'Right Foot Blue']
    },

    // --- FOOD ---
    {
        id: 'what-for-dinner',
        title: 'What\'s for Dinner?',
        h1: 'What\'s for Dinner? Random Food Generator Wheel',
        seoTitle: 'Random Food Generator: What\'s for Dinner Wheel | SpinWheelHub',
        description: 'Can\'t decide what to eat? Spin the food wheel and let it pick dinner for you: pizza, sushi, tacos, curry and more. Add your own meals or favorite restaurants.',
        definition: 'The What\'s for Dinner Wheel is a random food generator. Spin it and it picks a meal or cuisine for you, so you can stop arguing and start eating.',
        keywords: 'random food generator, food wheel, what\'s for dinner generator, dinner wheel, random dinner picker, what to eat',
        category: 'Food',
        options: ['Pizza', 'Sushi', 'Burgers', 'Tacos', 'Pasta', 'Salad', 'Steak', 'Chinese', 'Indian Curry', 'Thai', 'Sandwiches', 'BBQ', 'Fried Chicken', 'Soup'],
        about: [
            {
                heading: 'Let the food wheel pick dinner',
                paragraphs: [
                    'It\'s 7pm. Someone asks "what do you want to eat?" and everyone says "I don\'t mind". Twenty minutes later you still haven\'t ordered. Spin this wheel instead and it decides for you.',
                    'The wheel starts with 14 popular choices, from pizza and sushi to curry and BBQ. Delete the ones nobody likes and add your own, like "Mom\'s lasagna", "leftovers" or the takeaway place down the road.'
                ]
            },
            {
                heading: 'Ways to use the random food generator',
                paragraphs: [
                    'Weeknight dinners: put the meals you already know how to cook on the wheel. Spin once a day and you have a meal plan without thinking about it.',
                    'Ordering in: add the restaurants near you and let the wheel choose. Turn on "Exclude after spin" if you don\'t want the same place twice in one week.',
                    'Couples and families: everyone adds two meals they would be happy with. Then whatever the wheel picks, nobody can complain.'
                ]
            },
            {
                heading: 'Want something more specific?',
                paragraphs: [
                    'Try our lunch picker, the dessert picker for something sweet, or the fast food wheel when you just want a drive-thru. Stuck on who pays the bill? There\'s a wheel for that too.'
                ]
            }
        ],
        faqs: [
            { q: 'How does the random food generator work?', a: 'Each food on the wheel gets an equal slice. Press Spin and the wheel stops on one at random, so every choice has the same chance.' },
            { q: 'Can I add my own meals or restaurants?', a: 'Yes. Open Manual Entry, type a meal or restaurant and press Enter. You can also remove anything you don\'t like from the Options list.' },
            { q: 'Can I use it to plan meals for the week?', a: 'Yes. Add the meals you cook, turn on "Exclude after spin", and spin seven times. You get a week of dinners with no repeats.' },
            { q: 'Is the dinner wheel free?', a: 'Yes. It\'s free, needs no account and works on your phone, so you can spin it right in the kitchen.' }
        ]
    },
    {
        id: 'fast-food',
        title: 'Fast Food Picker',
        h1: 'Pick a Fast Food Place Randomly',
        seoTitle: 'Fast Food Chain Picker | Random Restaurant Generator',
        description: 'Can\'t agree on drive-thru? Spin to decide between McDonald\'s, KFC, Subway, and others.',
        definition: 'The Fast Food Picker Wheel randomly selects a fast food restaurant chain to solve disputes about where to eat.',
        keywords: 'fast food picker, restaurant wheel, mcdonalds or burger king',
        category: 'Food',
        options: ['McDonald\'s', 'Burger King', 'KFC', 'Subway', 'Pizza Hut', 'Domino\'s', 'Taco Bell', 'Wendy\'s', 'Chick-fil-A', 'Popeyes', 'Chipotle', 'Starbucks']
    },

    // --- LIFE DECISIONS ---
    {
        id: 'weekend-activity',
        title: 'Weekend Activity',
        h1: 'Find Something To Do This Weekend',
        seoTitle: 'Weekend Activity Generator | What to do this weekend?',
        description: 'Bored? Find something fun to do this weekend with a random spin.',
        definition: 'The Weekend Activity Wheel suggests random hobbies and events, like hiking or museums, to cure boredom.',
        keywords: 'weekend activities, ideas for weekend, random hobby selector',
        category: 'Life',
        options: ['Hiking', 'Movie Marathon', 'Visit Museum', 'Try New Restaurant', 'Clean House', 'Read a Book', 'Video Games', 'Visit Friends', 'Baking', 'Nap']
    },

    // --- EDUCATION ---
    {
        id: 'random-letter',
        title: 'Random Letter',
        h1: 'Random Letter Generator: Spin the Alphabet Wheel',
        seoTitle: 'Random Letter Generator: A–Z Alphabet Wheel | SpinWheelHub',
        description: 'Spin the alphabet wheel to pick a random letter from A to Z. A free random letter generator for word games, Scattergories, classrooms and spelling practice.',
        definition: 'A Random Letter Generator is an alphabet wheel with 26 equal slices, one for each letter from A to Z, that picks one letter at random.',
        keywords: 'random letter generator, alphabet wheel, random letter wheel, letter picker, abc spinner',
        category: 'Education',
        options: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        about: [
            {
                heading: 'How the random letter generator works',
                paragraphs: [
                    'The alphabet wheel has 26 equal slices, one for every letter from A to Z. Press Spin and the wheel stops on a random letter, so every letter has the same 1-in-26 chance.',
                    'Want to leave out hard letters like Q, X and Z? Remove them from the Options list, or turn on "Exclude after spin" so each letter is only picked once per round.'
                ]
            },
            {
                heading: 'Games and activities that use a random letter',
                paragraphs: [
                    'Scattergories and "Stop the Bus": spin a letter, then race to name an animal, a country and a food that start with it.',
                    'Classrooms: teachers use the alphabet wheel for phonics warm-ups, spelling bees and "name a word that starts with…" challenges. Project it on the board and let students take turns spinning.',
                    'Creative prompts: pick a random letter for a baby name, a band name, a drawing challenge or a story character.'
                ]
            }
        ],
        faqs: [
            { q: 'Is every letter equally likely?', a: 'Yes. All 26 slices are the same size, so each letter has the same chance on every spin.' },
            { q: 'Can I remove letters like Q, X and Z?', a: 'Yes. Hover over a letter in the Options list and click the X to remove it. Use Reset Defaults to bring the full alphabet back.' },
            { q: 'Can I stop the same letter coming up twice?', a: 'Turn on "Exclude after spin". Each letter you land on is removed until you reset the wheel.' },
            { q: 'What games can I play with a random letter generator?', a: 'Popular choices are Scattergories, Stop the Bus, word chain games, spelling practice and alphabet scavenger hunts.' }
        ]
    },
    {
        id: 'random-animal',
        title: 'Random Animal',
        h1: 'Random Animal Generator: Spin for an Animal',
        seoTitle: 'Random Animal Generator: Spin the Animal Wheel | SpinWheelHub',
        description: 'Spin the wheel to pick a random animal. A free random animal generator for drawing prompts, charades, classroom games and kids\' activities.',
        definition: 'A Random Animal Generator is a spinning wheel filled with well-known animals that picks one at random for games, drawing ideas or learning activities.',
        keywords: 'random animal generator, animal wheel, random animal picker, animal spinner, pick a random animal',
        category: 'Education',
        options: ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Koala', 'Panda', 'Polar Bear', 'Grizzly Bear', 'Wolf', 'Fox', 'Rabbit', 'Squirrel', 'Deer', 'Moose', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Dog', 'Cat', 'Hamster', 'Monkey', 'Gorilla', 'Chimpanzee', 'Sloth', 'Hippo', 'Rhino', 'Crocodile', 'Turtle', 'Snake', 'Frog', 'Eagle', 'Owl', 'Penguin', 'Parrot', 'Flamingo', 'Peacock', 'Dolphin', 'Whale', 'Shark', 'Octopus', 'Jellyfish', 'Seahorse', 'Butterfly', 'Bee', 'Ladybug', 'Camel'],
        about: [
            {
                heading: 'Spin for a random animal',
                paragraphs: [
                    'This wheel holds 50 animals from the jungle, the farm, the ocean and the sky. Spin it and you get one random animal, with every animal equally likely to come up.',
                    'You can add your own animals in Manual Entry, or delete ones you don\'t want, to make a wheel of farm animals, sea creatures or your class\'s favorite pets.'
                ]
            },
            {
                heading: 'Ways to use the random animal generator',
                paragraphs: [
                    'Drawing challenges: spin an animal and draw it in two minutes. Spin twice and draw a mix of both animals.',
                    'Party and family games: act out the animal for others to guess, or play "20 questions" where only the spinner knows the answer.',
                    'Learning: teachers use the animal wheel to pick a research topic, a habitat question or a spelling word for young learners.'
                ]
            }
        ],
        faqs: [
            { q: 'How many animals are on the wheel?', a: 'The wheel starts with 50 popular animals. You can add or remove animals to make your own list.' },
            { q: 'Is the animal picked at random?', a: 'Yes. Every slice is the same size, so each animal has the same chance of being picked.' },
            { q: 'Can I use this for a drawing challenge?', a: 'Yes. It is a popular drawing prompt generator: spin, then draw the animal before the timer runs out.' },
            { q: 'Is the random animal generator free?', a: 'Yes. It is free, needs no sign-up and works on phones, tablets and computers.' }
        ]
    },
    {
        id: 'random-country',
        title: 'Random Country',
        h1: 'Random Country Generator: Spin the World Wheel',
        seoTitle: 'Random Country Generator: Spin All 195 Countries | SpinWheelHub',
        description: 'Spin the wheel to pick a random country from all 195 countries in the world. Great for geography games, travel ideas, trivia and classroom quizzes.',
        definition: 'A Random Country Generator is a spinning wheel containing all 195 countries (the 193 UN member states plus Vatican City and Palestine) that selects one country at random.',
        keywords: 'random country generator, random country wheel, country picker, spin a country, random country',
        category: 'Education',
        options: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'DR Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
        about: [
            {
                heading: 'Pick a random country from the whole world',
                paragraphs: [
                    'This wheel includes all 195 countries: the 193 member states of the United Nations plus Vatican City and Palestine. Spin it and the wheel lands on one country, with every country given an equal slice.',
                    'With 195 slices the labels get small, so the result is also shown clearly in a pop-up when the wheel stops. Trim the list to one continent if you want a bigger, easier-to-read wheel.'
                ]
            },
            {
                heading: 'Fun ways to use a random country generator',
                paragraphs: [
                    'Geography games: spin a country, then guess its capital, flag, continent or language.',
                    'Travel and food ideas: let the wheel pick your next dream destination, or cook a dish from a random country for "world dinner night".',
                    'Classrooms and trivia: assign each student a random country for a project, or use it as a quick quiz round.'
                ]
            }
        ],
        faqs: [
            { q: 'How many countries are on the wheel?', a: '195: the 193 United Nations member states plus the two UN observer states, Vatican City and Palestine.' },
            { q: 'Can I spin only countries from one continent?', a: 'Yes. Use Clear All, then paste the countries you want into Manual Entry, or import a text file with one country per line.' },
            { q: 'Is every country equally likely?', a: 'Yes. Each country has an equal slice of the wheel, so small and large countries have the same chance.' },
            { q: 'What can I use a random country generator for?', a: 'Geography quizzes, flag games, travel bucket lists, school projects and themed cooking nights are the most popular uses.' }
        ]
    },
    {
        id: 'random-state',
        title: 'Random US State',
        h1: 'Random State Generator: Spin the 50 States Wheel',
        seoTitle: 'Random State Generator: 50 US States Wheel | SpinWheelHub',
        description: 'Spin the wheel to pick a random US state from all 50 states. A free random state generator for road trip ideas, geography games and classroom projects.',
        definition: 'A Random State Generator is a spinning wheel with all 50 United States that picks one state at random, each with an equal chance.',
        keywords: 'random state generator, random us state, 50 states wheel, state picker, spin a state',
        category: 'Education',
        options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        about: [
            {
                heading: 'Spin a random US state',
                paragraphs: [
                    'The wheel contains all 50 US states in equal slices. Spin once to pick a state at random, or turn on "Exclude after spin" to work through all 50 without repeats.',
                    'Want Washington, D.C. or the US territories too? Add them in Manual Entry and they get their own slice.'
                ]
            },
            {
                heading: 'Ideas for the 50 states wheel',
                paragraphs: [
                    'Road trips and vacations: let the wheel choose your next destination, or a state whose food you will cook this weekend.',
                    'School: assign a random state for a report, quiz students on capitals and nicknames, or practice locating states on a map.',
                    'Games: play "license plate bingo", trivia nights or "name three things from this state" with friends.'
                ]
            }
        ],
        faqs: [
            { q: 'Does the wheel include all 50 states?', a: 'Yes. All 50 US states are on the wheel, each with an equal slice.' },
            { q: 'Is Washington, D.C. included?', a: 'Not by default, because it is not a state. You can add it, and any US territories, in Manual Entry.' },
            { q: 'Can I avoid getting the same state twice?', a: 'Yes. Turn on "Exclude after spin" and each state is removed after it is picked.' },
            { q: 'How do teachers use the random state generator?', a: 'For state report assignments, capitals quizzes, map practice and quick geography warm-ups.' }
        ]
    },

    // --- SPORTS ---
    {
        id: 'nba-team',
        title: 'Random NBA Team',
        h1: 'Random NBA Team Generator: Spin All 30 Teams',
        seoTitle: 'Random NBA Team Generator: Spin All 30 Teams | SpinWheelHub',
        description: 'Spin the wheel to pick a random NBA team from all 30 franchises. Use it for 2K challenges, fantasy drafts, team picks and basketball trivia.',
        definition: 'A Random NBA Team Generator is a spinning wheel with all 30 NBA franchises that picks one team at random, each with an equal chance.',
        keywords: 'random nba team generator, nba team wheel, random nba team, nba team picker, nba 2k random team',
        category: 'Sports',
        options: ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'],
        about: [
            {
                heading: 'Pick a random NBA team',
                paragraphs: [
                    'This wheel holds all 30 NBA teams, 15 from the Eastern Conference and 15 from the Western Conference. Spin and the wheel lands on one team, with every franchise getting an equal slice.',
                    'Playing with friends? Turn on "Exclude after spin" so two players never end up with the same team.'
                ]
            },
            {
                heading: 'Ways to use the NBA team wheel',
                paragraphs: [
                    'Video game challenges: spin for a random team in NBA 2K and play a game, a season or a rebuild with whatever you land on.',
                    'Fantasy and drafts: decide draft order, pick a team to follow for the season, or settle who gets which team in a friendly challenge.',
                    'Trivia: spin a team, then name its arena, a championship year or a legendary player.'
                ]
            }
        ],
        faqs: [
            { q: 'Does the wheel include all 30 NBA teams?', a: 'Yes. All 30 current NBA franchises are on the wheel, each with an equal slice.' },
            { q: 'Can I spin only Eastern or Western Conference teams?', a: 'Yes. Remove the teams you don\'t want from the Options list, or use Clear All and add your own list.' },
            { q: 'How do I make sure friends get different teams?', a: 'Turn on "Exclude after spin". Each team is removed after it is picked, so nobody gets a duplicate.' },
            { q: 'Can I use this for NBA 2K random team challenges?', a: 'Yes. Spin, then play with the team you land on. It is a popular way to add variety to 2K games.' }
        ]
    },
    {
        id: 'nfl-team',
        title: 'Random NFL Team',
        h1: 'Random NFL Team Generator: Spin All 32 Teams',
        seoTitle: 'Random NFL Team Generator: Spin All 32 Teams | SpinWheelHub',
        description: 'Spin the wheel to pick a random NFL team from all 32 franchises. Great for Madden challenges, fantasy football drafts, team picks and football trivia.',
        definition: 'A Random NFL Team Generator is a spinning wheel with all 32 NFL franchises that picks one team at random, each with an equal chance.',
        keywords: 'random nfl team generator, nfl team wheel, random nfl team, nfl team picker, madden random team',
        category: 'Sports',
        options: ['Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills', 'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns', 'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers', 'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins', 'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants', 'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers', 'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'],
        about: [
            {
                heading: 'Pick a random NFL team',
                paragraphs: [
                    'This wheel holds all 32 NFL teams, 16 from the AFC and 16 from the NFC. Spin and the wheel lands on one team, with every franchise getting an equal slice.',
                    'Drafting with friends? Turn on "Exclude after spin" so each team can only be picked once.'
                ]
            },
            {
                heading: 'Ways to use the NFL team wheel',
                paragraphs: [
                    'Madden challenges: spin for a random team and play a game, a franchise season or a rebuild with whoever you land on.',
                    'Fantasy football: randomize draft order, assign teams for a family pick\'em, or choose which game to watch this Sunday.',
                    'Trivia and watch parties: spin a team, then name its stadium, division or a famous player.'
                ]
            }
        ],
        faqs: [
            { q: 'Does the wheel include all 32 NFL teams?', a: 'Yes. All 32 current NFL franchises are on the wheel, each with an equal slice.' },
            { q: 'Can I spin only AFC or NFC teams?', a: 'Yes. Remove the teams you don\'t want from the Options list, or use Clear All and add your own list.' },
            { q: 'How do I give each friend a different team?', a: 'Turn on "Exclude after spin". Each team is removed once it is picked.' },
            { q: 'Can I use this for Madden random team challenges?', a: 'Yes. Spin, then play with the team you land on for a fresh challenge every time.' }
        ]
    },

    // --- ENTERTAINMENT (games & movies) ---
    {
        id: 'random-movie',
        title: 'Random Movie',
        h1: 'Random Movie Generator: Spin for Tonight\'s Movie',
        seoTitle: 'Random Movie Generator: Spin the Movie Wheel | SpinWheelHub',
        description: 'Can\'t decide what to watch? Spin the random movie generator to pick from 50 all-time favorite films, or add your own watchlist to the movie wheel.',
        definition: 'A Random Movie Generator is a spinning wheel of movie titles that picks one film at random to end the "what should we watch?" debate.',
        keywords: 'random movie generator, movie picker wheel, random movie picker, what movie should i watch, movie wheel',
        category: 'Entertainment',
        options: ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'Inception', 'The Matrix', 'Interstellar', 'Fight Club', 'Gladiator', 'Titanic', 'Jurassic Park', 'The Lion King', 'Toy Story', 'Finding Nemo', 'Spirited Away', 'Back to the Future', 'Star Wars', 'The Avengers', 'Avengers: Endgame', 'Into the Spider-Verse', 'The Lord of the Rings', 'Harry Potter', 'Pirates of the Caribbean', 'Shrek', 'Up', 'Coco', 'Frozen', 'The Incredibles', 'Inside Out', 'Get Out', 'Parasite', 'La La Land', 'The Social Network', 'The Truman Show', 'Mean Girls', 'Home Alone', 'The Princess Bride', 'Ghostbusters', 'E.T.', 'Jaws', 'Rocky', 'Top Gun: Maverick', 'Mad Max: Fury Road', 'The Silence of the Lambs', 'Goodfellas', 'Whiplash', 'The Grand Budapest Hotel', 'Ratatouille', 'Barbie'],
        about: [
            {
                heading: 'End the "what should we watch?" debate',
                paragraphs: [
                    'Scrolling for 30 minutes and still no movie? Spin the wheel and let it decide. The movie wheel starts with 50 well-loved films across action, comedy, animation, drama and sci-fi, and every title has an equal chance.',
                    'The best way to use it: clear the wheel and add your own watchlist, or the movies everyone in the room agrees on. Then the result is always something you actually want to see.'
                ]
            },
            {
                heading: 'Movie night ideas',
                paragraphs: [
                    'Family night: put only kid-friendly films on the wheel so any result works for everyone.',
                    'Movie marathon: turn on "Exclude after spin" and spin again after each film to plan a whole weekend.',
                    'Couples and friends: each person adds three movies, then the wheel picks one fairly.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add my own movies?', a: 'Yes. Use Manual Entry to type in your watchlist, or Clear All first to start with only your own picks.' },
            { q: 'Which movies are on the wheel by default?', a: '50 popular, highly rated films, from classics like The Godfather to animated favorites like Spirited Away and Coco.' },
            { q: 'Does the movie generator tell me where to stream a film?', a: 'No. It only picks the movie. Check your streaming services to see where it is available.' },
            { q: 'Is the random movie generator fair?', a: 'Yes. Every title has an equal slice of the wheel, so each one has the same chance.' }
        ]
    },
    {
        id: 'pictionary-words',
        title: 'Pictionary Words',
        h1: 'Pictionary Word Generator: Spin a Word to Draw',
        seoTitle: 'Pictionary Word Generator: Spin a Word to Draw | SpinWheelHub',
        description: 'Spin the Pictionary word generator for a random word to draw. 60 fun, drawable words for game night, classrooms and online drawing games.',
        definition: 'A Pictionary Word Generator is a spinning wheel of easy-to-draw words that picks a random word for the drawer to sketch while others guess.',
        keywords: 'pictionary word generator, pictionary words, random drawing word, pictionary wheel, things to draw generator',
        category: 'Entertainment',
        options: ['Sun', 'House', 'Tree', 'Cat', 'Fish', 'Car', 'Rainbow', 'Pizza', 'Bicycle', 'Snowman', 'Rocket', 'Guitar', 'Butterfly', 'Castle', 'Umbrella', 'Ice Cream', 'Dragon', 'Robot', 'Volcano', 'Lighthouse', 'Pirate', 'Spider Web', 'Birthday Cake', 'Elephant', 'Airplane', 'Mermaid', 'Ghost', 'Hamburger', 'Camera', 'Cactus', 'Snail', 'Clock', 'Ladder', 'Telescope', 'Treasure Map', 'Hot Air Balloon', 'Octopus', 'Crown', 'Igloo', 'Tornado', 'Skateboard', 'Waterfall', 'Penguin', 'Dinosaur', 'Toothbrush', 'Glasses', 'Kite', 'Train', 'Mushroom', 'Bridge', 'Scarecrow', 'Unicorn', 'Anchor', 'Lightning', 'Popcorn', 'Sandcastle', 'Windmill', 'Campfire', 'Moon', 'Snowflake'],
        about: [
            {
                heading: 'How to play Pictionary with the word wheel',
                paragraphs: [
                    '1. Split into two teams. 2. The drawer spins the wheel and looks at the word without saying it. 3. Start a 60-second timer and draw while your team guesses. No letters, numbers or talking allowed. 4. A correct guess scores a point, then the other team takes a turn.',
                    'Tip: turn on "Exclude after spin" so the same word never comes up twice in one game.'
                ]
            },
            {
                heading: 'Words for every age',
                paragraphs: [
                    'The wheel mixes easy words like Sun, Cat and House with harder ones like Lighthouse, Telescope and Hot Air Balloon, so it works for kids and adults together.',
                    'Make it your own: add themed words for holidays, a school topic or inside jokes in Manual Entry. Teachers use it for vocabulary review, where students draw this week\'s words.'
                ]
            }
        ],
        faqs: [
            { q: 'How many Pictionary words are on the wheel?', a: '60 drawable words, from easy (Sun, Fish) to harder (Telescope, Hot Air Balloon). You can add as many of your own as you like.' },
            { q: 'Can I play online over a video call?', a: 'Yes. The drawer spins privately, then draws on a shared whiteboard or holds paper up to the camera.' },
            { q: 'How do I stop words repeating?', a: 'Turn on "Exclude after spin". Each word is removed after it is drawn.' },
            { q: 'Is it good for kids?', a: 'Yes. All the default words are family-friendly and easy enough for young players to draw.' }
        ]
    },
    {
        id: 'charades',
        title: 'Charades',
        h1: 'Charades Generator: Spin for Something to Act Out',
        seoTitle: 'Charades Generator: Random Charades Ideas Wheel | SpinWheelHub',
        description: 'Spin the charades generator for a random thing to act out: actions, animals, jobs and famous movies. Free charades ideas for parties, family night and kids.',
        definition: 'A Charades Generator is a spinning wheel of actions, animals, characters and movie titles that picks a random prompt for a player to act out silently.',
        keywords: 'charades generator, charades ideas, random charades, charades wheel, charades words',
        category: 'Entertainment',
        options: ['Brushing Teeth', 'Riding a Bike', 'Swimming', 'Playing Guitar', 'Baking a Cake', 'Taking a Selfie', 'Walking a Dog', 'Fishing', 'Surfing', 'Juggling', 'Climbing a Mountain', 'Driving a Car', 'Mowing the Lawn', 'Ice Skating', 'Bowling', 'Painting a Wall', 'Changing a Diaper', 'Doing Yoga', 'Boxing', 'Skydiving', 'Monkey', 'Kangaroo', 'Elephant', 'Penguin', 'Chicken', 'Snake', 'Frog', 'Cat', 'Superhero', 'Zombie', 'Robot', 'Pirate', 'Ballerina', 'Chef', 'Firefighter', 'Doctor', 'Magician', 'Astronaut', 'Cowboy', 'Mime', 'Titanic', 'Jaws', 'Frozen', 'The Lion King', 'Star Wars', 'Spider-Man', 'Harry Potter', 'Jurassic Park', 'Toy Story', 'Rocky', 'Playing Basketball', 'Hula Hooping', 'Building a Snowman', 'Opening a Present', 'Eating Spaghetti', 'Sneezing', 'Texting', 'Sleepwalking', 'Washing Dishes', 'Flying a Kite'],
        about: [
            {
                heading: 'How to play charades with the wheel',
                paragraphs: [
                    '1. Split into teams. 2. The actor spins the wheel and keeps the prompt secret. 3. Act it out without speaking or pointing at objects while your team guesses. 4. Score a point for each correct guess within the time limit, usually 60 seconds.',
                    'Classic signals help: hold up fingers for the number of words, tap your forearm for syllables, and make a "film camera" gesture for movie titles.'
                ]
            },
            {
                heading: 'Charades ideas for every crowd',
                paragraphs: [
                    'The wheel mixes everyday actions (Brushing Teeth), animals (Kangaroo), characters and jobs (Astronaut) and famous movies (Jurassic Park), so there is something easy and something tricky in every game.',
                    'Playing with young kids? Remove the movie titles and keep actions and animals. For a themed party, clear the wheel and add your own holiday or birthday prompts.'
                ]
            }
        ],
        faqs: [
            { q: 'What kind of charades ideas are on the wheel?', a: '60 prompts: everyday actions, animals, characters and jobs, and well-known movies.' },
            { q: 'Is the charades generator good for kids?', a: 'Yes. Every prompt is family-friendly. For young children, remove the movie titles and keep the actions and animals.' },
            { q: 'Can I add my own charades words?', a: 'Yes. Type them into Manual Entry, or Clear All first to play with only your own prompts.' },
            { q: 'How do I avoid repeats during a game?', a: 'Turn on "Exclude after spin" so each prompt is removed after it is acted out.' }
        ]
    }
];

// Helper to get template by ID (Slug)
export const getWheelTemplate = (slug: string): WheelTemplate | undefined => {
    return wheelTemplates.find(t => t.id === slug);
};

// Helper to get related wheels
export const getRelatedWheels = (currentSlug: string, limit: number = 6): WheelTemplate[] => {
    return wheelTemplates
        .filter(t => t.id !== currentSlug)
        .sort(() => 0.5 - Math.random()) // Simple shuffle
        .slice(0, limit);
};
