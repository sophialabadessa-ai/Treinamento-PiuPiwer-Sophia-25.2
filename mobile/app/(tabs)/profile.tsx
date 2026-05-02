import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import PiuCard from '../../components/PiuCard';
import { useAuth } from '~/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);

  const fetchUserPosts = async () => {
    if (!user || !user.id) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user.id}/posts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) fetchUserPosts();
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        Alert.alert("Sucesso", "Piu apagado!");
      } else {
        Alert.alert("Erro", "Não foi possível apagar o piu.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="pt-12 pb-4 px-6 border-b border-gray-200 flex-row items-center bg-white shadow-sm gap-x-4">
        <Link href="/home" asChild>
          <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700 font-bold text-sm">Voltar</Text>
          </TouchableOpacity>
        </Link>
        <Text className="text-3xl font-extrabold text-blue-500">Perfil</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center pt-10 px-6 pb-8 border-b border-gray-200">
          <View className="w-32 h-32 rounded-full bg-blue-200 items-center justify-center mb-6">
            <Text className="text-blue-600 font-bold text-5xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          
          <Text className="text-2xl font-bold text-gray-800">{user?.name || 'Usuário'}</Text>
          <Text className="text-gray-500 text-lg mb-10">{user?.email || 'email@exemplo.com'}</Text>
          
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-500 px-8 py-4 rounded-xl w-full items-center"
          >
            <Text className="text-white font-bold text-lg">Sair da Conta</Text>
          </TouchableOpacity>
        </View>

        {isLoadingFeed ? (
          <View className="p-10 items-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : posts.length === 0 ? (
          <View className="p-10 items-center">
            <Text className="text-gray-500 text-base">Você ainda não fez nenhum piu.</Text>
          </View>
        ) : (
          posts.map((post) => (
            <PiuCard 
              key={post.id} 
              post={{ ...post, user }} 
              onLike={handleLike}
              onDelete={handleDelete}
              isProfile={true}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}