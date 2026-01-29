import { CharmData } from "../utils/storage";

// Icons available for charms (SVG icon names)
export const CHARM_ICONS = [
  "sun", // Слънце
  "moon", // Луна
  "star", // Звезда
  "heart", // Сърце
  "leaf", // Листо
  "flower", // Цвете
  "coffee", // Кафе
  "horseshoe", // Подкова
  "clover", // Детелина
  "bird", // Птица
] as const;

export type CharmIcon = (typeof CHARM_ICONS)[number];

// Bulgarian charms/sayings - a curated collection
export const BULGARIAN_CHARMS: CharmData[] = [
  // Positive daily affirmations
  { id: 1, text: "Днес ще намериш радост в малките неща.", icon: "sun" },
  { id: 2, text: "Усмивката ти ще озари нечий ден.", icon: "heart" },
  {
    id: 3,
    text: "Добрината, която даваш, ще ти се върне многократно.",
    icon: "flower",
  },
  { id: 4, text: "Вярвай в себе си - ти си по-силен, отколкото мислиш.", icon: "star" },
  { id: 5, text: "Днес е перфектният ден за нови начинания.", icon: "leaf" },
  { id: 6, text: "Щастието е в пътя, не в дестинацията.", icon: "bird" },
  { id: 7, text: "Слушай сърцето си - то знае пътя.", icon: "heart" },
  { id: 8, text: "Всяка трудност носи скрита възможност.", icon: "horseshoe" },
  { id: 9, text: "Днес ще срещнеш точния човек в точния момент.", icon: "clover" },
  { id: 10, text: "Търпението е ключът към успеха.", icon: "coffee" },

  // Traditional Bulgarian proverbs adapted
  { id: 11, text: "Който рано рани, сам си помага.", icon: "sun" },
  { id: 12, text: "Добрата дума отваря железни врати.", icon: "heart" },
  { id: 13, text: "Капка по капка - вир става.", icon: "leaf" },
  { id: 14, text: "Където има воля, има и път.", icon: "star" },
  { id: 15, text: "Очите са прозорец към душата.", icon: "moon" },
  { id: 16, text: "Истинското богатство е в приятелите.", icon: "heart" },
  { id: 17, text: "Времето лекува всичко.", icon: "flower" },
  { id: 18, text: "След буря идва слънце.", icon: "sun" },
  { id: 19, text: "Всяко нещо с труд се постига.", icon: "coffee" },
  { id: 20, text: "Мъдростта идва с опита.", icon: "moon" },

  // Luck and fortune
  { id: 21, text: "Късметът е на твоя страна днес.", icon: "clover" },
  { id: 22, text: "Звездите са подредени в твоя полза.", icon: "star" },
  { id: 23, text: "Днес ще получиш изненадваща добра новина.", icon: "bird" },
  { id: 24, text: "Мечтите ти са по-близо, отколкото мислиш.", icon: "moon" },
  { id: 25, text: "Вселената ти праща знак - бъди внимателен.", icon: "star" },
  { id: 26, text: "Подковата на късмета е над главата ти.", icon: "horseshoe" },
  { id: 27, text: "Днес е ден за победи.", icon: "sun" },
  { id: 28, text: "Добрата енергия те следва навсякъде.", icon: "flower" },
  { id: 29, text: "Съдбата ти усмихва приятни моменти.", icon: "clover" },
  { id: 30, text: "Очаквай нещо хубаво - то идва.", icon: "heart" },

  // Love and relationships
  { id: 31, text: "Любовта е около теб - отвори очите си.", icon: "heart" },
  { id: 32, text: "Близък човек мисли за теб в този момент.", icon: "moon" },
  { id: 33, text: "Искрената връзка заслужава всяко усилие.", icon: "flower" },
  { id: 34, text: "Прегръдката лекува повече от думите.", icon: "heart" },
  { id: 35, text: "Днес ще почувстваш топлината на приятелството.", icon: "sun" },
  { id: 36, text: "Любовта започва от любовта към себе си.", icon: "heart" },
  { id: 37, text: "Добрите хора се привличат един друг.", icon: "clover" },
  { id: 38, text: "Семейството е най-големият дар.", icon: "flower" },
  { id: 39, text: "Истинската любов не познава граници.", icon: "heart" },
  { id: 40, text: "Споделената радост е двойна радост.", icon: "sun" },

  // Success and career
  { id: 41, text: "Днес е денят за смели решения.", icon: "star" },
  { id: 42, text: "Трудът ти ще бъде оценен.", icon: "horseshoe" },
  { id: 43, text: "Нова възможност чука на вратата ти.", icon: "bird" },
  { id: 44, text: "Таланътите ти ще бъдат забелязани.", icon: "star" },
  { id: 45, text: "Успехът идва при онези, които не се отказват.", icon: "sun" },
  { id: 46, text: "Вярвай в пътя, който си избрал.", icon: "leaf" },
  { id: 47, text: "Малките стъпки водят до големи постижения.", icon: "clover" },
  { id: 48, text: "Идеите ти заслужават да бъдат чути.", icon: "coffee" },
  { id: 49, text: "Днес ще намериш решение на трудна задача.", icon: "moon" },
  { id: 50, text: "Всяка грешка е урок за бъдещето.", icon: "leaf" },

  // Health and well-being
  { id: 51, text: "Погрижи се за тялото си - то е твоят дом.", icon: "flower" },
  { id: 52, text: "Един дълбок дъх може да промени всичко.", icon: "leaf" },
  { id: 53, text: "Спокойствието е в теб - намери го.", icon: "moon" },
  { id: 54, text: "Природата те зове - излез навън.", icon: "bird" },
  { id: 55, text: "Здравето е най-голямото богатство.", icon: "sun" },
  { id: 56, text: "Добрият сън възстановява силите.", icon: "moon" },
  { id: 57, text: "Движението е живот.", icon: "leaf" },
  { id: 58, text: "Балансът е ключът към хармонията.", icon: "flower" },
  { id: 59, text: "Усмивката е безплатно лекарство.", icon: "sun" },
  { id: 60, text: "Вътрешният мир привлича външния.", icon: "heart" },

  // Wisdom and growth
  { id: 61, text: "Днес ще научиш нещо важно.", icon: "star" },
  { id: 62, text: "Мъдростта идва от слушането.", icon: "moon" },
  { id: 63, text: "Промяната започва от теб.", icon: "leaf" },
  { id: 64, text: "Всеки ден е шанс за растеж.", icon: "flower" },
  { id: 65, text: "Книгите са врата към нови светове.", icon: "bird" },
  { id: 66, text: "Търпението е най-трудната добродетел.", icon: "coffee" },
  { id: 67, text: "Благодарността привлича още повече блага.", icon: "clover" },
  { id: 68, text: "Миналото учи, бъдещето очаква.", icon: "moon" },
  { id: 69, text: "Простотата е върховната изтънченост.", icon: "leaf" },
  { id: 70, text: "Знанието е сила, но мъдростта е мощ.", icon: "star" },

  // Nature and seasons
  { id: 71, text: "Пролетта е в сърцето ти.", icon: "flower" },
  { id: 72, text: "Слънцето грее еднакво за всички.", icon: "sun" },
  { id: 73, text: "Бъди като водата - намери своя път.", icon: "leaf" },
  { id: 74, text: "Дори и най-тъмната нощ свършва със зора.", icon: "moon" },
  { id: 75, text: "Птиците пеят за теб тази сутрин.", icon: "bird" },
  { id: 76, text: "Всяко семе крие огромен потенциал.", icon: "leaf" },
  { id: 77, text: "Вятърът на промяната носи нови възможности.", icon: "bird" },
  { id: 78, text: "Корените ти са здрави - можеш да растеш.", icon: "flower" },
  { id: 79, text: "Планините те викат - тръгни.", icon: "sun" },
  { id: 80, text: "Морето носи спокойствие и сила.", icon: "leaf" },

  // Creativity and inspiration
  { id: 81, text: "Вдъхновението ще те намери днес.", icon: "star" },
  { id: 82, text: "Творчеството е душата на живота.", icon: "flower" },
  { id: 83, text: "Музиката говори, когато думите мълчат.", icon: "heart" },
  { id: 84, text: "Цветовете на живота са в твоите ръце.", icon: "sun" },
  { id: 85, text: "Мечтай голямо - постигай повече.", icon: "star" },
  { id: 86, text: "Изкуството е огледало на душата.", icon: "moon" },
  { id: 87, text: "Всяка идея заслужава шанс.", icon: "clover" },
  { id: 88, text: "Фантазията няма граници.", icon: "bird" },
  { id: 89, text: "Танцувай, сякаш никой не те гледа.", icon: "heart" },
  { id: 90, text: "Пиши историята на живота си с радост.", icon: "sun" },

  // Courage and strength
  { id: 91, text: "Смелостта не е липса на страх, а победа над него.", icon: "star" },
  { id: 92, text: "Ти си по-храбър, отколкото вярваш.", icon: "horseshoe" },
  { id: 93, text: "Падането е част от издигането.", icon: "sun" },
  { id: 94, text: "Силата идва от преодоляването.", icon: "leaf" },
  { id: 95, text: "Бъди лъв в света на овце.", icon: "star" },
  { id: 96, text: "Страхът е само илюзия.", icon: "moon" },
  { id: 97, text: "Вярата премества планини.", icon: "sun" },
  { id: 98, text: "Истинската сила е в нежността.", icon: "heart" },
  { id: 99, text: "Борбата закалява духа.", icon: "horseshoe" },
  { id: 100, text: "Победителите не се раждат - те се създават.", icon: "star" },

  // More positive affirmations
  { id: 101, text: "Ти заслужаваш всичко хубаво.", icon: "heart" },
  { id: 102, text: "Днес е твоят ден - грабни го.", icon: "sun" },
  { id: 103, text: "Светлината в теб е по-силна от всяка тъма.", icon: "star" },
  { id: 104, text: "Ти си уникален и това е твоята сила.", icon: "flower" },
  { id: 105, text: "Вярвай - чудеса се случват всеки ден.", icon: "clover" },
  { id: 106, text: "Ти си архитект на съдбата си.", icon: "moon" },
  { id: 107, text: "Всяка секунда е шанс да започнеш отначало.", icon: "sun" },
  { id: 108, text: "Ти си достоен за любов и уважение.", icon: "heart" },
  { id: 109, text: "Твоят глас има значение.", icon: "bird" },
  { id: 110, text: "Бъдещето е в твоите ръце.", icon: "star" },

  // Additional charms
  { id: 111, text: "Усмихни се на непознат - ще ти бъде върнато.", icon: "sun" },
  { id: 112, text: "Малките радости правят живота голям.", icon: "coffee" },
  { id: 113, text: "Доброто вино се нуждае от време.", icon: "moon" },
  { id: 114, text: "Истинските приятели са съкровище.", icon: "heart" },
  { id: 115, text: "Бъди промяната, която искаш да видиш.", icon: "leaf" },
  { id: 116, text: "Няма провал, има само уроци.", icon: "star" },
  { id: 117, text: "Тишината носи отговори.", icon: "moon" },
  { id: 118, text: "Животът е твърде кратък за съжаления.", icon: "sun" },
  { id: 119, text: "Намери красотата във всеки ден.", icon: "flower" },
  { id: 120, text: "Думите имат сила - използвай ги мъдро.", icon: "coffee" },

  { id: 121, text: "Днес ще откриеш нещо ново за себе си.", icon: "star" },
  { id: 122, text: "Вратите се отварят за онези, които чукат.", icon: "horseshoe" },
  { id: 123, text: "Бъди светлина в нечия тъмнина.", icon: "sun" },
  { id: 124, text: "Магията е навсякъде - трябва само да погледнеш.", icon: "clover" },
  { id: 125, text: "Всеки край е ново начало.", icon: "leaf" },
  { id: 126, text: "Прости на миналото, прегърни бъдещето.", icon: "heart" },
  { id: 127, text: "Малките неща имат голямо значение.", icon: "flower" },
  { id: 128, text: "Доброто се връща при добрите хора.", icon: "clover" },
  { id: 129, text: "Сънувай без граници.", icon: "moon" },
  { id: 130, text: "Днес е подарък - затова се казва настояще.", icon: "sun" },

  { id: 131, text: "Вярвай в процеса, не само в резултата.", icon: "leaf" },
  { id: 132, text: "Твоята история още се пише.", icon: "star" },
  { id: 133, text: "Благодарността е ключ към щастието.", icon: "heart" },
  { id: 134, text: "Моментът е всичко, което имаш.", icon: "coffee" },
  { id: 135, text: "Бъди добър към себе си.", icon: "flower" },
  { id: 136, text: "Успехът е пътуване, не дестинация.", icon: "sun" },
  { id: 137, text: "Вселената има план за теб.", icon: "star" },
  { id: 138, text: "Обичай без условия.", icon: "heart" },
  { id: 139, text: "Смехът е най-доброто лекарство.", icon: "sun" },
  { id: 140, text: "Всяко утро носи нови надежди.", icon: "bird" },

  { id: 141, text: "Ти си по-близо до целта, отколкото вчера.", icon: "horseshoe" },
  { id: 142, text: "Дишай дълбоко и продължавай напред.", icon: "leaf" },
  { id: 143, text: "Радвай се на пътя, не само на пристигането.", icon: "sun" },
  { id: 144, text: "Всеки човек е учител по някакъв начин.", icon: "moon" },
  { id: 145, text: "Бъди благодарен за това, което имаш.", icon: "heart" },
  { id: 146, text: "Новите приключения те очакват.", icon: "bird" },
  { id: 147, text: "Ти можеш повече, отколкото знаеш.", icon: "star" },
  { id: 148, text: "Късметът обича смелите.", icon: "clover" },
  { id: 149, text: "Всяка буря има край.", icon: "sun" },
  { id: 150, text: "Вътрешната красота свети най-ярко.", icon: "flower" },
];

// Function to get a random charm based on today's date (deterministic)
export const getCharmForDate = (date: Date): CharmData => {
  // Create a seed from the date
  const dateString = date.toISOString().split("T")[0];
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use the hash to pick a charm
  const index = Math.abs(hash) % BULGARIAN_CHARMS.length;
  return BULGARIAN_CHARMS[index];
};

// Get a random charm (truly random)
export const getRandomCharm = (): CharmData => {
  const index = Math.floor(Math.random() * BULGARIAN_CHARMS.length);
  return BULGARIAN_CHARMS[index];
};
