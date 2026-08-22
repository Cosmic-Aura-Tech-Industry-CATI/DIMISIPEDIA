export type LanguageMode = "en" | "hinglish" | "hi";

export interface PhaseTranslation {
  title: string;
  subtitle: string;
  quoteText: string;
  narrative: string[];
  highlights: string[];
}

export const journeyTranslations: Record<"hinglish" | "hi", Record<string, PhaseTranslation>> = {
  hinglish: {
    "phase-1": {
      title: "Ghar Par 6 Ghante Ka Sprint Aur CATI Ki Shuruat",
      subtitle:
        "Axis College ke Gandhigiri technical presenting event ke liye ghar par 6 ghante me bane Face Recognition system ne IT company ki aag lagayi.",
      quoteText:
        "Agar hum ghar baithe 6 ghante me working face recognition system bana sakte hain, toh apni IT company kyu nahi?",
      narrative: [
        "Ye sab shuru hua 15 October 2024 ko. Main aur Swatantra mere ghar par baithe the jahan hum Axis College ke 'Gandhigiri' technical project presentation event ke liye ek urgent project bana rahe the: Face Recognition System.",
        "Lagbhag 6 se 7 ghante ki continuous mehnat ke baad, humne scratch se ek fully functional Face Recognition system khada kar diya. Shaam ke lagbhag 8-9 baje jab hum dono ne dekha ki humne kitni jaldi ye ready kar diya, tab dimag me ek bada sawal aaya: Jab hum ghar par ek hi dopahar me aisi AI technology bana sakte hain, toh hum apni khud ki IT startup kyu nahi shuru kar sakte?",
        "Swatantra bina kisi jhijhak ke turant agree ho gaya. Wo aisa bhai aur dost hai jo agar main kuve me koodu toh wo bhi sath kood jaye. Humne usi pal hath milaya aur business partners banne ka faisla kiya. Kuch hi minute me humne apni pehli company ka naam rakha: CATI — Cosmic Aura Tech Industry.",
        "Humne Axis College ke Gandhigiri event me is Face Recognition project ko successfully present kiya. Uske baad, AICTE Virtual Android Development lab me humne ye idea Nishkarsh ko bataya. Wo bhi is journey ka hissa banne ke liye usi waqt ready ho gaya.",
      ],
      highlights: [
        "Ghar par 6-7 ghante me working Face Recognition system banaya",
        "Axis College ke Gandhigiri technical project presentation event me present kiya",
        "Shikhar Dixit aur Swatantra Singh ke beech partnership ki shuruat hui",
        "Pehla company name invent kiya: CATI (Cosmic Aura Tech Industry)",
        "Nishkarsh Mishra ne AICTE lab me founding trio ko complete kiya",
      ],
    },
    "phase-2": {
      title: "IIT Bombay Ka E-Summit Aur Real Reality Check",
      subtitle: "Mumbai ki overnight train aur asali startup ecosystem ka pehla anubhav.",
      quoteText:
        "Mumbai ki us trip ne hume pehli baar startup world ki asali reality ka aaina dikhaya.",
      narrative: [
        "4 January 2025 ko mujhe LinkedIn par IIT Bombay E-Summit 2025 ki post mili. Wahan job fair ke sath-sath real entrepreneurship sikhne ka bada mauka tha.",
        "Hum teeno ne turant discuss kiya. Final year me student budget tight tha aur achanak Mumbai ki train ticket book karna challenging tha, lekin event 1 aur 2 February ko tha. Humne faisla kiya ki wahan physically jana zaroori hai.",
        "Usi raat humne Kanpur se Mumbai ki ticket book ki. 28 January 2025 ko hum Mumbai pahuche, wahan founders ki mehnat, pitch karne ka tareeqa aur startups ka scale dekha, aur 4 February ko Kanpur wapas laute.",
        "Is trip ne hamari aankhein khol di. Wapas aane ke baad hume final semester placement drives ke liye serious hona pada.",
      ],
      highlights: [
        "Kanpur se Mumbai IIT Bombay E-Summit 2025 ke liye train booking",
        "Desh-bhar ke founders, pitching aur startup operations ko live dekha",
        "Kanpur wapas aakar final year placement drives ka samna kiya",
      ],
    },
    "phase-3": {
      title: "5th Placement Rejection Aur Raat Ka Call",
      subtitle: "Ghar ke bahar akele sadak par chalte waqt Poll-Social ka idea aana.",
      quoteText:
        "Agar tumhare paas achhe partners hain, toh placement rejection ke baad CATI pe kaam karne ka yahi sahi waqt hai.",
      narrative: [
        "13 November 2025 ki shaam ko, main apne ghar ke bahar sadak par akela ghoom raha tha. Pura mann dukhi tha kyunki sari skills hone ke bawajood main lagatar 5 placement drives me reject ho chuka tha.",
        "Tabhi Priya ka call aaya. Usne meri pareshani aur doubts ko shanti se suna.",
        "Baat karte waqt usne mujhse ek simple sawal poocha: Main placement rejection ko apna career kyu samajh raha hoon jabki meri asali passion entrepreneurship hai? Usne yaad dilaya ki Swatantra aur Nishkarsh jaise bharosemand co-founders mere sath hain, aur shayad ye rejections hi CATI ko full-time shuru karne ka sahi ishara hain.",
        "Maine poocha: 'Main kya banau?' Usne suggest kiya ki ek anonymous social app banao jahan students bina kisi darr ya judgment ke apne dil ki baat bol sakein. Idea turant click hua. Maine us raat soye bina code kiya, Poll-Social naam se web prototype banaya aur Netlify (kaleshpro1.netlify.app) par deploy kiya jo aaj bhi live hai.",
      ],
      highlights: [
        "5th placement rejection bana sabse bada turning point",
        "Priya ne late-night call par anonymous expression app ka idea diya",
        "Shikhar ne ek hi raat me prototype code karke Netlify par deploy kiya",
        "Live deployment: kaleshpro1.netlify.app",
      ],
    },
    "phase-4": {
      title: "“Chalo Kalesh Karey” Aur Core Team Ka Banna",
      subtitle: "Kalesh naam ka idea, lab me discussions, aur Sheelu-Mridul ka team me aana.",
      quoteText:
        "Jab log anonymous honge aur sach bolenge toh kalesh toh hoga hi. Toh app ka naam Kalesh kyu nahi?",
      narrative: [
        "Agli subah AICTE Infosys lab me maine Swatantra aur Nishkarsh ko prototype dikhaya. Swatantra ready ho gaya, lekin Nishkarsh ne practical sawal daage: Android app kaise banega? Backend kaise scale hoga? Maine usse bharosa dilaya ki main best team assemble karunga.",
        "Usi shaam Priya ka dubara call aaya. Jab maine naam ke bare me bataya toh usne achanak kaha: 'Kyu na iska naam Kalesh rakhein? Anonymous log jab sach bolenge toh kalesh hi toh hoga!' Pehle mujhe mazaak laga, par wo serious thi.",
        "Agli subah maine dono ko bataya. Swatantra ne haste hue naara lagaya: 'Chalo Kalesh Karey!'",
        "Fir humne recruitment shuru kiya. Pehle Sheelu Singh ko approach kiya — hamare college batch ka sabse sharp Flutter/Dart developer. Wo ek baar me ready ho gaya. Fir Mridul Mishra ko approach kiya jo Linux aur backend ka genius hai. 17 November 2025 ko Project Kalesh ke liye CATI ka internal agreement sign hua.",
      ],
      highlights: [
        "Priya ne 'Kalesh' naam diya; Swatantra ka slogan bana 'Chalo Kalesh Karey'",
        "Sheelu Singh bane Mobile Lead (Flutter/Dart)",
        "Mridul Mishra bane Backend & Linux Systems Lead",
        "17 November 2025 ko founding agreement finalize hua",
      ],
    },
    "phase-5": {
      title: "Library Ka Intezaar Aur Shark Tank Pitch",
      subtitle: "Jayant Sir se milne ke liye 2 ghante intezaar aur studio me pitch recording.",
      quoteText:
        "Shayad Sir hamara patience test kar rahe hain. Chalo yahan ruko aur intezaar karo.",
      narrative: [
        "Semester exams ke dauran Jayendra Pratap Singh (Jayant Sir) ke Startup practical me humne Kalesh ka pitch diya. Baaki students ke mukable hum genuinely startup banana chahte the.",
        "December 2025 me Nishkarsh aur main college library pahuche. Humne bahar 2 ghante intezaar kiya. Jab main irritate hone laga toh Nishkarsh ne kaha: 'Shayad Sir hamara patience test kar rahe hain.'",
        "Jab Jayant Sir ne bulaya, humne pura blueprint dikhaya. Unhone hume college studio ka access diya aur Shark Tank India ka form bharwaya. Junior Harsh Mishra ne video edit karne me madad ki.",
      ],
      highlights: [
        "Startup practical evaluation me Kalesh ka pitch diya",
        "Central library me 2 ghante intezaar karke commitment prove kiya",
        "Studio access mila aur Shark Tank India ka application video banaya",
      ],
    },
    "phase-6": {
      title: "Sinister Six, Sand Tank Office Aur TheKalesh.com",
      subtitle: "Website deployment, campus office allocation aur first interns ki hiring.",
      quoteText:
        "Hum 6 college developers the — Sinister Six — jo Sand Tank office se code push kar rahe the.",
      narrative: [
        "4 January 2026 se Kalesh ki full development shuru hui aur 22 January ko Mridul ne TheKalesh.com live deploy kiya. Is dauran Siddhant Shekhar frontend developer ke roop me jude.",
        "Hamari core 6 logo ki team ban gayi — 'The Sinister Six': Shikhar (CEO), Swatantra (CTO), Nishkarsh (CFO/COO), Mridul (Backend), Sheelu (Android), Siddhant (Web).",
        "February 2026 me college administration ne hume Sand Tank area me dedicated office allot kiya. College permission ke sath 22 February ko humne 4 interns hire kiye: Saumya Shukla, Niyati Gupta, Harsh Mishra, aur Amit Kumar.",
      ],
      highlights: [
        "22 January 2026 ko TheKalesh.com live launch",
        "'The Sinister Six' engineering unit ka gathan",
        "Axis College campus me Sand Tank office space mila",
        "22 February 2026 ko 4 student interns ki hiring",
      ],
    },
    "phase-7": {
      title: "Exam Hall Formula Aur DIMISI Ka Janam",
      subtitle:
        "Exam paper ke peeche 'DI + MI + SI' ka formula banna aur Private Limited incorporation.",
      quoteText: "Dixit ka DI, Mishra ka MI, Singh ka SI. Saath me: DIMISI.",
      narrative: [
        "Jab hum official company register karane gaye toh pata chala ki CATI naam MCA portal par pehle se registered entities ke karan conflict me tha. Us waqt mid-sem exams chal rahe the.",
        "Exam hall me question paper ke peeche scrap sheet par main lagatar naye naam soch raha tha. Tabhi ye unique formula dimag me aaya:",
        "DI (Dixit) + MI (Mishra) + SI (Singh) = DIMISI.",
        "Exam ke baad maine team ko bataya. Pehle sab hase, par jab MCA portal par check kiya toh 0 conflicts the. 9 April 2026 ko hum officially DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506) ke Directors ban gaye.",
      ],
      highlights: [
        "Exam hall me scrap paper par 'DI-MI-SI' formula invent hua",
        "100% MCA clearance bina kisi name conflict ke",
        "9 April 2026 ko DIMISI Technologies Pvt. Ltd. officially incorporate hui",
      ],
    },
    "phase-8": {
      title: "Office Ko Ghar Lana Aur Junior Energy",
      subtitle: "Family ke sath ghar me office setup aur 17 May 2026 ko company board lagna.",
      quoteText:
        "17 May 2026 ko gate par company ka board lag gaya. DIMISI ko apna ghar mil chuka tha.",
      narrative: [
        "College khatam hone ke baad team dynamics badle: Sheelu remote chala gaya aur naye passionate juniors jude: Prashant, Amrit, Anushka, Nisha, Vinay.",
        "Parents ke support se humne Kanpur ke Swarn Jayanti Vihar wale ghar ke ek kamre ko official headquarters banaya.",
        "16 May ko inauguration kiya aur 17 May 2026 ko gate par official DIMISI board lagaya gaya bank verification ke liye.",
      ],
      highlights: [
        "Kanpur me home office setup kiya family support ke sath",
        "Juniors Prashant, Amrit, Anushka, Nisha aur Vinay team me jude",
        "17 May 2026 ko banking verification ke liye company board install hua",
      ],
    },
    "phase-9": {
      title: "Raat Ki Walk Aur Pehla Client Deal",
      subtitle: "100+ cold calls ke baad Rudra Tours & Travels ka pehla commercial contract milna.",
      quoteText:
        "100+ cold calls ke baad, raat ki ek casual walk ne hume hamara pehla commercial contract diya.",
      narrative: [
        "Revenue ke bina company chalana tough tha. 100 se zyada cold calls aur meetings ke baad bhi koi deal nahi mil rahi thi.",
        "Ek raat frustrated hokar main ghar ke bahar ghoom raha tha. Pados ke ek vyakti ne poocha: 'Kya aapki company websites banati hai? Meri tours and travels agency ke liye website chahiye.'",
        "Ek hafte ke andar humne apna pehla client sign kiya: Rudra Tours & Travels. Somya Tiwari client management ke liye judi aur iske baad humne 2 aur client contracts successfully close kiye.",
      ],
      highlights: [
        "Cold outreach ke struggles ke baad pehla client mila",
        "Rudra Tours & Travels ka web development contract successfully deliver kiya",
        "Somya Tiwari ke judne se client delivery aur strong hui",
      ],
    },
    "phase-10": {
      title: "DIMISIPEDIA Aur Aage Ka Safar",
      subtitle:
        "Apni sachhi history ko document karna aur har us shakhs ka shukriya ada karna jo sath khada raha.",
      quoteText:
        "Ye kahani ka ant nahi hai, bas aaj tak ka safar hai. Un sabka dil se shukriya jinhone humpe vishwas kiya.",
      narrative: [
        "19 August 2026 ko humne DIMISIPEDIA banana shuru kiya taaki hamari technology, people aur unfiltered journey sabke samne source-backed tarike se ho.",
        "Aaj 21 August 2026 ko peeche mudkar dekhte hain toh Axis College ke classroom se lekar MCA registration aur client deals tak ka safar behad yaadgaar raha hai.",
        "Hum un sabhi ke aabhari hain: Hamare juniors, co-founders Swatantra aur Nishkarsh, core developers Mridul aur Sheelu, mere parents, aur meri life partner Priya jinhone is pure safar ko sambhala.",
      ],
      highlights: [
        "19 August 2026 ko DIMISIPEDIA ka creation shuru hua",
        "Har ek milestone, source aur evidence ka public archive",
        "Co-founders, juniors, parents aur Priya ka dil se aabhar",
        "Aage badhta hua ek living entrepreneurship safar",
      ],
    },
  },
  hi: {
    "phase-1": {
      title: "घर पर 6 घंटे का प्रोजेक्ट एवं CATI का उद्भव",
      subtitle:
        "एक्सिस कॉलेज के 'गांधीगीरी' तकनीकी प्रोजेक्ट प्रस्तुति आयोजन हेतु घर पर 6 घंटे में बने फेस रिकॉग्निशन सिस्टम ने स्टार्टअप की नींव रखी।",
      quoteText:
        "यदि हम घर बैठकर छह घंटे में कार्यशील फेस रिकॉग्निशन प्रणाली बना सकते हैं, तो अपनी आईटी कंपनी क्यों नहीं?",
      narrative: [
        "यह यात्रा 15 अक्टूबर 2024 को आरंभ हुई। शिखर दीक्षित और स्वतंत्र सिंह ने कानपुर स्थित घर पर बैठकर एक्सिस कॉलेज के 'गांधीगीरी' तकनीकी प्रोजेक्ट प्रस्तुति आयोजन हेतु एक स्वचालित फेस रिकॉग्निशन प्रणाली तैयार की।",
        "मात्र छह से सात घंटों के सघन विकास कार्य में एक संपूर्ण कार्यशील प्रणाली तैयार कर ली गई। शाम को दोनों ने विचार किया कि जब घर पर कुछ ही घंटों में ऐसी जटिल एआई तकनीक तैयार की जा सकती है, तो अपनी स्वयं की आईटी कंपनी क्यों न स्थापित की जाए। स्वतंत्र सिंह तुरंत सहमत हुए और उन्होंने CATI (कॉस्मिक ऑरा टेक इंडस्ट्री) की नींव रखी।",
        "इस प्रोजेक्ट को एक्सिस कॉलेज के गांधीगीरी तकनीकी आयोजन में सफलतापूर्वक प्रस्तुत किया गया। तदुपरांत एआईसीटीई लैब में निष्कर्ष मिश्रा को इस पहल से जोड़ा गया, जिससे संस्थापक त्रिमूर्ति पूर्ण हुई।",
      ],
      highlights: [
        "घर पर 6-7 घंटों में कार्यशील फेस रिकॉग्निशन प्रणाली का निर्माण",
        "एक्सिस कॉलेज के गांधीगीरी तकनीकी प्रोजेक्ट प्रस्तुति आयोजन में सफल प्रदर्शन",
        "शिखर दीक्षित एवं स्वतंत्र सिंह के मध्य व्यावसायिक साझेदारी",
        "प्रारंभिक नाम CATI का चयन",
        "निष्कर्ष मिश्रा का संस्थापक दल में सम्मिलित होना",
      ],
    },
    "phase-2": {
      title: "आईआईटी बॉम्बे ई-समिट और उद्यमिता की वास्तविकता",
      subtitle:
        "मुंबई यात्रा एवं राष्ट्रीय स्तर के स्टार्टअप पारिस्थितिकी तंत्र का प्रत्यक्ष अनुभव।",
      quoteText: "उस यात्रा ने हमें उद्यमिता की वास्तविक चुनौतियों और संभावनाओं से परिचित कराया।",
      narrative: [
        "4 जनवरी 2025 को आईआईटी बॉम्बे ई-समिट 2025 की सूचना प्राप्त होने पर तीनों संस्थापकों ने कानपुर से मुंबई की रेल यात्रा की। 28 जनवरी से 4 फरवरी 2025 तक चले इस अनुभव ने राष्ट्रीय स्तर के संस्थापकों, तकनीकी प्रस्तुतियों और कार्यप्रणाली से दल को प्रेरित किया।",
      ],
      highlights: [
        "आईआईटी बॉम्बे ई-समिट 2025 में सहभागिता",
        "व्यावसायिक प्रस्तुतियों एवं उद्यमिता का प्रत्यक्ष ज्ञान",
      ],
    },
    "phase-3": {
      title: "पंचम अस्वीकृति और मध्यरात्रि का विचार",
      subtitle: "परिसर साक्षात्कार में असफलताओं के उपरांत 'पोल-सोशल' की रचना।",
      quoteText: "अस्वीकृतियाँ ही कभी-कभी अपने वास्तविक उद्यम को आरंभ करने का उचित अवसर होती हैं।",
      narrative: [
        "13 नवंबर 2025 को पांचवीं नियुक्ति प्रक्रिया में अस्वीकृति के पश्चात जीवनसाथी प्रिया से दूरभाष पर संवाद हुआ। उन्होंने शिखर को अपनी क्षमता पर विश्वास रखने और स्वतंत्र तथा निष्कर्ष के साथ पूर्णकालिक उद्यम आरंभ करने हेतु प्रेरित किया।",
        "प्रिया के सुझाव पर युवाओं के निष्पक्ष संवाद हेतु 'पोल-सोशल' नामक प्रोटोटाइप तैयार कर नेटलिफ़ाई पर लाइव किया गया।",
      ],
      highlights: [
        "पंचम अस्वीकृति यात्रा का निर्णायक मोड़ सिद्ध हुई",
        "प्रिया द्वारा अनाम अभिव्यक्ति मंच की रूपरेखा का सुझाव",
        "शिखर द्वारा एक ही रात्रि में प्रोटोटाइप का निर्माण एवं लाइव प्रसारण",
      ],
    },
    "phase-4": {
      title: "“चलो कलेश करें” और कोर दल का गठन",
      subtitle: "कलेश नामकरण, लैब परिचर्चा एवं शीलू सिंह तथा मृदुल मिश्रा का आगमन।",
      quoteText:
        "अनाम एवं निष्पक्ष संवाद में स्वाभाविक रूप से विचार-विमर्श होता है, अतः 'कलेश' सर्वथा उपयुक्त नाम है।",
      narrative: [
        "लैब में प्रोटोटाइप देखने के उपरांत स्वतंत्र उत्साहित हुए, जबकि निष्कर्ष ने तकनीकी एवं व्यावहारिक पक्षों पर प्रश्न किए। प्रिया द्वारा 'कलेश' नाम प्रस्तावित किया गया जिसे स्वतंत्र ने 'चलो कलेश करें' के उद्घोष के साथ स्वीकारा।",
        "शीलू सिंह को मोबाइल लीड (फ़्लटर) और मृदुल मिश्रा को बैकएंड एवं लिनक्स लीड के रूप में दल में सम्मिलित किया गया।",
      ],
      highlights: [
        "'कलेश' नामकरण और 'चलो कलेश करें' का नारा",
        "शीलू सिंह एवं मृदुल मिश्रा का दल में समावेश",
      ],
    },
    "phase-5": {
      title: "पुस्तकालय में प्रतीक्षा और शार्क टैंक प्रस्तुति",
      subtitle: "जयंत सर का मार्गदर्शन और महाविद्यालय स्टूडियो में पिच वीडियो का निर्माण।",
      quoteText: "धैर्य ही किसी भी उद्यमी की सबसे बड़ी परीक्षा है।",
      narrative: [
        "उद्यमिता विषय के मूल्यांकन में जयंत सर के समक्ष प्रस्तुति दी गई। केंद्रीय पुस्तकालय में 2 घंटे की प्रतीक्षा के पश्चात सर ने मार्गदर्शन प्रदान किया, स्टूडियो का उपयोग सुलभ कराया और शार्क टैंक इंडिया हेतु आवेदन में सहयोग किया।",
      ],
      highlights: [
        "परिसर पुस्तकालय में मार्गदर्शन प्राप्ति",
        "शार्क टैंक इंडिया हेतु वीडियो निर्माण",
      ],
    },
    "phase-6": {
      title: "सिनिस्टर सिक्स, सैंड टैंक कार्यालय और TheKalesh.com",
      subtitle: "वेबसाइट का लोकार्पण, कार्यालय आवंटन और प्रथम प्रशिक्षुओं का चयन।",
      quoteText: "हम छह अभियंताओं का दल थे जो सैंड टैंक कार्यालय से निरंतर कार्य कर रहे थे।",
      narrative: [
        "22 जनवरी 2026 को TheKalesh.com का लोकार्पण हुआ। सिद्धांत शेखर वेब डेवलपर के रूप में जुड़े और 'सिनिस्टर सिक्स' का गठन हुआ। फरवरी 2026 में सैंड टैंक में कार्यालय प्राप्त हुआ तथा चार प्रशिक्षुओं का चयन किया गया।",
      ],
      highlights: ["22 जनवरी 2026 को TheKalesh.com लाइव", "सैंड टैंक परिसर कार्यालय का आवंटन"],
    },
    "phase-7": {
      title: "परीक्षा कक्ष सूत्र और डिमिशी (DIMISI) का प्रादुर्भाव",
      subtitle: "उत्तर-पुस्तिका के पीछे 'DI + MI + SI' सूत्र की रचना और कंपनी का निगमन।",
      quoteText: "दीक्षित का DI, मिश्रा का MI, सिंह का SI — मिलकर बना डिमिशी (DIMISI)।",
      narrative: [
        "एमसीए पोर्टल पर CATI नाम उपलब्ध न होने पर परीक्षा कक्ष में शिखर ने अपने सह-संस्थापकों के उपनामों से सूत्र गढ़ा: DI (Dixit) + MI (Mishra) + SI (Singh) = DIMISI। 9 अप्रैल 2026 को डिमिशी टेक्नोलॉजीज प्राइवेट लिमिटेड विधिवत निगमित हुई (CIN: U62013UP2026PTC246506)।",
      ],
      highlights: [
        "परीक्षा कक्ष में 'DI-MI-SI' सूत्र का सृजन",
        "9 अप्रैल 2026 को DIMISI Technologies Private Limited का आधिकारिक निगमन",
      ],
    },
    "phase-8": {
      title: "गृह कार्यालय एवं कनिष्ठ सहयोगियों का आगमन",
      subtitle: "स्वर्ण जयंती विहार, कानपुर में मुख्यालय की स्थापना और पट्टिका का अनावरण।",
      quoteText: "17 मई 2026 को कंपनी की पट्टिका द्वार पर स्थापित की गई।",
      narrative: [
        "परिवार के सहयोग से कानपुर स्थित गृह परिसर में कार्यालय स्थापित किया गया। कनिष्ठ सदस्यों (प्रशांत, अमृत, अनुष्का, निशा, विनय) ने सहयोग दिया और 17 मई 2026 को बोर्ड लगाया गया।",
      ],
      highlights: ["कानपुर में मुख्यालय की स्थापना", "कनिष्ठ सहयोगियों का दल में स्वागत"],
    },
    "phase-9": {
      title: "रात्रि भ्रमण और प्रथम व्यावसायिक अनुबंध",
      subtitle: "रुद्रा टूर्स एंड ट्रेवल्स के साथ प्रथम व्यावसायिक परियोजना का सफल समापन।",
      quoteText: "सैकड़ों प्रयासों के पश्चात एक साधारण रात्रि संवाद प्रथम अनुबंध में परिणत हुआ।",
      narrative: [
        "अथक प्रयासों के उपरांत रुद्रा टूर्स एंड ट्रेवल्स के साथ प्रथम वेबसाइट निर्माण का अनुबंध प्राप्त हुआ। सौम्या तिवारी के सहयोग से परियोजना सफलतापूर्वक वितरित की गई।",
      ],
      highlights: ["प्रथम व्यावसायिक ग्राहक का अनुबंध", "सफलतापूर्वक तकनीकी समाधान का वितरण"],
    },
    "phase-10": {
      title: "डिमिशीपीडिया (DIMISIPEDIA) और भावी क्षितिज",
      subtitle: "सत्यापित इतिहास का अभिलेखीकरण और सभी सहयोगियों के प्रति कृतज्ञता।",
      quoteText: "यह अंत नहीं, अपितु निरंतर विकसित होती यात्रा का वर्तमान अध्याय है।",
      narrative: [
        "19 अगस्त 2026 को डिमिशीपीडिया का निर्माण आरंभ हुआ ताकि समस्त तकनीकी एवं संगठनात्मक इतिहास पारदर्शी एवं सत्यापित रूप में उपलब्ध रहे। सह-संस्थापकों, परिजनों और जीवनसाथी प्रिया के प्रति कृतज्ञता के साथ यह यात्रा निरंतर अग्रसर है।",
      ],
      highlights: [
        "19 अगस्त 2026 को डिमिशीपीडिया का प्रादुर्भाव",
        "पारदर्शी एवं साक्ष्य-आधारित अभिलेख",
      ],
    },
  },
};
