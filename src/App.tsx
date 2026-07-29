
import { useMemo, useState } from "react";

const holdings = [
  { code: "600519", name: "贵州茅台", tag: "消费", value: "¥103,620", weight: 24.8, profit: 12.6, price: "1,727.00", today: 0.82, color: "#ffcc48" },
  { code: "300750", name: "宁德时代", tag: "新能源", value: "¥83,540", weight: 20.0, profit: -4.3, price: "179.40", today: -1.26, color: "#96ff53" },
  { code: "00700", name: "腾讯控股", tag: "互联网", value: "¥70,608", weight: 16.9, profit: 8.9, price: "392.60", today: 1.41, color: "#b967ff" },
  { code: "510300", name: "沪深300ETF", tag: "宽基", value: "¥64,351", weight: 15.4, profit: 3.1, price: "3.622", today: 0.36, color: "#5be7ff" },
];

const operations = [
  { step: "01", stock: "宁德时代", action: "减持", amount: "¥20,000", target: "15%", trigger: "反弹至 ¥188–195", status: "等待触发", type: "sell" },
  { step: "02", stock: "沪深300ETF", action: "增持", amount: "¥24,000", target: "22%", trigger: "分 3 次，每跌 2% 加仓", status: "可执行", type: "buy" },
  { step: "03", stock: "中国神华", action: "新建", amount: "¥18,000", target: "5%", trigger: "回撤至 20 日均线附近", status: "观察中", type: "buy" },
  { step: "04", stock: "货币基金", action: "转入", amount: "¥30,000", target: "12%", trigger: "本周五收盘前", status: "可执行", type: "cash" },
];

const lineHeights = [36, 39, 38, 44, 43, 47, 51, 49, 56, 59, 57, 64, 61, 68, 72, 70, 76, 74, 81, 86, 83, 90, 88, 96];
const stockBars = [32, 44, 38, 51, 46, 60, 55, 66, 59, 70, 64, 76, 68, 81, 74, 86, 78, 91];

export default function Home() {
  const [period, setPeriod] = useState("1年");
  const [activeStock, setActiveStock] = useState(0);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [toast, setToast] = useState("");
  const [risk, setRisk] = useState(15);
  const [returnGoal, setReturnGoal] = useState(18);
  const [duration, setDuration] = useState("1–3 年");

  const selected = holdings[activeStock];
  const periodValue = useMemo(() => ({ "日": "+0.76%", "月": "+3.24%", "1年": "+12.86%", "全部": "+24.18%" }[period]), [period]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">Q</span><span>清仓单</span></div>
        <nav>
          <button className="nav-item active"><span>◫</span>资产总览</button>
          <button className="nav-item"><span>◉</span>持仓计划</button>
          <button className="nav-item"><span>↗</span>调仓助手</button>
          <button className="nav-item"><span>⌁</span>个股洞察</button>
        </nav>
        <div className="side-spacer" />
        <button className="nav-item"><span>⚙</span>偏好设置</button>
        <div className="profile">
          <div className="avatar">林</div>
          <div><strong>林先生</strong><span>稳健成长型</span></div>
          <span className="more">•••</span>
        </div>
      </aside>

      <section className="content">
        <header>
          <div>
            <p className="eyebrow">晚上好，林先生</p>
            <h1>让每一笔持仓，都有清晰的理由。</h1>
          </div>
          <div className="header-actions">
            <span className="market-status"><i /> A 股已收盘 · 15:00</span>
            <button className="icon-button" aria-label="消息">●<span className="notice" /></button>
            <button className="primary" onClick={() => notify("已打开模拟持仓录入")}>＋ 录入持仓</button>
          </div>
        </header>

        <section className="overview-grid">
          <div className="card asset-card">
            <div className="card-top"><span>总资产</span><button className="ghost-icon">◉</button></div>
            <div className="asset-number"><span>¥</span> 417,860.28</div>
            <div className="profit-line"><b>+¥47,641.18</b><span>累计收益</span></div>
            <div className="mini-stats">
              <div><span>今日收益</span><strong className="up">+¥3,152.06</strong><small>+0.76%</small></div>
              <div><span>本月收益</span><strong className="up">+¥13,105.44</strong><small>+3.24%</small></div>
              <div><span>今年收益</span><strong className="up">+¥47,641.18</strong><small>+12.86%</small></div>
            </div>
            <p className="demo-label">演示数据 · 非实时行情</p>
          </div>

          <div className="card chart-card">
            <div className="card-top">
              <div><strong>收益走势</strong><span className="benchmark"><i /> 我的组合　<i /> 沪深300</span></div>
              <div className="period-tabs">
                {["日", "月", "1年", "全部"].map(p => <button key={p} className={period === p ? "selected" : ""} onClick={() => setPeriod(p)}>{p}</button>)}
              </div>
            </div>
            <div className="chart-value"><strong>{periodValue}</strong><span>组合收益率</span></div>
            <div className="line-chart">
              <div className="grid-line g1" /><div className="grid-line g2" /><div className="grid-line g3" />
              <div className="chart-bars">{lineHeights.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
              <div className="chart-tip"><b>+12.86%</b><span>今天</span></div>
            </div>
            <div className="chart-axis"><span>2025.07</span><span>2025.11</span><span>2026.03</span><span>今天</span></div>
          </div>

          <div className="card risk-card">
            <div className="card-top"><strong>你的投资画像</strong><button className="text-button">编辑</button></div>
            <div className="risk-score"><div className="score-ring"><strong>62</strong><span>风险分</span></div><div><span className="pill lime">稳健成长型</span><p>偏好长期复利，能承受中等波动</p></div></div>
            <div className="risk-row"><span>最大可接受回撤</span><b>-{risk}%</b></div>
            <input aria-label="最大可接受回撤" type="range" min="5" max="30" value={risk} onChange={e => setRisk(+e.target.value)} />
            <div className="risk-row"><span>计划持有</span><select value={duration} onChange={e => setDuration(e.target.value)}><option>6–12 个月</option><option>1–3 年</option><option>3–5 年</option></select></div>
            <div className="risk-row"><span>期望年化收益</span><b>{returnGoal}%</b></div>
            <input aria-label="期望年化收益" type="range" min="6" max="30" value={returnGoal} onChange={e => setReturnGoal(+e.target.value)} />
          </div>
        </section>

        <section className="plan-card card">
          <div className="plan-heading">
            <div className="ai-orb">✦</div>
            <div><p className="eyebrow">AI 为你生成</p><h2>{planGenerated ? "新计划已根据你的偏好更新" : "一份更从容的持仓计划"}</h2><p>基于你可接受 <b>{risk}%</b> 回撤、{duration}持有期与 <b>{returnGoal}%</b> 期望年化生成</p></div>
            <button className="primary gradient" onClick={() => { setPlanGenerated(true); notify("持仓计划已更新"); }}>✦ 重新生成计划</button>
          </div>
          <div className="plan-body">
            <div className="logic-box">
              <span className="section-label">核心逻辑</span>
              <h3>以宽基和高股息筑底，分享优质成长。</h3>
              <p>降低单一赛道集中度，保留消费与互联网龙头；用 12% 现金仓作为回撤缓冲，在估值合理时分批加仓，不追涨。</p>
              <div className="logic-tags"><span>✓ 控制单股 ≤ 20%</span><span>✓ 季度再平衡</span><span>✓ 回撤 10% 启动复盘</span></div>
            </div>
            <div className="allocation">
              <span className="section-label">目标配置</span>
              <div className="allocation-bar"><i style={{ width: "38%" }} /><i style={{ width: "35%" }} /><i style={{ width: "15%" }} /><i style={{ width: "12%" }} /></div>
              <div className="allocation-grid">
                <div><i className="dot purple" /><span>兜底仓</span><b>38%</b><small>宽基 / 高股息</small></div>
                <div><i className="dot lime-dot" /><span>成长仓</span><b>35%</b><small>科技 / 新能源</small></div>
                <div><i className="dot yellow" /><span>价值仓</span><b>15%</b><small>消费龙头</small></div>
                <div><i className="dot cyan" /><span>现金仓</span><b>12%</b><small>回撤缓冲</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-title"><div><p className="eyebrow">执行路线</p><h2>从现有持仓，迁移到目标组合</h2></div><div className="connection"><span>○ 同花顺未连接</span><span>○ 券商账户未连接</span><button onClick={() => notify("账户连接需要券商与同花顺开放接口授权")}>连接账户</button></div></div>
          <div className="table-card card">
            <div className="table-header"><span>步骤</span><span>标的</span><span>操作</span><span>计划金额</span><span>目标仓位</span><span>触发条件</span><span>状态</span><span /></div>
            {operations.map(row => (
              <div className="table-row" key={row.step}>
                <span className="step">{row.step}</span><strong>{row.stock}</strong><span className={`action ${row.type}`}>{row.action}</span><b>{row.amount}</b><span>{row.target}</span><span className="trigger">{row.trigger}</span><span className={`status ${row.status === "可执行" ? "ready" : ""}`}><i />{row.status}</span>
                <button onClick={() => notify(`${row.stock}：已加入模拟委托，连接券商后才能真实下单`)}>模拟执行</button>
              </div>
            ))}
            <div className="table-footer"><span>预计调仓后组合风险分 <b>62 → 48</b></span><span>预计交易成本约 ¥86.40</span><button onClick={() => notify("已生成 4 笔模拟调仓指令")}>一键生成模拟委托 →</button></div>
          </div>
        </section>

        <section className="stocks-section">
          <div className="section-title"><div><p className="eyebrow">持仓跟踪</p><h2>个股表现与信号</h2></div><button className="outline">查看全部 8 只 →</button></div>
          <div className="stock-layout">
            <div className="stock-list card">
              {holdings.map((stock, i) => (
                <button key={stock.code} className={activeStock === i ? "active" : ""} onClick={() => setActiveStock(i)}>
                  <i style={{ background: stock.color }}>{stock.name.slice(0, 1)}</i>
                  <span><strong>{stock.name}</strong><small>{stock.code} · {stock.tag}</small></span>
                  <span><b>{stock.value}</b><small>仓位 {stock.weight}%</small></span>
                  <em className={stock.profit > 0 ? "up" : "down"}>{stock.profit > 0 ? "+" : ""}{stock.profit}%</em>
                </button>
              ))}
            </div>
            <div className="stock-detail card">
              <div className="stock-head"><div><span>{selected.code} · {selected.tag}</span><h3>{selected.name}</h3></div><div><strong>¥{selected.price}</strong><span className={selected.today > 0 ? "up" : "down"}>{selected.today > 0 ? "+" : ""}{selected.today}% 今日</span></div></div>
              <div className="stock-chart">
                <div className="candles">{stockBars.map((h, i) => <i key={i} className={i % 4 === 0 || i % 7 === 0 ? "red" : ""} style={{ height: `${h}%` }} />)}</div>
                <span className="ma-line ma-one" /><span className="ma-line ma-two" />
              </div>
              <div className="stock-metrics"><span>持仓收益 <b className={selected.profit > 0 ? "up" : "down"}>{selected.profit > 0 ? "+" : ""}{selected.profit}%</b></span><span>预测信号 <b>↗ 震荡偏强</b></span><span>风险提示 <b>中等</b></span></div>
            </div>
            <div className="insight-card card">
              <div className="card-top"><strong>新闻与趋势解读</strong><span className="ai-badge">AI 摘要</span></div>
              <article><i className="news-icon purple-bg">财</i><div><strong>行业景气度回升，机构上调盈利预期</strong><p>核心业务改善，市场关注下一季度利润率。</p><span>36 分钟前 · 财经日报</span></div></article>
              <article><i className="news-icon lime-bg">研</i><div><strong>估值处于近三年中位区间</strong><p>短期动量积极，但需留意成交量变化。</p><span>2 小时前 · 券商研报</span></div></article>
              <div className="prediction"><span>未来 20 日模型区间</span><strong>¥{selected.code === "600519" ? "1,650 – 1,840" : "中性区间"}</strong><p>模型概率仅供参考，不构成投资建议。</p></div>
            </div>
          </div>
        </section>

        <footer><span>数据均为产品演示，不代表真实行情或投资建议</span><span>最近同步：今天 15:06　·　数据保护说明</span></footer>
      </section>
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}
