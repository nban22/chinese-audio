import Album from "../models/album";

const albumList = [
    {
        title: "Thriller",
        description: "The best-selling album of all time by Michael Jackson.",
        avatar: "https://robohash.org/thriller?set=set2",
        releaseDate: new Date("1982-11-30"),
        isPublic: true,
    },
    {
        title: "Back in Black",
        description: "A legendary rock album by AC/DC.",
        avatar: "https://robohash.org/backinblack?set=set2",
        releaseDate: new Date("1980-07-25"),
        isPublic: true,
    },
    {
        title: "The Dark Side of the Moon",
        description: "A timeless classic by Pink Floyd.",
        avatar: "https://robohash.org/darksidemoon?set=set2",
        releaseDate: new Date("1973-03-01"),
        isPublic: true,
    },
    {
        title: "Abbey Road",
        description: "A masterpiece by The Beatles featuring iconic tracks.",
        avatar: "https://robohash.org/abbeyroad?set=set2",
        releaseDate: new Date("1969-09-26"),
        isPublic: true,
    },
    {
        title: "Rumours",
        description: "One of the most celebrated albums by Fleetwood Mac.",
        avatar: "https://robohash.org/rumours?set=set2",
        releaseDate: new Date("1977-02-04"),
        isPublic: true,
    },
    {
        title: "25",
        description: "A soulful album by Adele, filled with emotional ballads.",
        avatar: "https://robohash.org/25adele?set=set2",
        releaseDate: new Date("2015-11-20"),
        isPublic: true,
    },
    {
        title: "Good Kid, M.A.A.D City",
        description: "A groundbreaking hip-hop album by Kendrick Lamar.",
        avatar: "https://robohash.org/gkmc?set=set2",
        releaseDate: new Date("2012-10-22"),
        isPublic: true,
    },
    {
        title: "Born to Die",
        description: "A dreamy, melancholic album by Lana Del Rey.",
        avatar: "https://robohash.org/borntodie?set=set2",
        releaseDate: new Date("2012-01-27"),
        isPublic: true,
    },
    {
        title: "The Eminem Show",
        description: "A chart-topping rap album by Eminem.",
        avatar: "https://robohash.org/eminemshow?set=set2",
        releaseDate: new Date("2002-05-26"),
        isPublic: true,
    },
    {
        title: "Lemonade",
        description: "A visual and musical album by Beyoncé exploring themes of identity and empowerment.",
        avatar: "https://robohash.org/lemonade?set=set2",
        releaseDate: new Date("2016-04-23"),
        isPublic: true,
    },
    {
        title: "1989",
        description: "A pop sensation by Taylor Swift.",
        avatar: "https://robohash.org/1989taylorswift?set=set2",
        releaseDate: new Date("2014-10-27"),
        isPublic: true,
    },
    {
        title: "Hotel California",
        description: "A rock album by the Eagles featuring the iconic title track.",
        avatar: "https://robohash.org/hotelcalifornia?set=set2",
        releaseDate: new Date("1976-12-08"),
        isPublic: true,
    },
    {
        title: "Nevermind",
        description: "The grunge classic by Nirvana that defined an era.",
        avatar: "https://robohash.org/nevermind?set=set2",
        releaseDate: new Date("1991-09-24"),
        isPublic: true,
    },
    {
        title: "Purple Rain",
        description: "A genre-defying album by Prince.",
        avatar: "https://robohash.org/purplerain?set=set2",
        releaseDate: new Date("1984-06-25"),
        isPublic: true,
    },
    {
        title: "21",
        description: "A heartfelt album by Adele about heartbreak and healing.",
        avatar: "https://robohash.org/21adele?set=set2",
        releaseDate: new Date("2011-01-24"),
        isPublic: true,
    },
    {
        title: "Revolver",
        description: "A groundbreaking album by The Beatles.",
        avatar: "https://robohash.org/revolver?set=set2",
        releaseDate: new Date("1966-08-05"),
        isPublic: true,
    },
    {
        title: "A Night at the Opera",
        description: "An operatic rock masterpiece by Queen.",
        avatar: "https://robohash.org/nightopera?set=set2",
        releaseDate: new Date("1975-11-21"),
        isPublic: true,
    },
    {
        title: "OK Computer",
        description: "A critically acclaimed album by Radiohead.",
        avatar: "https://robohash.org/okcomputer?set=set2",
        releaseDate: new Date("1997-05-21"),
        isPublic: true,
    },
    {
        title: "The Wall",
        description: "A concept album by Pink Floyd about isolation and self-discovery.",
        avatar: "https://robohash.org/thewall?set=set2",
        releaseDate: new Date("1979-11-30"),
        isPublic: true,
    },
    {
        title: "Random Access Memories",
        description: "A retro-inspired album by Daft Punk.",
        avatar: "https://robohash.org/randomaccessmemories?set=set2",
        releaseDate: new Date("2013-05-17"),
        isPublic: true,
    },
    {
        title: "Hybrid Theory",
        description: "The debut album by Linkin Park that revolutionized nu-metal.",
        avatar: "https://robohash.org/hybridtheory?set=set2",
        releaseDate: new Date("2000-10-24"),
        isPublic: true,
    },
    {
        title: "To Pimp a Butterfly",
        description: "A groundbreaking album by Kendrick Lamar.",
        avatar: "https://robohash.org/pimpabutterfly?set=set2",
        releaseDate: new Date("2015-03-15"),
        isPublic: true,
    },
    {
        title: "Fearless",
        description: "Taylor Swift's country-pop breakthrough album.",
        avatar: "https://robohash.org/fearlesstaylorswift?set=set2",
        releaseDate: new Date("2008-11-11"),
        isPublic: true,
    },
];


export const albumSeeder = async () => {
    try {
        for (const album of albumList) {
            await Album.create(album);
            console.log(`Album ${album.title} created`);
            
        }
    } catch (error) {
        console.log("Error in albumSeeder", error);
        throw error;        
    }
}