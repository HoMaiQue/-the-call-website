export const LocalStorageEventTarget = new EventTarget()
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const removeLS = () => {
  localStorage.removeItem('access_token')

  const clearLSEvent = new Event('removeLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
