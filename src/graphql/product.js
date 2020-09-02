import {
  getProducts,
  getProductsByFilter,
  addProduct,
  getProductById,
  addComment,
  comments,
  getProductCategories,
} from "../resolvers/product";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../app";
import { gql } from "apollo-server";

export const Product = gql`
  type Comment {
    id: String
    user: String
    userId: String
    comment: String
    createdDate: String
  }

  type ThumbFormat {
    ext: String
    mime: String
    width: Int
    height: Int
    size: Int
    url: String
  }

  type ThumbFormats {
    thumbnail: ThumbFormat
    medium: ThumbFormat
    small: ThumbFormat
    large: ThumbFormat
  }

  type Thumb {
    name: String
    width: Int
    height: Int
    formats: ThumbFormats
    ext: String
    mime: String
    size: Int
    url: String
    created_at: String
    updated_at: String
  }

  type Product {
    id: String
    promoPrice: Int
    promo: Boolean
    productId: String
    client: Client
    thumbs: [Thumb]
    name: String
    price: Float
    description: String
    isAvailable: Boolean
    availableQuantity: Int
    createdDate: String
    comments: [Comment]
    type: Category
    categories: [Category]
    promoDescription: String
  }

  type ProductCategory {
    name: String
  }

  input ProductCategoryInput {
    name: String
  }

  input ProductInput {
    name: String
    promo: Boolean
    promoPrice: Int
    price: Float!
    description: String
    availableQuantity: Int
    productId: String
    type: CategoryInput
    categories: [CategoryInput]
    promoDescription: String
  }
`;

export const ProductResolvers = {
  Subscription: {
    productAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("productAdded"),
        (payload, variables, context) => {
          const user = context.user;
          // The payload in that case is the new preaching and the variables comes from the params.
          // return payload.commentAdded.repository_name === variables.repoFullName;
          return true;
        }
      ),
    },
  },
  Query: {
    products: () => {
      // validateAuthentication(context.user);
      return getProducts();
    },
    product: (_, { id }) => {
      return getProductById(id);
    },
    productsByFilter: (_, { query, properties }) => {
      return getProductsByFilter(query, properties);
    },
    productCategories: () => {
      return getProductCategories();
    },
    comments: (_, { productId }) => {
      return comments(productId);
    },
  },
  Mutation: {
    product: (_, { clientId, type, categories, product, files }) => {
      return addProduct(clientId, type, categories, product, files);
    },
    // addProduct: (_, { clientId, product, file }) => {
    //   return addProduct(clientId, product, file);
    // },
    comment: (_, { comment, productId, userId }) => {
      return addComment(comment, productId, userId);
    },
  },
};
