import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

interface WorkoutProps {
  workout: { id: number; name: string; category: number; image?: string };
  onPress: () => void;
  badgeCount?: number;
}

const Workout: React.FC<WorkoutProps> = ({
  workout,
  onPress,
  badgeCount = 0,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri:
            workout.image ||
            "https://via.placeholder.com/270x200.png?text=Workout",
        }}
        style={styles.image}
      />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.category}>Category: {workout.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.margin.lg,
    position: "relative",
    width: 270,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: Spacing.borderRadius.base,
    backgroundColor: Colors.onAccent,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.text,
    fontSize: FontSize.xs,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: Spacing.margin.sm,
  },
  title: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.base,
    color: Colors.text,
  },
  category: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.sm,
    color: Colors.yellow,
  },
});

export default Workout;
