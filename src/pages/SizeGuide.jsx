import { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllEquivalences } from '../services/equivalences';
import { useLanguage } from '../hooks/useLanguage';
import './SizeGuide.css';

export default function SizeGuide() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tops');
    const { language, t } = useLanguage();
    const equivalences = getAllEquivalences(language);

    const activeEquivalence = equivalences.find(e => e.id === activeTab);

    return (
        <div className="size-guide">
            <header className="size-guide-header">
                <button className="btn btn-ghost btn-icon" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>{t('size_guide')}</h1>
            </header>

            <div className="size-guide-info">
                <Info size={18} />
                <p>{t('size_guide_info')}</p>
            </div>

            {/* Category tabs */}
            <div className="size-guide-tabs">
                {equivalences.map((eq) => (
                    <button
                        key={eq.id}
                        className={`tab-btn ${activeTab === eq.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(eq.id)}
                    >
                        {eq.shortTitle}
                    </button>
                ))}
            </div>

            {/* Equivalence table */}
            {activeEquivalence && (
                <div className="equivalence-section animate-fadeIn">
                    <h2>{activeEquivalence.title}</h2>
                    <div className="table-container">
                        <table className="equivalence-table">
                            <thead>
                                <tr>
                                    {activeEquivalence.data.headers.map((header, i) => (
                                        <th key={i}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {activeEquivalence.data.rows.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="size-guide-tips">
                <h3>💡 {t('tips')}</h3>
                <ul>
                    <li><strong>{language === 'es' ? 'Mide siempre' : 'Always measure'}</strong>: {language === 'es' ? 'usa una cinta métrica para conocer tus medidas exactas.' : 'use a tape measure to know your exact measurements.'}</li>
                    <li><strong>{language === 'es' ? 'Entre dos tallas' : 'Between sizes'}</strong>: {language === 'es' ? 'si estás entre dos, elige la mayor si prefieres holgura.' : 'if you\'re between two, choose the larger for a looser fit.'}</li>
                    <li><strong>{language === 'es' ? 'Calzado' : 'Shoes'}</strong>: {language === 'es' ? 'mide tu pie al final del día, cuando está más hinchado.' : 'measure your feet at the end of the day when they\'re most swollen.'}</li>
                    <li><strong>{language === 'es' ? 'Guarda tus tallas' : 'Save your sizes'}</strong>: {language === 'es' ? 'cada marca tiene diferencias, registra las tuyas en Sizes.' : 'each brand differs, record yours in Sizes.'}</li>
                </ul>
            </div>
        </div>
    );
}
