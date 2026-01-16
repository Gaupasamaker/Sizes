import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, ChevronRight, AlertCircle, Home } from 'lucide-react';
import { decodeShareData } from '../services/share';
import { CATEGORIES, FIT_OPTIONS } from '../services/db';
import './SharedProfile.css';

export default function SharedProfile() {
    const { data } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (data) {
            const decoded = decodeShareData(data);
            if (decoded) {
                setProfile(decoded);
            } else {
                setError(true);
            }
        }
    }, [data]);

    function getFitBadge(fit) {
        const option = FIT_OPTIONS.find(f => f.id === fit);
        if (!option || fit === 'normal') return null;
        return (
            <span className={`fit-badge fit-${fit}`}>
                {option.icon} {option.name}
            </span>
        );
    }

    function getCategoryIcon(categoryId) {
        const cat = CATEGORIES.find(c => c.id === categoryId);
        return cat?.icon || '📦';
    }

    if (error) {
        return (
            <div className="shared-profile-error">
                <AlertCircle size={64} />
                <h2>Link inválido</h2>
                <p>Este enlace de tallas no es válido o ha caducado.</p>
                <Link to="/" className="btn btn-primary">
                    <Home size={18} />
                    Ir a Sizes
                </Link>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="shared-profile-loading">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="shared-profile">
            <header className="shared-header">
                <div className={`shared-avatar profile-color-${profile.c}`}>
                    <User size={24} />
                </div>
                <div>
                    <h1>Tallas de {profile.n}</h1>
                    <p className="shared-subtitle">Compartido desde Sizes</p>
                </div>
            </header>

            <div className="shared-brands">
                {profile.b.length === 0 ? (
                    <div className="shared-empty">
                        <p>Este perfil no tiene tallas guardadas.</p>
                    </div>
                ) : (
                    profile.b.map((brand, brandIdx) => (
                        <div key={brandIdx} className="shared-brand card">
                            <h3 className="shared-brand-name">{brand.name}</h3>
                            {brand.notes && <p className="shared-brand-notes">{brand.notes}</p>}

                            {brand.sizes.length === 0 ? (
                                <p className="text-muted">Sin tallas</p>
                            ) : (
                                <div className="shared-sizes">
                                    {brand.sizes.map((size, sizeIdx) => (
                                        <div key={sizeIdx} className="shared-size-tag">
                                            <span className="shared-size-icon">
                                                {getCategoryIcon(size.category)}
                                            </span>
                                            <span className="shared-size-value">{size.size}</span>
                                            {getFitBadge(size.fit)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="shared-footer">
                <p>¿Quieres guardar tus propias tallas?</p>
                <Link to="/" className="btn btn-primary">
                    Probar Sizes gratis
                </Link>
            </div>
        </div>
    );
}
