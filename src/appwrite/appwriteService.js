import appwrite_config from "../config/appwrite_config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(appwrite_config.appwriteUrl)
      .setProject(appwrite_config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //Category
  async createCategory({ name, description }) {
    try {
      console.log("appwrite_service", { name, description });

      if (!name || !description) {
        throw new Error("Missing required category fields");
      }
      const response = await this.databases.createDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionCategories,
        ID.unique(),
        { name, description }
      );

      console.log("Category created successfully:", response);
      return response;
    } catch (error) {
      console.log("Appwrite service :: createCategory :: error", error);
      console.log(error);
    }
  }

  async updateCategory(id, { name, description }) {
    try {
      return await this.databases.updateDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionCategories,
        id,
        { name, description }
      );
    } catch (error) {
      console.log("Appwrite service :: updateCategory :: error", error);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.databases.deleteDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionCategories,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: deleteCategory :: error", error);
    }
  }

  async getCategory(id) {
    try {
      return await this.databases.getDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionCategories,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getCategory :: error", error);
    }
  }

  async getCategorys() {
    try {
      return await this.databases.listDocuments(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionCategories
      );
    } catch (error) {
      console.log("Appwrite service :: getCategorys :: error", error);
    }
  }

  //Products

  async createProducts({ name, price, category_id, image, description }) {
    try {
      console.log("appwrite_service", {
        name,
        price,
        category_id,
        image,
        description,
      });

      if (!name || !description || !price || !category_id || !image) {
        throw new Error("Missing required category fields");
      }
      const response = await this.databases.createDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdProducts,
        ID.unique(),
        { name, price, category_id, image, description }
      );

      console.log("Product created successfully:", response);
      return response;
    } catch (error) {
      console.log("Appwrite service :: createProduct :: error", error);
      console.log(error);
    }
  }

  async updateProducts(
    productId,
    { name, price, category_id, image, description }
  ) {
    try {
      return await this.databases.updateDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdProducts,
        productId,
        { name, price, category_id, image, description }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProduct :: error", error);
    }
  }

  async deleteProducts(productId) {
    try {
      return await this.databases.deleteDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdProducts,
        productId
      );
    } catch (error) {
      console.log("Appwrite service :: deleteProduct :: error", error);
    }
  }

  async getProduct(productId) {
    try {
      return await this.databases.getDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdProducts,
        productId
      );
    } catch (error) {
      console.log("Appwrite service :: getProduct :: error", error);
    }
  }

  async getProducts() {
    try {
      return await this.databases.listDocuments(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdProducts
      );
    } catch (error) {
      console.log("Appwrite service :: getProducts :: error", error);
    }
  }

  //Orders

  //async createOrders() {}

  async updateOrder(orderId, { status }) {
    try {
      return await this.databases.updateDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdOrders,
        orderId,
        { status }
      );
    } catch (error) {
      console.log("Appwrite service :: updateOrder :: error", error);
    }
  }

  //async deleteOrders() {}

  async getOrder(orderId) {
    try {
      return await this.databases.getDocument(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdOrders,
        orderId
      );
    } catch (error) {
      console.log("Appwrite service :: getCategory :: error", error);
    }
  }

  async getOrders() {
    try {
      return await this.databases.listDocuments(
        appwrite_config.appwriteDatabaseId,
        appwrite_config.appwriteCollectionIdOrders
      );
    } catch (error) {
      console.log("Appwrite service :: getOrders :: error", error);
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
