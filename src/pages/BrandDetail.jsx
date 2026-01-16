import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { getBrand, updateBrand, deleteBrand, getSizesByBrand, createSize, updateSize, deleteSize, CATEGORIES, FIT_OPTIONS } from '../services/db';
import './BrandDetail.css';

export default function BrandDetail() {
    const { brandId } = useParams();
    const navigate = useNavigate();
    const [brand, setBrand] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sizeModalOpen, setSizeModalOpen] = useState(false);
    const [brandModalOpen, setBrandModalOpen] = useState(false);
    const [editingSize, setEditingSize] = useState(null);
    const [sizeForm, setSizeForm] = useState({ category: 'tops', size: '', fit: 'normal', notes: '' });
    const [brandForm, setBrandForm] = useState({ name: '', notes: '' });

    useEffect(() => {
        loadData();
    }, [brandId]);

    async function loadData() {
        try {
            const brandData = await getBrand(brandId);
            if (!brandData) {
                navigate('/');
                return;
            }
            setBrand(brandData);
            setBrandForm({ name: brandData.name, notes: brandData.notes || '' });

            const sizesData = await getSizesByBrand(brandId);
            setSizes(sizesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    }

    // Size modal handlers
    function openSizeModal(size = null) {
        if (size) {
            setEditingSize(size);
            setSizeForm({ category: size.category, size: size.size, fit: size.fit, notes: size.notes || '' });
        } else {
            setEditingSize(null);
            setSizeForm({ category: 'tops', size: '', fit: 'normal', notes: '' });
        }
        setSizeModalOpen(true);
    }

    function closeSizeModal() {
        setSizeModalOpen(false);
        setEditingSize(null);
        setSizeForm({ category: 'tops', size: '', fit: 'normal', notes: '' });
    }

    async function handleSizeSubmit(e) {
        e.preventDefault();
        if (!sizeForm.size.trim()) return;

        try {
            if (editingSize) {
                await updateSize(editingSize.id, sizeForm);
            } else {
                await createSize({ ...sizeForm, brandId });
            }
            await loadData();
            closeSizeModal();
        } catch (error) {
            console.error('Error saving size:', error);
        }
    }

    async function handleDeleteSize(id) {
        if (confirm('¿Eliminar esta talla?')) {
            try {
                await deleteSize(id);
                await loadData();
            } catch (error) {
                console.error('Error deleting size:', error);
            }
        }
    }

    // Brand modal handlers
    function openBrandModal() {
        setBrandModalOpen(true);
    }

    function closeBrandModal() {
        setBrandModalOpen(false);
    }

    async function handleBrandSubmit(e) {
        e.preventDefault();
        if (!brandForm.name.trim()) return;

        try {
            await updateBrand(brandId, brandForm);
            await loadData();
            closeBrandModal();
        } catch (error) {
            console.error('Error updating brand:', error);
        }
    }

    async function handleDeleteBrand() {
        if (confirm('¿Eliminar esta marca y todas sus tallas?')) {
            try {
                await deleteBrand(brandId);
                navigate(-1);
            } catch (error) {
                console.error('Error deleting brand:', error);
            }
        }
    }

    // Group sizes by category
    function getSizesByCategory() {
        const grouped = {};
        CATEGORIES.forEach(cat => {
            grouped[cat.id] = sizes.filter(s => s.category === cat.id);
        });
        return grouped;
    }

    function getFitBadge(fit) {
        const option = FIT_OPTIONS.find(f => f.id === fit);
        if (!option || fit === 'normal') return null;
        return (
            <span className={`fit-badge fit-${fit}`}>
                {option.icon} {option.name}
            </span>
        );
    }

    if (loading) {
        return (
            <Layout title="Cargando..." showBack>
                <div className="empty-state">
                    <p>Cargando...</p>
                </div>
            </Layout>
        );
    }

    const sizesByCategory = getSizesByCategory();

    return (
        <Layout title={brand?.name || 'Marca'} showBack>
            {/* Brand header */}
            <div className="brand-header card animate-fadeIn">
                <div className="brand-header-info">
                    <h2>{brand.name}</h2>
                    {brand.notes && <p className="brand-notes">{brand.notes}</p>}
                </div>
                <div className="brand-header-actions">
                    <button className="btn btn-ghost btn-icon" onClick={openBrandModal} title="Editar">
                        <Edit2 size={18} />
                    </button>
                    <button className="btn btn-ghost btn-icon" onClick={handleDeleteBrand} title="Eliminar">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Sizes by category */}
            <div className="sizes-container animate-slideUp">
                {CATEGORIES.map((category) => {
                    const categorySizes = sizesByCategory[category.id];

                    return (
                        <div key={category.id} className="category-section">
                            <h3 className="category-title">
                                <span className="category-icon">{category.icon}</span>
                                {category.name}
                            </h3>

                            {categorySizes.length === 0 ? (
                                <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '8px' }}>
                                    Sin tallas
                                </p>
                            ) : (
                                <div className="sizes-grid">
                                    {categorySizes.map((size) => (
                                        <div key={size.id} className="size-card">
                                            <div className="size-main">
                                                <span className="size-value">{size.size}</span>
                                                {getFitBadge(size.fit)}
                                            </div>
                                            {size.notes && (
                                                <p className="size-notes">{size.notes}</p>
                                            )}
                                            <div className="size-actions">
                                                <button
                                                    className="btn btn-ghost btn-icon"
                                                    onClick={() => openSizeModal(size)}
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-icon"
                                                    onClick={() => handleDeleteSize(size.id)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {sizes.length === 0 && (
                <div className="empty-hint">
                    <AlertCircle size={20} />
                    <span>Pulsa + para añadir tu primera talla</span>
                </div>
            )}

            <button className="fab" onClick={() => openSizeModal()}>
                <Plus size={24} />
            </button>

            {/* Size Modal */}
            <Modal
                isOpen={sizeModalOpen}
                onClose={closeSizeModal}
                title={editingSize ? 'Editar talla' : 'Nueva talla'}
            >
                <form onSubmit={handleSizeSubmit}>
                    <div className="form-group">
                        <label>Categoría</label>
                        <div className="category-picker">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`category-option ${sizeForm.category === cat.id ? 'selected' : ''}`}
                                    onClick={() => setSizeForm({ ...sizeForm, category: cat.id })}
                                >
                                    <span className="category-option-icon">{cat.icon}</span>
                                    <span className="category-option-name">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sizeValue">Talla</label>
                        <input
                            id="sizeValue"
                            type="text"
                            placeholder="Ej: M, 42, 12 UK..."
                            value={sizeForm.size}
                            onChange={(e) => setSizeForm({ ...sizeForm, size: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>¿Cómo sienta?</label>
                        <div className="fit-picker">
                            {FIT_OPTIONS.map((fit) => (
                                <button
                                    key={fit.id}
                                    type="button"
                                    className={`fit-option ${sizeForm.fit === fit.id ? 'selected' : ''}`}
                                    onClick={() => setSizeForm({ ...sizeForm, fit: fit.id })}
                                >
                                    <span>{fit.icon}</span>
                                    <span>{fit.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sizeNotes">Notas (opcional)</label>
                        <input
                            id="sizeNotes"
                            type="text"
                            placeholder="Ej: Tomar una talla más..."
                            value={sizeForm.notes}
                            onChange={(e) => setSizeForm({ ...sizeForm, notes: e.target.value })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeSizeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingSize ? 'Guardar' : 'Añadir'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Brand Edit Modal */}
            <Modal isOpen={brandModalOpen} onClose={closeBrandModal} title="Editar marca">
                <form onSubmit={handleBrandSubmit}>
                    <div className="form-group">
                        <label htmlFor="editBrandName">Nombre</label>
                        <input
                            id="editBrandName"
                            type="text"
                            value={brandForm.name}
                            onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="editBrandNotes">Notas</label>
                        <textarea
                            id="editBrandNotes"
                            value={brandForm.notes}
                            onChange={(e) => setBrandForm({ ...brandForm, notes: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeBrandModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
