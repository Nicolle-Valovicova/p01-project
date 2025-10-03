const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = ()
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which Cookie is the first playable character you receive at the start of the game?'
        Choice1: 'GingerBread',
        Choice2: 'Stardust',
        Choice3: 'Kiwi',
        Choice4: 'Donut',
        answer: 2,
    },
    {
        question: 'Who owns Cookie run: Kingdom?'
        Choice1: 'TevBlock',
        Choice2: 'Cookie run',
        Choice3: 'Devsisters',
        Choice4: 'Remba',
        answer: 3,
    },
    {
    question: 'When did the game come out?',
    Choice1: 'January 2021',
    Choice2: 'October 2007',
    Choice3: 'September 2024',
    Choice4: 'April 2003',
    answer: 1,
},
{
    question: 'What type of Cookie is GingerBrave?',
    Choice1: 'Bomber',
    Choice2: 'Defense',
    Choice3: 'Support',
    Choice4: 'Magic',
    answer: 1,
},
{
    question: 'How many versions of the game are there?',
    Choice1: '2',
    Choice2: '1',
    Choice3: '4',
    Choice4: '6',
    answer: 1,
},
{
    question: 'If there is a different version of the game then what is it?',
    Choice1: 'Cookie run: Kingdom CN',
    Choice2: 'There is no other version',
    Choice3: 'Cookie run: Kingdom NK',
    Choice4: 'There is just the global one',
    answer: 1,
},
{
    question: 'What is the other company?',
    Choice1: 'Tencent Games (China)',
    Choice2: 'There is no other company',
    Choice3: 'Mizaki',
    Choice4: 'Climana',
    answer: 1,
},
{
    question: 'How many cookie types are there?',
    Choice1: '4',
    Choice2: '12',
    Choice3: '8',
    Choice4: '16',
    answer: 1,
},
{
    question: 'What element would a cookie like Pure Vanilla be?',
    Choice1: 'Light',
    Choice2: 'Darkness',
    Choice3: 'Water',
    Choice4: 'Lighting',
    answer: 1,
},
{
    question: 'How many episodes are there?',
    Choice1: '12 episodes of Crispia and 14 episodes of Beast-Yeast, totaling 26.',
    Choice2: '20 episodes of Crispia and 12 episodes of Beast-Yeast, totaling 32.',
    Choice3: '35 episodes of Crispia and 18 episodes of Beast-Yeast, totaling 53.',
    Choice4: '18 episodes of Crispia and 10 episodes of Beast-Yeast, totaling 28.',
    answer: 4,
},
{
    question: 'What would be the name of this cookie? (picture of Shadow milk cookie)',
    Choice1: 'Deceit',
    Choice2: 'Blue Jester',
    Choice3: 'Shadow milk cookie',
    Choice4: 'Corruptor',
    answer: 3,
},
{
    question: 'Which are the names of the Ancient cookies?',
    Choice1: 'Pure Vanilla Cookie, Hollyberry Cookie, Dark Cacao Cookie, Golden Cheese Cookie, White Lily Cookie',
    Choice2: 'Burning Spice Cookie,Eternal Sugar Cookie,Mystic Flour Cookie,Shadow Milk Cookie,Silent Salt Cookie',
    Choice3: 'There are no Ancients',
    Choice4: 'Butter cookie, Apple Cookie, Boba Cookie, Coral Cookie',
    answer: 1,
},
{
    question: 'How many Beasts are there?',
    Choice1: '2',
    Choice2: '6',
    Choice3: '8',
    Choice4: '5',
    answer: 4,
},
{
    question: 'Does Cookie run: Kingdom do April fools updates?',
    Choice1: 'They only did it once',
    Choice2: 'No',
    Choice3: 'Yes but only once every 2 years',
    Choice4: 'Yes, each year',
    answer: 4,
},
{
    question: 'What is the maximum number of Cookies you can deploy in a single team for most game modes?',
    Choice1: '6',
    Choice2: '5',
    Choice3: '4',
    Choice4: '8',
    answer: 2,
},
{
    question: 'Aside from pulling them from the Gacha, what is the primary way to obtain a Cookie\'s Soulstones to unlock them?',
    Choice1: 'Chests',
    Choice2: 'Rewards',
    Choice3: 'The Mileage Sho',
    Choice4: 'Buying with real money',
    answer: 3,
},
{
    question: 'Which game mode allows you to set defensive teams and battle other players\' teams for rewards?',
    Choice1: 'Kingdom Arena',
    Choice2: 'Battle mode',
    Choice3: 'Guild battles',
    Choice4: 'PvP Colosseum',
    answer: 1,
},
{
    question: 'How to make your cookies stronger?',
    Choice1: 'Leveling Up, Upgrading Skills, Promotion, Ascension, Toppings, Treasures',
    Choice2: 'Level up building, Buy more cookie dough, Train them',
    Choice3: 'Buying gems, Watching ads, Completing quests',
    Choice4: 'Joining guilds, Participating in events, Buying costumes',
    answer: 1,
},
{
    question: 'How long do events usually last?',
    Choice1: '26 days',
    Choice2: '30 days',
    Choice3: '45 days',
    Choice4: '15 days',
    answer: 2,
},
{
    question: 'Which Cookie is known as the leader of the Dark Enchantress\'s army?',
    Choice1: 'Pomegranate Cookie ',
    Choice2: 'Licorice Cookie',
    Choice3: 'Dark Enchantress Cookie',
    Choice4: 'Espresso Cookie',
    answer: 3,
}
]