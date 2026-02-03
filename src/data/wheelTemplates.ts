
export interface WheelTemplate {
    id: string; // The URL slug
    title: string;
    h1?: string; // Action-oriented H1
    seoTitle: string;
    description: string;
    definition?: string; // For SEO/LLM Snippets
    keywords: string;
    category: 'Utility' | 'Entertainment' | 'Gaming' | 'Life' | 'Food';
    options: string[];
    colors?: string[]; // Optional override
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
        title: 'Yes or No Generator',
        h1: 'Yes or No? Spin the Wheel',
        seoTitle: 'Yes or No Wheel | Random Yes/No Generator | SpinWheelMaster',
        description: 'Need a quick decision? Spin the Yes or No Wheel! Perfect for random answers, settling arguments, and making fast choices. 100% random.',
        definition: 'A Yes or No Wheel is a binary decision maker that provides a random "Yes" or "No" answer, acting as a digital coin flip.',
        keywords: 'yes or no wheel, yes no generator, yes or no spinner, random decision, decision maker',
        category: 'Utility',
        options: ['Yes', 'No']
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
        h1: 'Decide What\'s for Dinner Instantly',
        seoTitle: 'Dinner Picker Wheel | Random Food Generator',
        description: 'Solve the "What are we eating?" argument instantly. Spin for Pizza, Sushi, Tacos, and more.',
        definition: 'A Dinner Picker Wheel helps couples and families decide on a meal type by randomly selecting from options like Pizza, Sushi, or Burgers.',
        keywords: 'dinner picker, food wheel, what to eat, meal generator',
        category: 'Food',
        options: ['Pizza', 'Sushi', 'Burgers', 'Tacos', 'Pasta', 'Salad', 'Steak', 'Chinese', 'Indian Curry', 'Thai', 'Sandwiches', 'BBQ', 'Fried Chicken', 'Soup']
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
