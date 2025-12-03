import { useState, useCallback } from 'react'

export type ModalType =
  | 'editEmail'
  | 'support'
  | 'units'
  | 'language'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'editProfile'
  | 'deleteAccount'
  | 'imageUpload'
  | null

interface UseModalManagerReturn {
  activeModal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
  isOpen: (modal: ModalType) => boolean
}

export function useModalManager(): UseModalManagerReturn {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  const isOpen = useCallback(
    (modal: ModalType) => activeModal === modal,
    [activeModal]
  )

  return {
    activeModal,
    openModal,
    closeModal,
    isOpen,
  }
}
