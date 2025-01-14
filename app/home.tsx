import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
  Animated,
} from "react-native";
import axios from "axios";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";

interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  showDescription: boolean;
}

const HomeScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clickCounter, setClickCounter] = useState<number>(0);
  const [scaleValue] = useState(new Animated.Value(1));

  const exercisesPerPage = 10;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);

        const options = {
          method: "GET",
          url: "https://exercisedb.p.rapidapi.com/exercises",
          headers: {
            "X-RapidAPI-Key":
              "f24c0d3101msh8f4ef0938245f83p11a4b7jsn8ab7c7518292",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);

        // Map the fetched exercises to the expected format
        const exercisesWithImages: Exercise[] = response.data.map(
          (exercise: any) => ({
            id: exercise.id,
            name: exercise.name,
            description: exercise.target,
            image: exercise.gifUrl,
            category: exercise.bodyPart || "Uncategorized",
            showDescription: false,
          })
        );

        setExercises(exercisesWithImages);

        const uniqueCategories: string[] = [
          ...new Set(exercisesWithImages.map((ex) => ex.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setErrorMessage("Failed to load exercises. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [clickCounter]);

  const toggleDescription = (id: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? { ...exercise, showDescription: !exercise.showDescription }
          : exercise
      )
    );

    setClickCounter((prevCount) => prevCount + 1);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory =
      selectedCategory === null || ex.category === selectedCategory;
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentExercises = filteredExercises.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  );

  const handleNextPage = () => {
    if (currentPage * exercisesPerPage < filteredExercises.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/avatar.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.welcomeText}>Hello, Rukshan Fernando</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContentContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.activeCategory,
            ]}
            onPress={() => handleCategorySelect(null)}
          >
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategory,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercises */}
      <View style={styles.exercisesWrapper}>
        <FlatList
          data={currentExercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => toggleDescription(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                {item.showDescription && (
                  <Text style={styles.description}>{item.description}</Text>
                )}
                <Text style={styles.readMoreText}>
                  {item.showDescription ? "Read Less" : "Read More"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.exercisesContainer}
        />
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
          ]}
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage * exercisesPerPage >= filteredExercises.length &&
              styles.disabledButton,
          ]}
          onPress={handleNextPage}
          disabled={currentPage * exercisesPerPage >= filteredExercises.length}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Click Counter */}
      <Animated.View
        style={[styles.counterCircle, { transform: [{ scale: scaleValue }] }]}
      >
        <Text style={styles.counterText}>{clickCounter}</Text>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.padding.base,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.padding.base,
  },
  welcomeText: {
    fontSize: FontSize.lg,
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
  },
  categoryButton: {
    padding: Spacing.padding.sm,
    borderRadius: Spacing.borderRadius.base,
    backgroundColor: Colors.primary,
    marginRight: Spacing.margin.sm,
  },
  activeCategory: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontFamily: Font["poppins-regular"],
  },
  categoriesWrapper: {
    marginBottom: 20,
  },
  categoriesContentContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  exercisesWrapper: {
    flex: 1,
  },
  exercisesContainer: {
    paddingBottom: 100,
    paddingTop: 20,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.borderRadius.base,
    marginBottom: Spacing.margin.base,
    overflow: "hidden",
    shadowColor: Colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: Colors.text,
    fontSize: FontSize.sm,
  },
  textContainer: {
    padding: Spacing.padding.base,
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
    marginBottom: Spacing.margin.sm,
  },
  description: {
    fontSize: FontSize.sm,
    fontFamily: Font["poppins-regular"],
    color: Colors.textSecondary,
  },
  readMoreText: {
    color: Colors.accent,
    fontFamily: Font["poppins-bold"],
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: Spacing.padding.base,
    marginTop: 20,
  },
  paginationButton: {
    padding: Spacing.padding.sm,
    backgroundColor: Colors.accent,
    borderRadius: Spacing.borderRadius.base,
  },
  disabledButton: {
    backgroundColor: Colors.border,
  },
  paginationText: {
    color: Colors.onAccent,
    fontFamily: Font["poppins-bold"],
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchBarContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    color: Colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: FontSize.sm,
    fontFamily: Font["poppins-regular"],
  },
  counterCircle: {
    position: "absolute",
    bottom: 30,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  counterText: {
    color: Colors.border,
    fontSize: 20,
    fontFamily: Font["poppins-bold"],
  },
});
