import { 
  users, memories, wishes, photos, timeline_events, quiz_questions,
  type User, type InsertUser, type Memory, type InsertMemory,
  type Wish, type InsertWish, type Photo, type InsertPhoto,
  type TimelineEvent, type InsertTimelineEvent, 
  type QuizQuestion, type InsertQuizQuestion
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Memory methods
  getMemories(userId: number): Promise<Memory[]>;
  createMemory(memory: InsertMemory): Promise<Memory>;
  
  // Wish methods
  getWishes(userId: number): Promise<Wish[]>;
  createWish(wish: InsertWish): Promise<Wish>;
  updateWish(id: number, updates: Partial<Wish>): Promise<Wish>;
  
  // Photo methods
  getPhotos(userId: number): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  
  // Timeline methods
  getTimelineEvents(userId: number): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  
  // Quiz methods
  getQuizQuestions(userId: number): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Memory methods
  async getMemories(userId: number): Promise<Memory[]> {
    return await db.select().from(memories).where(eq(memories.userId, userId));
  }

  async createMemory(memory: InsertMemory): Promise<Memory> {
    const [newMemory] = await db.insert(memories).values(memory).returning();
    return newMemory;
  }

  // Wish methods
  async getWishes(userId: number): Promise<Wish[]> {
    return await db.select().from(wishes).where(eq(wishes.userId, userId));
  }

  async createWish(wish: InsertWish): Promise<Wish> {
    const [newWish] = await db.insert(wishes).values(wish).returning();
    return newWish;
  }

  async updateWish(id: number, updates: Partial<Wish>): Promise<Wish> {
    const [updatedWish] = await db.update(wishes).set(updates).where(eq(wishes.id, id)).returning();
    return updatedWish;
  }

  // Photo methods
  async getPhotos(userId: number): Promise<Photo[]> {
    return await db.select().from(photos).where(eq(photos.userId, userId));
  }

  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const [newPhoto] = await db.insert(photos).values(photo).returning();
    return newPhoto;
  }

  // Timeline methods
  async getTimelineEvents(userId: number): Promise<TimelineEvent[]> {
    return await db.select().from(timeline_events).where(eq(timeline_events.userId, userId));
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db.insert(timeline_events).values(event).returning();
    return newEvent;
  }

  // Quiz methods
  async getQuizQuestions(userId: number): Promise<QuizQuestion[]> {
    return await db.select().from(quiz_questions).where(eq(quiz_questions.userId, userId));
  }

  async createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const [newQuestion] = await db.insert(quiz_questions).values(question).returning();
    return newQuestion;
  }
}

export const storage = new DatabaseStorage();
