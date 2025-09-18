
import React, { useState, useEffect, useCallback } from 'react';
import { Mentor, User, Locality, Village, Role } from '../../types';
import { getMentors, addMentor, getLocalities, updateMentor, deleteMentor } from '../../services/mockApi';
import { MOCK_VILLAGES } from '../../constants';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Modal from '../shared/Modal';

const MentorManager: React.FC<{ currentUser: User }> = ({ currentUser }) => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMentor, setCurrentMentor] = useState<Partial<Mentor>>({});

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
        const [mentorsData, localitiesData] = await Promise.all([
            getMentors(currentUser),
            getLocalities(currentUser)
        ]);
        setMentors(mentorsData);
        setLocalities(localitiesData);
        setIsLoading(false);
    }, [currentUser]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const openAddModal = () => {
        setIsEditing(false);
        let initialData: Partial<Mentor> = {};
        if (currentUser.role === Role.MANAGER && currentUser.assignedVillage) {
            initialData.village = currentUser.assignedVillage;
        }
        setCurrentMentor(initialData);
        setIsModalOpen(true);
    };

    const openEditModal = (mentor: Mentor) => {
        setIsEditing(true);
        setCurrentMentor(mentor);
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentMentor(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, contact, village, locality } = currentMentor;
        if (name && contact && village && locality) {
            if (isEditing) {
                await updateMentor(currentMentor as Mentor);
            } else {
                await addMentor({ name, contact, village, locality });
            }
            setIsModalOpen(false);
            fetchAllData();
        } else {
            alert('Please fill all fields.');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this mentor?')) {
            await deleteMentor(id);
            fetchAllData();
        }
    };

    const filteredLocalities = currentMentor.village ? localities.filter(l => l.village === currentMentor.village).map(l => l.name) : [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-300">Manage Mentors</h2>
                <Button onClick={openAddModal}>Add Mentor</Button>
            </div>

            <div className="bg-slate-800/50 p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-lg">
                {isLoading ? <p>Loading...</p> : (
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-600 text-sm text-slate-400">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Village</th>
                                    <th className="p-3">Locality</th>
                                    {currentUser.role === Role.ADMIN && <th className="p-3 text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {mentors.map(m => (
                                    <tr key={m.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                        <td className="p-3 text-white">{m.name}</td>
                                        <td className="p-3">{m.contact}</td>
                                        <td className="p-3">{m.village}</td>
                                        <td className="p-3">{m.locality}</td>
                                        {currentUser.role === Role.ADMIN && (
                                            <td className="p-3">
                                                <div className="flex justify-end space-x-2">
                                                    <Button onClick={() => openEditModal(m)} className="!py-1 !px-3 !text-sm">Edit</Button>
                                                    <Button onClick={() => handleDelete(m.id)} className="!py-1 !px-3 !text-sm !bg-red-500 hover:!bg-red-400">Delete</Button>
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
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? "Edit Mentor" : "Add New Mentor"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder="Mentor Name" value={currentMentor.name || ''} onChange={handleInputChange} required />
                    <Input name="contact" placeholder="Contact Number" value={currentMentor.contact || ''} onChange={handleInputChange} required />
                     {(currentUser.role === Role.CORE || currentUser.role === Role.ADMIN || (currentUser.role === Role.MANAGER && isEditing)) && (
                        <Select name="village" value={currentMentor.village || ''} onChange={handleInputChange} required disabled={currentUser.role === Role.MANAGER}>
                            <option value="">Select Village</option>
                            {MOCK_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                        </Select>
                    )}
                    <Select name="locality" value={currentMentor.locality || ''} onChange={handleInputChange} disabled={!currentMentor.village} required>
                        <option value="">Select Locality</option>
                        {filteredLocalities.map(l => <option key={l} value={l}>{l}</option>)}
                    </Select>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">{isEditing ? "Save Changes" : "Add Mentor"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MentorManager;