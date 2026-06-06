import { EmotionRecord } from '@/types';

const externalTags = [
  { id: 'et1', label: '界限被冒犯', subTags: ['身体边界', '隐私被侵犯', '承诺被打破'] },
  { id: 'et2', label: '感到不公平', subTags: ['被区别对待', '付出没人看见', '功劳被拿走'] },
  { id: 'et3', label: '被否定/批评', subTags: ['被公开批评', '被贬低', '被比较'] },
  { id: 'et4', label: '被控制/被入侵', subTags: ['被指手画脚', '被催促', '不被信任'] },
];

const internalTags = [
  { id: 'it1', label: '自我怀疑', subTags: ['觉得自己不够好', '觉得撑不下去了', '否定过去的选择'] },
  { id: 'it2', label: '后悔/自责', subTags: ['说了不该说的话', '没做该做的事', '伤害了重要的人'] },
  { id: 'it3', label: '孤独感', subTags: ['觉得没人理解我', '不敢开口求助', '人多却更孤独'] },
  { id: 'it4', label: '完美主义', subTags: ['不满意自己的表现', '达不到预期标准', '害怕失败而不开始'] },
];

export function getTagsByDirection(direction: 'external' | 'internal') {
  return direction === 'external' ? externalTags : internalTags;
}

export { externalTags, internalTags };

const persons = ['同事小王', '妈妈', '上司张总', '闺蜜小美', '室友阿杰', '客户', '男朋友', '自己'];
const scenes = ['公司会议室', '家里客厅', '微信群里', '学校教室', '咖啡店', '地铁上', '医院', '电话里'];

const externalStingSentences: Record<string, string[]> = {
  et1: ['"你怎么这么开不起玩笑"', '"这有什么，你也太敏感了吧"', '"我这是在帮你"', '"这是我的权利"'],
  et2: ['"凭什么又是他"', '"这事跟你没关系"', '"反正也没人在乎"', '"你就是太好说话了"'],
  et3: ['"你不行"', '"你看看人家"', '"你怎么连这个都不会"', '"早该换人了"'],
  et4: ['"你必须这样做"', '"我说了算"', '"别磨蹭快点"', '"交给我就行了"'],
};

const internalStingSentences: Record<string, string[]> = {
  it1: ['"我真的能做到吗"', '"我又让所有人失望了"', '"我就是个冒牌货"', '"为什么我总在重蹈覆辙"'],
  it2: ['"我当初为什么要那样说"', '"如果那时没做那个决定"', '"再也回不去了"', '"她/他一定很恨我"'],
  it3: ['"没人能真正懂我"', '"说了也不会有人在意"', '"热闹都是别人的"', '"我一个人也可以"'],
  it4: ['"还有太多地方要改"', '"差一点就能完美了"', '"不准备好就不能开始"', '"别人都那么优秀"'],
};

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDateRange(days: number): string[] {
  const dates: string[] = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function generateMockRecords(days = 30): EmotionRecord[] {
  const records: EmotionRecord[] = [];
  const dates = generateDateRange(days);

  for (let dayIndex = 0; dayIndex < dates.length; dayIndex++) {
    const recordsToday = Math.random() < 0.15 ? 0 : Math.random() < 0.2 ? 2 : 1;

    for (let r = 0; r < recordsToday; r++) {
      const direction = Math.random() < 0.55 ? 'external' : 'internal';
      const tags = direction === 'external' ? externalTags : internalTags;
      const selectedTag = randomItem(tags);
      const selectedSubTags = Math.random() < 0.4
        ? [randomItem(selectedTag.subTags!)]
        : [];

      const stingMap = direction === 'external' ? externalStingSentences : internalStingSentences;
      const sting = stingMap[selectedTag.id]
        ? [randomItem(stingMap[selectedTag.id])]
        : [];

      const hour = 8 + Math.floor(Math.random() * 14);
      const min = Math.floor(Math.random() * 60);
      const createdAt = `${dates[dayIndex]}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;

      records.push({
        id: `mock-${dayIndex}-${r}`,
        direction,
        tags: [selectedTag.id],
        subTags: selectedSubTags,
        intensity: 4 + Math.floor(Math.random() * 7),
        targetPerson: Math.random() < 0.6 ? randomItem(persons) : undefined,
        targetScene: Math.random() < 0.5 ? randomItem(scenes) : undefined,
        freeText: Math.random() < 0.3
          ? (direction === 'external'
              ? randomItem(['真的很生气，觉得自己不被尊重', '越想越委屈，明明不是我一个人的问题', '不知道该不该直接说出来，但心里堵得慌'])
              : randomItem(['辗转难眠，反复在脑子里回想', '觉得好累，做什么都提不起劲', '不想和任何人说话，就想自己待着']))
          : undefined,
        deepAnswers: Math.random() < 0.4 ? {
          stingSentence: sting[0],
          worstPoint: randomItem(['无法反驳的时候', '对方态度轻蔑的瞬间', '独自一人回想的时候']),
          desiredTreatment: randomItem(['希望有人能说一句"不是你的错"', '希望被认真地听一次', '希望被坚定地选择']),
        } : undefined,
        createdAt,
      });
    }
  }

  return records;
}
