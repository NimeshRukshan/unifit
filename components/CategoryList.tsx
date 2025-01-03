import React, { useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import AppText from "./AppText";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[]; // Defining the prop type for categories
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[{ id: 0, name: "All" }, ...categories].map((category) => (
        <TouchableOpacity
          onPress={() => setActive(category.id)}
          style={[
            styles.categoryButton,
            {
              backgroundColor:
                active === category.id ? Colors.accent : Colors.primary,
            },
          ]}
          key={category.id}
        >
          <AppText
            style={{
              color: active === category.id ? Colors.onAccent : Colors.text,
              fontSize: FontSize.sm,
            }}
          >
            {category.name}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: Spacing.padding.base,
    paddingVertical: Spacing.padding.sm,
    marginRight: Spacing.margin.base,
    borderRadius: Spacing.borderRadius.base,
  },
});
