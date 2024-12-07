import Album from "../models/album";
import Series from "../models/series";
import SeriesAlbum from "../models/seriesAlbum";

const seriesList = [
    {
        title: "The Evolution of Pop",
    },
    {
        title: "Rock Legends: Timeless Classics",
    },
    {
        title: "Hip-Hop Revolution",
    },
    {
        title: "Soulful Ballads and Heartbreak",
    },
    {
        title: "The British Invasion",
    },
    {
        title: "Icons of the 80s",
    },
    {
        title: "The Golden Era of Rock",
    },
    {
        title: "Timeless Albums That Changed the World",
    },
    {
        title: "The Art of Concept Albums",
    },
    {
        title: "Grunge and Alternative Rock Movement",
    },
    {
        title: "The Queen of Pop: A Retrospective",
    },
    {
        title: "Music that Defined Generations",
    },
    {
        title: "Genre-Defying Masterpieces",
    },
    {
        title: "The Soundtrack of the 70s",
    },
    {
        title: "Legendary Bands and Their Stories",
    },
    {
        title: "Cultural Phenomena in Music",
    },
    {
        title: "Greatest Hits of All Time",
    },
    {
        title: "The Rise of Electronic Music",
    },
    {
        title: "Storytellers: The Power of Lyrics",
    },
    {
        title: "Breaking Barriers: Women in Music",
    },
    {
        title: "Revolutionary Albums of the 90s",
    },
    {
        title: "Music as Social Commentary",
    },
    {
        title: "Pioneers of Modern Sounds",
    },
    {
        title: "The Legacy of Iconic Artists",
    },
];

export const seriesSeeder = async () => {
    try {
        for (let series of seriesList) {
            const newSeries = await Series.create(series);
        }
        console.log("Series seeded successfully");

        const albumList = await Album.findAll({ attributes: ["id"], raw: true });
        const seriesList2 = await Series.findAll({ attributes: ["id"], raw: true });

        for (let series of seriesList2) {
            const albumCount = Math.floor(Math.random() * albumList.length);
            const ranAlbumSet = new Set();
            // Randomly select albums to create a series
            for (let i = 0; i < albumCount; i++) {
                const album = albumList[Math.floor(Math.random() * albumList.length)];
                ranAlbumSet.add(album);
            }
            const ranAlbumList = [...ranAlbumSet];
            // Create series-album relationship
            for (let album of ranAlbumList) {
                const seriesAlbum = {
                    seriesId: series.id,
                    albumId: (album as { id: number }).id,
                };
                await SeriesAlbum.create(seriesAlbum);
            }
        }
        console.log("Series-Album relationship seeded successfully");
    } catch (error) {
        console.error("Error in seriesSeeder", error);
        throw error;
    }
};
