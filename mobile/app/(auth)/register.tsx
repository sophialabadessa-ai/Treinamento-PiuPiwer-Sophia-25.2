import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '~/contexts/AuthContext';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    const result = await signUp(email, password, name);
    
    if (!result.success) {
      Alert.alert('Erro no Cadastro', result.error || 'Tente novamente');
    }
    
    setIsLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-4xl font-extrabold text-blue-500 mb-8">Criar Conta</Text>
      
      <View className="w-full gap-y-4">
        <TextInput 
          className="w-full bg-gray-100 p-4 rounded-xl border border-gray-200 text-base"
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput 
          className="w-full bg-gray-100 p-4 rounded-xl border border-gray-200 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          className="w-full bg-gray-100 p-4 rounded-xl border border-gray-200 text-base"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          className="w-full bg-blue-500 p-4 rounded-xl items-center mt-2"
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Cadastrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-6 flex-row">
        <Text className="text-gray-600 text-base">Já tem uma conta? </Text>
        <Link href="/login" className="text-blue-500 font-bold text-base">Faça Login</Link>
      </View>
    </View>
  );
}