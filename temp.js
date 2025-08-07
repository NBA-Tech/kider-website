async function translateText(text, targetLang) {
    try {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "en",  // default language
                target: targetLang,
                format: "text"
            })
        });

        const data = await res.json();
        console.log(data)
        return data.translatedText;
    } catch (e) {
        console.error("Translation error:", e);
        return text; // fallback
    }
}
translateText("Hello", "fr").then(result => console.log(result));