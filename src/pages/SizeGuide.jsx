import { useState, useEffect } from 'react';
import { ArrowLeft, Info, User, Baby } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllEquivalences } from '../services/equivalences';
import { useLanguage } from '../hooks/useLanguage';
import './SizeGuide.css';

export default function SizeGuide() {
    const navigate = useNavigate();
    const [activeGender, setActiveGender] = useState('man');
    const [activeTab, setActiveTab] = useState(null);
    const { language, t } = useLanguage();

    // Get all tables
    const allEquivalences = getAllEquivalences(language);

    // Filter by gender
    const filteredEquivalences = allEquivalences.filter(eq =>
        eq.gender.includes(activeGender)
    );

    // Set default tab when gender changes
    useEffect(() => {
        if (filteredEquivalences.length > 0) {
            // Try to keep same category if possible, else first available
            const exists = filteredEquivalences.find(eq => eq.id === activeTab);
            if (!exists) {
                setActiveTab(filteredEquivalences[0].id);
            }
        }
    }, [activeGender, language]);

    const activeEquivalence = filteredEquivalences.find(e => e.id === activeTab);

    // Filter columns if needed (e.g. Shoes US Men vs Women)
    const getFilteredHeaders = (eq) => {
        if (eq.hasGenderColumns && eq.id === 'shoes') {
            // Index 2 is US Men, 3 is US Women
            const hideIndex = activeGender === 'man' ? 3 : 2;
            return eq.data.headers.filter((_, i) => i !== hideIndex);
        }
        return eq.data.headers;
    };

    const getFilteredRow = (eq, row) => {
        if (eq.hasGenderColumns && eq.id === 'shoes') {
            const hideIndex = activeGender === 'man' ? 3 : 2;
            return row.filter((_, i) => i !== hideIndex);
        }
        return row;
    };

    return (
        <div className="size-guide">
            <header className="size-guide-header">
                <button className="btn btn-ghost btn-icon" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>{t('size_guide')}</h1>
            </header>

            {/* Gender Selector */}
            <div className="guide-gender-selector">
                <button
                    className={`gender-btn ${activeGender === 'man' ? 'active' : ''}`}
                    onClick={() => setActiveGender('man')}
                >
                    <User size={18} />
                    <span>{t('type_man')}</span>
                </button>
                <button
                    className={`gender-btn ${activeGender === 'woman' ? 'active' : ''}`}
                    onClick={() => setActiveGender('woman')}
                >
                    <User size={18} />
                    <span>{t('type_woman')}</span>
                </button>
                <button
                    className={`gender-btn ${activeGender === 'child' ? 'active' : ''}`}
                    onClick={() => setActiveGender('child')}
                >
                    <Baby size={18} />
                    <span>{t('type_child')}</span>
                </button>
            </div>

            <div className="size-guide-info">
                <Info size={18} />
                <p>{t('size_guide_info')}</p>
            </div>

            {/* Category tabs */}
            {filteredEquivalences.length > 0 && (
                <div className="size-guide-tabs">
                    {filteredEquivalences.map((eq) => (
                        <button
                            key={eq.id}
                            className={`tab-btn ${activeTab === eq.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(eq.id)}
                        >
                            {eq.shortTitle}
                        </button>
                    ))}
                </div>
            )}

            {/* Equivalence table */}
            {activeEquivalence && (
                <div className="equivalence-section animate-fadeIn">
                    <h2>{activeEquivalence.title}</h2>
                    <div className="table-container">
                        <table className="equivalence-table">
                            <thead>
                                <tr>
                                    {getFilteredHeaders(activeEquivalence).map((header, i) => (
                                        <th key={i}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {activeEquivalence.data.rows.map((row, i) => (
                                    <tr key={i}>
                                        {getFilteredRow(activeEquivalence, row).map((cell, j) => (
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
