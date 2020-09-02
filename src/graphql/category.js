import {
  addSubcategory,
  getCategories,
  getCategoryById,
  setSubcategoriesToCategory,
} from "../resolvers/category";
import { gql } from "apollo-server";

export const Category = gql`
  type Category {
    id: ID
    name: String
    label: String
    parent: Category
    categories: [Category]
    thumb: Thumb
    createdDate: String
  }

  input CategoryInput {
    name: String
    label: String
  }
`;

export const CategoryResolvers = {
  Query: {
    categories: () => {
      // validateAuthentication(context.user);
      return getCategories();
    },
    category: (_, { id }) => {
      return getCategoryById(id);
    },
  },
  Mutation: {
    category: (_, { category, file }) => {
      return addCategory(category, file);
    },
    addSubcategory: (_, { targetCategoryId, category, file }) => {
      return addSubcategory(targetCategoryId, category, file);
    },
    setSubcategoriesToCategory: (_, { targetId, categories }) => {
      return setSubcategoriesToCategory(targetId, categories);
    },
  },
};
