import { rest } from 'msw'

export const cookersHandlers = [
    rest.get('/cookers', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.json({
                "cookers": [
                    {
                    "id": 1,
                    "name": "Paco",
                    "course": "Fabes con almejes",
                    "coursePhotos": ["fabesAlmejes1.jpeg"]
                 },
                    {
                    "id": 2,
                    "name": "Lourdes",
                    "course": "Rabo de toro",
                    "coursePhotos": ["rabo1.jpeg"]
                 },
                    {
                    "id": 3,
                    "name": "David",
                    "course": "Alcachofas",
                    "coursePhotos": ["alcachofas1.jpeg"]
                 },
                    {
                    "id": 4,
                    "name": "Carme",
                    "course": "Bacalao con verduras",
                    "coursePhotos": ["bacalao1.jpeg"]
                 },
                    {
                    "id": 5,
                    "name": "Joan",
                    "course": "Costillas de cerdo",
                    "coursePhotos": ["costillas1.jpeg"]
                 },
                    {
                    "id": 6,
                    "name": "Marian",
                    "course": "Croquetas",
                    "coursePhotos": ["croquetas1.jpeg"]
                 },
                    {
                    "id": 7,
                    "name": "Tomeu",
                    "course": "LasaÃ±a",
                    "coursePhotos": ["lasanya1.jpeg"]
                 },
                    {
                    "id": 8,
                    "name": "Reyes",
                    "course": "Tortuguita",
                    "coursePhotos": ["tortuga1.jpeg"]
                 }
              ]
            })
        );
    }),
    rest.get('/cookers/scores', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                scores: [
                    {
                        id: 1,
                        name: 'Paco',
                        score: {
                            taste: 1111,
                            presentation: 10,
                            elaboration: 10,
                            product: 10
                        }
                    },
                    {
                        id: 2,
                        name: 'Lourdes',
                        score: {
                            taste: 10,
                            presentation: 9,
                            elaboration: 10,
                            product: 10
                        }
                    },
                    {
                        id: 3,
                        name: 'David',
                        score: {
                            taste: 10,
                            presentation: 8,
                            elaboration: 9,
                            product: 8
                        }
                    },
                    {
                        id: 4,
                        name: 'Carme',
                        score: {
                            taste: 10,
                            presentation: 7,
                            elaboration: 9,
                            product: 8
                        }
                    },
                    {
                        id: 5,
                        name: 'Joan',
                        score: {
                            taste: 10,
                            presentation: 7,
                            elaboration: 9,
                            product: 9
                        }
                    },
                    {
                        id: 6,
                        name: 'Marian',
                        taste: 10,
                        score: {
                            presentation: 8,
                            elaboration: 8,
                            product: 8
                        }
                    },
                    {
                        id: 7,
                        name: 'Tomeu',
                        score: {
                            taste: 10,
                            presentation: 9,
                            elaboration: 6,
                            product: 6
                        }
                    },
                    {
                        id: 8,
                        name: 'Reyes',
                        score: {
                            taste: 10,
                            presentation: 8,
                            elaboration: 9,
                            product: 10
                        }
                    },
                ],
                pagination: {
                    totalElements: 8,
                    size: 10,
                    page: 1
                }
            })
        );
    }),
    rest.get('/cookers/:id', (req, res, ctx) => {
        const { id } = req.params;
        let cooker;
        switch (parseInt(id)) {
            case 1:
                cooker = {
                    name: 'Pacooo',
                    course: 'Fabes con almejes',
                    description: "Fabes con almejes típicas de Asturias. Uso de compango ahumado y fabes con 8 horas en remojo.",
                    cookerPhoto: 'paco.jpeg',
                    coursePhotos: ['fabesAlmejes1.jpeg', 'fabesAlmejes2.jpeg', 'fabesAlmejes3.jpeg'],
                    position: 1,
                    score: 150.25
                }
                break;
            case 2:
                cooker = {
                    name: 'Lourdessss',
                    course: 'Rabo de toro',
                    description: "Rabo de toro con reducción de vino. Cocción fuengo lento durante 3 horas",
                    cookerPhoto: 'lourdes.jpeg',
                    coursePhotos: ['rabo1.jpeg', 'rabo2.jpeg', 'rabo3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 3:
                cooker = {
                    name: 'David',
                    course: 'Alcachofas',
                    description: "Alcachofas de temporada gratinadas al horno.",
                    cookerPhoto: 'David.jpeg',
                    coursePhotos: ['alcachofas1.jpeg', 'alcachofas2.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 4:
                cooker = {
                    name: 'Carme',
                    course: 'Bacalao con verduras',
                    description: "Bacalao sobre lecho de verduras crujiente.",
                    cookerPhoto: 'Carme.jpeg',
                    coursePhotos: ['bacalao1.jpeg', 'bacalao2.jpeg', 'bacalao3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 5:
                cooker = {
                    name: 'Joan',
                    course: 'Costillas de cerdo',
                    description: "Costillas de cerdo al horno a baja temperatura con salsa barbacoa.",
                    cookerPhoto: 'Joan.jpeg',
                    coursePhotos: ['costillas1.jpeg', 'costillas2.jpeg', 'costillas3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 6:
                cooker = {
                    name: 'Marian',
                    course: 'Croquetas',
                    description: "Croquetas variadas.",
                    cookerPhoto: 'Marian.jpeg',
                    coursePhotos: ['croquetas1.jpeg', 'croquetas2.jpeg', 'croquetas3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 7:
                cooker = {
                    name: 'Tomeu',
                    course: 'Lasaña',
                    description: "Lasaña de verduras.",
                    cookerPhoto: 'Tomeu.jpeg',
                    coursePhotos: ['lasanya1.jpeg', 'lasanya2.jpeg', 'lasanya3.jpeg', 'lasanya4.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            case 8:
                cooker = {
                    name: 'Reyes',
                    course: 'Tortuguita',
                    description: "Bocadillo en forma de tortiguta rellena de varios embutidos.",
                    cookerPhoto: 'Reyes.jpeg',
                    coursePhotos: ['tortuga1.jpeg', 'tortuga2.jpeg', 'tortuga3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
            default:
                cooker = {
                    name: 'Antonia',
                    course: 'Rabo de toro',
                    description: "Rabo de toro con reducción de vino. Cocción fuengo lento durante 3 horas",
                    cookerPhoto: 'lourdes.jpeg',
                    coursePhotos: ['rabo1.jpeg', 'rabo2.jpeg', 'rabo3.jpeg'],
                    position: 2,
                    score: 22.5
                }
                break;
        }
        return res(
            ctx.status(200),
            ctx.json(cooker)
        );
    })
];
