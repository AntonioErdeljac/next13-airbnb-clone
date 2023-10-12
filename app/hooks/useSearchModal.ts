import { create } from 'zustand';
import { STEPS } from '../[lng]/components/modals/SearchModal';

interface SearchModalStore {
  isOpen: boolean;
  onOpen: (step: STEPS) => void;
  onClose: () => void;
  step: STEPS;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: (step) => set({ isOpen: true, step }),
  onClose: () => set({ isOpen: false }),
  step: STEPS.LOCATION,
}));


export default useSearchModal;
