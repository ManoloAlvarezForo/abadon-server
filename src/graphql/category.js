import {
  addCategory,
  getCategories,
  getCategoryById,
} from "../resolvers/category";
import { gql } from "apollo-server";

export const Category = gql`
  type Category {
    id: ID
    name: String
    label: String
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
  },
};
