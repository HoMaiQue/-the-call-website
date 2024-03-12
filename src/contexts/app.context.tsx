import React, { createContext, useState } from 'react'
import { GetPhoneBookResponse } from '~/types/phonebook.type'

interface AppContextInterface {
  phoneBookList: GetPhoneBookResponse[]
  setPhoneBookList: React.Dispatch<React.SetStateAction<GetPhoneBookResponse[]>>
  pageCount: number
  setPageCount: React.Dispatch<React.SetStateAction<number>>
  contactId: string
  setContactId: React.Dispatch<React.SetStateAction<string>>
}

const initialValueAppContext: AppContextInterface = {
  phoneBookList: [],
  setPhoneBookList: () => null,
  pageCount: 0,
  setPageCount: () => null,
  contactId: '',
  setContactId: () => null
}
export const AppContext = createContext<AppContextInterface>(initialValueAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneBookList, setPhoneBookList] = useState<GetPhoneBookResponse[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [contactId, setContactId] = useState<string>('')

  const value = {
    phoneBookList,
    setPhoneBookList,
    pageCount,
    setPageCount,
    contactId,
    setContactId
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
