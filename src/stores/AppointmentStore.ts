import {createStore} from "zustand";

interface AppointmentStoreObj {
    myApps: Map<number, AppointmentObj>

    addAppointments(appointments: AppointmentObj[]): void;
}

const appStore = createStore<AppointmentStoreObj>()((set, _get) => ({
    myApps: new Map(),

    addAppointments(appointments) {
        const newMap = new Map(appointments.map(f => ([f.id, f])));
        set(prev => ({...prev, myApps: newMap}));
    }
}))

export default appStore;