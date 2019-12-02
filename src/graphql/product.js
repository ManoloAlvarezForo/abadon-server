import * as ProductResolver from '../resolvers/product';

export const Product = `
type Product {
    id: String,
    productId: String,
    image: String,
    productName: String,
    price: Float,
    description: String,
    isAvailable: Boolean,
    availableQuantity: Int,
    createdDate: String
}
input ProductInput {
    image: String!,
    productName: String,
    price: Float,
    description: String,
    availableQuantity: Int,
    productId: String,
}
`;

export const ProductResolvers = {
  Query: {
    products: () => {
      // validateAuthentication(context.user);
      return ProductResolver.getProducts();
    },
    productsByFilter: (_, { query, properties }) => {
      return ProductResolver.getProductsByFilter(query, properties);
    }
  },
  Mutation: {
    addProduct: (_, { product }) => {
      return ProductResolver.addProduct(product);
    }
  }
};
