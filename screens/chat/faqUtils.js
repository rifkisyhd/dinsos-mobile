/**
 * Utilitas untuk mempersiapkan data FAQ untuk sistem prompt
 * 
 * @param {Array} faqs - Array berisi objek FAQ {question, answer, category}
 * @returns {String} - Text yang berisi FAQ untuk sistem prompt
 */
export const prepareFAQForPrompt = (faqs) => {
    if (!faqs || faqs.length === 0) return "";
    
    // Kelompokkan FAQ berdasarkan kategori untuk strukturisasi
    const categorizedFAQs = {};
    
    faqs.forEach(faq => {
        const category = faq.category || 'Umum';
        if (!categorizedFAQs[category]) {
            categorizedFAQs[category] = [];
        }
        categorizedFAQs[category].push(faq);
    });
    
    // Buat teks FAQ terstruktur per kategori
    let faqText = "";
    Object.keys(categorizedFAQs).forEach(category => {
        faqText += `## ${category.toUpperCase()}\n`;
        categorizedFAQs[category].forEach((faq, index) => {
            faqText += `[FAQ-${category}-${index+1}]\nQ: ${faq.question}\nA: ${faq.answer}\n\n`;
        });
    });
    
    return faqText;
};

/**
 * Mengekstrak kata kunci penting dari sebuah teks
 * 
 * @param {String} text - Teks untuk diekstrak kata kuncinya 
 * @returns {Array} - Array berisi kata kunci
 */
export const extractKeywords = (text) => {
    if (!text) return [];
    
    // Kata-kata umum yang perlu difilter (stopwords)
    const stopwords = [
        "yang", "di", "dan", "itu", "dengan", "untuk", "pada", "tidak", "ini", 
        "dari", "dalam", "akan", "adalah", "saya", "kamu", "dia", "mereka", "kami",
        "apa", "bagaimana", "kapan", "dimana", "kenapa", "siapa", "atau", "jika",
        "bisa", "ada", "apakah", "ya", "tidak", "oke", "baik", "mungkin", "selalu",
        "tolong", "mohon", "bantu"
    ];
    
    // Proses teks untuk mendapatkan kata kunci
    const words = text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Hapus tanda baca
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopwords.includes(word));
    
    // Hitung frekuensi kata
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Urutkan kata berdasarkan frekuensi
    return Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]);
};

/**
 * Menemukan kecocokan FAQ berdasarkan kemiripan semantik sederhana
 * 
 * @param {String} query - Pertanyaan pengguna
 * @param {Array} faqs - Array berisi objek FAQ
 * @returns {Object|null} - FAQ yang cocok atau null jika tidak ada
 */
export const findSemanticMatch = (query, faqs) => {
    if (!query || !faqs || faqs.length === 0) return null;
    
    const normalizedQuery = query.toLowerCase().trim();
    const queryKeywords = extractKeywords(normalizedQuery);
    
    if (queryKeywords.length === 0) return null;
    
    let bestMatch = null;
    let highestScore = 0;
    
    faqs.forEach(faq => {
        const question = faq.question.toLowerCase();
        
        // Cek kecocokan persis
        if (question === normalizedQuery) {
            return faq; // Langsung kembalikan jika cocok persis
        }
        
        // Cek kata-kata penting dalam pertanyaan
        const questionKeywords = extractKeywords(question);
        
        // Hitung skor kecocokan berdasarkan kata kunci yang sama
        let score = 0;
        queryKeywords.forEach(keyword => {
            if (question.includes(keyword)) {
                score += 2; // Bobot lebih jika kata kunci ada dalam pertanyaan
            }
            
            if (questionKeywords.includes(keyword)) {
                score += 1; // Tambah skor jika kata kunci juga ada di kata kunci pertanyaan
            }
        });
        
        // Dapatkan persentase kecocokan berdasarkan panjang query
        const matchPercentage = score / (queryKeywords.length * 2);
        
        // Update jika ini adalah kecocokan terbaik sejauh ini
        if (matchPercentage > highestScore && matchPercentage > 0.5) { // Ambang batas 50%
            highestScore = matchPercentage;
            bestMatch = faq;
        }
    });
    
    return bestMatch;
};

/**
 * Mengoptimalkan sistem prompt untuk menghemat token
 * 
 * @param {Array} faqs - Array berisi objek FAQ
 * @param {Object} options - Opsi pengaturan
 * @returns {String} - Sistem prompt yang dioptimalkan
 */
export const createOptimizedSystemPrompt = (faqs, options = {}) => {
    const faqText = prepareFAQForPrompt(faqs);
    
    const prompt = `
    Anda adalah asisten AI bernama ${options.botName || 'Cak J'} untuk aplikasi ${options.appName || 'Dinsos Mobile'}.
    Tugas Anda adalah membantu menjawab pertanyaan pengguna seputar layanan Dinas Sosial.
    Gunakan HANYA informasi dari daftar FAQ berikut sebagai referensi.
    
    ${faqText}
    
    Aturan penting:
    1. Gunakan bahasa yang santun, ramah, dan mudah dipahami
    2. Jika pertanyaan tidak terdapat dalam FAQ, sampaikan dengan jujur bahwa Anda tidak memiliki informasi tersebut
    3. Jawab pertanyaan secara langsung dan ringkas
    4. Jangan mengarang informasi yang tidak ada dalam FAQ
    5. Jawab dalam Bahasa Indonesia
    `;
    
    return prompt;
};