import { CatalogConfig } from '../types/catalog';

export const catalog: CatalogConfig = {
  version: '2.0.0',
  categories: [
    {
      slug: 'green',
      title: 'Зелёный чай',
      short: 'Свежий, травянистый, обжарка в воке',
      description:
        'Неферментированный чай с сохраняемым зелёным листом. Заваривать деликатно, избегая кипятка, чтобы сохранить свежесть и сладость.',
      icon: '/icons/green.svg',
      cover: '/covers/green.svg',
      color: '#40A463',
      tags: ['цветочный', 'фруктовый', 'медовый'],
      extras: {
        temp_c: '75–85',
        grams_per_100ml: '4–5 (гонфу)',
        western_ratio: '2–3 г на 250 мл',
        rinses: '0–1',
        first_steep_sec: '10–15',
        steeps: '4–6',
        tips: 'Ниже температура — меньше горечи, больше сладости.'
      },
      children: [
        {
          slug: 'longjing',
          title: 'Лунцзин (Longjing)',
          short: 'Ореховая сладость, плоский лист',
          description: 'Легендарный зелёный чай из Чжэцзяна. Нежная жарка даёт орехово‑карамельные ноты.',
          icon: '/icons/longjing.svg',
          tags: ['ореховый', 'медовый']
        },
        {
          slug: 'bi-luo-chun',
          title: 'Би Ло Чунь (Bi Luo Chun)',
          short: 'Фруктово‑цветочный, скрученные «изумруды»',
          description: 'Тонкий аромат сада: белый пушок, сладкая травянистость и фруктовые полутона.',
          icon: '/icons/bi-luo-chun.svg',
          tags: ['цветочный', 'фруктовый']
        }
      ]
    },
    {
      slug: 'white',
      title: 'Белый чай',
      short: 'Деликатный, медово‑цветочный',
      description:
        'Минимальная обработка: сушка и лёгкое вяление. Мягкая сладость, шелковистая текстура. Терпит чуть большую температуру, но любит нежность.',
      icon: '/icons/white.svg',
      cover: '/covers/white.svg',
      color: '#C1B28D',
      tags: ['медовый', 'цветочный'],
      extras: {
        temp_c: '80–90',
        grams_per_100ml: '4–5 (гонфу)',
        western_ratio: '2–3 г на 250 мл',
        rinses: '0',
        first_steep_sec: '15–20',
        steeps: '4–7',
        tips: 'Долгие проливы раскрывают медовость и сухоцветы.'
      },
      children: [
        {
          slug: 'yin-zhen',
          title: 'Инь Чжэнь (Silver Needle)',
          short: 'Почки, шёлковистая сладость',
          description: 'Собран из почек. Чистый, эфирный настой с мягкой сладостью и лёгким ланом.',
          icon: '/icons/yin-zhen.svg',
          tags: ['цветочный', 'медовый']
        },
        {
          slug: 'bai-mudan',
          title: 'Бай Мудань (White Peony)',
          short: 'Почки + лист, фруктовый оттенок',
          description: 'Баланс почек и листа. Чуть насыщеннее, часто с грушево‑медовыми нотами.',
          icon: '/icons/bai-mudan.svg',
          tags: ['медовый', 'фруктовый']
        }
      ]
    },
    {
      slug: 'yellow',
      title: 'Жёлтый чай',
      short: 'Мягкий, «томлёный»',
      description:
        'Близок к зелёному, но с фазой «томления», сглаживающей травянистость. Редкая и деликатная категория.',
      icon: '/icons/yellow.svg',
      cover: '/covers/yellow.svg',
      color: '#D8B400',
      tags: ['медовый', 'ореховый'],
      extras: {
        temp_c: '80–85',
        grams_per_100ml: '4–5 (гонфу)',
        rinses: '0–1',
        first_steep_sec: '10–15',
        steeps: '4–6',
        tips: 'Слегка выше температура — мягче тело, но без горечи.'
      },
      children: [
        {
          slug: 'junshan-yinzhen',
          title: 'Цзюньшань Иньчжэнь',
          short: 'Тростниковый сахар, мягкая сладость',
          description: 'Игольчатые почки с выраженной мягкой сладостью, очень деликатный настой.',
          icon: '/icons/junshan-yinzhen.svg',
          tags: ['медовый']
        },
        {
          slug: 'huoshan-huangya',
          title: 'Хуошань Хуанъя',
          short: 'Тёплый хлебный акцент',
          description: 'Редкий пример жёлтого чая с хлебно‑солодовыми оттенками.',
          icon: '/icons/huoshan-huangya.svg',
          tags: ['ореховый']
        }
      ]
    },
    {
      slug: 'oolong',
      title: 'Улун (Oolong)',
      short: 'Полуферментированный: от цветочного до жареного',
      description:
        'Уровень ферментации варьирует. Лёгкие «зелёные» улуны — цветочные и сливочные; тёмные — жареные, пряные.',
      icon: '/icons/oolong.svg',
      cover: '/covers/oolong.svg',
      color: '#5C8A57',
      tags: ['цветочный', 'ореховый', 'медовый'],
      extras: {
        temp_c: '90–100',
        grams_per_100ml: '5–7 (гонфу)',
        rinses: '1',
        first_steep_sec: '8–12',
        steeps: '6–10',
        tips: 'Жареные улуны раскрываются горячей водой и быстрыми проливами.'
      },
      children: [
        {
          slug: 'tieguanyin',
          title: 'Тегуаньинь',
          short: 'Сливочно‑цветочный профиль',
          description: 'Свежий «зелёный» улун с молочно‑цветочными тонами и мягкой сладостью.',
          icon: '/icons/tieguanyin.svg',
          tags: ['цветочный']
        },
        {
          slug: 'da-hong-pao',
          title: 'Да Хун Пао',
          short: 'Жареный, миндаль/карамель',
          description: 'Скалы Уишань: минералы, корочка хлеба, ореховый послевкусный шлейф.',
          icon: '/icons/da-hong-pao.svg',
          tags: ['ореховый']
        },
        {
          slug: 'dong-ding',
          title: 'Дун Дин',
          short: 'Тайвань, баланс сливок и жарки',
          description: 'Классика Тайваня: карамельная румяность и сливочность в одном профиле.',
          icon: '/icons/dong-ding.svg',
          tags: ['ореховый', 'медовый']
        }
      ]
    },
    {
      slug: 'red',
      title: 'Красный чай (Hong Cha)',
      short: 'Насыщенный, мёд, сухофрукты',
      description: 'Полностью ферментированный. Тёплые тона мёда, сухофруктов, иногда какао и карамели.',
      icon: '/icons/red.svg',
      cover: '/covers/red.svg',
      color: '#B4442A',
      tags: ['медовый', 'фруктовый', 'ореховый'],
      extras: {
        temp_c: '90–100',
        grams_per_100ml: '4–6 (гонфу)',
        western_ratio: '2–3 г на 250 мл',
        rinses: '0–1',
        first_steep_sec: '8–12',
        steeps: '5–8',
        tips: 'Для шоколадности — кипяток и короткие проливы.'
      },
      children: [
        {
          slug: 'dian-hong',
          title: 'Дянь Хун',
          short: 'Юньнань, мёд/сухофрукты',
          description: 'Юньнаньская классика с густым мёдом, черносливом и мягкой пряностью.',
          icon: '/icons/dian-hong.svg',
          tags: ['медовый', 'фруктовый']
        },
        {
          slug: 'jin-jun-mei',
          title: 'Цзинь Цзюнь Мэй',
          short: 'Бисквит, мёд, ягоды',
          description: 'Мелкие почки из Уишаня. Сложный десертный профиль с ягодной кислинкой.',
          icon: '/icons/jin-jun-mei.svg',
          tags: ['медовый', 'фруктовый']
        },
        {
          slug: 'qimen',
          title: 'Цымэнь Хун Ча (Keemun)',
          short: 'Какао, дымка, сухофрукты',
          description: 'Английская классика для завтрака: сухофрукты, лёгкая дымка, какао‑бобы.',
          icon: '/icons/qimen.svg',
          tags: ['медовый', 'фруктовый']
        }
      ]
    },
    {
      slug: 'puer-sheng',
      title: 'Пуэр шэн (сырой)',
      short: 'Фруктово‑травяной, «доходит» с годами',
      description: 'Неферментированный прессованный чай. С возрастом темнеет и усложняется.',
      icon: '/icons/puer-sheng.svg',
      cover: '/covers/puer-sheng.svg',
      color: '#6B8E23',
      tags: ['фруктовый', 'медовый'],
      extras: {
        temp_c: '90–100',
        grams_per_100ml: '5–7 (гонфу)',
        rinses: '1–2',
        first_steep_sec: '5–8',
        steeps: '8–12',
        tips: 'Расслабить пресс крошкой; короткие проливы для чистого вкуса.'
      },
      children: [
        {
          slug: 'yiwu-2020',
          title: 'Иу Шэн 2020',
          short: 'Мёд, тропики, мягкая терпкость',
          description: 'Молодой шэн с солнечной фруктовостью и лёгкой терпкой кожурой.',
          icon: '/icons/yiwu-2020.svg',
          tags: ['фруктовый', 'медовый']
        },
        {
          slug: 'lincang-2021',
          title: 'Линцан Шэн 2021',
          short: 'Зелёный манго, травы',
          description: 'Бодрый профиль с манго‑травяной свежестью и чистой сладостью.',
          icon: '/icons/lincang-2021.svg',
          tags: ['фруктовый']
        }
      ]
    },
    {
      slug: 'puer-shu',
      title: 'Пуэр шу (готовый)',
      short: 'Землистый, хлебный, мягкий',
      description: 'Постферментация в кучах. Плотный, бархатный настой с хлебно‑ореховым профилем.',
      icon: '/icons/puer-shu.svg',
      cover: '/covers/puer-shu.svg',
      color: '#5A3E2B',
      tags: ['землистый', 'ореховый', 'медовый'],
      extras: {
        temp_c: '95–100',
        grams_per_100ml: '6–8 (гонфу)',
        rinses: '1–2',
        first_steep_sec: '5–8',
        steeps: '8–12',
        tips: 'Кипяток обязателен. Полезна двойная промывка для чистого вкуса.'
      },
      children: [
        {
          slug: 'menghai-2015',
          title: 'Мэнхай Шу 2015',
          short: 'Какао, хлебная корка',
          description: 'Стабильный купаж Мэнхая: густая текстура, мягкая землянистость, какао‑нотки.',
          icon: '/icons/menghai-2015.svg',
          tags: ['землистый', 'ореховый']
        },
        {
          slug: 'recipe-7572',
          title: 'Рецепт 7572',
          short: 'Классика фабрики',
          description: 'Иконический бленд с округлым, понятным вкусом для повседневного чаепития.',
          icon: '/icons/recipe-7572.svg',
          tags: ['землистый', 'ореховый']
        }
      ]
    },
    {
      slug: 'dark-heicha',
      title: 'Тёмный чай (Hei Cha)',
      short: 'Постферментированный, выдержанный',
      description: 'Широкая категория постферментированных чаёв вне пуэра: хлебные, ореховые, иногда пряные ноты.',
      icon: '/icons/dark.svg',
      cover: '/covers/dark.svg',
      color: '#3E2F2A',
      tags: ['землистый', 'ореховый', 'медовый'],
      extras: {
        temp_c: '95–100',
        grams_per_100ml: '5–7 (гонфу)',
        rinses: '1',
        first_steep_sec: '8–12',
        steeps: '6–10',
        tips: 'Хорош в толстостенной посуде; любит раскал.'
      },
      children: [
        {
          slug: 'liu-bao',
          title: 'Лю Бао',
          short: 'Орех, кедр, грибная капля',
          description: 'Гладкий, маслянистый профиль с лесными оттенками и лёгкой пряностью.',
          icon: '/icons/liu-bao.svg',
          tags: ['землистый', 'ореховый']
        },
        {
          slug: 'fu-zhuan',
          title: 'Фу Чжуань',
          short: '«Золотой цветок», сладковатый хлеб',
          description: 'Кирпич с Eurotium cristatum: мягкая сладость, хлебная корочка, сухофрукты.',
          icon: '/icons/fu-zhuan.svg',
          tags: ['медовый', 'ореховый', 'землистый']
        }
      ]
    }
  ]
};
