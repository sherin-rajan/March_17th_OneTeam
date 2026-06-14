const params = new URLSearchParams(window.location.search);

const movie = params.get("movie");

const movies = {
    brave: {
        title: "Brave",
        genre: "Adventure",
        year: "2010",
        rating: "4.5",
        image: "images/brave.webp",
        description: "Merida, a strong-minded princess, must rely on her bravery and archery skills to undo a beastly curse that has brought chaos to her kingdom."
    },
    dragon: {
        title: "How to train your dragon",
        image: "images/howToTrainYourDragon.jpg",
        description: "A Viking breaks all rules and befriends a dragon he is supposed to kill. He decides to call him Toothless and they join forces to put an end to the terror that wreaks havoc in their respective worlds."
    },
    narnia: {
        title: "Narnia",
        image: "images/narnia.jpg",
        description: "While playing, Lucy and her siblings find a wardrobe that lands them in a mystical place called Narnia. Here they realise that it was fated and they must now unite with Aslan to defeat an evil queen."
    },
    percy: {
        title: "Percy Jackson",
        image: "images/Percyjackson.webp",
        description: "The Lightning Thief follows the story of young Percy Jackson, a troubled 12-year-old boy with a secret unknown even to himself."
    },
    epic: {
        title: "Epic",
        image: "images/epic.jpg",
        description: "A young girl finds herself transported into an alternate world, where good forces are fighting against their evil counterparts."
    },
    lady: {
        title: "Lady and the Tramp",
        image: "images/ladyANd.webp",
        description: "Lady, a female dog, feels neglected when Jim and Darling get a baby in the house."
    },
    beauty: {
        title: "Beauty and the Beast",
        image: "images/beautyAnd.webp",
        description: "Belle, a beautiful young woman, agrees to live with the Beast in exchange for the return of her abducted father."
    },
    tangled: {
        title: "Tangled",
        image: "images/tangled.webp",
        description: "Rapunzel, an innocent, young girl, is locked up by her overly protective mother."
    }
};

const data = movies[movie];

document.getElementById("title").textContent = data.title;
document.getElementById("poster").src = data.image;
document.getElementById("description").textContent = data.description;
document.getElementById("rating").textContent = data.rating;
document.getElementById("genre").textContent = data.genre;
document.getElementById("year").textContent = data.year;