import React, { useState, useEffect } from 'react';
import '../styles/TranslateArea.css';
import Audio from "../assets/sound.svg";
import Copy from "../assets/Copy.svg";
import Expand from "../assets/Expand_down.svg";
import Sort from "../assets/Sort.svg";

function TranslateArea() {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en'); // Inglês como padrão
    const [targetLang, setTargetLang] = useState('pt'); // Português como padrão
    const [isLanguageChanged, setIsLanguageChanged] = useState(false); // Controle de mudança de idioma

    const fetchTranslation = async (text) => {
        if (!text) {
            setTranslatedText('');
            return;
        }
    
        // Ajuste para usar códigos de idioma padrão
        const langpair = `${sourceLang}|${targetLang}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.responseData) {
                setTranslatedText(data.responseData.translatedText);
            } else {
                setTranslatedText('Erro ao traduzir.');
            }
        } catch (error) {
            console.error('Erro:', error);
            setTranslatedText('Erro ao traduzir.');
        }
    };

    const handleSourceChange = (e) => {
        const value = e.target.value === 'auto' ? 'en' : e.target.value;
        if (value === targetLang) {
            alert('Por favor selecione dois idiomas diferentes');
            return;
        }
        setSourceLang(value);
        setIsLanguageChanged(true); // Marcar que o idioma foi alterado
    };

    const handleTargetChange = (e) => {
        const value = e.target.value;
        if (value === sourceLang) {
            alert('Por favor selecione dois idiomas diferentes');
            return;
        }
        setTargetLang(value);
        setIsLanguageChanged(true); // Marcar que o idioma foi alterado
    };

    const handleChange = (e) => {
        setSourceText(e.target.value);
        if (!isLanguageChanged) {
            fetchTranslation(e.target.value);
        }
    };

    // Atualiza a tradução quando os idiomas são alterados
    useEffect(() => {
        if (isLanguageChanged && sourceText) {
            fetchTranslation(sourceText);
            setIsLanguageChanged(false); // Resetar após a tradução
        }
    }, [sourceLang, targetLang, sourceText, isLanguageChanged]);

    return (
        <div className="containerWrapper">
            <div className="containerApp">
                <div className="menu-languages">
                    <ul>
                        <li><a href="#" className={sourceLang === 'auto' ? 'active' : ''} onClick={() => handleSourceChange({ target: { value: 'auto' } })}>Detect Language</a></li>
                        <li><a href="#" className={sourceLang === 'en' ? 'active' : ''} onClick={() => handleSourceChange({ target: { value: 'en' } })}>English</a></li>
                        <li><a href="#" className={sourceLang === 'pt' ? 'active' : ''} onClick={() => handleSourceChange({ target: { value: 'pt' } })}>Portuguese</a></li>
                        <li><a href="#" className={sourceLang === 'es' ? 'active' : ''} onClick={() => handleSourceChange({ target: { value: 'es' } })}>Spanish</a></li>
                    </ul>
                </div>
                <hr className='hrApp' />
                <div className="areaTranslate">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className='TextContainer'
                            placeholder="Digite o texto aqui..."
                            value={sourceText}
                            onChange={handleChange}
                        />
                        <div className="btn-form">
                            <button className='btn-app audio '><img src={Audio} alt="" /></button>
                            <button className='btn-app copy '><img src={Copy} alt="" /></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="containerWrapper translated">
                <div className="containerApp">
                    <div className="menu-languages">
                        <ul>
                            <li><a href="#" className={targetLang === 'it' ? 'active' : ''} onClick={() => handleTargetChange({ target: { value: 'it' } })}>Italian</a></li>
                            <li><a href="#" className={targetLang === 'es' ? 'active' : ''} onClick={() => handleTargetChange({ target: { value: 'es' } })}>Spanish</a></li>
                            <li><a href="#" className={targetLang === 'en' ? 'active' : ''} onClick={() => handleTargetChange({ target: { value: 'en' } })}>English</a></li>
                            <li><a href="#" className={targetLang === 'pt' ? 'active' : ''} onClick={() => handleTargetChange({ target: { value: 'pt' } })}>Portuguese</a></li>
                        </ul>
                    </div>
                    <hr className='hrApp Hrtranslated' />
                    <div className="areaTranslate">
                        <form action="">
                            <p>{translatedText}</p>
                            <div className="btn-form appForm">
                                <button className='btn-app audio appTranslated'><img src={Audio} alt="" /></button>
                                <button className='btn-app copy appTranslated'><img src={Copy} alt="" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TranslateArea;
