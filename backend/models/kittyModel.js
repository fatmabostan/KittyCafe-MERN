import mongoose from "mongoose";

const kittySchema = new mongoose.Schema({
  breed: {
    type: String, // Kedinin ırkı
  },
  age: {
    type: Number, // Kedinin yaşı
  },
  gender: {
    type: String, // Erkek veya dişi
    enum: ['Male', 'Female']
  },
  personality: {
    type: [String], // Kedinin kişilik özellikleri (örn. "sakin", "oyuncu")
  },
  color: {
    type: [String], // Kedinin rengi
  },
  imageUrl: {
    type: String, // Kedinin fotoğrafının URL'si
  },
  description: {
    type: String,
    required: true, // Kedi hakkında genel açıklama
  },
  adoptionStatus: {
    type: String, // "Available", "Adopted" gibi durumlar
    enum: ['Available', 'Adopted'],
    default: 'Available',
  },
  healthStatus: {
    vaccinated: {
      type: Boolean, // Aşı durumu
      default: false,
    },
    spayedOrNeutered: {
      type: Boolean, // Kısırlaştırılmış mı
      default: false,
    },
    healthNotes: {
      type: String, // Özel sağlık durumu (ör. alerjiler, geçmiş sağlık sorunları)
    }
  },
  lastVetVisit: {
    type: Date, // En son veteriner ziyaret tarihi
  },
  Location: {
    type: String, // Kedin hangi kafede olduğu bilgisi
  }
});

export const Kitty = mongoose.model('Kitty', kittySchema);


