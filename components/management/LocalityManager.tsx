
import React, { useState, useEffect, useCallback } from 'react';
import { Locality, User, Village, Role } from '../../types';
import { getLocalities, addLocality, updateLocality, deleteLocality } from '../../services/mockApi';
import { MOCK_VILLAGES } from '../../constants';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Modal from '../shared/Modal';

const LocalityManager: React.FC<{ currentUser: User }> = ({ currentUser }) => {
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLocality, setCurrentLocality] = useState<Partial<Locality>>({});

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const data = await getLocalities(currentUser);
        setLocalities(data);
        setIsLoading(false);
    }, [currentUser]);

    useEffect(() => {
        if ([Role.CORE, Role.ADMIN].includes(currentUser.role)) {
            fetchData();
        }
    }, [fetchData, currentUser.role]);
    
    const openAddModal = () => {
        setIsEditing(false);
        setCurrentLocality({});
        setIsModalOpen(true);
    };

    const openEditModal = (locality: Locality) => {
        setIsEditing(true);
        setCurrentLocality(locality);
        setIsModalOpen(true);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentLocality(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, village } = currentLocality;
        if (name && village) {
            if (isEditing) {
                await updateLocality(currentLocality as Locality);
            } else {
                await addLocality({ name, village });
            }
            setIsModalOpen(false);
            fetchData();
        } else {
            alert('Please fill all fields.');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this locality?')) {
            await deleteLocality(id);
            fetchData();
        }
    };
    
    if (![Role.CORE, Role.ADMIN].includes(currentUser.role)) {
        return (
            <div className="text-center text-red-400">
                Access Denied. This section is for Core Team or Admin members only.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-300">Manage Localities</h2>
                <Button onClick={openAddModal}>Add Locality</Button>
            </div>

            <div className="bg-slate-800/50 p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-lg">
                {isLoading ? <p>Loading...</p> : (
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-600 text-sm text-slate-400">
                                <tr>
                                    <th className="p-3">Locality Name</th>
                                    <th className="p-3">Village</th>
                                    {currentUser.role === Role.ADMIN && <th className="p-3 text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {localities.map(l => (
                                    <tr key={l.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                        <td className="p-3 text-white">{l.name}</td>
                                        <td className="p-3">{l.village}</td>
                                        {currentUser.role === Role.ADMIN && (
                                            <td className="p-3">
                                                <div className="flex justify-end space-x-2">
                                                    <Button onClick={() => openEditModal(l)} className="!py-1 !px-3 !text-sm">Edit</Button>
                                                    <Button onClick={() => handleDelete(l.id)} className="!py-1 !px-3 !text-sm !bg-red-500 hover:!bg-red-400">Delete</Button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? "Edit Locality" : "Add New Locality"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder="Locality Name" value={currentLocality.name || ''} onChange={handleInputChange} required />
                    <Select name="village" value={currentLocality.village || ''} onChange={handleInputChange} required>
                        <option value="">Select Village</option>
                        {MOCK_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                    </Select>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">{isEditing ? "Save Changes" : "Add Locality"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LocalityManager;