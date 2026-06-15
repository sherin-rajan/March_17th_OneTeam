const params = new URLSearchParams(window.location.search);

const movie = params.get("movie");

const movies = {
    brave: {
        title: "Brave",
        genre: "Adventure",
        year: "2010",
        rating: "4.5",
        image: "images/brave.webp",
        description: "Merida, a strong-minded princess, must rely on her bravery and archery skills to undo a beastly curse that has brought chaos to her kingdom.",
        directors:"Mark Andrews, Brenda Chapman, Steve Purcell",
        writers:"Mark Andrews, Steve Purcell, Brenda Chapman,Irene Mecchi",
        cast:"Kelly Macdonald, Billy Connolly, Emma Thompson, Julie Walters"
    },
    dragon: {
        title: "How to train your dragon",
        genre: "Adventure",
        year: "2010",
        rating: "4.5",
        image: "images/howToTrainYourDragon.jpg",
        description: "A Viking breaks all rules and befriends a dragon he is supposed to kill. He decides to call him Toothless and they join forces to put an end to the terror that wreaks havoc in their respective worlds.",
        directors:"Dean DeBlois, Chris Sanders",
        writers:"William Davies, Dean DeBlois, Chris Sanders",
        cast:"Blake Anderson, Aziz Ansari, Allison Bills, Jim Conroy"
    },
    narnia: {
        title: "Narnia",
        genre: "Adventure",
        year: "2005",
        rating: "4.5",
        image: "images/narnia.jpg",
        description: "While playing, Lucy and her siblings find a wardrobe that lands them in a mystical place called Narnia. Here they realise that it was fated and they must now unite with Aslan to defeat an evil queen.",
        directors:"Andrew Adamson",
        writers:"Ann Peacock, Andrew Adamson, Christopher Markus",
        cast:"Tilda Swinton, Georgie Henley, William Moseley"
    },
    percy: {
        title: "Percy Jackson",
        genre: "Adventure",
        year: "2010",
        rating: "4.5",
        image: "images/Percyjackson.webp",
        description: "The Lightning Thief follows the story of young Percy Jackson, a troubled 12-year-old boy with a secret unknown even to himself.",
        directors:"Chris Columbus",
        writers:"Craig Titley",
        cast:"Logan Lerman, Brandon T. Jackson, Daddario, Jake Abel"
    },
    epic: {
        title: "Epic",
        genre: "Adventure",
        year: "2013",
        rating: "4.5",
        image: "images/epic.jpg",
        description: "A young girl finds herself transported into an alternate world, where good forces are fighting against their evil counterparts.",
        directors:"Chris Wedge",
        writers:"James V. Hart, William Joyce",
        cast:"Blake Anderson, Aziz Ansari, Allison Bills, Jim Conroy"
    },
    lady: {
        title: "Lady and the Tramp",
        genre: "Adventure",
        year: "2019",
        rating: "4.5",
        image: "images/ladyANd.webp",
        description: "Lady, a female dog, feels neglected when Jim and Darling get a baby in the house.",
        directors:"Charlie Bean",
        writers:"Andrew Bujalski, Kari Granlund",
        cast:"Tessa Thompson, Justin Theroux, Sam Elliott, Ashley Jensen"
    },
    beauty: {
        title: "Beauty and the Beast",
        genre: "Adventure",
        year: "2017",
        rating: "4.5",
        image: "images/beautyAnd.webp",
        description: "Belle, a beautiful young woman, agrees to live with the Beast in exchange for the return of her abducted father.",
        directors:"Bill Condon",
        writers:"Stephen Chbosky, Evan Spiliotopoulos",
        cast:"Emma Watson, Dan Stevens, Luke Evans, Josh Gad"
    },
    tangled: {
        title: "Tangled",
        genre: "Adventure",
        year: "2010",
        rating: "4.5",
        image: "images/tangled.webp",
        description: "Rapunzel, an innocent, young girl, is locked up by her overly protective mother.",
        directors:"Nathan Greno, Byron Howard",
        writers:"Dan Fogelman, Jacob Grimm",
        cast:"Mandy Moore, Zachary Levi, Donna Murphy, Ron Perlman"
    }
};

const data = movies[movie];

document.getElementById("title").textContent = data.title;
document.getElementById("poster").src = data.image;
document.getElementById("description").textContent = data.description;
document.getElementById("rating").textContent = data.rating;
document.getElementById("genre").textContent = data.genre;
document.getElementById("year").textContent = data.year;
document.getElementById("directors").textContent = "Directors: "+data.directors;
document.getElementById("writers").textContent = "Writers: "+data.writers;
document.getElementById("cast").textContent = "Cast: "+data.cast;