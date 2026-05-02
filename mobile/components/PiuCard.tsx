import { View, Text, TouchableOpacity } from 'react-native';

interface PiuCardProps {
  post: any;
  onLike: (id: string) => void;
  onDelete?: (id: string) => void;
  isProfile?: boolean;
}

export default function PiuCard({ post, onLike, onDelete, isProfile }: PiuCardProps) {
  return (
    <View className="p-6 border-b border-gray-200 flex-row gap-x-4 bg-white">
      <View className="w-12 h-12 rounded-full bg-blue-200 items-center justify-center overflow-hidden">
        <Text className="text-blue-600 font-bold text-lg">
          {post.user?.name ? post.user.name.charAt(0).toUpperCase() : 'U'}
        </Text>
      </View>
      
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="font-bold text-lg text-gray-800">{post.user?.name || 'Usuário'}</Text>
            <Text className="text-gray-500 text-sm mb-2">@{post.user?.username || 'user'}</Text>
          </View>
          {isProfile && onDelete && (
            <TouchableOpacity onPress={() => onDelete(post.id)}>
              <Text className="text-red-500 font-semibold">Excluir</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text className="text-gray-700 text-base leading-relaxed mb-4">
          {post.text}
        </Text>
        
        <TouchableOpacity 
          onPress={() => onLike(post.id)} 
          className="flex-row items-center bg-gray-100 self-start px-4 py-2 rounded-full"
        >
          <Text className="text-red-500 mr-2 text-base">❤️</Text>
          <Text className="text-gray-700 font-bold">{post._count?.likes || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}