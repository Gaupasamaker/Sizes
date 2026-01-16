import { useState, useRef } from 'react';
import { Download, Upload, Info, CheckCircle, AlertTriangle, Sun, Moon } from 'lucide-react';
import Layout from '../components/Layout';
import { exportData, importData } from '../services/db';
import { useTheme } from '../hooks/useTheme';
import './Settings.css';

export default function Settings() {
    const [importing, setImporting] = useState(false);
    const [message, setMessage] = useState(null);
    const fileInputRef = useRef(null);
    const { theme, toggleTheme } = useTheme();

    async function handleExport() {
        try {
            await exportData();
            showMessage('success', 'Datos exportados correctamente');
        } catch (error) {
            console.error('Error exporting:', error);
            showMessage('error', 'Error al exportar los datos');
        }
    }

    function handleImportClick() {
        fileInputRef.current?.click();
    }

    async function handleFileSelect(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm('¿Importar datos? Esto reemplazará todos los datos actuales.')) {
            e.target.value = '';
            return;
        }

        setImporting(true);
        try {
            const result = await importData(file);
            showMessage('success', `Importados: ${result.profiles} perfiles, ${result.brands} marcas, ${result.sizes} tallas`);
        } catch (error) {
            console.error('Error importing:', error);
            showMessage('error', 'Error al importar. Verifica que el archivo es válido.');
        } finally {
            setImporting(false);
            e.target.value = '';
        }
    }

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    }

    return (
        <Layout title="Ajustes">
            <div className="settings-container animate-fadeIn">
                {/* Appearance section */}
                <section className="settings-section">
                    <h3 className="settings-section-title">Apariencia</h3>

                    <div className="settings-card card">
                        <div className="settings-item" onClick={toggleTheme}>
                            <div className="settings-item-icon">
                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <div className="settings-item-content">
                                <h4>Tema {theme === 'dark' ? 'Oscuro' : 'Claro'}</h4>
                                <p>Toca para cambiar al modo {theme === 'dark' ? 'claro' : 'oscuro'}</p>
                            </div>
                            <div className="theme-toggle">
                                <div className={`toggle-switch ${theme === 'light' ? 'active' : ''}`}>
                                    <div className="toggle-knob" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Export/Import section */}
                <section className="settings-section">
                    <h3 className="settings-section-title">Copia de seguridad</h3>

                    <div className="settings-card card">
                        <div className="settings-item" onClick={handleExport}>
                            <div className="settings-item-icon">
                                <Download size={20} />
                            </div>
                            <div className="settings-item-content">
                                <h4>Exportar datos</h4>
                                <p>Descarga un archivo JSON con todos tus datos</p>
                            </div>
                        </div>

                        <div className="settings-divider" />

                        <div className="settings-item" onClick={handleImportClick}>
                            <div className="settings-item-icon">
                                <Upload size={20} />
                            </div>
                            <div className="settings-item-content">
                                <h4>{importing ? 'Importando...' : 'Importar datos'}</h4>
                                <p>Restaura datos desde un archivo de copia de seguridad</p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </div>
                </section>

                {/* App info section */}
                <section className="settings-section">
                    <h3 className="settings-section-title">Información</h3>

                    <div className="settings-card card">
                        <div className="settings-item">
                            <div className="settings-item-icon">
                                <Info size={20} />
                            </div>
                            <div className="settings-item-content">
                                <h4>Sizes</h4>
                                <p>Versión 1.1.0</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Install PWA hint */}
                <section className="settings-section">
                    <div className="pwa-hint card">
                        <h4>💡 Instala la app</h4>
                        <p>
                            En Chrome o Safari, pulsa el menú (⋮) y selecciona "Añadir a pantalla de inicio" o "Instalar"
                            para tener Sizes como una app en tu dispositivo.
                        </p>
                    </div>
                </section>
            </div>

            {/* Toast message */}
            {message && (
                <div className={`toast toast-${message.type} animate-slideUp`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}
        </Layout>
    );
}
