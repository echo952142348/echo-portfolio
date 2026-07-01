const visualMap = {
  listing: {
    heading: '上架与维护流程',
    nodes: [
      { icon: 'doc', title: '信息整理', note: '基础资料归纳' },
      { icon: 'pen', title: '标题优化', note: '关键词梳理' },
      { icon: 'image', title: '主图维护', note: '页面表达清晰' },
      { icon: 'link', title: '链接检查', note: '展示状态更新' },
    ],
    chips: ['商品信息规范化', '标题与主图维护', '链接持续检查'],
  },
  operations: {
    heading: '订单协同流程',
    nodes: [
      { icon: 'chat', title: '客户咨询', note: '沟通需求' },
      { icon: 'order', title: '订单处理', note: '状态跟进' },
      { icon: 'truck', title: '发货对接', note: '同步进度' },
      { icon: 'service', title: '售后跟进', note: '记录反馈' },
    ],
    chips: ['沟通记录', '订单流转', '售后协同'],
  },
  campaign: {
    heading: '活动执行流程',
    nodes: [
      { icon: 'calendar', title: '活动报名', note: '核对要求' },
      { icon: 'folder', title: '资料准备', note: '整理素材' },
      { icon: 'flag', title: '节点跟进', note: '推进执行' },
      { icon: 'review', title: '复盘整理', note: '沉淀经验' },
    ],
    chips: ['资料准备', '节点记录', '执行复盘'],
  },
  aiOps: {
    heading: 'AI 辅助工作流程',
    nodes: [
      { icon: 'prompt', title: '输入需求', note: '明确场景' },
      { icon: 'ai', title: '生成思路', note: '标题 / 文案' },
      { icon: 'edit', title: '人工筛选', note: '修正表达' },
      { icon: 'check', title: '应用整理', note: '落到工作' },
    ],
    chips: ['ChatGPT', 'Excel', '剪映', '美图秀秀'],
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

      {config.chips && (
        <div className="commerce-chip-row">
          {config.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
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
