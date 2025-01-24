import React, { useState } from 'react';
import '../styles/TranslateArea.css';
import Sound from '../assets/sound.svg';
import Copy from '../assets/Copy.svg';
import Sort from '../assets/Sort.svg';

function TranslateArea() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeIndexResult, setActiveIndexResult] = useState(null);
    const [fromLanguage, setFromLanguage] = useState("pt"); // Idioma de origem
    const [toLanguage, setToLanguage] = useState("en"); // Idioma de destino

    const languages = ["Detect Language", "English", "Portuguese", "Spanish"];

    const handleItemClick = (index) => {
        if (activeIndexResult === index) return;
        setActiveIndex(index);
        setFromLanguage(languages[index].toLowerCase().slice(0, 2));
    };

    const handleItemClickResult = (index) => {
        if (activeIndex === index) return;
        setActiveIndexResult(index);
        setToLanguage(languages[index].toLowerCase().slice(0, 2));
    };

    const handleInputText = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTranslatedText(inputText, fromLanguage, toLanguage);
    };

    // Função para traduzir o texto
    const fetchTranslatedText = async (text, from, to) => {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

        try {
            const response = await fetch(url);
            const data = await response.json(); // Corrigido o erro aqui

            if (data.responseStatus === 200) {
                setTranslatedText(data.responseData.translatedText);
            } else {
                setTranslatedText("Erro ao traduzir");
            }
        } catch (error) {
            setTranslatedText("Erro na conexão");
        }
    };

    return (
        <div className="appWrapper">
            <div className="containerInputArea">
                <div className="menu-languages">
                    <ul>
                        {languages.map((item, index) => (
                            <li
                                key={`list1-${index}`}
                                onClick={() => handleItemClick(index)}
                                className={activeIndex === index ? 'active' : ''}
                                style={{
                                    pointerEvents: activeIndexResult === index ? 'none' : 'auto',
                                    opacity: activeIndexResult === index ? 0.5 : 1,
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className='hrBar' />
                <div className="areaTextInput">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="inputText"
                            className="inputText"
                            placeholder='Hello, how are you?'
                            maxLength={800}
                            onChange={handleInputText}
                            value={inputText || ''}
                        ></textarea>
                        <div className="btn-container">
                            <div className="btn-function">
                                <button className='SoundArea '><img src={Sound} alt="Sound" /></button>
                                <button className="copyArea "><img src={Copy} alt="Copy" /></button>
                            </div>
                            <div className="numberLetter">
                                <p>{inputText.length}/800</p>
                                <button type="submit" className="btn-translate"><img src={Sort} alt="Sort" /><span>Translate</span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="containerInputArea containerResultArea">
                <div className="menu-languages">
                    <ul>
                        {languages.map((item, index) => (
                            <li
                                key={`list2-${index}`}
                                onClick={() => handleItemClickResult(index)}
                                className={activeIndexResult === index ? 'active' : ''}
                                style={{
                                    pointerEvents: activeIndex === index ? 'none' : 'auto',
                                    opacity: activeIndex === index ? 0.5 : 1,
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className='hrBar' />
                <div className="areaTextInput">
                    <textarea name="inputTextResult" className="inputText" value={translatedText} readOnly>

                    </textarea>
                    <div className="btn-function btn-result">
                        <button className='SoundArea '><img src={Sound} alt="Sound" /></button>
                        <button className="copyArea "><img src={Copy} alt="Copy" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TranslateArea;
