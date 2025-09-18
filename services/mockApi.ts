
import { MOCK_CONTRIBUTIONS, MOCK_MENTORS, MOCK_LOCALITIES } from '../constants';
import { Contribution, Mentor, Locality, User, Role } from '../types';

const simulateDelay = (delay: number) => new Promise(res => setTimeout(res, delay));

// Contributions
export const getContributions = async (user: User): Promise<Contribution[]> => {
    await simulateDelay(300);
    if (user.role === Role.MANAGER && user.assignedVillage) {
        return MOCK_CONTRIBUTIONS.filter(c => c.village === user.assignedVillage);
    }
    return MOCK_CONTRIBUTIONS;
};

export const addContribution = async (contribution: Omit<Contribution, 'id'>): Promise<Contribution> => {
    await simulateDelay(300);
    const newContribution: Contribution = {
        id: (MOCK_CONTRIBUTIONS.length > 0 ? Math.max(...MOCK_CONTRIBUTIONS.map(c => c.id)) : 0) + 1,
        ...contribution
    };
    MOCK_CONTRIBUTIONS.push(newContribution);
    return newContribution;
};

export const updateContribution = async (updatedContribution: Contribution): Promise<Contribution> => {
    await simulateDelay(300);
    const index = MOCK_CONTRIBUTIONS.findIndex(c => c.id === updatedContribution.id);
    if (index !== -1) {
        MOCK_CONTRIBUTIONS[index] = updatedContribution;
        return updatedContribution;
    }
    throw new Error("Contribution not found");
};

export const deleteContribution = async (id: number): Promise<void> => {
    await simulateDelay(300);
    const index = MOCK_CONTRIBUTIONS.findIndex(c => c.id === id);
    if (index !== -1) {
        MOCK_CONTRIBUTIONS.splice(index, 1);
    } else {
        throw new Error("Contribution not found");
    }
};

// Mentors
export const getMentors = async (user: User): Promise<Mentor[]> => {
    await simulateDelay(300);
    if (user.role === Role.MANAGER && user.assignedVillage) {
        return MOCK_MENTORS.filter(m => m.village === user.assignedVillage);
    }
    return MOCK_MENTORS;
};

export const addMentor = async (mentor: Omit<Mentor, 'id'>): Promise<Mentor> => {
    await simulateDelay(300);
    const newMentor: Mentor = {
        id: (MOCK_MENTORS.length > 0 ? Math.max(...MOCK_MENTORS.map(m => m.id)) : 0) + 1,
        ...mentor
    };
    MOCK_MENTORS.push(newMentor);
    return newMentor;
};

export const updateMentor = async (updatedMentor: Mentor): Promise<Mentor> => {
    await simulateDelay(300);
    const index = MOCK_MENTORS.findIndex(m => m.id === updatedMentor.id);
    if (index !== -1) {
        MOCK_MENTORS[index] = updatedMentor;
        return updatedMentor;
    }
    throw new Error("Mentor not found");
};

export const deleteMentor = async (id: number): Promise<void> => {
    await simulateDelay(300);
    const index = MOCK_MENTORS.findIndex(m => m.id === id);
    if (index !== -1) {
        MOCK_MENTORS.splice(index, 1);
    } else {
        throw new Error("Mentor not found");
    }
};


// Localities
export const getLocalities = async (user: User): Promise<Locality[]> => {
    await simulateDelay(300);
     if (user.role === Role.MANAGER && user.assignedVillage) {
        return MOCK_LOCALITIES.filter(l => l.village === user.assignedVillage);
    }
    return MOCK_LOCALITIES;
};

export const addLocality = async (locality: Omit<Locality, 'id'>): Promise<Locality> => {
    await simulateDelay(300);
    const newLocality: Locality = {
        id: (MOCK_LOCALITIES.length > 0 ? Math.max(...MOCK_LOCALITIES.map(l => l.id)) : 0) + 1,
        ...locality
    };
    MOCK_LOCALITIES.push(newLocality);
    return newLocality;
};

export const updateLocality = async (updatedLocality: Locality): Promise<Locality> => {
    await simulateDelay(300);
    const index = MOCK_LOCALITIES.findIndex(l => l.id === updatedLocality.id);
    if (index !== -1) {
        MOCK_LOCALITIES[index] = updatedLocality;
        return updatedLocality;
    }
    throw new Error("Locality not found");
};

export const deleteLocality = async (id: number): Promise<void> => {
    await simulateDelay(300);
    const index = MOCK_LOCALITIES.findIndex(l => l.id === id);
    if (index !== -1) {
        MOCK_LOCALITIES.splice(index, 1);
    } else {
        throw new Error("Locality not found");
    }
};