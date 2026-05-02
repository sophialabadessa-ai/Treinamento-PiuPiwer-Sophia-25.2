import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import PiuCard from '../../components/PiuCard';

export default function HomeScreen() {
  const [piuText, setPiuText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]); 
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePiar = async () => {
    if (!piuText.trim()) return;
    setIsPosting(true);
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: piuText }),
      });
      if (response.ok) {
        setPiuText('');
        fetchPosts();
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="pt-12 pb-4 px-6 border-b border-gray-200 flex-row justify-between items-center bg-white shadow-sm">
        <Text className="text-3xl font-extrabold text-blue-500">Home</Text>
        <Link href="/profile" asChild>
          <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-bold text-sm">Meu Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView className="flex-1">
        <View className="p-6 border-b border-gray-200 bg-gray-50">
          <TextInput 
            className="w-full bg-white p-4 rounded-xl border border-gray-200 text-base mb-1"
            placeholder="O que está acontecendo?"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={piuText}
            onChangeText={setPiuText}
            maxLength={140}
            editable={!isPosting}
          />
          <View className="flex-row justify-between items-center">
            <Text className={`text-sm ${piuText.length >= 140 ? 'text-red-500' : 'text-gray-400'}`}>
              {piuText.length}/140
            </Text>
            <TouchableOpacity 
              className={`px-6 py-3 rounded-full ${piuText.trim() && !isPosting ? 'bg-blue-500' : 'bg-blue-300'}`}
              onPress={handlePiar}
              disabled={isPosting || !piuText.trim()}
            >
              {isPosting ? <ActivityIndicator color="white" size="small" /> : <Text className="text-white font-bold text-base">Piar</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {isLoadingFeed ? (
          <View className="p-10 items-center"><ActivityIndicator size="large" color="#3b82f6" /></View>
        ) : posts.length === 0 ? (
          <View className="p-10 items-center">
            <Text className="text-gray-500 text-base">Nenhum piu por aqui ainda. Seja o primeiro!</Text>
          </View>
        ) : (
          posts.map((post) => (
            <PiuCard 
              key={post.id} 
              post={post} 
              onLike={handleLike} 
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}