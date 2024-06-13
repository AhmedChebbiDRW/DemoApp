import { create } from 'zustand';

interface ModalState {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isVisible: true,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
}));
