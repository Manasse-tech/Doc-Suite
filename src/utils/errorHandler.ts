export type ErrorSeverity = 'error' | 'warning' | 'info'

export interface AppError {
  message: string
  severity: ErrorSeverity
  code?: string
  timestamp: number
  context?: Record<string, any>
}

const isOnline = () => typeof navigator !== 'undefined' && navigator.onLine

export const createError = (
  message: string,
  severity: ErrorSeverity = 'error',
  code?: string,
  context?: Record<string, any>
): AppError => ({
  message,
  severity,
  code,
  timestamp: Date.now(),
  context,
})

export const handleError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return createError(error.message, 'error', error.name)
  }

  if (typeof error === 'string') {
    return createError(error, 'error')
  }

  return createError('Une erreur inattendue s\'est produite', 'error')
}

export const checkConnectivity = (): boolean => isOnline()

export const getErrorMessage = (error: AppError): string => {
  if (!isOnline()) {
    return 'Vous êtes hors ligne. Vérifiez votre connexion Internet.'
  }
  return error.message
}

export const logError = (error: AppError) => {
  const timestamp = new Date(error.timestamp).toISOString()
  console.error(
    `[DocSuite ${error.severity.toUpperCase()}] ${timestamp} - ${error.code || 'UNKNOWN_ERROR'}`,
    error.message,
    error.context
  )
}
