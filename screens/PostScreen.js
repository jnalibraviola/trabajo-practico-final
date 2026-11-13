import { useEffect, useState } from "react";
import {View,Text,FlatList,ActivityIndicator,Button,StyleSheet,} from "react-native";


export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);


      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );


      if (!response.ok) {
        throw new Error("Error HTTP: " + response.status);
      }


      const data = await response.json();


      setPosts(data);
    } catch (err) {
      setError("No se pudieron cargar las publicaciones");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadPosts();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publicaciones</Text>


      <Button title="Actualizar" onPress={loadPosts} disabled={loading} />


      {loading && <ActivityIndicator />}


      {error && <Text style={styles.error}>{error}</Text>}


      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>{item.title}</Text>


            <Text>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && !error ? <Text>No hay publicaciones.</Text> : null
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  error: {
    color: "red",
  },
});
