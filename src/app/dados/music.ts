export type Music = {
    name: string;
    author: string;
    description: string;
    urlAudio: string;
    image: string; // Imagem existente
    singleCover: string; // Capa dos singles
}

export const musics: Music[] = [
    {
        name: "Envolver",
        author: "Anitta",
        description: "Uma faixa de reggaeton com um ritmo cativante e uma batida envolvente. A música destaca o estilo sensual e energético de Anitta, com um refrão que gruda facilmente e uma produção moderna. 'Envolver' fez história ao tornar Anitta a primeira artista latina solo a alcançar o top #1 do Spotify Global, atraindo audiências internacionais e solidificando sua presença no cenário musical global.",
        urlAudio: "audios/Envolver.mp3",
        image: "imagens/Anitta.jpg", // Imagem existente
        singleCover: "imagens/CapaAnitta.jpg" // Capa dos singles
    },
    {
        name: "Bem Pior Que Eu",
        author: "Marília Mendonça",
        description: "Uma canção sertaneja que aborda a dor de um término amoroso com uma letra intensa e emocional. Marília Mendonça, conhecida por sua habilidade em transmitir sentimentos através da música, oferece uma interpretação sincera e tocante sobre o sofrimento e a superação após o fim de um relacionamento. Eterna Marília, ela é reconhecida como a maior artista feminina do sertanejo, tendo deixado um legado significativo na música.",
        urlAudio: "audios/BemPiorQueEu.mp3",
        image: "imagens/Marilia.jpg", // Imagem existente
        singleCover: "imagens/CapaMarilia.jpg" // Capa dos singles
    },
    {
        name: "Apelido Carinhoso",
        author: "Gusttavo Lima",
        description: "Uma canção sertaneja romântica que celebra o amor e a intimidade em um relacionamento. Com uma melodia suave e letras carinhosas, a música reflete a ternura e a simplicidade de um afeto profundo entre casais. Gusttavo Lima transmite sentimentos de afeto e paixão, tornando a música uma escolha popular entre os fãs do sertanejo.",
        urlAudio: "audios/ApelidoCarinhoso.mp3",
        image: "imagens/Gusttavo.jpg", // Imagem existente
        singleCover: "imagens/CapaGusttavo.jpg" // Capa dos singles
    }
];
