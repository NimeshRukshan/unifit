import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Colors from "../constants/Colors";

interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface UserProfile {
  name: string;
  profileImage: string;
}

const HomeScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counters, setCounters] = useState<{ [key: number]: number }>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exercises
        const exerciseResponse = await axios.get(
          "https://wger.de/api/v2/exercise/?status=2&language=2"
        );
        const imageResponse = await axios.get(
          "https://wger.de/api/v2/exerciseimage/?is_main=True"
        );

        const exercisesWithImages = exerciseResponse.data.results.map(
          (exercise: any) => {
            const image = imageResponse.data.results.find(
              (img: any) => img.exercise === exercise.id
            );
            return {
              id: exercise.id,
              name: exercise.name,
              description: exercise.description,
              image: image ? image.image : null,
            };
          }
        );

        setExercises(exercisesWithImages);

        // Fetch user profile (replace with your actual API endpoint)
        const userProfileResponse = await axios.get(
          "https://yourapi.com/user/profile"
        );
        setUserProfile(userProfileResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = (id: number) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userProfile && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userProfile.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userProfile.name}</Text>
        </View>
      )}
      {exercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.id}
          style={styles.card}
          onPress={() => handlePress(exercise.id)}
        >
          {exercise.image && (
            <Image source={{ uri: exercise.image }} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{exercise.name}</Text>
            <Text style={styles.description}>{exercise.description}</Text>
          </View>
          <View style={styles.counterContainer}>
            <View style={styles.counterCircle}>
              <Text style={styles.counterText}>
                {counters[exercise.id] || 0}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  counterContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  counterCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: Colors.onAccent,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: Colors.error,
  },
});
