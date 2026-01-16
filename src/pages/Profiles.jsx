import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, User, Trash2, Edit2, Ruler, Share2, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { getProfiles, createProfile, updateProfile, deleteProfile, PROFILE_COLORS } from '../services/db';
import { generateShareLink, copyToClipboard, nativeShare } from '../services/share';
import './Profiles.css';

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);
    const [formData, setFormData] = useState({ name: '', color: 'blue' });
    const [shareMessage, setShareMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProfiles();
    }, []);

    async function loadProfiles() {
        try {
            const data = await getProfiles();
            setProfiles(data);
        } catch (error) {
            console.error('Error loading profiles:', error);
        } finally {
            setLoading(false);
        }
    }

    function openModal(profile = null) {
        if (profile) {
            setEditingProfile(profile);
            setFormData({ name: profile.name, color: profile.color });
        } else {
            setEditingProfile(null);
            setFormData({ name: '', color: 'blue' });
        }
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingProfile(null);
        setFormData({ name: '', color: 'blue' });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.name.trim()) return;

        try {
            if (editingProfile) {
                await updateProfile(editingProfile.id, formData);
            } else {
                await createProfile(formData);
            }
            await loadProfiles();
            closeModal();
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    }

    async function handleDelete(id, e) {
        e.stopPropagation();
        if (confirm('¿Eliminar este perfil y todas sus tallas?')) {
            try {
                await deleteProfile(id);
                await loadProfiles();
            } catch (error) {
                console.error('Error deleting profile:', error);
            }
        }
    }

    function handleEdit(profile, e) {
        e.stopPropagation();
        openModal(profile);
    }

    async function handleShare(profile, e) {
        e.stopPropagation();
        try {
            const url = await generateShareLink(profile.id);

            // Try native share first
            const shared = await nativeShare(
                `Tallas de ${profile.name}`,
                `Mira mis tallas de ropa`,
                url
            );

            if (!shared) {
                // Fallback to copy
                await copyToClipboard(url);
                setShareMessage(`Link copiado para ${profile.name}`);
                setTimeout(() => setShareMessage(null), 3000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }

    if (loading) {
        return (
            <Layout title="Sizes">
                <div className="empty-state">
                    <p>Cargando...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Sizes">
            {/* Size Guide Link */}
            <Link to="/size-guide" className="size-guide-link card animate-fadeIn">
                <Ruler size={24} />
                <div>
                    <h4>Guía de Tallas</h4>
                    <p>Consulta equivalencias EU/UK/US</p>
                </div>
            </Link>

            {profiles.length === 0 ? (
                <div className="empty-state animate-fadeIn">
                    <User size={64} />
                    <h3>Sin perfiles</h3>
                    <p>Añade un perfil para empezar a guardar tus tallas</p>
                </div>
            ) : (
                <div className="profiles-grid animate-slideUp">
                    {profiles.map((profile) => (
                        <div
                            key={profile.id}
                            className={`profile-card card card-interactive profile-color-${profile.color}`}
                            onClick={() => navigate(`/profile/${profile.id}`)}
                        >
                            <div className="profile-avatar" style={{ background: `var(--profile-color)` }}>
                                {profile.avatar}
                            </div>
                            <div className="profile-info">
                                <h3 className="profile-name">{profile.name}</h3>
                            </div>
                            <div className="profile-actions">
                                <button
                                    className="btn btn-ghost btn-icon"
                                    onClick={(e) => handleShare(profile, e)}
                                    title="Compartir"
                                >
                                    <Share2 size={18} />
                                </button>
                                <button
                                    className="btn btn-ghost btn-icon"
                                    onClick={(e) => handleEdit(profile, e)}
                                    title="Editar"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    className="btn btn-ghost btn-icon"
                                    onClick={(e) => handleDelete(profile.id, e)}
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="fab" onClick={() => openModal()}>
                <Plus size={24} />
            </button>

            {/* Share toast */}
            {shareMessage && (
                <div className="share-toast animate-slideUp">
                    <CheckCircle size={18} />
                    <span>{shareMessage}</span>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title={editingProfile ? 'Editar perfil' : 'Nuevo perfil'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej: Juan, Mi hijo..."
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <div className="color-picker">
                            {PROFILE_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`color-option profile-color-${color} ${formData.color === color ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, color })}
                                >
                                    <span style={{ background: `var(--profile-color)` }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingProfile ? 'Guardar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
