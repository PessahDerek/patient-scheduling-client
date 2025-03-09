import {createStore} from "zustand";

interface HospiStoreObj {
    doctors: Map<string, DocObj>;
    workingDays: Map<number, ScheduleDays>

    addDoctors(doctors: DocObj[]): void;

    addWorkingDays(workingDays: ScheduleDays[]): void;
}


const hospiStore = createStore<HospiStoreObj>()((set, _get) => ({
    doctors: new Map(),
    workingDays: new Map(),

    addDoctors(doctors) {
        const newMap = new Map(doctors.map(f => ([f.id, f])));
        set(prev => ({...prev, doctors: newMap}));
    },
    addWorkingDays(workingDays) {
        const newMap = new Map(workingDays.map(f => ([f.id, f])));
        set(prev => ({...prev, workingDays: newMap}));
    }
}));

export default hospiStore;

