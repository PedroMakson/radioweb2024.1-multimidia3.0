'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Music, musics } from '@/app/dados/music'; // Importando a lista de músicas

type HomeContextData = {
    playing: boolean;
    volume: number;
    panner: number;
    currentTime: number;
    totalTime: number;
    muted: boolean;
    currentTrack: Music | null;
    configPlayPause: () => void;
    configVolume: (value: number) => void;
    configPanner: (value: number) => void;
    configCurrentTime: (value: number) => void;
    configMuted: () => void;
    changeTrack: (track: Music) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [muted, setMuted] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [panner, setPanner] = useState(0); // Valor inicial do estéreo (0 é centralizado)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null); // AudioContext
    const [pannerNode, setPannerNode] = useState<StereoPannerNode | null>(null); // Nó de estéreo
    const [currentTrack, setCurrentTrack] = useState<Music | null>(null);

    useEffect(() => {
        if (currentTrack) {
            if (audio) {
                audio.pause();
            }

            // Configuração do AudioContext e PannerNode para controle de estéreo
            const newAudio = new Audio(currentTrack.urlAudio);
            const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const newPannerNode = newAudioContext.createStereoPanner();

            const source = newAudioContext.createMediaElementSource(newAudio);
            source.connect(newPannerNode);
            newPannerNode.connect(newAudioContext.destination);
            
            setAudio(newAudio);
            setAudioContext(newAudioContext);
            setPannerNode(newPannerNode);

            newAudio.onloadedmetadata = () => {
                setTotalTime(newAudio.duration);
            };

            newAudio.ontimeupdate = () => {
                setCurrentTime(newAudio.currentTime);
            };

            newAudio.onended = () => {
                // Lógica para a próxima faixa, se necessário
            };

            if (playing) {
                newAudio.play();
            }
        }
    }, [currentTrack]);

    const configPlayPause = () => {
        if (!audio) return;

        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
    };

    const configVolume = (value: number) => {
        if (audio) {
            audio.volume = value;
        }
        setVolume(value);
    };

    const configMuted = () => {
        if (audio) {
            audio.muted = !muted;
        }
        setMuted(!muted);
    };

    const configPanner = (value: number) => {
        if (pannerNode) {
            pannerNode.pan.value = value; // Ajuste do estéreo
        }
        setPanner(value);
    };

    const configCurrentTime = (value: number) => {
        if (audio) {
            audio.currentTime = value;
        }
        setCurrentTime(value);
    };

    const changeTrack = (track: Music) => {
        setCurrentTrack(track);
        setPlaying(true);
    };

    useEffect(() => {
        if (musics.length > 0) {
            changeTrack(musics[0]);
            configPlayPause(); // Iniciar a reprodução da primeira música
        }
    }, []);

    return (
        <HomeContext.Provider value={{
            playing,
            volume,
            panner,
            currentTime,
            totalTime,
            muted,
            currentTrack,
            configPlayPause,
            configVolume,
            configPanner,
            configCurrentTime,
            configMuted,
            changeTrack
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeContextProvider;