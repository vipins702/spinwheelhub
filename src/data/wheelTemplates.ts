
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
    about?: { heading: string; paragraphs: string[] }[]; // Unique on-page content (avoids duplicate pages). Supports [text](/path) internal links.
    faqs?: { q: string; a: string }[]; // Page-specific FAQ (replaces the generic one)
}

export const wheelTemplates: WheelTemplate[] = [
    // --- RELATIONSHIPS (New) ---
    {
        id: 'couple-activity',
        title: 'Date Night Ideas',
        h1: 'Date Night Wheel: Spin for a Date Idea',
        seoTitle: 'Date Night Wheel: Random Date Night Ideas | SpinWheelHub',
        description: 'Doing the same thing every Friday? Spin the date night wheel for a new idea, from stargazing and karaoke to cooking together. Add your own date ideas too.',
        definition: 'A Date Night Wheel is a spinner full of date ideas. Spin it and it picks what the two of you do tonight.',
        keywords: 'date night wheel, date night ideas, random date ideas, couple activity generator, date night generator',
        category: 'Life',
        options: ['Movie Night', 'Cook Together', 'Stargazing', 'Board Games', 'Massage Night', 'Walk in Park', 'Video Games', 'Fancy Dinner', 'Picnic', 'Karaoke'],
        about: [
            {
                heading: 'Stop asking "what do you want to do?"',
                paragraphs: [
                    'Most couples don\'t run out of date ideas. They just can\'t pick one. The wheel takes the decision off your hands: spin it, and whatever it lands on is tonight\'s plan.',
                    'It starts with ten ideas, some cheap and cozy (board games, a walk in the park) and some that take more planning (a fancy dinner, karaoke). Delete anything you don\'t enjoy and add your own favorites.'
                ]
            },
            {
                heading: 'Make it your own',
                paragraphs: [
                    'Each of you adds three ideas without telling the other. Spin, and one of you gets a surprise.',
                    'Make a "stay home" wheel for rainy weeks and a "go out" wheel for paydays. Turn on "Exclude after spin" to work through every idea before repeating one.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add our own date ideas?', a: 'Yes. Type them into Manual Entry and press Enter. Remove the ideas you don\'t like from the Options list.' },
            { q: 'What are some cheap date night ideas?', a: 'Stargazing, a picnic, cooking together, a walk in the park, board games and a movie night at home cost little or nothing.' },
            { q: 'How do we avoid the same date twice?', a: 'Turn on "Exclude after spin". Each idea is removed once it is picked until you reset the wheel.' },
            { q: 'Is the date night wheel free?', a: 'Yes. It\'s free, needs no account and works on your phone.' }
        ]
    },
    {
        id: 'who-pays-dinner',
        title: 'Who Pays for Dinner?',
        h1: 'Who Pays the Bill? Spin to Decide',
        seoTitle: 'Who Pays Wheel: Decide Who Pays the Bill | SpinWheelHub',
        description: 'Can\'t agree on who pays? Spin the who pays wheel at the table. Add everyone\'s name, or use options like "split 50/50", and let the wheel settle it.',
        definition: 'The Who Pays Wheel is a fun, random way for friends and couples to decide who covers the bill.',
        keywords: 'who pays wheel, who pays the bill, who pays for dinner, bill roulette, random payer',
        category: 'Life',
        options: ['You Pay', 'Partner Pays', 'Split 50/50', 'Dine and Dash (Joke)', 'Loser of Rock Paper Scissors Pays'],
        about: [
            {
                heading: 'Settle the bill with one spin',
                paragraphs: [
                    'The check arrives and everyone reaches for it, or nobody does. Spin the wheel and the answer is out of your hands.',
                    'The wheel comes with couple options like "Partner Pays" and "Split 50/50". For a group, hit Clear All and type in everyone\'s name instead. That\'s a game of credit card roulette, without anyone handing over a card.'
                ]
            },
            {
                heading: 'Keep it friendly',
                paragraphs: [
                    'Agree before you spin that the result is final. Set a limit if one person could end up with a big bill. And if the wheel lands on "Loser of Rock Paper Scissors Pays", you can play a round of [rock paper scissors](/rock-paper-scissors) right here.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I put my friends\' names on the wheel?', a: 'Yes. Use Clear All, then add each person\'s name in Manual Entry. The wheel picks who pays.' },
            { q: 'Is the who pays wheel fair?', a: 'Yes. Every option has the same size slice, so everyone has the same chance.' },
            { q: 'What is credit card roulette?', a: 'A game where a random person pays the whole bill. The wheel does the same thing, but you can also add options like splitting the bill.' },
            { q: 'Does it work at the restaurant table?', a: 'Yes. It works on any phone with no app to download.' }
        ]
    },

    // --- FOOD EXPANSION (New) ---
    {
        id: 'what-for-lunch',
        title: 'What to Eat for Lunch?',
        h1: 'What Should I Eat for Lunch? Spin the Lunch Wheel',
        seoTitle: 'Lunch Picker Wheel: What Should I Eat for Lunch? | SpinWheelHub',
        description: 'Not sure what to eat for lunch? Spin the lunch picker wheel for a quick idea: sandwich, tacos, sushi, soup and more. Add the places near your work.',
        definition: 'A Lunch Picker Wheel is a random lunch generator. Spin it and it picks what you eat today.',
        keywords: 'lunch picker wheel, what should i eat for lunch, random lunch generator, lunch ideas wheel, lunch spinner',
        category: 'Food',
        options: ['Sandwich', 'Salad', 'Leftovers', 'Burger', 'Tacos', 'Sushi', 'Pizza Slice', 'Soup', 'Wrap', 'Smoothie'],
        about: [
            {
                heading: 'A quick answer for your lunch break',
                paragraphs: [
                    'Lunch breaks are short. Spending ten of those minutes deciding what to eat is a waste. Spin the wheel and go.',
                    'The wheel has ten common lunches, from a sandwich or wrap to sushi or soup. Swap them for the cafes and food trucks near your office and the wheel picks where you walk to.'
                ]
            },
            {
                heading: 'Lunch for the whole team',
                paragraphs: [
                    'Ordering lunch for the office? Put up the wheel on a shared screen and spin once. Nobody has to be the person who chose the bad place.',
                    'Packing lunch at home? Add the meals you can make with what\'s in the fridge, and let the wheel plan the week.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add restaurants near me?', a: 'Yes. Add any place or meal in Manual Entry, and remove what you don\'t want.' },
            { q: 'How do I avoid eating the same lunch every day?', a: 'Turn on "Exclude after spin". Each lunch is removed once picked, so you get variety through the week.' },
            { q: 'Is there a dinner version?', a: 'Yes. Try the What\'s for Dinner wheel, also called the random food generator.' },
            { q: 'Is it free?', a: 'Yes. No sign-up and nothing to download.' }
        ]
    },
    {
        id: 'dessert-picker',
        title: 'Dessert Picker',
        h1: 'Random Dessert Generator: Spin for a Sweet Treat',
        seoTitle: 'Random Dessert Generator: Dessert Picker Wheel | SpinWheelHub',
        description: 'Craving something sweet but can\'t choose? Spin the dessert wheel to pick ice cream, cake, cookies, brownies or pie. Add your own favorite desserts.',
        definition: 'The Dessert Picker Wheel is a random dessert generator that picks a sweet treat for you.',
        keywords: 'random dessert generator, dessert picker, dessert wheel, what dessert should i make, sweet treat wheel',
        category: 'Food',
        options: ['Ice Cream', 'Chocolate Cake', 'Cookies', 'Fruit Salad', 'Donuts', 'Cheesecake', 'Brownies', 'Pie', 'Yogurt', 'Candy'],
        about: [
            {
                heading: 'Let the wheel pick dessert',
                paragraphs: [
                    'Dinner is done and someone says "dessert?". Spin the wheel and you have an answer before the plates are cleared.',
                    'There are ten treats to start with, from ice cream and brownies to fruit salad and yogurt for something lighter.'
                ]
            },
            {
                heading: 'What to bake this weekend',
                paragraphs: [
                    'Like to bake? Fill the wheel with recipes you want to try, like lemon bars, banana bread or tiramisu, and spin when it\'s time to turn the oven on.',
                    'Kids love this one. Let them spin for the weekend treat, and they\'re less likely to argue with the wheel than with you.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add my own desserts?', a: 'Yes. Use Manual Entry to add any dessert or recipe, and remove the ones you don\'t like.' },
            { q: 'Can I use it to pick a recipe to bake?', a: 'Yes. Fill the wheel with recipes you want to try and spin to choose one.' },
            { q: 'Is every dessert equally likely?', a: 'Yes. Each slice is the same size, so every dessert has the same chance.' },
            { q: 'Is it free?', a: 'Yes. It\'s free and works on any phone or computer.' }
        ]
    },
    {
        id: 'healthy-snack',
        title: 'Healthy Snack Generator',
        h1: 'Healthy Snack Generator: Spin for a Snack Idea',
        seoTitle: 'Healthy Snack Generator: Random Snack Ideas | SpinWheelHub',
        description: 'Bored of the same snacks? Spin the healthy snack wheel for an idea like apple and peanut butter, Greek yogurt, almonds or hummus. Add your own.',
        definition: 'A Healthy Snack Generator is a wheel of healthy snack ideas that picks one at random.',
        keywords: 'healthy snack generator, healthy snack ideas, snack wheel, random snack generator, healthy snack picker',
        category: 'Food',
        options: ['Apple & Peanut Butter', 'Greek Yogurt', 'Almonds', 'Carrots & Hummus', 'Protein Bar', 'Banana', 'Hard Boiled Egg', 'Edamame', 'Berries'],
        about: [
            {
                heading: 'Break the snack rut',
                paragraphs: [
                    'When you\'re hungry at 3pm, the easiest choice usually wins, and it\'s rarely the healthy one. Keep this wheel open and let it choose from snacks you already have.',
                    'The wheel starts with nine simple ideas: apple and peanut butter, Greek yogurt, almonds, carrots and hummus, a protein bar, a banana, a hard-boiled egg, edamame and berries.'
                ]
            },
            {
                heading: 'Snacks for kids and lunchboxes',
                paragraphs: [
                    'Let kids spin for their after-school snack. They get to choose, and every option is one you\'re happy with.',
                    'Packing lunchboxes for the week? Turn on "Exclude after spin" and spin five times for five different snacks.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add my own snacks?', a: 'Yes. Add any snack in Manual Entry and remove the ones you don\'t have at home.' },
            { q: 'Is this nutrition advice?', a: 'No. It\'s a list of common snack ideas to help you choose. Talk to a doctor or dietitian about your own diet.' },
            { q: 'How do I get a different snack each day?', a: 'Turn on "Exclude after spin" so a snack is removed once it\'s picked.' },
            { q: 'Is it free?', a: 'Yes. No account, no download.' }
        ]
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
                    'Both give a 50/50 answer. A coin flip only ever has two sides, while the yes or no wheel can be customized with extra answers, shows a history of your recent spins, and can remove an answer after it is picked. If you prefer heads or tails, try our [coin flip wheel](/wheel/coin-flip).'
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
        h1: 'Random Number 1-10: Pick a Number from 1 to 10',
        seoTitle: 'Random Number 1-10: Spin a Number Wheel | SpinWheelHub',
        description: 'Pick a random number from 1 to 10 with one spin. Use it for games, turn order, guessing games and classroom activities. Free, with no sign-up.',
        definition: 'The Random Number Wheel (1-10) is a spinner with ten equal slices that picks one whole number from 1 to 10.',
        keywords: 'random number 1-10, pick a number 1-10, number picker wheel, random number generator 1-10, number spinner',
        category: 'Utility',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        about: [
            {
                heading: 'Pick a number between 1 and 10',
                paragraphs: [
                    'The wheel has ten equal slices numbered 1 to 10. Spin it and each number has a 1-in-10 chance. It\'s the same as a random number generator, but everyone can watch the result happen.',
                    'Need a different range, like 1 to 100? Use the [random number wheel](/number-wheel), where you can set any minimum and maximum.'
                ]
            },
            {
                heading: 'Ways to use it',
                paragraphs: [
                    'Guessing games: "I\'m thinking of a number between 1 and 10." Let the wheel be the one thinking.',
                    'Turn order and groups: number your players, spin, and the result goes first. Teachers use it to call on table numbers or pick a question from a numbered list.',
                    'Rate it: spin for a random score in party games, or pick a number of push-ups for a workout challenge.'
                ]
            }
        ],
        faqs: [
            { q: 'Is every number from 1 to 10 equally likely?', a: 'Yes. All ten slices are the same size, so each number has a 10% chance.' },
            { q: 'Can I pick numbers in a different range?', a: 'Yes. The random number wheel lets you set any range, like 1 to 100 or 50 to 75.' },
            { q: 'Can I stop the same number coming up twice?', a: 'Turn on "Exclude after spin" and each number is removed after it\'s picked.' },
            { q: 'Is 0 included?', a: 'No, the wheel goes from 1 to 10. Add 0 in Manual Entry if you need it.' }
        ]
    },
    {
        id: 'coin-flip',
        title: 'Heads or Tails (Coin Flip)',
        h1: 'Flip a Coin Online',
        seoTitle: 'Heads or Tails Wheel | Coin Flip Simulator | SpinWheelHub',
        description: 'Flip a coin online with the heads or tails wheel. A fair 50/50 coin toss for settling bets, picking who goes first or making a quick choice.',
        definition: 'The Heads or Tails Wheel works like a real coin toss: two equal halves, so Heads and Tails each have a 50% chance.',
        keywords: 'coin flip, heads or tails, coin toss, flip a coin, flip a coin online, coin flip simulator',
        category: 'Utility',
        options: ['Heads', 'Tails'],
        about: [
            {
                heading: 'Flip a coin online',
                paragraphs: [
                    'No coin in your pocket? Spin the wheel instead. It has two equal halves, Heads and Tails, so the result is a fair 50/50, just like a real coin toss.',
                    'Call it before you spin. Then everyone can watch the wheel slow down, which makes it harder to argue with than a coin that rolled under the couch.'
                ]
            },
            {
                heading: 'When to flip a coin',
                paragraphs: [
                    'Settling who goes first in a game, who gets the front seat, or which of two movies to watch. Sports teams use a coin toss to pick ends or who kicks off.',
                    'A useful trick: if the coin lands and you feel disappointed, you already know which option you wanted.'
                ]
            }
        ],
        faqs: [
            { q: 'Is the coin flip really 50/50?', a: 'Yes. Heads and Tails each take up exactly half the wheel, so each has a 50% chance on every spin.' },
            { q: 'Does the last result affect the next one?', a: 'No. Each spin is independent. Getting Heads three times in a row doesn\'t make Tails more likely next time.' },
            { q: 'Can I flip for more than two options?', a: 'Yes. Add more options in Manual Entry, or use the yes or no wheel or a custom wheel.' },
            { q: 'Is it free?', a: 'Yes. Flip as many times as you like.' }
        ]
    },
    {
        id: 'dice-roll',
        title: 'Dice Roll (D6)',
        h1: 'Roll a Die (D6) Online',
        seoTitle: 'Roll a Die Wheel | Virtual Dice Roller | SpinWheelHub',
        description: 'Roll a six-sided die online. Lost the dice for your board game? Spin the D6 wheel for a fair 1 to 6. Free, works on any phone or computer.',
        definition: 'A Virtual Dice Roller Wheel works like a standard six-sided die (D6): six equal slices, so each number from 1 to 6 has the same chance.',
        keywords: 'dice roll, roll a die, dice roller, virtual dice, d6 roller, roll dice online',
        category: 'Utility',
        options: ['1', '2', '3', '4', '5', '6'],
        about: [
            {
                heading: 'Roll a die online',
                paragraphs: [
                    'Board game night, and the dice have gone missing? Spin this wheel instead. It has six equal slices, so each number from 1 to 6 has a 1-in-6 chance, the same as a fair die.',
                    'Need two dice? Spin twice and add the numbers together. For bigger ranges, try the [random number wheel](/number-wheel).'
                ]
            },
            {
                heading: 'Games you can play',
                paragraphs: [
                    'Board games like Monopoly, Ludo, Snakes and Ladders and Yahtzee all use six-sided dice.',
                    'For tabletop games like D&D, this wheel works as a D6. Players who need a D20 or other dice can make one with the [custom wheel](/custom-wheel-of-names) by adding the numbers they need.'
                ]
            }
        ],
        faqs: [
            { q: 'Is the online dice roll fair?', a: 'Yes. All six slices are the same size, so each number has a 1-in-6 chance, just like a real die.' },
            { q: 'Can I roll two dice?', a: 'Spin twice and add the two results. Don\'t use a 2 to 12 number wheel instead: with real dice, 7 comes up far more often than 2 or 12.' },
            { q: 'Can I make a D20?', a: 'Yes. Open the custom wheel or the random number wheel and set it to 1 to 20.' },
            { q: 'Is it free?', a: 'Yes. Roll as often as you like.' }
        ]
    },
    {
        id: 'raffle-number-1-100',
        title: 'Raffle Number (1-100)',
        h1: 'Raffle Wheel: Draw a Winning Number (1-100)',
        seoTitle: 'Raffle Wheel: Random Raffle Number Generator 1-100 | SpinWheelHub',
        description: 'Draw a raffle winner with the raffle wheel. Spin 100 numbered tickets and pick a winner everyone can see. Remove tickets that weren\'t sold.',
        definition: 'The Raffle Wheel is a raffle number generator: a wheel of tickets numbered 1 to 100 that picks one winning number at random.',
        keywords: 'raffle wheel, raffle generator, raffle number generator, random number 1-100, raffle picker',
        category: 'Utility',
        options: Array.from({ length: 100 }, (_, i) => (i + 1).toString()),
        about: [
            {
                heading: 'Draw a raffle winner on screen',
                paragraphs: [
                    'Selling numbered tickets for a school fundraiser, an office party or a club night? Put the wheel up on a screen and spin. Everyone sees the draw, so nobody can say the winner was picked by hand.',
                    'The wheel has tickets 1 to 100. If you sold fewer, delete the unsold numbers from the Options list, or use the [random number wheel](/number-wheel) and set the range to match.'
                ]
            },
            {
                heading: 'Drawing more than one prize',
                paragraphs: [
                    'Turn on "Exclude after spin". Each winning ticket is removed after it\'s drawn, so the same ticket can\'t win twice. Draw the smallest prize first and the grand prize last to keep people around until the end.',
                    'Running an online giveaway instead? The [giveaway picker](/giveaway) records the winner and gives you a link to share as proof.'
                ]
            }
        ],
        faqs: [
            { q: 'How do I draw a raffle with fewer than 100 tickets?', a: 'Remove the unsold numbers from the Options list, or use the random number wheel and set the range, for example 1 to 60.' },
            { q: 'Can the same ticket win twice?', a: 'Not if you turn on "Exclude after spin". Each winning number is removed after it\'s drawn.' },
            { q: 'Is the raffle draw fair?', a: 'Yes. Every ticket has the same size slice, so each one has the same chance.' },
            { q: 'Can I use names instead of numbers?', a: 'Yes. Clear the wheel and add each entrant\'s name, or use the custom wheel of names.' }
        ]
    },

    // --- GAMING (Roblox/Fortnite) ---
    {
        id: 'roblox-game-picker',
        title: 'What Roblox Game to Play?',
        h1: 'Random Roblox Game: Spin for Something to Play',
        seoTitle: 'Random Roblox Game Picker Wheel | SpinWheelHub',
        description: 'Don\'t know what to play on Roblox? Spin the wheel for a random Roblox game like Blox Fruits, Brookhaven, Adopt Me! or Doors. Add your own favorites.',
        definition: 'The Roblox Game Picker is a fan-made wheel of popular Roblox games that picks one for you to play next.',
        keywords: 'random roblox game, roblox game picker, what to play on roblox, roblox wheel, roblox spinner',
        category: 'Gaming',
        options: ['Blox Fruits', 'Brookhaven RP', 'Adopt Me!', 'Tower of Hell', 'Pet Simulator 99', 'Murder Mystery 2', 'Royale High', 'BedWars', 'Doors', 'MeepCity', 'Jailbreak', 'Piggy'],
        about: [
            {
                heading: 'Pick a random Roblox game',
                paragraphs: [
                    'Roblox has millions of games, which is exactly why it\'s hard to choose one. Spin the wheel and play whatever it lands on.',
                    'The wheel starts with twelve well-known games: Blox Fruits, Brookhaven RP, Adopt Me!, Tower of Hell, Pet Simulator 99, Murder Mystery 2, Royale High, BedWars, Doors, MeepCity, Jailbreak and Piggy. Popular games change all the time, so add the ones your friends are playing right now.'
                ]
            },
            {
                heading: 'Play with friends',
                paragraphs: [
                    'Everyone in the group adds one game, then you spin. The wheel decides what the whole server plays next.',
                    'Streaming? Let chat suggest games, put them on the wheel and spin live.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add my own Roblox games?', a: 'Yes. Type any game name into Manual Entry and remove games you don\'t play.' },
            { q: 'Is this made by Roblox?', a: 'No. It\'s a free fan-made tool and isn\'t connected to Roblox Corporation.' },
            { q: 'Does it open the game for me?', a: 'No. It only picks a name. Search for the game in Roblox to play it.' },
            { q: 'How do we avoid playing the same game twice?', a: 'Turn on "Exclude after spin" so each game is removed once picked.' }
        ]
    },
    {
        id: 'fortnite-drop',
        title: 'Fortnite Drop Location',
        h1: 'Fortnite Wheel: Where Should We Land?',
        seoTitle: 'Fortnite Wheel: Random Drop Location Picker | SpinWheelHub',
        description: 'Can\'t agree where to drop? Spin the Fortnite wheel for a random landing spot. Edit the list to match the current map and play a new spot each match.',
        definition: 'The Fortnite Drop Location Wheel picks a random named location to land at, so every match starts somewhere different.',
        keywords: 'fortnite wheel, where to land fortnite, fortnite drop picker, random fortnite drop, fortnite drop spot generator',
        category: 'Gaming',
        options: ['Tilted Towers', 'Pleasant Park', 'Retail Row', 'Salty Springs', 'Lazy Lake', 'Misty Meadows', 'Risky Reels', 'Craggy Cliffs', 'Steamy Stacks', 'Holly Hedges'],
        about: [
            {
                heading: 'Let the wheel pick your drop',
                paragraphs: [
                    'Landing at the same spot every game gets old. Spin before the bus leaves and drop wherever the wheel says, even if it\'s a hot drop.',
                    'The wheel starts with classic named locations from Fortnite\'s history, like Tilted Towers, Pleasant Park and Retail Row. The map changes every season, so use Clear All and add the locations on the current map.'
                ]
            },
            {
                heading: 'Challenges to try',
                paragraphs: [
                    'Squad rule: whoever spins picks the drop, no arguing.',
                    'Make a second wheel of loadout rules, like "grey guns only" or "no building", and spin both for a custom challenge.'
                ]
            }
        ],
        faqs: [
            { q: 'Are these the current Fortnite locations?', a: 'The default list has classic named locations. Fortnite changes the map each season, so edit the list to match the map you\'re playing.' },
            { q: 'Can I add new landing spots?', a: 'Yes. Add any location in Manual Entry and remove old ones from the Options list.' },
            { q: 'Is this an official Fortnite tool?', a: 'No. It\'s a free fan-made tool and isn\'t connected to Epic Games.' },
            { q: 'How do we land somewhere new every match?', a: 'Turn on "Exclude after spin" and each spot is removed after you land there.' }
        ]
    },
    {
        id: 'pokemon-type',
        title: 'Random Pokemon Type',
        h1: 'Pokemon Type Wheel: Spin a Random Type',
        seoTitle: 'Pokemon Type Wheel: Random Type Generator (All 18) | SpinWheelHub',
        description: 'Spin the Pokemon type wheel to get one of all 18 types, from Normal to Fairy. Use it for monotype runs, Nuzlocke rules and team-building challenges.',
        definition: 'The Pokemon Type Wheel has all 18 Pokemon types in equal slices and picks one at random.',
        keywords: 'pokemon type wheel, random pokemon type, pokemon type generator, monotype challenge, nuzlocke type',
        category: 'Gaming',
        options: ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'],
        about: [
            {
                heading: 'Spin one of the 18 types',
                paragraphs: [
                    'The wheel has all 18 types: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dark, Dragon, Steel and Fairy. Each has an equal slice.',
                    'Playing an older game? Dark and Steel arrived in Gen 2 and Fairy in Gen 6. Remove them from the Options list for a Gen 1 run.'
                ]
            },
            {
                heading: 'Challenges that use a random type',
                paragraphs: [
                    'Monotype run: spin once and beat the game using only Pokemon of that type.',
                    'Nuzlocke twist: spin a type before each gym and only use Pokemon of that type for the fight.',
                    'Want a random Pokemon instead of a type? Use the [random Pokemon generator](/wheel/random-pokemon), which has all 251 Pokemon from Gen 1 and Gen 2.'
                ]
            }
        ],
        faqs: [
            { q: 'How many Pokemon types are there?', a: '18 in the current games. All of them are on this wheel.' },
            { q: 'Can I remove types for older games?', a: 'Yes. Remove Dark, Steel and Fairy from the Options list for a Gen 1 challenge.' },
            { q: 'What is a monotype challenge?', a: 'A playthrough where every Pokemon on your team shares one type. Spin the wheel to choose which type.' },
            { q: 'Is this an official Pokemon tool?', a: 'No. It\'s a free fan-made tool and isn\'t connected to Nintendo, Game Freak or The Pokemon Company.' }
        ]
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
                    'Drawing and trivia: spin and draw it from memory, or name its type and evolution before you look it up. Want a type instead of a Pokemon? Use the [Pokemon type wheel](/wheel/pokemon-type).'
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
        h1: 'Truth or Dare Wheel: Spin for Truth or Dare',
        seoTitle: 'Truth or Dare Wheel: Spin Truth or Dare Online | SpinWheelHub',
        description: 'Play truth or dare with a wheel. Spin to get Truth or Dare, then use our list of clean questions and dares. Great for sleepovers and parties.',
        definition: 'The Truth or Dare Wheel is a two-slice spinner that decides whether you answer a truth or do a dare.',
        keywords: 'truth or dare wheel, truth or dare generator, truth or dare online, truth or dare questions, spin the wheel truth or dare',
        category: 'Entertainment',
        options: ['Truth', 'Dare'],
        about: [
            {
                heading: 'How to play truth or dare with the wheel',
                paragraphs: [
                    'Sit in a circle. On your turn, spin the wheel. If it lands on Truth, answer a question honestly. If it lands on Dare, do the challenge. Then pass the phone to the next person.',
                    'Want no choice at all? Clear the wheel and add your own list of truths and dares, then spin for the exact one you have to do.'
                ]
            },
            {
                heading: 'Clean truth questions to get started',
                paragraphs: [
                    'What\'s the most embarrassing thing you\'ve done at school or work? Who was your first crush? What\'s a weird food you secretly love? What\'s the last thing you searched for on your phone? If you could swap lives with someone here for a day, who would it be?'
                ]
            },
            {
                heading: 'Fun dares for any age',
                paragraphs: [
                    'Talk in an accent until your next turn. Do your best impression of someone in the room. Sing the chorus of a song chosen by the group. Let someone post a silly emoji in your group chat. Do ten jumping jacks while saying the alphabet.'
                ]
            }
        ],
        faqs: [
            { q: 'How do you play truth or dare?', a: 'Players take turns. Each person spins: Truth means answering a question honestly, Dare means doing a challenge chosen by the group.' },
            { q: 'Can I add my own truths and dares?', a: 'Yes. Use Clear All, then add your own questions and dares in Manual Entry. The wheel picks one at random.' },
            { q: 'Is this OK for kids?', a: 'Yes. The wheel only shows Truth or Dare, and the example questions and dares on this page are family-friendly.' },
            { q: 'What if someone won\'t do a dare?', a: 'Agree on a rule before you start, like answering two truths instead, or skipping their next turn.' }
        ]
    },
    {
        id: 'twister-moves',
        title: 'Twister Spinner',
        h1: 'Twister Spinner Online: Spin for Your Next Move',
        seoTitle: 'Twister Spinner Online: Free Twister Wheel | SpinWheelHub',
        description: 'Lost the Twister spinner or the arrow broke? Use this online Twister spinner instead. Spin for left or right, hand or foot, and red, blue, yellow or green.',
        definition: 'The Twister Spinner is an online replacement for the spinner in the game Twister. It picks a hand or foot and a color for the next move.',
        keywords: 'twister spinner, twister spinner online, twister wheel, online twister spinner, twister game spinner',
        category: 'Entertainment',
        options: ['Left Hand Green', 'Right Hand Green', 'Left Foot Green', 'Right Foot Green', 'Left Hand Red', 'Right Hand Red', 'Left Foot Red', 'Right Foot Red', 'Left Hand Yellow', 'Right Hand Yellow', 'Left Foot Yellow', 'Right Foot Yellow', 'Left Hand Blue', 'Right Hand Blue', 'Left Foot Blue', 'Right Foot Blue'],
        about: [
            {
                heading: 'Play Twister without the spinner',
                paragraphs: [
                    'The mat is out, everyone has their socks off, and the spinner is missing. Open this page and you\'re ready. The wheel has all 16 moves: left or right, hand or foot, on red, blue, yellow or green.',
                    'Give the phone to the person not playing. They spin and call out the move, like "Right foot, red!"'
                ]
            },
            {
                heading: 'Twister rules in short',
                paragraphs: [
                    'Players start at opposite ends of the mat. The spinner calls a move and every player has to do it. If a hand or foot is already on that color, move it to a different circle of the same color.',
                    'You\'re out if you fall, or if your elbow or knee touches the mat. The last player standing wins.'
                ]
            }
        ],
        faqs: [
            { q: 'Does this work like the real Twister spinner?', a: 'Yes. It has the same 16 moves: left or right, hand or foot, and four colors.' },
            { q: 'Who spins in Twister?', a: 'Usually a player who is out, or a friend who isn\'t playing. They spin and call out each move.' },
            { q: 'Can I play Twister without a mat?', a: 'You need colored spots. Some people use colored paper taped to the floor in four rows.' },
            { q: 'Is it free?', a: 'Yes. It works on any phone, so you can call moves from across the room.' }
        ]
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
                    'Try our [lunch picker](/wheel/what-for-lunch), the [dessert picker](/wheel/dessert-picker) for something sweet, or the [fast food wheel](/wheel/fast-food) when you just want a drive-thru. Stuck on who pays the bill? There\'s a [who pays wheel](/wheel/who-pays-dinner) for that too.'
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
        h1: 'Fast Food Wheel: Pick Where to Eat',
        seoTitle: 'Fast Food Wheel: Random Fast Food Picker | SpinWheelHub',
        description: 'Can\'t agree on a drive-thru? Spin the fast food wheel to pick between McDonald\'s, Taco Bell, Chick-fil-A, Wendy\'s and more. Add the places near you.',
        definition: 'The Fast Food Wheel picks a random fast food restaurant, so the car can stop arguing and start driving.',
        keywords: 'fast food wheel, fast food picker, random fast food generator, where should i eat, random restaurant picker',
        category: 'Food',
        options: ['McDonald\'s', 'Burger King', 'KFC', 'Subway', 'Pizza Hut', 'Domino\'s', 'Taco Bell', 'Wendy\'s', 'Chick-fil-A', 'Popeyes', 'Chipotle', 'Starbucks'],
        about: [
            {
                heading: 'End the drive-thru debate',
                paragraphs: [
                    'Everyone is hungry, nobody will pick, and you\'ve driven past three places already. Hand the phone to whoever is in the passenger seat and spin.',
                    'The wheel has twelve big chains, from McDonald\'s and Burger King to Chipotle and Chick-fil-A. Remove the ones that aren\'t near you and add your local spots.'
                ]
            },
            {
                heading: 'Tips',
                paragraphs: [
                    'Want a quick meal at home instead? Try the [What\'s for Dinner wheel](/wheel/what-for-dinner). Just need something sweet? There\'s a [dessert picker](/wheel/dessert-picker) too.',
                    'Turn on "Exclude after spin" if you eat out often and want somewhere different each time.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add restaurants near me?', a: 'Yes. Type any restaurant into Manual Entry and remove chains you don\'t have nearby.' },
            { q: 'Is the fast food wheel random?', a: 'Yes. Each restaurant has the same size slice, so each has the same chance.' },
            { q: 'Does it show restaurant locations?', a: 'No. It only picks a name. Use your maps app to find the nearest one.' },
            { q: 'Is this sponsored by any restaurant?', a: 'No. The restaurants are just popular choices. We have no connection with any of them.' }
        ]
    },

    // --- LIFE DECISIONS ---
    {
        id: 'weekend-activity',
        title: 'Weekend Activity',
        h1: 'Random Activity Generator: What to Do This Weekend',
        seoTitle: 'Random Activity Generator: Things to Do Wheel | SpinWheelHub',
        description: 'Bored and out of ideas? Spin the random activity generator for something to do this weekend: hiking, a museum, baking, a movie marathon and more.',
        definition: 'The Weekend Activity Wheel is a random activity generator that picks something to do when you\'re bored.',
        keywords: 'random activity generator, things to do when bored, weekend activity ideas, what to do this weekend, activity wheel',
        category: 'Life',
        options: ['Hiking', 'Movie Marathon', 'Visit Museum', 'Try New Restaurant', 'Clean House', 'Read a Book', 'Video Games', 'Visit Friends', 'Baking', 'Nap'],
        about: [
            {
                heading: 'Bored? Spin for something to do',
                paragraphs: [
                    'It\'s Saturday, you have free time, and you\'ve spent an hour scrolling. Spin the wheel and do what it says.',
                    'The wheel has ten ideas, some active (hiking, visiting friends) and some lazy (a nap, a movie marathon). Yes, "Clean House" is on there. The wheel has spoken.'
                ]
            },
            {
                heading: 'Make a better list',
                paragraphs: [
                    'Write down things you keep saying you\'ll do "one day": a new walking trail, a cooking class, the museum downtown. Put them on the wheel and let it hold you to it.',
                    'Families can make a kids\' activity wheel with things like a park trip, crafts, a fort-building day and a board game afternoon.'
                ]
            }
        ],
        faqs: [
            { q: 'Can I add my own activities?', a: 'Yes. Add anything in Manual Entry and remove ideas you don\'t like.' },
            { q: 'What are some things to do when bored at home?', a: 'Bake something, read a book, start a puzzle, have a movie marathon, call a friend or reorganize one room.' },
            { q: 'How do I avoid repeating activities?', a: 'Turn on "Exclude after spin" so each activity is removed after it\'s picked.' },
            { q: 'Is it free?', a: 'Yes. No account or download needed.' }
        ]
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
                    'Classrooms and trivia: assign each student a random country for a project, or use it as a quick quiz round. For the US only, use the [random state generator](/wheel/random-state).'
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
                    'Games: play "license plate bingo", trivia nights or "name three things from this state" with friends. Want the whole world? Spin the [random country generator](/wheel/random-country).'
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
                    'Playing with friends? Turn on "Exclude after spin" so two players never end up with the same team. Football fan? Try the [random NFL team generator](/wheel/nfl-team).'
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
                    'Drafting with friends? Turn on "Exclude after spin" so each team can only be picked once. Basketball fan? Try the [random NBA team generator](/wheel/nba-team).'
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
                    'Make it your own: add themed words for holidays, a school topic or inside jokes in Manual Entry. Teachers use it for vocabulary review, where students draw this week\'s words. Prefer acting to drawing? Try the [charades generator](/wheel/charades).'
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
                    'Playing with young kids? Remove the movie titles and keep actions and animals. For a themed party, clear the wheel and add your own holiday or birthday prompts. Prefer drawing? Try the [Pictionary word generator](/wheel/pictionary-words).'
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

// Helper to get related wheels: same category first, then the wheels that follow in the list.
// Deterministic so each page always links to the same wheels (stable internal links for crawlers).
export const getRelatedWheels = (currentSlug: string, limit: number = 6): WheelTemplate[] => {
    const index = wheelTemplates.findIndex(t => t.id === currentSlug);
    const current = wheelTemplates[index];
    const rotated = index >= 0
        ? [...wheelTemplates.slice(index + 1), ...wheelTemplates.slice(0, index)]
        : wheelTemplates;
    const sameCategory = rotated.filter(t => current && t.category === current.category);
    const others = rotated.filter(t => !current || t.category !== current.category);
    return [...sameCategory, ...others].slice(0, limit);
};
