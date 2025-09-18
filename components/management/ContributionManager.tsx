
import React, { useState, useEffect, useCallback } from 'react';
import { Contribution, User, Village, Locality, PaymentType, Role } from '../../types';
import { getContributions, addContribution, getLocalities, updateContribution, deleteContribution } from '../../services/mockApi';
import { MOCK_VILLAGES } from '../../constants';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Modal from '../shared/Modal';

const ContributionManager: React.FC<{ currentUser: User }> = ({ currentUser }) => {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [localities, setLocalities] = useState<Locality[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentContribution, setCurrentContribution] = useState<Partial<Contribution>>({});

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
        const [contributionsData, localitiesData] = await Promise.all([
            getContributions(currentUser),
            getLocalities(currentUser)
        ]);
        setContributions(contributionsData.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLocalities(localitiesData);
        setIsLoading(false);
    }, [currentUser]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const openAddModal = () => {
        setIsEditing(false);
        let initialData: Partial<Contribution> = { paymentType: PaymentType.CASH };
        if (currentUser.role === Role.MANAGER && currentUser.assignedVillage) {
            initialData.village = currentUser.assignedVillage;
        }
        setCurrentContribution(initialData);
        setIsModalOpen(true);
    };

    const openEditModal = (contribution: Contribution) => {
        setIsEditing(true);
        setCurrentContribution(contribution);
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentContribution(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { donorName, village, locality, amount, paymentType } = currentContribution;
        if (donorName && village && locality && amount && paymentType) {
            if (isEditing) {
                await updateContribution(currentContribution as Contribution);
            } else {
                const contributionToAdd: Omit<Contribution, 'id'> = {
                    donorName, village, locality,
                    amount: Number(amount),
                    paymentType,
                    donorContact: currentContribution.donorContact,
                    date: new Date().toISOString().split('T')[0],
                };
                await addContribution(contributionToAdd);
            }
            setIsModalOpen(false);
            fetchAllData();
        } else {
            alert('Please fill all required fields.');
        }
    };

    const handleDelete = async (id: number) => {
        if(window.confirm('Are you sure you want to delete this contribution?')) {
            await deleteContribution(id);
            fetchAllData();
        }
    };
    
    const filteredLocalities = currentContribution.village ? localities.filter(l => l.village === currentContribution.village).map(l => l.name) : [];
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-300">Manage Contributions</h2>
                <Button onClick={openAddModal}>Add Contribution</Button>
            </div>

            <div className="bg-slate-800/50 p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-lg">
                {isLoading ? <p>Loading...</p> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-600 text-sm text-slate-400">
                                <tr>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Donor</th>
                                    <th className="p-3">Village</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Type</th>
                                    {currentUser.role === Role.ADMIN && <th className="p-3 text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {contributions.map(c => (
                                    <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                        <td className="p-3">{new Date(c.date).toLocaleDateString()}</td>
                                        <td className="p-3 text-white">{c.donorName}</td>
                                        <td className="p-3">{c.village}</td>
                                        <td className="p-3 text-cyan-400 font-mono">₹{c.amount.toLocaleString()}</td>
                                        <td className="p-3">{c.paymentType}</td>
                                        {currentUser.role === Role.ADMIN && (
                                            <td className="p-3">
                                                <div className="flex justify-end space-x-2">
                                                    <Button onClick={() => openEditModal(c)} className="!py-1 !px-3 !text-sm">Edit</Button>
                                                    <Button onClick={() => handleDelete(c.id)} className="!py-1 !px-3 !text-sm !bg-red-500 hover:!bg-red-400">Delete</Button>
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
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? "Edit Contribution" : "Add New Contribution"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="donorName" placeholder="Donor Name" value={currentContribution.donorName || ''} onChange={handleInputChange} required />
                    <Input name="donorContact" placeholder="Donor Contact (Optional)" value={currentContribution.donorContact || ''} onChange={handleInputChange} />
                    {(currentUser.role === Role.CORE || currentUser.role === Role.ADMIN || (currentUser.role === Role.MANAGER && isEditing)) && (
                         <Select name="village" value={currentContribution.village || ''} onChange={handleInputChange} required disabled={currentUser.role === Role.MANAGER}>
                            <option value="">Select Village</option>
                            {MOCK_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                        </Select>
                    )}
                    <Select name="locality" value={currentContribution.locality || ''} onChange={handleInputChange} disabled={!currentContribution.village} required>
                        <option value="">Select Locality</option>
                        {filteredLocalities.map(l => <option key={l} value={l}>{l}</option>)}
                    </Select>
                    <Input name="amount" type="number" placeholder="Amount" value={currentContribution.amount || ''} onChange={handleInputChange} required />
                    <Select name="paymentType" value={currentContribution.paymentType || ''} onChange={handleInputChange} required>
                        {Object.values(PaymentType).map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </Select>
                    <div className="flex justify-end pt-4">
                        <Button type="submit">{isEditing ? "Save Changes" : "Submit Contribution"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ContributionManager;