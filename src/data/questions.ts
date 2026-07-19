import { Question } from "../types";
import { Language } from "../i18n";

const questionsDict: Record<Language, Question[]> = {
  ko: [
    {
      id: 1,
      question: "어둠 속에서 당신을 가장 얼어붙게 만드는 소리는 무엇입니까?",
      options: [
        {
          id: "A",
          text: "내 발소리에 미세하게 겹쳐 들리는, 뒤편의 조용하고 낯선 발자국 소리",
          gradeValue: 1, // Greek God / Lucifer / Archangel
        },
        {
          id: "B",
          text: "벽 너머 깊은 틈새에서 흘러나오는, 가늘고 기이하게 찢어지는 웃음소리",
          gradeValue: 2, // Demon / Witch / Vampire
        },
        {
          id: "C",
          text: "사방에 아무도 없는 빈 방, 내 귓바퀴 바로 옆에서 속삭이듯 내 이름을 부르는 소리",
          gradeValue: 3, // Ghost
        },
        {
          id: "D",
          text: "문 바로 너머에서 들려오는, 젖은 흙을 밟으며 무겁게 다리를 끄는 거친 숨소리",
          gradeValue: 4, // Zombie
        },
      ],
    },
    {
      id: 2,
      question: "자정 무렵, 먼지 쌓인 거울의 가림막을 천천히 걷어냈을 때 반사된 내 눈동자는?",
      options: [
        {
          id: "A",
          text: "상대를 완전히 압도하고 복종시킬 듯 위엄 있게 타오르는 붉은 금빛",
          gradeValue: 1,
        },
        {
          id: "B",
          text: "보는 사람의 심장을 조이고 매혹하여 기어이 파멸에 이르게 할 치명적인 진홍빛",
          gradeValue: 2,
        },
        {
          id: "C",
          text: "투명하게 비어 있어 형태조차 가물거리는, 차가운 서리가 내린 듯한 희뿌연 안개빛",
          gradeValue: 3,
        },
        {
          id: "D",
          text: "온기가 완전히 빠져나가 동공이 수축된 채 탁하고 흐려진 괴괴한 잿빛",
          gradeValue: 4,
        },
      ],
    },
    {
      id: 3,
      question: "숲길 끝에 버려진 심연의 대저택으로 한 걸음 들어선 당신이 자연스레 향할 공간은?",
      options: [
        {
          id: "A",
          text: "기이한 조각상들이 기괴한 대형 왕좌를 수호하듯 호위하는 거대한 중앙 홀",
          gradeValue: 1,
        },
        {
          id: "B",
          text: "먼지 쌓인 고서들과 정체불명의 양초들, 가공할 마법진이 핏빛으로 그려진 밀실 서재",
          gradeValue: 2,
        },
        {
          id: "C",
          text: "바닥에서 뿜어 나오는 푸른 냉기가 자욱하고 한 치 앞도 보이지 않는 지하실",
          gradeValue: 3,
        },
        {
          id: "D",
          text: "불길하게 덜컹거리는 녹슨 파이프와 쇠사슬이 가득하고 부패취가 맴도는 보일러실",
          gradeValue: 4,
        },
      ],
    },
    {
      id: 4,
      question: "당신 스스로가 본능적으로 깨닫고 있는 당신 '영혼의 근원적인 온도'는 어느 쪽입니까?",
      options: [
        {
          id: "A",
          text: "타인의 가슴속 분노와 영혼까지 통째로 집어삼킬 듯 타오르는 지배적인 열기",
          gradeValue: 1,
        },
        {
          id: "B",
          text: "차가운 매력으로 다가와 숨을 멎게 만들고 영원히 가두어버리는 기괴하게 시린 마력",
          gradeValue: 2,
        },
        {
          id: "C",
          text: "주변의 생기와 작은 열조차 한순간에 영하로 얼려 소멸시키는 정막한 무(無)의 상태",
          gradeValue: 3,
        },
        {
          id: "D",
          text: "그 어떤 아픔도, 슬픔도, 온기나 차가움조차 전혀 느껴지지 않는 철저한 마비 상태",
          gradeValue: 4,
        },
      ],
    },
    {
      id: 5,
      question: "만약 이 육신을 소멸하고 기이한 존재로 깨어난다면, 절대적으로 움켜쥐고 싶은 초월적 힘은?",
      options: [
        {
          id: "A",
          text: "세계의 가치와 규율을 통제하며 그 누구도 침범할 수 없는 신적인 지고의 지배권력",
          gradeValue: 1,
        },
        {
          id: "B",
          text: "장막 너머의 어둠과 피를 지배하고 영생을 누리며 매혹하는 불가해한 마력",
          gradeValue: 2,
        },
        {
          id: "C",
          text: "물리적 감옥을 가볍게 허물고 보이지 않는 영이 되어 소리 없이 세상을 유랑하는 공포의 흔적",
          gradeValue: 3,
        },
        {
          id: "D",
          text: "어떤 참혹한 상처와 훼손에도 무감각하게 다시 일어서며 맹렬하게 재생하는 괴물 같은 불사의 육체",
          gradeValue: 4,
        },
      ],
    },
  ],
  en: [
    {
      id: 1,
      question: "What sound freezes you the most in the dark?",
      options: [
        { id: "A", text: "Quiet and unfamiliar footsteps right behind, slightly overlapping mine", gradeValue: 1 },
        { id: "B", text: "A thin, bizarrely tearing laughter echoing from deep cracks behind the wall", gradeValue: 2 },
        { id: "C", text: "In an empty room with no one around, a whispering voice calling my name right next to my ear", gradeValue: 3 },
        { id: "D", text: "Heavy, raspy breathing dragging its legs through wet dirt just beyond the door", gradeValue: 4 },
      ],
    },
    {
      id: 2,
      question: "Around midnight, when you slowly lift the cover of a dusty mirror, what does your reflected eye look like?",
      options: [
        { id: "A", text: "A majestic, burning golden-red aura ready to completely overwhelm and subjugate the opponent", gradeValue: 1 },
        { id: "B", text: "A fatal crimson hue that tightens the viewer's heart and fascinates them into ruin", gradeValue: 2 },
        { id: "C", text: "A hazy, icy fog-like color, transparently empty and almost formless", gradeValue: 3 },
        { id: "D", text: "A bizarre, murky ash color with constricted pupils, completely drained of warmth", gradeValue: 4 },
      ],
    },
    {
      id: 3,
      question: "Stepping into an abandoned abyss mansion at the end of a forest path, where are you naturally drawn to?",
      options: [
        { id: "A", text: "The massive central hall guarded by grotesque statues defending a giant throne", gradeValue: 1 },
        { id: "B", text: "A secret study filled with dusty old books, unknown candles, and a terrifying magic circle drawn in blood", gradeValue: 2 },
        { id: "C", text: "A basement dense with blue chill erupting from the floor, where you can't see an inch ahead", gradeValue: 3 },
        { id: "D", text: "A boiler room filled with ominously rattling rusty pipes, chains, and the stench of decay", gradeValue: 4 },
      ],
    },
    {
      id: 4,
      question: "What is your 'fundamental soul temperature' that you instinctively recognize?",
      options: [
        { id: "A", text: "A dominant heat burning as if to devour the anger and very souls of others", gradeValue: 1 },
        { id: "B", text: "A bizarrely cold magic that approaches with chilling charm, taking your breath away and locking you up forever", gradeValue: 2 },
        { id: "C", text: "A desolate state of nothingness that instantly freezes and extinguishes the surrounding vitality and small heat", gradeValue: 3 },
        { id: "D", text: "A state of complete paralysis where no pain, sorrow, warmth, or cold is felt at all", gradeValue: 4 },
      ],
    },
    {
      id: 5,
      question: "If you were to shed this body and awaken as a bizarre entity, what transcendent power would you absolutely want to grasp?",
      options: [
        { id: "A", text: "The divine supreme ruling power that controls the world's values and disciplines, unassailable by anyone", gradeValue: 1 },
        { id: "B", text: "The incomprehensible magic that rules the darkness and blood beyond the veil, enjoying eternal life and fascination", gradeValue: 2 },
        { id: "C", text: "The trace of terror that easily tears down physical prisons, becoming an invisible spirit wandering the world silently", gradeValue: 3 },
        { id: "D", text: "A monstrous, immortal body that fiercely regenerates, rising numbly against any gruesome wound or mutilation", gradeValue: 4 },
      ],
    },
  ],
  zh: [
    {
      id: 1,
      question: "在黑暗中，什么声音最让你感到毛骨悚然？",
      options: [
        { id: "A", text: "紧跟在身后，与我的脚步声微妙重叠的安静而陌生的脚步声", gradeValue: 1 },
        { id: "B", text: "墙后深缝中传出的，细长且奇异撕裂的笑声", gradeValue: 2 },
        { id: "C", text: "在空无一人的房间里，耳边传来仿佛在耳语般呼唤我名字的声音", gradeValue: 3 },
        { id: "D", text: "门外传来的，踩着湿泥拖着沉重双腿的粗重呼吸声", gradeValue: 4 },
      ],
    },
    {
      id: 2,
      question: "午夜时分，当你慢慢揭开布满灰尘的镜子遮挡物时，你反射出的眼睛是什么样子的？",
      options: [
        { id: "A", text: "闪耀着威严的金红色光芒，似乎要完全压倒并征服对手", gradeValue: 1 },
        { id: "B", text: "致命的深红色，紧缩观者的心脏，诱惑他们走向毁灭", gradeValue: 2 },
        { id: "C", text: "透明空洞，甚至连形状都模糊不清的，如同结了冰霜般的雾灰色", gradeValue: 3 },
        { id: "D", text: "完全失去温度，瞳孔收缩，浑浊黯淡的奇异灰烬色", gradeValue: 4 },
      ],
    },
    {
      id: 3,
      question: "踏入林间小路尽头被遗弃的深渊豪宅，你自然会走向哪个空间？",
      options: [
        { id: "A", text: "巨大的中央大厅，怪异的雕像如同守卫着一张巨大的王座", gradeValue: 1 },
        { id: "B", text: "布满灰尘的古书、不明的蜡烛，以及用血画着可怕魔法阵的密室书房", gradeValue: 2 },
        { id: "C", text: "地板上喷出浓重的蓝色寒气，伸手不见五指的地下室", gradeValue: 3 },
        { id: "D", text: "充满不祥嘎吱作响的生锈管道、铁链，以及弥漫着腐烂气味的锅炉房", gradeValue: 4 },
      ],
    },
    {
      id: 4,
      question: "你本能地意识到的“灵魂的根本温度”是哪一种？",
      options: [
        { id: "A", text: "仿佛要吞噬他人心中的愤怒和灵魂般的，具有支配性的狂热", gradeValue: 1 },
        { id: "B", text: "带着冰冷的魅力靠近，让人窒息并永远被囚禁的奇异寒冷魔力", gradeValue: 2 },
        { id: "C", text: "瞬间将周围的生机和微弱的热量冻结至零下并使其消亡的死寂的无的状态", gradeValue: 3 },
        { id: "D", text: "感觉不到任何痛苦、悲伤、温暖或寒冷的彻底麻痹状态", gradeValue: 4 },
      ],
    },
    {
      id: 5,
      question: "如果脱离这具肉身，觉醒为奇异的存在，你绝对想要掌握的超然力量是什么？",
      options: [
        { id: "A", text: "控制世界价值和规则，任何人都无法侵犯的如神般至高无上的统治权", gradeValue: 1 },
        { id: "B", text: "支配帷幕后的黑暗与鲜血，享受永生并充满诱惑的不可理喻的魔力", gradeValue: 2 },
        { id: "C", text: "轻易摧毁物理牢笼，化为无形之灵，无声无息地在世界上游荡的恐惧印记", gradeValue: 3 },
        { id: "D", text: "面对任何残酷的伤害和破坏都能麻木地重新站起，猛烈再生的怪物般不死的肉体", gradeValue: 4 },
      ],
    },
  ],
  ja: [
    {
      id: 1,
      question: "暗闇の中で、あなたを最も凍りつかせる音は何ですか？",
      options: [
        { id: "A", text: "自分の足音に微妙に重なる、背後の静かで奇妙な足音", gradeValue: 1 },
        { id: "B", text: "壁の向こうの深い裂け目から漏れ聞こえる、細く引き裂かれるような笑い声", gradeValue: 2 },
        { id: "C", text: "周りに誰もいない空っぽの部屋で、耳元で囁くように私の名前を呼ぶ声", gradeValue: 3 },
        { id: "D", text: "ドアのすぐ向こうから聞こえる、濡れた土を踏みしめながら重い足を引きずる荒い息遣い", gradeValue: 4 },
      ],
    },
    {
      id: 2,
      question: "真夜中頃、埃を被った鏡の覆いをゆっくりと外したとき、映った自分の瞳は？",
      options: [
        { id: "A", text: "相手を完全に圧倒し、服従させるかのように威厳に満ちて燃え盛る赤い金色の光", gradeValue: 1 },
        { id: "B", text: "見る者の心臓を締め付け、魅了して破滅へと導く致命的な深紅の光", gradeValue: 2 },
        { id: "C", text: "透明で空虚で、形すらも揺らめく、冷たい霜が降りたような霞んだ霧の光", gradeValue: 3 },
        { id: "D", text: "温もりが完全に抜け落ち、瞳孔が収縮したまま濁って曇った異様な灰色の光", gradeValue: 4 },
      ],
    },
    {
      id: 3,
      question: "森の道の突き当たりにある見捨てられた深淵の館に足を踏み入れたとき、あなたが自然に向かう空間は？",
      options: [
        { id: "A", text: "奇怪な彫像たちが巨大な玉座を守るように護衛している巨大な中央ホール", gradeValue: 1 },
        { id: "B", text: "埃を被った古書や正体不明の蝋燭、血で描かれた恐ろしい魔法陣がある密室の書斎", gradeValue: 2 },
        { id: "C", text: "床から吹き出す青い冷気が立ち込め、一寸先も見えない地下室", gradeValue: 3 },
        { id: "D", text: "不吉にガタガタと鳴る錆びたパイプや鎖に満ち、腐敗臭が漂うボイラー室", gradeValue: 4 },
      ],
    },
    {
      id: 4,
      question: "あなた自身が本能的に気づいている、あなたの「魂の根源的な温度」はどちらですか？",
      options: [
        { id: "A", text: "他人の胸の中の怒りや魂まで丸ごと飲み込むように燃え盛る支配的な熱気", gradeValue: 1 },
        { id: "B", text: "冷たい魅力で近づき、息を止めさせ、永遠に閉じ込めてしまう奇妙に冷たい魔力", gradeValue: 2 },
        { id: "C", text: "周囲の生気や小さな熱すらも一瞬で氷点下に凍らせて消滅させる、静寂な無の状態", gradeValue: 3 },
        { id: "D", text: "どんな痛みも、悲しみも、温もりや冷たさすらも全く感じない、完全な麻痺状態", gradeValue: 4 },
      ],
    },
    {
      id: 5,
      question: "もしこの肉体を消滅させ、奇妙な存在として目覚めるとしたら、絶対に握りしめたい超越的な力は？",
      options: [
        { id: "A", text: "世界の価値と規律を統制し、誰も侵すことのできない神のような至高の支配権力", gradeValue: 1 },
        { id: "B", text: "帳の向こうの闇と血を支配し、永遠の命を享受して魅了する不可解な魔力", gradeValue: 2 },
        { id: "C", text: "物理的な檻を軽々と崩し、見えない霊となって音もなく世界を放浪する恐怖の痕跡", gradeValue: 3 },
        { id: "D", text: "どんな残酷な傷や損傷にも無感覚に再び立ち上がり、猛烈に再生する怪物のような不死の肉体", gradeValue: 4 },
      ],
    },
  ],
};

export const getQuestions = (lang: Language): Question[] => questionsDict[lang];
