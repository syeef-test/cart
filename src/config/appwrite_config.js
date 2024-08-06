const appwrite_config = {
  appwriteUrl: String(import.meta.env.VITE_REACT_APP_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionIdUsers: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS
  ),
  appwriteCollectionIdOrders: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDERS
  ),
  appwriteCollectionCategories: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_CATEGORIES
  ),
  appwriteCollectionIdProducts: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_PRODUCTS
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default appwrite_config;
