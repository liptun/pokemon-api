import { PrismaClient } from "@prisma/client";

const pokemons = [
    {
        id: 1,
        name: { en: "Bulbasaur", jp: "フシギダネ" },
        type: ["Grass", "Poison"],
        species: "Seed Pokémon",
        description:
            "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.",
    },
    {
        id: 2,
        name: { en: "Ivysaur", jp: "フシギソウ" },
        type: ["Grass", "Poison"],
        species: "Seed Pokémon",
        description:
            "There is a bud on this Pokémon’s back. To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon.",
    },
    {
        id: 3,
        name: { en: "Venusaur", jp: "フシギバナ" },
        type: ["Grass", "Poison"],
        species: "Seed Pokémon",
        description:
            "There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people.",
    },
    {
        id: 4,
        name: { en: "Charmander", jp: "ヒトカゲ" },
        type: ["Fire"],
        species: "Lizard Pokémon",
        description:
            "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.",
    },
    {
        id: 5,
        name: { en: "Charmeleon", jp: "リザード" },
        type: ["Fire"],
        species: "Flame Pokémon",
        description:
            "Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.",
    },
    {
        id: 6,
        name: { en: "Charizard", jp: "リザードン" },
        type: ["Fire", "Flying"],
        species: "Flame Pokémon",
        description:
            "Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.",
    },
    {
        id: 7,
        name: { en: "Squirtle", jp: "ゼニガメ" },
        type: ["Water"],
        species: "Tiny Turtle Pokémon",
        description:
            "Squirtle’s shell is not merely used for protection. The shell’s rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.",
    },
    {
        id: 8,
        name: { en: "Wartortle", jp: "カメール" },
        type: ["Water"],
        species: "Turtle Pokémon",
        description:
            "Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages. The scratches on its shell are evidence of this Pokémon’s toughness as a battler.",
    },
    {
        id: 9,
        name: { en: "Blastoise", jp: "カメックス" },
        type: ["Water"],
        species: "Shellfish Pokémon",
        description:
            "Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.",
    },
    {
        id: 10,
        name: { en: "Caterpie", jp: "キャタピー" },
        type: ["Bug"],
        species: "Worm Pokémon",
        description: "Its body is soft and weak. In nature, its perpetual fate is to be seen by others as food.",
    },
    {
        id: 11,
        name: { en: "Metapod", jp: "トランセル" },
        type: ["Bug"],
        species: "Cocoon Pokémon",
        description:
            "Its hard shell doesn’t crack a bit even if Pikipek pecks at it, but it will tip over, spilling out its insides.",
    },
    {
        id: 12,
        name: { en: "Butterfree", jp: "バタフリー" },
        type: ["Bug", "Flying"],
        species: "Butterfly Pokémon",
        description:
            "Nectar from pretty flowers is its favorite food. In fields of flowers, it has heated battles with Cutiefly for territory.",
    },
    {
        id: 13,
        name: { en: "Weedle", jp: "ビードル" },
        type: ["Bug", "Poison"],
        species: "Hairy Bug Pokémon",
        description:
            "Weedle has an extremely acute sense of smell. It is capable of distinguishing its favorite kinds of leaves from those it dislikes just by sniffing with its big red proboscis (nose).",
    },
    {
        id: 14,
        name: { en: "Kakuna", jp: "コクーン" },
        type: ["Bug", "Poison"],
        species: "Cocoon Pokémon",
        description:
            "Kakuna remains virtually immobile as it clings to a tree. However, on the inside, it is extremely busy as it prepares for its coming evolution. This is evident from how hot the shell becomes to the touch.",
    },
    {
        id: 15,
        name: { en: "Beedrill", jp: "スピアー" },
        type: ["Bug", "Poison"],
        species: "Poison Bee Pokémon",
        description:
            "Beedrill is extremely territorial. No one should ever approach its nest—this is for their own safety. If angered, they will attack in a furious swarm.",
    },
    {
        id: 16,
        name: { en: "Pidgey", jp: "ポッポ" },
        type: ["Normal", "Flying"],
        species: "Tiny Bird Pokémon",
        description:
            "Pidgey has an extremely sharp sense of direction. It is capable of unerringly returning home to its nest, however far it may be removed from its familiar surroundings.",
    },
    {
        id: 17,
        name: { en: "Pidgeotto", jp: "ピジョン" },
        type: ["Normal", "Flying"],
        species: "Bird Pokémon",
        description:
            "Pidgeotto claims a large area as its own territory. This Pokémon flies around, patrolling its living space. If its territory is violated, it shows no mercy in thoroughly punishing the foe with its sharp claws.",
    },
    {
        id: 18,
        name: { en: "Pidgeot", jp: "ピジョット" },
        type: ["Normal", "Flying"],
        species: "Bird Pokémon",
        description:
            "This Pokémon has a dazzling plumage of beautifully glossy feathers. Many Trainers are captivated by the striking beauty of the feathers on its head, compelling them to choose Pidgeot as their Pokémon.",
    },
    {
        id: 19,
        name: { en: "Rattata", jp: "コラッタ" },
        type: ["Normal"],
        species: "Mouse Pokémon",
        description: "This Pokémon is common but hazardous. Its sharp incisors can easily cut right through hard wood.",
    },
    {
        id: 20,
        name: { en: "Raticate", jp: "ラッタ" },
        type: ["Normal"],
        species: "Mouse Pokémon",
        description:
            "Its whiskers are essential for maintaining its balance. No matter how friendly you are, it will get angry and bite you if you touch its whiskers.",
    },
    {
        id: 21,
        name: { en: "Spearow", jp: "オニスズメ" },
        type: ["Normal", "Flying"],
        species: "Tiny Bird Pokémon",
        description:
            "Due to its short wings, it can’t fly long distances. It wanders about restlessly and pecks at bug Pokémon.",
    },
    {
        id: 22,
        name: { en: "Fearow", jp: "オニドリル" },
        type: ["Normal", "Flying"],
        species: "Beak Pokémon",
        description: "In Alola, fish Pokémon are its prey. It can be seen circling above the ocean searching for food.",
    },
    {
        id: 23,
        name: { en: "Ekans", jp: "アーボ" },
        type: ["Poison"],
        species: "Snake Pokémon",
        description:
            "The eggs of bird Pokémon are its favorite food. It swallows eggs whole, so sometimes an egg gets stuck, and Ekans faints.",
    },
    {
        id: 24,
        name: { en: "Arbok", jp: "アーボック" },
        type: ["Poison"],
        species: "Cobra Pokémon",
        description:
            "After stunning its opponents with the pattern on its stomach, it quickly wraps them up in its body and waits for them to stop moving.",
    },
    {
        id: 25,
        name: { en: "Pikachu", jp: "ピカチュウ" },
        type: ["Electric"],
        species: "Mouse Pokémon",
        description:
            "While sleeping, it generates electricity in the sacs in its cheeks. If it’s not getting enough sleep, it will be able to use only weak electricity.",
    },
    {
        id: 26,
        name: { en: "Raichu", jp: "ライチュウ" },
        type: ["Electric"],
        species: "Mouse Pokémon",
        description: "Because so many Trainers like the way Pikachu looks, you don’t see this Pokémon very often.",
    },
    {
        id: 27,
        name: { en: "Sandshrew", jp: "サンド" },
        type: ["Ground"],
        species: "Mouse Pokémon",
        description:
            "When its skin gets wrinkled from moisture, it heads for a volcano. It lies flat on a spot with a lot of geothermal heat and dries itself out.",
    },
    {
        id: 28,
        name: { en: "Sandslash", jp: "サンドパン" },
        type: ["Ground"],
        species: "Mouse Pokémon",
        description:
            "Thanks to its thick claws, it’s good at climbing trees. There are plenty of Sandslash that park themselves in trees and go right to sleep.",
    },
    {
        id: 29,
        name: { en: "Nidoran♀", jp: "ニドラン♀" },
        type: ["Poison"],
        species: "Poison Pin Pokémon",
        description:
            "Nidoran♀ has barbs that secrete a powerful poison. They are thought to have developed as protection for this small-bodied Pokémon. When enraged, it releases a horrible toxin from its horn.",
    },
    {
        id: 30,
        name: { en: "Nidorina", jp: "ニドリーナ" },
        type: ["Poison"],
        species: "Poison Pin Pokémon",
        description:
            "When Nidorina are with their friends or family, they keep their barbs tucked away to prevent hurting each other. This Pokémon appears to become nervous if separated from the others.",
    },
    {
        id: 31,
        name: { en: "Nidoqueen", jp: "ニドクイン" },
        type: ["Poison", "Ground"],
        species: "Drill Pokémon",
        description:
            "Nidoqueen’s body is encased in extremely hard scales. It is adept at sending foes flying with harsh tackles. This Pokémon is at its strongest when it is defending its young.",
    },
    {
        id: 32,
        name: { en: "Nidoran♂", jp: "ニドラン♂" },
        type: ["Poison"],
        species: "Poison Pin Pokémon",
        description:
            "Nidoran♂ has developed muscles for moving its ears. Thanks to them, the ears can be freely moved in any direction. Even the slightest sound does not escape this Pokémon’s notice.",
    },
    {
        id: 33,
        name: { en: "Nidorino", jp: "ニドリーノ" },
        type: ["Poison"],
        species: "Poison Pin Pokémon",
        description:
            "Nidorino has a horn that is harder than a diamond. If it senses a hostile presence, all the barbs on its back bristle up at once, and it challenges the foe with all its might.",
    },
    {
        id: 34,
        name: { en: "Nidoking", jp: "ニドキング" },
        type: ["Poison", "Ground"],
        species: "Drill Pokémon",
        description:
            "Nidoking’s thick tail packs enormously destructive power. With one swing, it can topple a metal transmission tower. Once this Pokémon goes on a rampage, there is no stopping it.",
    },
    {
        id: 35,
        name: { en: "Clefairy", jp: "ピッピ" },
        type: ["Fairy"],
        species: "Fairy Pokémon",
        description:
            "Bathed in moonlight, its wings glow faintly. Without even flapping, Clefairy rises into the air, where it dances around.",
    },
    {
        id: 36,
        name: { en: "Clefable", jp: "ピクシー" },
        type: ["Fairy"],
        species: "Fairy Pokémon",
        description:
            "Some scientists believe that it gazes intently at the sky on nights with a full moon because it’s homesick.",
    },
    {
        id: 37,
        name: { en: "Vulpix", jp: "ロコン" },
        type: ["Fire"],
        species: "Fox Pokémon",
        description:
            "It manipulates balls of fire to catch its prey. If you raise one from when it’s young, it will grow close to you like a puppy Pokémon.",
    },
    {
        id: 38,
        name: { en: "Ninetales", jp: "キュウコン" },
        type: ["Fire"],
        species: "Fox Pokémon",
        description:
            "The flickering flames it spews from its mouth leave its opponents hypnotized. Then, this extremely intelligent Pokémon attacks.",
    },
    {
        id: 39,
        name: { en: "Jigglypuff", jp: "プリン" },
        type: ["Normal", "Fairy"],
        species: "Balloon Pokémon",
        description:
            "The songs they sing are totally different depending on the region they live in. Some even sound like they’re shouting!",
    },
    {
        id: 40,
        name: { en: "Wigglytuff", jp: "プクリン" },
        type: ["Normal", "Fairy"],
        species: "Balloon Pokémon",
        description:
            "When it gets angry, it inhales with all its might, and its body gradually inflates. Sometimes they can grow 20 times larger!",
    },
    {
        id: 41,
        name: { en: "Zubat", jp: "ズバット" },
        type: ["Poison", "Flying"],
        species: "Bat Pokémon",
        description:
            "Their skin is so thin that they’ll be burned if sunlight hits them. When it gets cold out, they gather together to warm one another’s bodies.",
    },
    {
        id: 42,
        name: { en: "Golbat", jp: "ゴルバット" },
        type: ["Poison", "Flying"],
        species: "Bat Pokémon",
        description:
            "They can suck down over 10 ounces of blood in one go. They have been known to drink so much blood that they can no longer fly.",
    },
    {
        id: 43,
        name: { en: "Oddish", jp: "ナゾノクサ" },
        type: ["Grass", "Poison"],
        species: "Weed Pokémon",
        description:
            "Oddish searches for fertile, nutrient-rich soil, then plants itself. During the daytime, while it is planted, this Pokémon’s feet are thought to change shape and become similar to the roots of trees.",
    },
    {
        id: 44,
        name: { en: "Gloom", jp: "クサイハナ" },
        type: ["Grass", "Poison"],
        species: "Weed Pokémon",
        description:
            "From its mouth Gloom drips honey that smells absolutely horrible. Apparently, it loves the horrid stench. It sniffs the noxious fumes and then drools even more of its honey.",
    },
    {
        id: 45,
        name: { en: "Vileplume", jp: "ラフレシア" },
        type: ["Grass", "Poison"],
        species: "Flower Pokémon",
        description:
            "Vileplume has the world’s largest petals. They are used to attract prey that are then doused with toxic spores. Once the prey are immobilized, this Pokémon catches and devours them.",
    },
    {
        id: 46,
        name: { en: "Paras", jp: "パラス" },
        type: ["Bug", "Grass"],
        species: "Mushroom Pokémon",
        description:
            "The mushrooms, known as tochukaso, are controlling the bug. Even if the bug bugs the mushrooms, they tell it to bug off.",
    },
    {
        id: 47,
        name: { en: "Parasect", jp: "パラセクト" },
        type: ["Bug", "Grass"],
        species: "Mushroom Pokémon",
        description:
            "Its poisonous spores are also used in traditional medicine. Apparently, spores produced in Alola are not of very good quality.",
    },
    {
        id: 48,
        name: { en: "Venonat", jp: "コンパン" },
        type: ["Bug", "Poison"],
        species: "Insect Pokémon",
        description:
            "Venonat is said to have evolved with a coat of thin, stiff hair that covers its entire body for protection. It possesses large eyes that never fail to spot even minuscule prey.",
    },
    {
        id: 49,
        name: { en: "Venomoth", jp: "モルフォン" },
        type: ["Bug", "Poison"],
        species: "Poison Moth Pokémon",
        description:
            "Venomoth is nocturnal—it is a Pokémon that only becomes active at night. Its favorite prey are small insects that gather around streetlights, attracted by the light in the darkness.",
    },
    {
        id: 50,
        name: { en: "Diglett", jp: "ディグダ" },
        type: ["Ground"],
        species: "Mole Pokémon",
        description:
            "Around their crops, farmers plant the kind of tree that Diglett like to eat as a way of getting Diglett to plow the fields for them.",
    },
    {
        id: 51,
        name: { en: "Dugtrio", jp: "ダグトリオ" },
        type: ["Ground"],
        species: "Mole Pokémon",
        description:
            "Dugtrio’s heads are sleek and smooth and incredibly hard. It can dig through any soil with its headbutts.",
    },
    {
        id: 52,
        name: { en: "Meowth", jp: "ニャース" },
        type: ["Normal"],
        species: "Scratch Cat Pokémon",
        description:
            "It loves coins, so if you give it one, you can make friends with Meowth easily. But it’s fickle, so you can’t count on that friendship lasting.",
    },
    {
        id: 53,
        name: { en: "Persian", jp: "ペルシアン" },
        type: ["Normal"],
        species: "Classy Cat Pokémon",
        description:
            "This Pokémon is popular with rich people. It’s also targeted by hunters who are after the jewel in its forehead.",
    },
    {
        id: 54,
        name: { en: "Psyduck", jp: "コダック" },
        type: ["Water"],
        species: "Duck Pokémon",
        description:
            "It has been found that its brain cells are 10 times more active when Psyduck is experiencing a headache.",
    },
    {
        id: 55,
        name: { en: "Golduck", jp: "ゴルダック" },
        type: ["Water"],
        species: "Duck Pokémon",
        description:
            "A professional swimmer, it can continue swimming for two days straight by waving its long tail skillfully.",
    },
    {
        id: 56,
        name: { en: "Mankey", jp: "マンキー" },
        type: ["Fighting"],
        species: "Pig Monkey Pokémon",
        description:
            "If one gets angry, all the others around it will get angry, so silence is a rare visitor in a troop of Mankey.",
    },
    {
        id: 57,
        name: { en: "Primeape", jp: "オコリザル" },
        type: ["Fighting"],
        species: "Pig Monkey Pokémon",
        description:
            "The blood vessels in its brain are sturdier than those of other Pokémon, so it can stay healthy despite its constant raging.",
    },
    {
        id: 58,
        name: { en: "Growlithe", jp: "ガーディ" },
        type: ["Fire"],
        species: "Puppy Pokémon",
        description:
            "It has lived alongside humans since ages ago. Its bones have been found in excavations of ruins from the Stone Age.",
    },
    {
        id: 59,
        name: { en: "Arcanine", jp: "ウインディ" },
        type: ["Fire"],
        species: "Legendary Pokémon",
        description:
            "There are so many old tales about them that they’re called legendary Pokémon, but there are way more of them around than you’d expect.",
    },
    {
        id: 60,
        name: { en: "Poliwag", jp: "ニョロモ" },
        type: ["Water"],
        species: "Tadpole Pokémon",
        description:
            "The direction of the swirl on their stomachs differs depending on where they live. Poliwag aficionados can tell them apart at a glance.",
    },
    {
        id: 61,
        name: { en: "Poliwhirl", jp: "ニョロゾ" },
        type: ["Water"],
        species: "Tadpole Pokémon",
        description: "Its health suffers when its skin dries out, so be sure to moisturize it diligently.",
    },
    {
        id: 62,
        name: { en: "Poliwrath", jp: "ニョロボン" },
        type: ["Water", "Fighting"],
        species: "Tadpole Pokémon",
        description:
            "The muscles it has developed through swimming are thick and powerful. When it lands a square punch, it can turn huge boulders to dust.",
    },
    {
        id: 63,
        name: { en: "Abra", jp: "ケーシィ" },
        type: ["Psychic"],
        species: "Psi Pokémon",
        description:
            "It can read others’ minds and will teleport away when danger approaches. You must clear your mind if you want to catch it.",
    },
    {
        id: 64,
        name: { en: "Kadabra", jp: "ユンゲラー" },
        type: ["Psychic"],
        species: "Psi Pokémon",
        description:
            "It possesses strong mental capabilities, but its psychic powers are halved when it’s not holding a silver spoon.",
    },
    {
        id: 65,
        name: { en: "Alakazam", jp: "フーディン" },
        type: ["Psychic"],
        species: "Psi Pokémon",
        description:
            "If it trusts someone deeply, it will let them have one of its spoons. Anything you eat with that spoon is apparently delicious.",
    },
    {
        id: 66,
        name: { en: "Machop", jp: "ワンリキー" },
        type: ["Fighting"],
        species: "Superpower Pokémon",
        description:
            "It likes food that’s highly nutritious because its instincts drive it to build muscle efficiently.",
    },
    {
        id: 67,
        name: { en: "Machoke", jp: "ゴーリキー" },
        type: ["Fighting"],
        species: "Superpower Pokémon",
        description:
            "A popular motif for sculptures, its incredibly well-developed muscles have captured the imagination of many an artist.",
    },
    {
        id: 68,
        name: { en: "Machamp", jp: "カイリキー" },
        type: ["Fighting"],
        species: "Superpower Pokémon",
        description:
            "With four arms, it can attack and defend simultaneously. It’s said to have mastered every martial art in the world.",
    },
    {
        id: 69,
        name: { en: "Bellsprout", jp: "マダツボミ" },
        type: ["Grass", "Poison"],
        species: "Flower Pokémon",
        description:
            "Bellsprout’s thin and flexible body lets it bend and sway to avoid any attack, however strong it may be. From its mouth, this Pokémon spits a corrosive fluid that melts even iron.",
    },
    {
        id: 70,
        name: { en: "Weepinbell", jp: "ウツドン" },
        type: ["Grass", "Poison"],
        species: "Flycatcher Pokémon",
        description:
            "Weepinbell has a large hook on its rear end. At night, the Pokémon hooks on to a tree branch and goes to sleep. If it moves around in its sleep, it may wake up to find itself on the ground.",
    },
    {
        id: 71,
        name: { en: "Victreebel", jp: "ウツボット" },
        type: ["Grass", "Poison"],
        species: "Flycatcher Pokémon",
        description:
            "Victreebel has a long vine that extends from its head. This vine is waved and flicked about as if it were an animal to attract prey. When an unsuspecting prey draws near, this Pokémon swallows it whole.",
    },
    {
        id: 72,
        name: { en: "Tentacool", jp: "メノクラゲ" },
        type: ["Water", "Poison"],
        species: "Jellyfish Pokémon",
        description: "Its body is 99% water. The remaining 1% contains the organ that makes its poison.",
    },
    {
        id: 73,
        name: { en: "Tentacruel", jp: "ドククラゲ" },
        type: ["Water", "Poison"],
        species: "Jellyfish Pokémon",
        description:
            "It communicates with others of its kind by lighting up the red orbs on its head. When the orbs are blinking, it’s a warning sign.",
    },
    {
        id: 74,
        name: { en: "Geodude", jp: "イシツブテ" },
        type: ["Rock", "Ground"],
        species: "Rock Pokémon",
        description:
            "It uses both hands to climb precipitous cliffs. People who see it in action have been known to take up bouldering.",
    },
    {
        id: 75,
        name: { en: "Graveler", jp: "ゴローン" },
        type: ["Rock", "Ground"],
        species: "Rock Pokémon",
        description: "It travels by rolling down cliffs. If it falls into a river, it will explode with its last gasp.",
    },
    {
        id: 76,
        name: { en: "Golem", jp: "ゴローニャ" },
        type: ["Rock", "Ground"],
        species: "Megaton Pokémon",
        description:
            "It detonates its own body. The power from that explosion can propel it up steep mountain paths with amazing speed.",
    },
    {
        id: 77,
        name: { en: "Ponyta", jp: "ポニータ" },
        type: ["Fire"],
        species: "Fire Horse Pokémon",
        description:
            "Ponyta is very weak at birth. It can barely stand up. This Pokémon becomes stronger by stumbling and falling to keep up with its parent.",
    },
    {
        id: 78,
        name: { en: "Rapidash", jp: "ギャロップ" },
        type: ["Fire"],
        species: "Fire Horse Pokémon",
        description:
            "Rapidash usually can be seen casually cantering in the fields and plains. However, when this Pokémon turns serious, its fiery manes flare and blaze as it gallops its way up to 150 mph.",
    },
    {
        id: 79,
        name: { en: "Slowpoke", jp: "ヤドン" },
        type: ["Water", "Psychic"],
        species: "Dopey Pokémon",
        description:
            "Although their tails, which fall off naturally, can easily be found lying around, they’re a precious ingredient for cooking.",
    },
    {
        id: 80,
        name: { en: "Slowbro", jp: "ヤドラン" },
        type: ["Water", "Psychic"],
        species: "Hermit Crab Pokémon",
        description:
            "Shellder, in its greed to suck out more and more sweetness from Slowbro’s tail, has metamorphosed into a spiral-shaped shell.",
    },
    {
        id: 81,
        name: { en: "Magnemite", jp: "コイル" },
        type: ["Electric", "Steel"],
        species: "Magnet Pokémon",
        description:
            "Perhaps because electrical lines are often buried these days, the number of Magnemite attacks on power plants has increased.",
    },
    {
        id: 82,
        name: { en: "Magneton", jp: "レアコイル" },
        type: ["Electric", "Steel"],
        species: "Magnet Pokémon",
        description: "When rain clouds form, many Magneton gather in high places to wait for lightning to strike.",
    },
    {
        id: 83,
        name: { en: "Farfetch'd", jp: "カモネギ" },
        type: ["Normal", "Flying"],
        species: "Wild Duck Pokémon",
        description:
            "Farfetch’d is always seen with a stalk from a plant of some sort. Apparently, there are good stalks and bad stalks. This Pokémon has been known to fight with others over stalks.",
    },
    {
        id: 84,
        name: { en: "Doduo", jp: "ドードー" },
        type: ["Normal", "Flying"],
        species: "Twin Bird Pokémon",
        description:
            "Doduo’s two heads contain completely identical brains. A scientific study reported that on rare occasions, there will be examples of this Pokémon possessing different sets of brains.",
    },
    {
        id: 85,
        name: { en: "Dodrio", jp: "ドードリオ" },
        type: ["Normal", "Flying"],
        species: "Triple Bird Pokémon",
        description:
            "Apparently, the heads aren’t the only parts of the body that Dodrio has three of. It has three sets of hearts and lungs as well, so it is capable of running long distances without rest.",
    },
    {
        id: 86,
        name: { en: "Seel", jp: "パウワウ" },
        type: ["Water"],
        species: "Sea Lion Pokémon",
        description:
            "Thanks to its thick fat, cold seas don’t bother it at all, but it gets tired pretty easily in warm waters.",
    },
    {
        id: 87,
        name: { en: "Dewgong", jp: "ジュゴン" },
        type: ["Water", "Ice"],
        species: "Sea Lion Pokémon",
        description: "It sunbathes on the beach after meals. The rise in its body temperature helps its digestion.",
    },
    {
        id: 88,
        name: { en: "Grimer", jp: "ベトベター" },
        type: ["Poison"],
        species: "Sludge Pokémon",
        description:
            "The wastewater coming from factories is clean these days, so Grimer have nothing to eat. They’re said to be on the verge of extinction.",
    },
    {
        id: 89,
        name: { en: "Muk", jp: "ベトベトン" },
        type: ["Poison"],
        species: "Sludge Pokémon",
        description:
            "Because they scatter germs everywhere, they’ve long been targeted for extermination, leading to a steep decline in their population.",
    },
    {
        id: 90,
        name: { en: "Shellder", jp: "シェルダー" },
        type: ["Water"],
        species: "Bivalve Pokémon",
        description:
            "Even when its shell is closed, its tongue still hangs out. If you give its tongue a good yank, the shock will cause Shellder to open its shell.",
    },
    {
        id: 91,
        name: { en: "Cloyster", jp: "パルシェン" },
        type: ["Water", "Ice"],
        species: "Bivalve Pokémon",
        description:
            "Slowpoke tails are its favorite food. It has even been known to come up on land to look for Slowpoke from time to time.",
    },
    {
        id: 92,
        name: { en: "Gastly", jp: "ゴース" },
        type: ["Ghost", "Poison"],
        species: "Gas Pokémon",
        description:
            "Poisonous gas comprises 95% of its body. It’s said that the remaining 5% is made up of the souls of those who died from the gas.",
    },
    {
        id: 93,
        name: { en: "Haunter", jp: "ゴースト" },
        type: ["Ghost", "Poison"],
        species: "Gas Pokémon",
        description:
            "It’s dangerous to go outside alone on nights when you’re feeling sad. Haunter will catch you, and you won’t be able to go back home.",
    },
    {
        id: 94,
        name: { en: "Gengar", jp: "ゲンガー" },
        type: ["Ghost", "Poison"],
        species: "Shadow Pokémon",
        description:
            "Even your home isn’t safe. Gengar will lurk in whatever dark corner of a room it can find and wait for its chance to catch its prey.",
    },
    {
        id: 95,
        name: { en: "Onix", jp: "イワーク" },
        type: ["Rock", "Ground"],
        species: "Rock Snake Pokémon",
        description:
            "Onix has a magnet in its brain. It acts as a compass so that this Pokémon does not lose direction while it is tunneling. As it grows older, its body becomes increasingly rounder and smoother.",
    },
    {
        id: 96,
        name: { en: "Drowzee", jp: "スリープ" },
        type: ["Psychic"],
        species: "Hypnosis Pokémon",
        description:
            "It puts its prey to sleep and devours their dreams. It seems that bad dreams taste sour, so Drowzee doesn’t particularly like eating them.",
    },
    {
        id: 97,
        name: { en: "Hypno", jp: "スリーパー" },
        type: ["Psychic"],
        species: "Hypnosis Pokémon",
        description: "There are some Hypno that assist doctors with patients who can’t sleep at night in hospitals.",
    },
    {
        id: 98,
        name: { en: "Krabby", jp: "クラブ" },
        type: ["Water"],
        species: "River Crab Pokémon",
        description:
            "Krabby live on beaches, burrowed inside holes dug into the sand. On sandy beaches with little in the way of food, these Pokémon can be seen squabbling with each other over territory.",
    },
    {
        id: 99,
        name: { en: "Kingler", jp: "キングラー" },
        type: ["Water"],
        species: "Pincer Pokémon",
        description:
            "Kingler has an enormous, oversized claw. It waves this huge claw in the air to communicate with others. However, because the claw is so heavy, the Pokémon quickly tires.",
    },
    {
        id: 100,
        name: { en: "Voltorb", jp: "ビリリダマ" },
        type: ["Electric"],
        species: "Ball Pokémon",
        description:
            "Voltorb is extremely sensitive—it explodes at the slightest of shocks. It is rumored that it was first created when a Poké Ball was exposed to a powerful pulse of energy.",
    },
    {
        id: 101,
        name: { en: "Electrode", jp: "マルマイン" },
        type: ["Electric"],
        species: "Ball Pokémon",
        description:
            "One of Electrode’s characteristics is its attraction to electricity. It is a problematical Pokémon that congregates mostly at electrical power plants to feed on electricity that has just been generated.",
    },
    {
        id: 102,
        name: { en: "Exeggcute", jp: "タマタマ" },
        type: ["Grass", "Psychic"],
        species: "Egg Pokémon",
        description:
            "Although they are the same size as other Exeggcute, the ones produced in Alola are quite heavy. Their shells are packed full.",
    },
    {
        id: 103,
        name: { en: "Exeggutor", jp: "ナッシー" },
        type: ["Grass", "Psychic"],
        species: "Coconut Pokémon",
        description:
            "Each of its three heads has its own thoughts. When they want to go in different directions, Exeggutor becomes unable to move.",
    },
    {
        id: 104,
        name: { en: "Cubone", jp: "カラカラ" },
        type: ["Ground"],
        species: "Lonely Pokémon",
        description:
            "It wears its mother’s skull on its head, so no one knows what its bare face looks like. However, it’s clear that it’s always crying.",
    },
    {
        id: 105,
        name: { en: "Marowak", jp: "ガラガラ" },
        type: ["Ground"],
        species: "Bone Keeper Pokémon",
        description:
            "They thump their bones rhythmically to communicate among themselves. There are nearly 50 different rhythmic patterns.",
    },
    {
        id: 106,
        name: { en: "Hitmonlee", jp: "サワムラー" },
        type: ["Fighting"],
        species: "Kicking Pokémon",
        description:
            "Hitmonlee’s legs freely contract and stretch. Using these springlike legs, it bowls over foes with devastating kicks. After battle, it rubs down its legs and loosens the muscles to overcome fatigue.",
    },
    {
        id: 107,
        name: { en: "Hitmonchan", jp: "エビワラー" },
        type: ["Fighting"],
        species: "Punching Pokémon",
        description:
            "Hitmonchan is said to possess the spirit of a boxer who had been working toward a world championship. This Pokémon has an indomitable spirit and will never give up in the face of adversity.",
    },
    {
        id: 108,
        name: { en: "Lickitung", jp: "ベロリンガ" },
        type: ["Normal"],
        species: "Licking Pokémon",
        description:
            "It licks filth clean with its tongue. Whatever it licks always stinks afterward, so whether it’s really clean is...questionable.",
    },
    {
        id: 109,
        name: { en: "Koffing", jp: "ドガース" },
        type: ["Poison"],
        species: "Poison Gas Pokémon",
        description:
            "Koffing embodies toxic substances. It mixes the toxins with raw garbage to set off a chemical reaction that results in a terribly powerful poison gas. The higher the temperature, the more gas is concocted by this Pokémon.",
    },
    {
        id: 110,
        name: { en: "Weezing", jp: "マタドガス" },
        type: ["Poison"],
        species: "Poison Gas Pokémon",
        description:
            "Weezing alternately shrinks and inflates its twin bodies to mix together toxic gases inside. The more the gases are mixed, the more powerful the toxins become. The Pokémon also becomes more putrid.",
    },
    {
        id: 111,
        name: { en: "Rhyhorn", jp: "サイホーン" },
        type: ["Ground", "Rock"],
        species: "Spikes Pokémon",
        description:
            "Rhyhorn’s brain is very small. It is so dense, while on a run it forgets why it started running in the first place. It apparently remembers sometimes if it demolishes something.",
    },
    {
        id: 112,
        name: { en: "Rhydon", jp: "サイドン" },
        type: ["Ground", "Rock"],
        species: "Drill Pokémon",
        description:
            "Rhydon has a horn that serves as a drill. It is used for destroying rocks and boulders. This Pokémon occasionally rams into streams of magma, but the armor-like hide prevents it from feeling the heat.",
    },
    {
        id: 113,
        name: { en: "Chansey", jp: "ラッキー" },
        type: ["Normal"],
        species: "Egg Pokémon",
        description:
            "Because the eggs on their bellies have been overharvested by people in the past, the Chansey population remains very small.",
    },
    {
        id: 114,
        name: { en: "Tangela", jp: "モンジャラ" },
        type: ["Grass"],
        species: "Vine Pokémon",
        description:
            "Tangela’s vines snap off easily if they are grabbed. This happens without pain, allowing it to make a quick getaway. The lost vines are replaced by newly grown vines the very next day.",
    },
    {
        id: 115,
        name: { en: "Kangaskhan", jp: "ガルーラ" },
        type: ["Normal"],
        species: "Parent Pokémon",
        description:
            "You shouldn’t get close to the child when it’s playing outside its mother’s pouch. Its mother is always nearby watching over it.",
    },
    {
        id: 116,
        name: { en: "Horsea", jp: "タッツー" },
        type: ["Water"],
        species: "Dragon Pokémon",
        description:
            "If Horsea senses danger, it will reflexively spray a dense black ink from its mouth and try to escape. This Pokémon swims by cleverly flapping the fin on its back.",
    },
    {
        id: 117,
        name: { en: "Seadra", jp: "シードラ" },
        type: ["Water"],
        species: "Dragon Pokémon",
        description:
            "Seadra generates whirlpools by spinning its body. The whirlpools are strong enough to swallow even fishing boats. This Pokémon weakens prey with these currents, then swallows it whole.",
    },
    {
        id: 118,
        name: { en: "Goldeen", jp: "トサキント" },
        type: ["Water"],
        species: "Goldfish Pokémon",
        description:
            "The way it swims along fluttering its dress-like fins has earned it the name “princess of the water.”",
    },
    {
        id: 119,
        name: { en: "Seaking", jp: "アズマオウ" },
        type: ["Water"],
        species: "Goldfish Pokémon",
        description:
            "To attract females, males dance on the river’s floor. The females gather around the male that dances most gracefully.",
    },
    {
        id: 120,
        name: { en: "Staryu", jp: "ヒトデマン" },
        type: ["Water"],
        species: "Star Shape Pokémon",
        description:
            "No number of injuries can bother Staryu. Its amazing regenerative powers return it to its previous state in half a day!",
    },
    {
        id: 121,
        name: { en: "Starmie", jp: "スターミー" },
        type: ["Water", "Psychic"],
        species: "Mysterious Pokémon",
        description:
            "It rotates its geometrically shaped body to swim through the water. It always seems to be sending out mysterious radio waves.",
    },
    {
        id: 122,
        name: { en: "Mr. Mime", jp: "バリヤード" },
        type: ["Psychic", "Fairy"],
        species: "Barrier Pokémon",
        description:
            "It creates invisible walls with its pantomiming. If you don’t act impressed, it will attack you with a double slap!",
    },
    {
        id: 123,
        name: { en: "Scyther", jp: "ストライク" },
        type: ["Bug", "Flying"],
        species: "Mantis Pokémon",
        description:
            "Some call it a ninja. Its movements— imperceptibly quick—are sufficient to cleave the air in two. It’s very popular in Alola.",
    },
    {
        id: 124,
        name: { en: "Jynx", jp: "ルージュラ" },
        type: ["Ice", "Psychic"],
        species: "Human Shape Pokémon",
        description:
            "Its strange cries sound like human language. There are some musicians who compose songs for Jynx to sing.",
    },
    {
        id: 125,
        name: { en: "Electabuzz", jp: "エレブー" },
        type: ["Electric"],
        species: "Electric Pokémon",
        description:
            "While it’s often blamed for power outages, the truth is the cause of outages is more often an error on the part of the electric company.",
    },
    {
        id: 126,
        name: { en: "Magmar", jp: "ブーバー" },
        type: ["Fire"],
        species: "Spitfire Pokémon",
        description:
            "The hotter the place, the better they feel. Magmar in Alola are said to be hardier than those in other areas.",
    },
    {
        id: 127,
        name: { en: "Pinsir", jp: "カイロス" },
        type: ["Bug"],
        species: "Stag Beetle Pokémon",
        description:
            "Although it’s tough, it can’t handle cold well. When night falls, it buries itself in leafage and sleeps.",
    },
    {
        id: 128,
        name: { en: "Tauros", jp: "ケンタロス" },
        type: ["Normal"],
        species: "Wild Bull Pokémon",
        description:
            "The climate seems to be related to the reason Tauros in Alola are a little calmer than those in other regions.",
    },
    {
        id: 129,
        name: { en: "Magikarp", jp: "コイキング" },
        type: ["Water"],
        species: "Fish Pokémon",
        description:
            "Thanks to their strong hold on life, dirty water doesn’t bother them at all. They live in waters all over the world!",
    },
    {
        id: 130,
        name: { en: "Gyarados", jp: "ギャラドス" },
        type: ["Water", "Flying"],
        species: "Atrocious Pokémon",
        description:
            "The energy from evolution stimulated its brain cells strongly, causing it to become very ferocious.",
    },
    {
        id: 131,
        name: { en: "Lapras", jp: "ラプラス" },
        type: ["Water", "Ice"],
        species: "Transport Pokémon",
        description:
            "They’ve been so cherished that there’s now an overabundance. The fish Pokémon population has declined in waters with too many Lapras.",
    },
    {
        id: 132,
        name: { en: "Ditto", jp: "メタモン" },
        type: ["Normal"],
        species: "Transform Pokémon",
        description:
            "It transforms into whatever it sees. If the thing it’s transforming into isn’t right in front of it, Ditto relies on its memory—so sometimes it fails.",
    },
    {
        id: 133,
        name: { en: "Eevee", jp: "イーブイ" },
        type: ["Normal"],
        species: "Evolution Pokémon",
        description:
            "Its genes are easily influenced by its surroundings. Even its face starts to look like that of its Trainer.",
    },
    {
        id: 134,
        name: { en: "Vaporeon", jp: "シャワーズ" },
        type: ["Water"],
        species: "Bubble Jet Pokémon",
        description:
            "It detects nearby moisture with its fin. When its fin begins trembling rapidly, that means rain will fall in a few hours.",
    },
    {
        id: 135,
        name: { en: "Jolteon", jp: "サンダース" },
        type: ["Electric"],
        species: "Lightning Pokémon",
        description:
            "Its fur stands on end, becoming like needles it fires at enemies. Once they’re weakened, it finishes them off with a 10,000 volt shock.",
    },
    {
        id: 136,
        name: { en: "Flareon", jp: "ブースター" },
        type: ["Fire"],
        species: "Flame Pokémon",
        description:
            "The flame chamber inside its body ignites when Flareon gets agitated, reaching temperatures of up to 1,650 degrees Fahrenheit.",
    },
    {
        id: 137,
        name: { en: "Porygon", jp: "ポリゴン" },
        type: ["Normal"],
        species: "Virtual Pokémon",
        description:
            "It was built 20 years ago by scientists who dreamed of exploring space. Their dreams have yet to come true.",
    },
    {
        id: 138,
        name: { en: "Omanyte", jp: "オムナイト" },
        type: ["Rock", "Water"],
        species: "Spiral Pokémon",
        description:
            "It was restored from an ancient fossil. Those Helix Fossils are excavated from areas that were once oceans long, long ago.",
    },
    {
        id: 139,
        name: { en: "Omastar", jp: "オムスター" },
        type: ["Rock", "Water"],
        species: "Spiral Pokémon",
        description:
            "It wraps its prey in its tentacles to immobilize them and then finishes them off with its sharp fangs.",
    },
    {
        id: 140,
        name: { en: "Kabuto", jp: "カブト" },
        type: ["Rock", "Water"],
        species: "Shellfish Pokémon",
        description:
            "This Pokémon became extinct everywhere, except in a few areas. It protects itself with its hard shell.",
    },
    {
        id: 141,
        name: { en: "Kabutops", jp: "カブトプス" },
        type: ["Rock", "Water"],
        species: "Shellfish Pokémon",
        description:
            "It swims at speeds of roughly 29 knots, quickly closing in on its prey and slashing into them with its scythes to finish them off.",
    },
    {
        id: 142,
        name: { en: "Aerodactyl", jp: "プテラ" },
        type: ["Rock", "Flying"],
        species: "Fossil Pokémon",
        description:
            "It flew through the open skies over the ancient continent as if they were its own. When it touched ground, its walk was weak and slow.",
    },
    {
        id: 143,
        name: { en: "Snorlax", jp: "カビゴン" },
        type: ["Normal"],
        species: "Sleeping Pokémon",
        description:
            "It has no interest in anything other than eating. Even if you climb up on its stomach while it’s napping, it doesn’t seem to mind at all!",
    },
    {
        id: 144,
        name: { en: "Articuno", jp: "フリーザー" },
        type: ["Ice", "Flying"],
        species: "Freeze Pokémon",
        description:
            "Articuno is a legendary bird Pokémon that can control ice. The flapping of its wings chills the air. As a result, it is said that when this Pokémon flies, snow will fall.",
    },
    {
        id: 145,
        name: { en: "Zapdos", jp: "サンダー" },
        type: ["Electric", "Flying"],
        species: "Electric Pokémon",
        description:
            "Zapdos is a legendary bird Pokémon that has the ability to control electricity. It usually lives in thunderclouds. The Pokémon gains power if it is stricken by lightning bolts.",
    },
    {
        id: 146,
        name: { en: "Moltres", jp: "ファイヤー" },
        type: ["Fire", "Flying"],
        species: "Flame Pokémon",
        description:
            "Moltres is a legendary bird Pokémon that has the ability to control fire. If this Pokémon is injured, it is said to dip its body in the molten magma of a volcano to burn and heal itself.",
    },
    {
        id: 147,
        name: { en: "Dratini", jp: "ミニリュウ" },
        type: ["Dragon"],
        species: "Dragon Pokémon",
        description:
            "It sheds its skin—almost on a daily basis—and grows larger. Its skin is soft just after it’s been shed.",
    },
    {
        id: 148,
        name: { en: "Dragonair", jp: "ハクリュー" },
        type: ["Dragon"],
        species: "Dragon Pokémon",
        description:
            "Some say that if you see it at the start of the year, flying through the sky and twisting its body, you’ll be healthy all year long.",
    },
    {
        id: 149,
        name: { en: "Dragonite", jp: "カイリュー" },
        type: ["Dragon", "Flying"],
        species: "Dragon Pokémon",
        description:
            "You’ll often hear tales of this kindhearted Pokémon rescuing people or Pokémon that are drowning.",
    },
    {
        id: 150,
        name: { en: "Mewtwo", jp: "ミュウツー" },
        type: ["Psychic"],
        species: "Genetic Pokémon",
        description:
            "Mewtwo is a Pokémon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokémon’s body, they failed to endow Mewtwo with a compassionate heart.",
    },
    {
        id: 151,
        name: { en: "Mew", jp: "ミュウ" },
        type: ["Psychic"],
        species: "New Species Pokémon",
        description:
            "Mew is said to possess the genetic composition of all Pokémon. It is capable of making itself invisible at will, so it entirely avoids notice even if it approaches people.",
    },
];

const prisma = new PrismaClient();

(async () => {
    await prisma.catchedPokemon.deleteMany();
    await prisma.pokemon.deleteMany();
    await prisma.trainer.deleteMany();

    for (const pokemon of pokemons) {
        const { description, species, name } = pokemon;
        await prisma.pokemon.create({
            data: { species, description, no: pokemon.id, name: name.en, name_jp: name.jp },
        });
    }

    const doenuttTrainer = await prisma.trainer.create({
        data: { name: "doenutt_", name_jp: "ドエヌット" },
    });
    const liptunTrainer = await prisma.trainer.create({ data: { name: "LiptuN", name_jp: "リプトゥンノ" } });

    await prisma.catchedPokemon.create({ data: { trainerId: doenuttTrainer.id, pokemonNo: 1 } });
    await prisma.catchedPokemon.create({ data: { trainerId: doenuttTrainer.id, pokemonNo: 150, name: "Kitku" } });
    await prisma.catchedPokemon.create({
        data: { trainerId: liptunTrainer.id, pokemonNo: 50 },
    });
})();
