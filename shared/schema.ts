import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishes = pgTable("wishes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  balloonPopped: boolean("balloon_popped").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timeline_events = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  side: text("side").notNull(), // "left" or "right"
  isSpecial: boolean("is_special").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quiz_questions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  memories: many(memories),
  wishes: many(wishes),
  photos: many(photos),
  timelineEvents: many(timeline_events),
  quizQuestions: many(quiz_questions),
}));

export const memoriesRelations = relations(memories, ({ one }) => ({
  user: one(users, {
    fields: [memories.userId],
    references: [users.id],
  }),
}));

export const wishesRelations = relations(wishes, ({ one }) => ({
  user: one(users, {
    fields: [wishes.userId],
    references: [users.id],
  }),
}));

export const photosRelations = relations(photos, ({ one }) => ({
  user: one(users, {
    fields: [photos.userId],
    references: [users.id],
  }),
}));

export const timelineEventsRelations = relations(timeline_events, ({ one }) => ({
  user: one(users, {
    fields: [timeline_events.userId],
    references: [users.id],
  }),
}));

export const quizQuestionsRelations = relations(quiz_questions, ({ one }) => ({
  user: one(users, {
    fields: [quiz_questions.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMemorySchema = createInsertSchema(memories).pick({
  userId: true,
  title: true,
  description: true,
  date: true,
  imageUrl: true,
});

export const insertWishSchema = createInsertSchema(wishes).pick({
  userId: true,
  message: true,
  balloonPopped: true,
});

export const insertPhotoSchema = createInsertSchema(photos).pick({
  userId: true,
  title: true,
  imageUrl: true,
  caption: true,
  date: true,
});

export const insertTimelineEventSchema = createInsertSchema(timeline_events).pick({
  userId: true,
  title: true,
  description: true,
  date: true,
  side: true,
  isSpecial: true,
});

export const insertQuizQuestionSchema = createInsertSchema(quiz_questions).pick({
  userId: true,
  question: true,
  options: true,
  correctAnswer: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMemory = z.infer<typeof insertMemorySchema>;
export type Memory = typeof memories.$inferSelect;
export type InsertWish = z.infer<typeof insertWishSchema>;
export type Wish = typeof wishes.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
export type TimelineEvent = typeof timeline_events.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quiz_questions.$inferSelect;
