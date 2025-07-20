import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertMemorySchema, insertWishSchema, 
  insertPhotoSchema, insertTimelineEventSchema, insertQuizQuestionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.get("/api/users", async (req, res) => {
    res.json([]);
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Memory routes
  app.get("/api/memories/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const memories = await storage.getMemories(userId);
      res.json(memories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch memories" });
    }
  });

  app.post("/api/memories", async (req, res) => {
    try {
      const memoryData = insertMemorySchema.parse(req.body);
      const memory = await storage.createMemory(memoryData);
      res.json(memory);
    } catch (error) {
      res.status(400).json({ error: "Invalid memory data" });
    }
  });

  // Wish routes
  app.get("/api/wishes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const wishes = await storage.getWishes(userId);
      res.json(wishes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishes" });
    }
  });

  app.post("/api/wishes", async (req, res) => {
    try {
      const wishData = insertWishSchema.parse(req.body);
      const wish = await storage.createWish(wishData);
      res.json(wish);
    } catch (error) {
      res.status(400).json({ error: "Invalid wish data" });
    }
  });

  app.put("/api/wishes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const wish = await storage.updateWish(id, updates);
      res.json(wish);
    } catch (error) {
      res.status(400).json({ error: "Failed to update wish" });
    }
  });

  // Photo routes
  app.get("/api/photos/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const photos = await storage.getPhotos(userId);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photos" });
    }
  });

  app.post("/api/photos", async (req, res) => {
    try {
      const photoData = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(photoData);
      res.json(photo);
    } catch (error) {
      res.status(400).json({ error: "Invalid photo data" });
    }
  });

  // Timeline routes
  app.get("/api/timeline/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const events = await storage.getTimelineEvents(userId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timeline events" });
    }
  });

  app.post("/api/timeline", async (req, res) => {
    try {
      const eventData = insertTimelineEventSchema.parse(req.body);
      const event = await storage.createTimelineEvent(eventData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid timeline event data" });
    }
  });

  // Quiz routes
  app.get("/api/quiz/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const questions = await storage.getQuizQuestions(userId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz questions" });
    }
  });

  app.post("/api/quiz", async (req, res) => {
    try {
      const questionData = insertQuizQuestionSchema.parse(req.body);
      const question = await storage.createQuizQuestion(questionData);
      res.json(question);
    } catch (error) {
      res.status(400).json({ error: "Invalid quiz question data" });
    }
  });

  // Initialize sample data route
  app.post("/api/init-sample-data", async (req, res) => {
    try {
      // Create a sample user
      const user = await storage.createUser({
        username: "sevgilim",
        password: "birthday2024"
      });

      // Create sample memories
      const sampleMemories = [
        {
          userId: user.id,
          title: "İlk Buluşmamız",
          description: "O gün seni ilk gördüğümde kalbim çok hızlı atmaya başladı. Gözlerindeki parıltı ve tebessümün beni büyüledi.",
          date: "14 Şubat 2023",
          imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        },
        {
          userId: user.id,
          title: "İlk El Ele Tutuşumuz",
          description: "Parkta yürürken elini tuttuğum an... Sanki elektrik çarpmış gibi hissettim.",
          date: "25 Şubat 2023",
          imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        }
      ];

      for (const memory of sampleMemories) {
        await storage.createMemory(memory);
      }

      // Create sample photos
      const samplePhotos = [
        {
          userId: user.id,
          title: "İlk Randevumuz",
          imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          caption: "İlk Randevumuz",
          date: "14 Şubat 2023"
        },
        {
          userId: user.id,
          title: "Deniz Tatilimiz",
          imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          caption: "Deniz Tatilimiz",
          date: "15 Temmuz 2023"
        }
      ];

      for (const photo of samplePhotos) {
        await storage.createPhoto(photo);
      }

      // Create sample timeline events
      const sampleTimelineEvents = [
        {
          userId: user.id,
          title: "İlk Tanışma",
          description: "Kafede çalışırken seni fark ettim. O gülen gözlerin ve zarafetinle büyüledin beni.",
          date: "14 Şubat 2023",
          side: "left",
          isSpecial: false
        },
        {
          userId: user.id,
          title: "Bugün - Doğum Günün",
          description: "Ve işte bugün, sana olan sevgimi bir kez daha gösterme fırsatı buldum. Mutlu yıllar aşkım!",
          date: "Bugün",
          side: "right",
          isSpecial: true
        }
      ];

      for (const event of sampleTimelineEvents) {
        await storage.createTimelineEvent(event);
      }

      // Create sample wishes
      const sampleWishes = [
        {
          userId: user.id,
          message: "Sağlıklı ve mutlu bir yaşam dilerim! 💪",
          balloonPopped: false
        },
        {
          userId: user.id,
          message: "Tüm hayallerin gerçek olsun! ✨",
          balloonPopped: false
        }
      ];

      for (const wish of sampleWishes) {
        await storage.createWish(wish);
      }

      // Create sample quiz questions
      const sampleQuizQuestions = [
        {
          userId: user.id,
          question: "En sevdiğin renk nedir?",
          options: ["Mavi", "Pembe", "Mor", "Yeşil"],
          correctAnswer: 2
        },
        {
          userId: user.id,
          question: "İlk buluşmamızda nerede tanıştık?",
          options: ["Kafede", "Parkta", "Sinemada", "Müzede"],
          correctAnswer: 0
        }
      ];

      for (const question of sampleQuizQuestions) {
        await storage.createQuizQuestion(question);
      }

      res.json({ message: "Sample data initialized successfully", userId: user.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to initialize sample data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
