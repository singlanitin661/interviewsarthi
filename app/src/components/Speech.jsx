import React, { useEffect, useState } from 'react';

function Speech() {
    const [recognition, setRecognition] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [speechWarn, setSpeechWarn] = useState('All good!');

    useEffect(() => {
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;

        recognition.onresult = (event) => {
            const speechTokens = speechTokenize(event.results[event.results.length - 1][0].transcript);
            let speechScore = 0;

            fetch("./AFINN.json")
                .then(response => response.json())
                .then(data => {
                    speechTokens.forEach(token => {
                        if (data[token]) {
                            speechScore += data[token];
                        }
                    });

                    if (speechScore >= 0) {
                        setSpeechWarn("All good!");
                    } else {
                        setSpeechWarn("Warning!");
                        alert("PLEASE RESTART SPEECH TO TEXT");
                        Array.from({ length: 3 }, (_, index) => {
                            setTimeout(() => {
                                const audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)();
                                const oscillator = audioCtx.createOscillator();
                                const gainNode = audioCtx.createGain();
                                oscillator.connect(gainNode);
                                gainNode.connect(audioCtx.destination);
                                oscillator.start(audioCtx.currentTime);
                                oscillator.frequency.value = 1320;
                                oscillator.stop(audioCtx.currentTime + 0.05);
                            }, index * 300);
                        });
                    }
                });

            setTranscript(prevTranscript => prevTranscript + event.results[event.results.length - 1][0].transcript);
        };

        setRecognition(recognition);

        return () => {
            recognition.stop();
        };
    }, []);

    const speechTokenize = (input) => {
        return input
            .replace(/[^a-zA-Z ]+/g, '')
            .replace('/ {2,}/', '')
            .toLowerCase()
            .split(' ');
    };

    const startSpeechRecognition = () => {
        recognition.start();
    };

    const stopSpeechRecognition = () => {
        recognition.stop();
    };

    return (
        <div>
            <button onClick={startSpeechRecognition}>Start Speech Recognition</button>
            <button onClick={stopSpeechRecognition}>Stop Speech Recognition</button>
            <p>{transcript}</p>
            <p>{speechWarn}</p>
        </div>
    );
}

export default Speech;
