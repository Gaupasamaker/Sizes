import React from 'react';
import { CATEGORIES } from '../services/db';

export const ProfileShareCard = React.forwardRef(({ profile, brands }, ref) => {
    if (!profile) return null;

    return (
        <div
            ref={ref}
            style={{
                position: 'fixed',
                top: '-9999px',
                left: '-9999px',
                width: '1080px',
                padding: '60px',
                background: `var(--profile-color-${profile.color}-light, #f0f9ff)`,
                color: '#1a1a2e',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                borderRadius: '40px',
                boxSizing: 'border-box'
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: '30px',
                padding: '40px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{
                        fontSize: '64px',
                        margin: '0 0 10px 0',
                        color: `var(--profile-color-${profile.color}, #3b82f6)`
                    }}>
                        {profile.name}
                    </h1>
                    <p style={{ fontSize: '32px', color: '#64748b', margin: 0 }}>
                        {profile.type === 'woman' ? 'Mujer' : profile.type === 'child' ? 'Niño/Niña' : 'Hombre'}
                        {profile.height ? ` • ${profile.height} cm` : ''}
                        {profile.weight ? ` • ${profile.weight} kg` : ''}
                    </p>
                </div>

                {brands && brands.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {brands.map(brand => (
                            <div key={brand.name} style={{
                                background: '#f8fafc',
                                borderRadius: '20px',
                                padding: '30px'
                            }}>
                                <h2 style={{ fontSize: '40px', margin: '0 0 20px 0', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' }}>
                                    {brand.name}
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                    {brand.sizes.map((size, index) => {
                                        const categoryInfo = CATEGORIES.find(c => c.id === size.category);
                                        return (
                                            <div key={index} style={{
                                                background: 'white',
                                                padding: '20px',
                                                borderRadius: '15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                                            }}>
                                                <span style={{ fontSize: '36px' }}>{categoryInfo?.icon || '👕'}</span>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '24px', color: '#64748b' }}>{categoryInfo?.name || size.category}</div>
                                                    <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{size.size}</div>
                                                </div>
                                                {size.photo && (
                                                    <div style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}>
                                                        <img
                                                            src={size.photo}
                                                            alt="Etiqueta"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', fontSize: '32px', color: '#94a3b8', padding: '60px 0' }}>
                        No hay tallas registradas todavía.
                    </div>
                )}

                <div style={{
                    marginTop: '50px',
                    borderTop: '2px dashed #e2e8f0',
                    paddingTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src="/logo-sizes.png"
                        alt="Tallas App"
                        style={{ height: '180px', opacity: 0.8 }}
                    />
                </div>
            </div>
        </div>
    );
});

ProfileShareCard.displayName = 'ProfileShareCard';
