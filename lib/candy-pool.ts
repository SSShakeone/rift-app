import { Candy, CandyType } from '@/types';

interface CandyEntry {
  type: CandyType;
  content: string;
}

const candyPool: CandyEntry[] = [
  // self_acceptance — 自我接纳
  { type: 'self_acceptance', content: '你的敏感不是弱点，是你对这个世界的感知比别人多一倍的证明。' },
  { type: 'self_acceptance', content: '今天你经历的情绪风暴，恰好说明你在乎。一个不在乎的人，什么都不会起波澜。' },
  { type: 'self_acceptance', content: '你不需要把所有问题都解决掉。能意识到哪里不舒服，本身就是一种力量。' },
  { type: 'self_acceptance', content: '你已经在用自己能承受的方式，处理着别人看不到的内心官司。这很厉害。' },
  { type: 'self_acceptance', content: '允许自己慢一点，软一点，什么都不做也值得存在。你的价值不需要通过"搞定"来证明。' },
  { type: 'self_acceptance', content: '别人怎么看你，和你真正是什么样的，有本质区别。你的自我认知不是别人嘴里的总和。' },

  // boundary — 边界
  { type: 'boundary', content: '说"不"不是推开对方，是把属于你的领地圈出来。这是健康的关系距离。' },
  { type: 'boundary', content: '不让你有情绪，不让你设边界，这才是真正的不公平。你的界限值得被尊重。' },
  { type: 'boundary', content: '你不需要为了别人的舒适，而扭曲自己的形状。你的边界就是你对自己的温柔。' },
  { type: 'boundary', content: '你有权利在不想说的时候保持沉默，在不想做的时候拒绝。这不是自私。' },
  { type: 'boundary', content: '界限感模糊的关系，早晚会以更大的消耗收场。现在画下一条线，反而是对关系的保护。' },
  { type: 'boundary', content: '别人的失望不等于你的错。每个人都要为自己情绪负责——包括你，也包括对方。' },

  // insight — 洞察
  { type: 'insight', content: '从数据里能看到一个趋势：你不适的根源，往往不是那一刻发生了什么，而是那一刻让你想起了以前。' },
  { type: 'insight', content: '你记录得越多，越能发现——你的那些"内耗事件"其实有同一个脚本，只是每次都换了不同的角色。' },
  { type: 'insight', content: '当你发现同样的事情不再让你难受，那就是真正的成长。不是没有感受了，是理解了它背后的规律。' },
  { type: 'insight', content: '情绪其实是在给你画地图——告诉你什么是你真正在乎的，什么是你该远离的。' },
  { type: 'insight', content: '记录不是复盘让你揪心的事，是帮你看清：你承受力其实比你想象的大得多。' },
  { type: 'insight', content: '每一次内耗事件都是你深层价值观的 X 光片——它照出你最在乎的是什么。' },

  // growth — 成长
  { type: 'growth', content: '以前困扰你三天的事情，现在只困扰你半天。这本身就是一次悄无声息的升级。' },
  { type: 'growth', content: '成长不是变得刀枪不入，是能更快地识别情绪，更温柔地接住自己。' },
  { type: 'growth', content: '你开始记录情绪这件事本身，就已经走在很多人的前面了。觉察是改变的地基。' },
  { type: 'growth', content: '每一次红蓝选择，都是一次诚实的自我对话。不逃避，已经赢了。' },
  { type: 'growth', content: '你看不到自己的变化，是因为变化像头发一样每天在长。回头看三个月，一切都会清晰。' },
  { type: 'growth', content: '裂缝不是破碎，是光透进来的地方。你今天做的每一条记录，都是那束光。' },

  // humor — 幽默治愈
  { type: 'humor', content: '根据不完全统计，今天有 8000 万人和你一样在某个瞬间觉得"这世界太过分了"。你不是一个人。' },
  { type: 'humor', content: '如果把你的情绪波动转换成股票K线，今天大概属于"震荡整理"，请耐心等待自己的下次"放量突破"。' },
  { type: 'humor', content: '你的内耗大脑说：再来亿遍！你的理性大脑说：别了，我内存不足。今天请关掉循环播放器。' },
  { type: 'humor', content: '如果有一个"最懂自我折磨"的奖项，人类大概全员提名。你并不特殊，但也请对自己手下留情。' },
  { type: 'humor', content: '那些让你纠结到凌晨三点的事，99% 会在次日早餐后看起来不那么致命。真的。' },
  { type: 'humor', content: '好消息是：你的感受强度 = 你在乎程度。坏消息是：你在乎得有点多。不过，这就是你啊。' },
];

export function getCandyForDirection(direction: 'external' | 'internal', type?: CandyType): CandyEntry {
  let pool = candyPool;
  if (type) {
    pool = pool.filter(c => c.type === type);
  }
  if (pool.length === 0) pool = candyPool;

  // Weight distribution based on direction
  const weights = direction === 'external'
    ? { self_acceptance: 15, boundary: 40, insight: 15, growth: 15, humor: 15 }
    : { self_acceptance: 40, boundary: 15, insight: 15, growth: 15, humor: 15 };

  const weightedPool = pool.flatMap(c =>
    Array.from({ length: weights[c.type] || 1 }, () => c)
  );

  return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}

export function getCandyTypeLabel(type: CandyType): string {
  const labels: Record<CandyType, string> = {
    self_acceptance: '🫂 自我接纳',
    boundary: '🛡️ 边界保护',
    insight: '🔍 内心洞察',
    growth: '🌱 成长觉醒',
    humor: '😄 幽默治愈',
  };
  return labels[type];
}
