import React, { createContext, useState } from 'react'
import { GetPhoneBookResponse } from '~/types/phonebook.type'

interface AppContextInterface {
  phoneBookList: GetPhoneBookResponse[]
  setPhoneBookList: React.Dispatch<React.SetStateAction<GetPhoneBookResponse[]>>
  pageCount: number
  setPageCount: React.Dispatch<React.SetStateAction<number>>
  contactId: string
  setContactId: React.Dispatch<React.SetStateAction<string>>
  phoneBook: GetPhoneBookResponse | null
  setPhoneBook: React.Dispatch<React.SetStateAction<GetPhoneBookResponse | null>>
  searchPhoneBook: GetPhoneBookResponse[]
  setSearchPhoneBook: React.Dispatch<React.SetStateAction<GetPhoneBookResponse[]>>
}

const initialValueAppContext: AppContextInterface = {
  phoneBookList: [],
  setPhoneBookList: () => null,
  pageCount: 0,
  setPageCount: () => null,
  contactId: '',
  setContactId: () => null,
  phoneBook: null,
  setPhoneBook: () => null,
  searchPhoneBook: [],
  setSearchPhoneBook: () => null
}
export const AppContext = createContext<AppContextInterface>(initialValueAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneBookList, setPhoneBookList] = useState<GetPhoneBookResponse[]>([])
  const [phoneBook, setPhoneBook] = useState<GetPhoneBookResponse | null>(null)
  const [searchPhoneBook, setSearchPhoneBook] = useState<GetPhoneBookResponse[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [contactId, setContactId] = useState<string>('')

  const value = {
    phoneBookList,
    setPhoneBookList,
    pageCount,
    setPageCount,
    contactId,
    setContactId,
    phoneBook,
    setPhoneBook,
    searchPhoneBook,
    setSearchPhoneBook
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
