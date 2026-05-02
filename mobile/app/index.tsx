import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      // Rota corrigida para /sign-in/email
      const response = await fetch('http://localhost:3000/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Deu tudo certo, manda para a Home!
        router.replace('/home');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-4xl font-extrabold text-blue-500 mb-10">PiuPiwer</Text>
      
      <View className="w-full gap-y-4">
        <TextInput 
          className="w-full bg-gray-100 p-4 rounded-xl border border-gray-200"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput 
          className="w-full bg-gray-100 p-4 rounded-xl border border-gray-200"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          className={`w-full p-4 rounded-xl items-center mt-2 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-6 flex-row">
        <Text className="text-gray-600">Ainda não tem conta? </Text>
        <Link href="/register" className="text-blue-500 font-bold">
          Cadastre-se
        </Link>
      </View>
    </View>
  );
}