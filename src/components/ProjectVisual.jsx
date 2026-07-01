const visualMap = {
  listing: {
    heading: '上架与维护流程',
    nodes: [
      { icon: 'doc', title: '信息整理', note: '款式 / 尺码 / 面料' },
      { icon: 'pen', title: '标题优化', note: '关键词与表达' },
      { icon: 'image', title: '主图维护', note: '展示更清晰' },
      { icon: 'link', title: '链接更新', note: '检查展示状态' },
    ],
    cardsTitle: '维护重点',
    cards: ['信息规范', '关键词匹配', '页面清晰', '持续维护'],
  },
  operations: {
    heading: '订单协同流程',
    nodes: [
      { icon: 'chat', title: '客户咨询', note: '接收问题' },
      { icon: 'user', title: '确认需求', note: '款式与数量' },
      { icon: 'order', title: '订单处理', note: '跟进状态' },
      { icon: 'truck', title: '发货对接', note: '同步进度' },
      { icon: 'service', title: '售后跟进', note: '记录反馈' },
    ],
    chat: [
      '请问这款还有深色吗？',
      '可以根据需求确认款式。',
      '好的，帮我安排发货。',
    ],
    cardsTitle: '协同要点',
    cards: ['及时响应', '准确处理', '发货对接', '售后跟进'],
  },
  campaign: {
    heading: '活动执行流程',
    nodes: [
      { icon: 'calendar', title: '活动报名', note: '了解活动要求' },
      { icon: 'folder', title: '资料准备', note: '整理商品资料' },
      { icon: 'flag', title: '节点跟进', note: '记录执行进度' },
      { icon: 'review', title: '执行复盘', note: '归纳经验' },
    ],
    cardsTitle: '执行沉淀',
    cards: ['规则核对', '素材整理', '节奏记录', '复盘建议'],
  },
  aiOps: {
    heading: 'AI 辅助工作流程',
    nodes: [
      { icon: 'prompt', title: '输入需求', note: '明确场景' },
      { icon: 'ai', title: '生成思路', note: '标题与文案' },
      { icon: 'edit', title: '人工筛选', note: '优化表达' },
      { icon: 'check', title: '应用整理', note: '落到工作' },
    ],
    tools: ['ChatGPT', 'Excel', '剪映', '美图秀秀'],
    cardsTitle: '应用场景',
    cards: ['标题思路', '卖点文案', '客服话术', '表格归纳'],
  },
}

function CommerceVisual({ config, type }) {
  return (
    <div className={`commerce-visual commerce-visual-${type}`}>
      <div className="commerce-visual-card">
        <strong>{config.heading}</strong>
        <div className={`commerce-flow commerce-flow-${type}`}>
          {config.nodes.map((node) => (
            <div className="commerce-node" key={node.title}>
              <i className={`commerce-icon commerce-icon-${node.icon}`} aria-hidden="true" />
              <b>{node.title}</b>
              <small>{node.note}</small>
            </div>
          ))}
        </div>
      </div>

      {config.chat && (
        <div className="commerce-chat">
          <strong>沟通场景</strong>
          {config.chat.map((message, index) => (
            <p className={index % 2 === 1 ? 'is-reply' : undefined} key={message}>
              {message}
            </p>
          ))}
        </div>
      )}

      {config.tools && (
        <div className="commerce-tools">
          <strong>使用工具</strong>
          <div>
            {config.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      )}

      {config.cards && (
        <div className={`commerce-mini-grid commerce-mini-grid-${type}`}>
          <strong>{config.cardsTitle}</strong>
          <div>
            {config.cards.map((card) => (
              <span key={card}>{card}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProjectVisual({ type, label, variant = 'card' }) {
  const config = visualMap[type]

  return (
    <div className={`project-image project-image-${type} project-visual-${variant}`}>
      <span>{label}</span>
      {config ? (
        <CommerceVisual config={config} type={type} />
      ) : (
        <div className="commerce-visual-fallback">项目视觉</div>
      )}
    </div>
  )
}
