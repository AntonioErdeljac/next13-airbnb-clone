import { create } from 'zustand';

interface BecomeHostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBecomeHostModal = create<BecomeHostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useBecomeHostModal;
