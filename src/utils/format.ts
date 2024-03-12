import { format } from 'date-fns'

export function formatDate(inputDate: string): string {
  const originalDate = new Date(inputDate)
  return format(originalDate, 'dd-MM-yyyy HH:mm:ss')
}
export function convertSecondsToHHMMSS(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600)
  const minutes: number = Math.floor((seconds - hours * 3600) / 60)
  const remainingSeconds: number = seconds - hours * 3600 - minutes * 60

  // Add leading zeros if necessary
  const hoursStr: string = hours < 10 ? '0' + hours : hours.toString()
  const minutesStr: string = minutes < 10 ? '0' + minutes : minutes.toString()
  const secondsStr: string = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString()

  return `${hoursStr}:${minutesStr}:${secondsStr}`
}

export function removeEmptyValues(obj: { [key: string]: string }): { [key: string]: string } {
  const newObj: { [key: string]: any } = {}

  for (const key in obj) {
    if (obj[key] !== '') {
      newObj[key] = obj[key]
    }
  }

  return newObj
}
export function convertDateFormat(inputDate: string): string {
  const originalDate = new Date(inputDate)
  return format(originalDate, 'yyyy-MM-dd HH:mm:ss')
}
