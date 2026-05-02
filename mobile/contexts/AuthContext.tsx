import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, useSegments } from 'expo-router'
import { authClient } from '../lib/auth-client'
import { Alert } from 'react-native'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const segments = useSegments()

  const isAuthenticated = !!user

  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    if (isLoading) return
    const inAuthGroup = segments[0] === '(auth)'

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/login')
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/home')
    }
  }, [isAuthenticated, segments, isLoading, router])

  const checkSession = async () => {
    try {
      const result = await authClient.getSession()
      if (result?.data?.user) {
        setUser(result.data.user as User)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSession = async () => {
    await checkSession()
  }

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({ email, password })
      if (result.error) {
        Alert.alert('Erro', result.error.message)
        return { success: false, error: result.error.message }
      }
      if (result.data?.user) {
        setUser(result.data.user as User)
        return { success: true }
      }
      return { success: false, error: 'Falha no login' }
    } catch (error) {
      Alert.alert('Conexão', 'Erro ao conectar com o servidor.')
      return { success: false, error: 'Erro de conexão' }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await authClient.signUp.email({ email, password, name })
      if (result.error) {
        Alert.alert('Erro', result.error.message)
        return { success: false, error: result.error.message }
      }
      if (result.data?.user) {
        setUser(result.data.user as User)
        return { success: true }
      }
      return { success: false, error: 'Falha no cadastro' }
    } catch (error) {
      Alert.alert('Conexão', 'Erro ao conectar com o servidor.')
      return { success: false, error: 'Erro de conexão' }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.EXPO_PUBLIC_SCHEMA}://auth/callback`
      })
      if (result.error) return { success: false, error: result.error.message }
      await checkSession()
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Google login failed' }
    }
  }

  const signOut = async () => {
    try {
      await authClient.signOut()
      setUser(null)
    } catch (error) {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, isLoading, isAuthenticated, signIn, signUp, signOut, signInWithGoogle, refreshSession,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')
  return context
}