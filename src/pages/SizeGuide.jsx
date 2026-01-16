import { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllEquivalences } from '../services/equivalences';
import './SizeGuide.css';

export default function SizeGuide() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tops');
    const equivalences = getAllEquivalences();

    const activeEquivalence = equivalences.find(e => e.id === activeTab);

    return (
        <div className="size-guide">
            <header className="size-guide-header">
                <button className="btn btn-ghost btn-icon" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Guía de Tallas</h1>
            </header>

            <div className="size-guide-info">
                <Info size={18} />
                <p>Estas tablas son orientativas. Cada marca puede tener variaciones.</p>
            </div>

            {/* Category tabs */}
            <div className="size-guide-tabs">
                {equivalences.map((eq) => (
                    <button
                        key={eq.id}
                        className={`tab-btn ${activeTab === eq.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(eq.id)}
                    >
                        {eq.title.split(' ')[0]}
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
                <h3>💡 Consejos</h3>
                <ul>
                    <li><strong>Mide siempre</strong>: usa una cinta métrica para conocer tus medidas exactas.</li>
                    <li><strong>Entre dos tallas</strong>: si estás entre dos, elige la mayor si prefieres holgura.</li>
                    <li><strong>Calzado</strong>: mide tu pie al final del día, cuando está más hinchado.</li>
                    <li><strong>Guarda tus tallas</strong>: cada marca tiene diferencias, registra las tuyas en Sizes.</li>
                </ul>
            </div>
        </div>
    );
}
