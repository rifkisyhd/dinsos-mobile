import { supabase } from "../../lib/supabaseClient";

/**
 * Kelas FAQManager untuk mengelola semua operasi terkait FAQ
 */
export class FAQManager {
    constructor() {
        this.faqs = [];
        this.systemPrompt = "";
        this.isLoaded = false;
        this.lastFetchTime = null;
        this.cacheDuration = 1000 * 60 * 60; // 1 jam dalam milidetik
    }

    /**
     * Mengambil FAQ dari Supabase dan menyimpannya dalam cache
     */
    async fetchFAQs() {
        try {
            const now = new Date().getTime();
            
            // Periksa apakah data sudah di-cache dan masih valid
            if (this.isLoaded && this.lastFetchTime && (now - this.lastFetchTime < this.cacheDuration)) {
                console.log("Menggunakan data FAQ dari cache");
                return this.faqs;
            }
            
            console.log("Mengambil data FAQ baru dari Supabase");
            const { data, error } = await supabase
                .from('faqs') 
                .select('question, answer, category')
                .eq('is_active', true);

            if (error) {
                console.error("Gagal mengambil data FAQ:", error.message);
                return this.faqs; // Kembalikan data yang sudah ada jika gagal
            }

            if (data && data.length > 0) {
                this.faqs = data;
                this.buildSystemPrompt();
                this.isLoaded = true;
                this.lastFetchTime = now;
            }
            
            return this.faqs;
        } catch (err) {
            console.error("Error saat memproses data FAQ:", err.message);
            return this.faqs;
        }
    }

    /**
     * Membangun prompt sistem berdasarkan FAQ yang tersedia
     */
    buildSystemPrompt() {
        if (!this.faqs || this.faqs.length === 0) {
            this.systemPrompt = "";
            return;
        }
        
        const faqText = this.faqs.map((item, index) => 
            `[FAQ-${index+1}]\nQ: ${item.question}\nA: ${item.answer}`
        ).join("\n\n");
        
        this.systemPrompt = `
        Anda adalah asisten AI bernama Cak J untuk aplikasi Dinsos Mobile.
        Tugas Anda adalah membantu menjawab pertanyaan pengguna seputar layanan Dinas Sosial.
        Gunakan HANYA informasi dari daftar FAQ berikut sebagai sumber informasi Anda.
        
        FAQ:
        ${faqText}
        
        Aturan penting:
        1. Jawab dengan bahasa yang ramah dan sopan
        2. Jika pertanyaan tidak ada dalam FAQ, katakan dengan jujur bahwa Anda tidak memiliki informasi dan sarankan untuk menghubungi Dinas Sosial
        3. Berikan jawaban singkat dan langsung ke intinya
        4. Jangan menjawab terlalu kaku dan membahas tentang FAQ dalam kalimat
        5. Jawab dalam Bahasa Indonesia
        `;
    }

    /**
     * Mencari kecocokan dasar pada pertanyaan dengan FAQ yang tersedia
     * @param {string} query - Pertanyaan pengguna
     * @returns {string|null} - Jawaban jika ditemukan, null jika tidak ada kecocokan
     */
    findBasicMatch(query) {
        if (!this.faqs || this.faqs.length === 0) return null;
        
        const normalizedQuery = query.toLowerCase().trim();
        
        // Coba cari kecocokan langsung
        for (const faq of this.faqs) {
            const questionLower = faq.question.toLowerCase();
            
            // Jika pertanyaan hampir sama persis
            if (
                questionLower === normalizedQuery || 
                questionLower.includes(normalizedQuery) || 
                normalizedQuery.includes(questionLower)
            ) {
                return faq.answer;
            }
            
            // Cek kata kunci utama
            const queryWords = normalizedQuery.split(/\s+/);
            if (queryWords.length > 2) {
                let matchCount = 0;
                for (const word of queryWords) {
                    if (word.length > 3 && questionLower.includes(word)) {
                        matchCount++;
                    }
                }
                
                // Jika lebih dari 70% kata kunci cocok
                if (matchCount / queryWords.length > 0.7) {
                    return faq.answer;
                }
            }
        }
        
        return null;
    }

    /**
     * Mendapatkan sistem prompt untuk API call OpenAI
     * @returns {string} - Sistem prompt
     */
    getSystemPrompt() {
        return this.systemPrompt;
    }

    /**
     * Mendapatkan status apakah FAQ sudah dimuat
     * @returns {boolean} - Status loading FAQ
     */
    isLoaded() {
        return this.isLoaded;
    }
}