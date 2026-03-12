import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, RadarChart, PolarGrid,
  PolarAngleAxis, Radar, Legend
} from "recharts";

/* ══════════════════════════════════════════════
   GLOBAL TOOLTIP CONTEXT
   render ที่ root level เพื่อแก้ปัญหา overflow:hidden ตัด tooltip
══════════════════════════════════════════════ */
const TooltipCtx = createContext(null);

function GlobalTooltipProvider({ children }) {
  const [tip, setTip] = useState(null);
  return (
    <TooltipCtx.Provider value={setTip}>
      {children}
      {tip && (
        <div style={{
          position: "fixed",
          top: tip.y + 10,
          left: Math.min(tip.x, window.innerWidth - 290),
          zIndex: 99999,
          background: "#0f1629",
          border: "1px solid #e8192c55",
          borderLeft: "3px solid #e8192c",
          borderRadius: 5,
          padding: "9px 13px",
          maxWidth: 275,
          minWidth: 160,
          fontSize: 11,
          color: "#d0d0d0",
          lineHeight: 1.65,
          boxShadow: "0 10px 30px rgba(0,0,0,0.75)",
          pointerEvents: "none",
          whiteSpace: "pre-wrap",
        }}>
          <div style={{ color: "#e8192c", fontWeight: 700, fontSize: 10, marginBottom: 5 }}>{tip.title}</div>
          {tip.text}
        </div>
      )}
    </TooltipCtx.Provider>
  );
}

/* ══════════════════════════════════════════════
   INFO ICON — แตะ/hover เพื่อดูคำอธิบาย
══════════════════════════════════════════════ */
function Info({ title, text }) {
  const setTip = useContext(TooltipCtx);
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setTip({ title, text, x: r.left, y: r.bottom });
    setOpen(true);
  }, [title, text, setTip]);

  const hide = useCallback(() => { setTip(null); setOpen(false); }, [setTip]);

  const tap = useCallback((e) => {
    e.stopPropagation();
    open ? hide() : show();
  }, [open, show, hide]);

  return (
    <span
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={tap}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 16, height: 16, borderRadius: "50%",
        background: open ? "#e8192c44" : "#e8192c18",
        border: `1px solid ${open ? "#e8192c" : "#e8192c66"}`,
        color: "#e8192c", fontSize: 9, fontWeight: 900,
        cursor: "help", flexShrink: 0, userSelect: "none",
        marginLeft: 6, transition: "all 0.15s",
        fontFamily: "monospace",
      }}
    >i</span>
  );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const DATA = {
  2020: {
    revenue: 2994.6, opProfit: 29.8, opMargin: 1.0, employees: 137000, countries: "150+",
    roe: -1.0, netIncome: -71.6, totalAssets: 4365.1, totalEquity: 2291.6,
    pslt: { revenue: 1680.0, op: 20.1, margin: 1.2, yoy: -16 },
    tb:   { revenue: 718.0,  op: 4.8,  margin: 0.7, yoy: -14 },
    spec: { revenue: 396.6,  op: 44.8, margin: 11.3, yoy: -8 },
    geoAmericasOku: 12483, geoJapanOku: 7154, geoEmeaOku: 5688, geoApicOku: 3562,
    marketShare: 14.4, msRank: 1,
    production: 1350000, prodJapan: 400000, prodAmericas: 460000, prodApic: 280000, prodEmea: 210000,
    rdex: 95.2, capex: 310.5, selling: 280.1,
    factories: 100, tireFactories: 44, matFactories: 13, rdCenters: 16,
  },
  2021: {
    revenue: 3252.8, opProfit: 258.2, opMargin: 7.9, employees: 133000, countries: "150+",
    roe: 12.9, netIncome: 174.4, totalAssets: 4801.2, totalEquity: 2837.4,
    pslt: { revenue: 1900.0, op: 180.5, margin: 9.5, yoy: +13 },
    tb:   { revenue: 828.0,  op: 38.1,  margin: 4.6, yoy: +15 },
    spec: { revenue: 524.8,  op: 80.8,  margin: 15.4, yoy: +32 },
    geoAmericasOku: 14210, geoJapanOku: 8380, geoEmeaOku: 6220, geoApicOku: 4100,
    marketShare: 14.2, msRank: 1,
    production: 1380000, prodJapan: 420000, prodAmericas: 470000, prodApic: 290000, prodEmea: 200000,
    rdex: 105.4, capex: 325.8, selling: 295.6,
    factories: 101, tireFactories: 45, matFactories: 13, rdCenters: 16,
  },
  2022: {
    revenue: 4130.6, opProfit: 395.5, opMargin: 9.6, employees: 130000, countries: "150+",
    roe: 10.9, netIncome: 257.1, totalAssets: 5154.8, totalEquity: 3145.2,
    pslt: { revenue: 2298.0, op: 250.5, margin: 10.9, yoy: +21 },
    tb:   { revenue: 950.1,  op: 52.3,  margin: 5.5, yoy: +15 },
    spec: { revenue: 582.5,  op: 120.5, margin: 20.7, yoy: +11 },
    geoAmericasOku: 18760, geoJapanOku: 10215, geoEmeaOku: 7165, geoApicOku: 4610,
    marketShare: 13.8, msRank: 2,
    production: 1430000, prodJapan: 430000, prodAmericas: 482000, prodApic: 305000, prodEmea: 213000,
    rdex: 115.8, capex: 354.2, selling: 318.4,
    factories: 103, tireFactories: 45, matFactories: 13, rdCenters: 17,
  },
  2023: {
    revenue: 4260.6, opProfit: 418.6, opMargin: 9.8, employees: 124000, countries: "150+",
    roe: 10.4, netIncome: 283.9, totalAssets: 5456.3, totalEquity: 3524.8,
    pslt: { revenue: 2380.0, op: 268.0, margin: 11.3, yoy: +4 },
    tb:   { revenue: 985.2,  op: 55.1,  margin: 5.6, yoy: +4 },
    spec: { revenue: 595.4,  op: 129.2, margin: 21.7, yoy: +2 },
    geoAmericasOku: 20180, geoJapanOku: 11510, geoEmeaOku: 7820, geoApicOku: 5015,
    marketShare: 13.7, msRank: 2,
    production: 1460000, prodJapan: 436000, prodAmericas: 488000, prodApic: 310000, prodEmea: 226000,
    rdex: 120.5, capex: 375.1, selling: 336.8,
    factories: 104, tireFactories: 46, matFactories: 13, rdCenters: 17,
  },
  2024: {
    revenue: 4430.1, opProfit: 483.3, opMargin: 10.9, employees: 121464, countries: "150+",
    roe: 8.1, netIncome: 285.0, totalAssets: 5723.5, totalEquity: 3786.5,
    pslt: { revenue: 2485.9, op: 282.3, margin: 11.4, yoy: +5 },
    tb:   { revenue: 1022.8, op: 57.9,  margin: 5.7,  yoy: +1 },
    spec: { revenue: 623.6,  op: 138.9, margin: 22.3, yoy: -1 },
    geoAmericasOku: 21808, geoJapanOku: 12268, geoEmeaOku: 8308, geoApicOku: 5308,
    marketShare: 13.6, msRank: 2,
    production: 1480000, prodJapan: 440000, prodAmericas: 490000, prodApic: 320000, prodEmea: 220000,
    rdex: 126.2, capex: 389.8, selling: 348.1,
    factories: 105, tireFactories: 46, matFactories: 13, rdCenters: 17,
  },
};

const TREND = [
  { y:"57",rev:3572.0,op:471.3 },{ y:"58",rev:3790.3,op:421.4 },
  { y:"59",rev:2916.5,op:277.4 },{ y:"60",rev:3643.2,op:373.4 },
  { y:"61",rev:3647.0,op:332.5 },{ y:"62",rev:3169.0,op:265.1 },
  { y:"63",rev:2994.6,op:29.8  },{ y:"64",rev:3252.8,op:258.2 },
  { y:"65",rev:4130.6,op:395.5 },{ y:"66",rev:4260.6,op:418.6 },
  { y:"67",rev:4430.1,op:483.3 },
];

const ROE_HISTORY = [
  { yr:"2561",val:12.4,ce:2018 },{ yr:"2562",val:10.0,ce:2019 },
  { yr:"2563",val:-1.0,ce:2020 },{ yr:"2564",val:12.9,ce:2021 },
  { yr:"2565",val:10.9,ce:2022 },{ yr:"2566",val:10.4,ce:2023 },
  { yr:"2567",val:8.1, ce:2024 },
];

const COMPETITORS = [
  { name:"Michelin",   share2020:14.8,share2021:14.6,share2022:14.3,share2023:14.2,share2024:14.1 },
  { name:"Bridgestone",share2020:14.4,share2021:14.2,share2022:13.8,share2023:13.7,share2024:13.6 },
  { name:"Goodyear",   share2020:10.3,share2021:10.1,share2022:9.9, share2023:9.8, share2024:9.6  },
  { name:"Continental",share2020:7.3, share2021:7.2, share2022:7.0, share2023:6.9, share2024:6.9  },
  { name:"Pirelli",    share2020:4.2, share2021:4.1, share2022:4.1, share2023:4.0, share2024:4.0  },
  { name:"Sumitomo",   share2020:4.0, share2021:3.9, share2022:3.9, share2023:3.8, share2024:3.8  },
  { name:"Hankook",    share2020:3.9, share2021:3.9, share2022:3.8, share2023:3.8, share2024:3.8  },
  { name:"Yokohama",   share2020:3.7, share2021:3.7, share2022:3.6, share2023:3.6, share2024:3.6  },
];

const YEARS = [2020,2021,2022,2023,2024];
const CA = "#e8192c";
const CB = "#f5a623";

const fmt   = (n,d=1) => n?.toLocaleString("th-TH",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtBig = n => n?.toLocaleString("th-TH");
const pct   = (a,b) => ((b-a)/Math.abs(a||1))*100;
const arrow = v => v>0?"▲":v<0?"▼":"–";
const dCol  = v => v>0?"#4caf50":v<0?CA:"#888";

/* ══════════════════════════════════════════════
   TOOLTIP DEFINITIONS ครบทุก section
══════════════════════════════════════════════ */
const T = {
  revenue:      { title:"รายได้รวม (Consolidated Revenue)",          text:"รายได้ทั้งหมดจากการขายสินค้าและบริการของทุกบริษัทในเครือทั่วโลก วัดเป็นพันล้านเยน (¥B) — ยิ่งสูงยิ่งสะท้อนการเติบโตของธุรกิจ" },
  opProfit:     { title:"กำไรจากการดำเนินงาน (Operating Profit)",   text:"กำไรหลักก่อนหักดอกเบี้ยและภาษี (EBIT) สะท้อนประสิทธิภาพการผลิตและการควบคุมต้นทุนโดยตรง" },
  opMargin:     { title:"Operating Profit Margin (%)",               text:"= กำไร OP ÷ รายได้รวม × 100\nทุก ¥100 ของรายได้ เหลือกำไรกี่ % ค่าสูงหมายถึงควบคุมต้นทุนได้ดี\nอุตสาหกรรมยาโดยเฉลี่ยอยู่ที่ 8–12%" },
  employees:    { title:"จำนวนพนักงาน (Total Employees)",            text:"พนักงานทั้งหมดทั่วโลกรวมทุกประเทศ ทั้งประจำและสัญญาจ้าง แนวโน้มลดลงสะท้อนการปรับโครงสร้างและ Automation" },
  countries:    { title:"จำนวนประเทศที่ดำเนินการ",                  text:"จำนวนประเทศ/ภูมิภาคที่มีการขายหรือดำเนินงาน บ่งบอกความเป็น Global Brand" },
  roe:          { title:"Return on Equity — ROE (%)",                text:"= กำไรสุทธิ ÷ ส่วนของผู้ถือหุ้น × 100\nวัดว่าบริษัทสร้างผลตอบแทนได้ดีแค่ไหนจากเงินทุนของผู้ถือหุ้น\nค่ามาตรฐานที่ดีของอุตสาหกรรมนี้ควร > 10%" },
  netIncome:    { title:"กำไรสุทธิ (Net Income)",                    text:"กำไรที่เหลือหลังหักต้นทุน ค่าใช้จ่าย ดอกเบี้ย และภาษีทุกอย่างแล้ว เป็นผลตอบแทนสุดท้ายที่ตกถึงผู้ถือหุ้น" },
  totalAssets:  { title:"สินทรัพย์รวม (Total Assets)",              text:"ทรัพยากรทั้งหมดที่บริษัทถือครอง ได้แก่ เงินสด, สินค้าคงคลัง, โรงงาน, เครื่องจักร และสิทธิ์ต่างๆ" },
  totalEquity:  { title:"ส่วนของผู้ถือหุ้น (Shareholders' Equity)", text:"= สินทรัพย์รวม − หนี้สินรวม\nมูลค่าสุทธิของบริษัทที่เป็นของผู้ถือหุ้น ยิ่งสูงยิ่งมีฐานะการเงินมั่นคง" },
  marketShare:  { title:"ส่วนแบ่งตลาดยางโลก (Global Market Share)", text:"สัดส่วนยอดขายของ Bridgestone เทียบกับตลาดยางรถยนต์โลกทั้งหมด วัดจากมูลค่า\nปัจจุบันอยู่อันดับ 2 รองจาก Michelin" },
  production:   { title:"ปริมาณการผลิต (Total Production Volume)",   text:"ยางทั้งหมดที่ผลิตได้ในปีนั้นจากทุกโรงงานทั่วโลก วัดเป็นตัน\nบ่งบอกกำลังการผลิตและการตอบสนองความต้องการตลาด" },
  pslt:         { title:"PS/LT — Passenger & Light Truck Tires",      text:"ยางสำหรับรถยนต์นั่งส่วนบุคคลและรถปิกอัพ\nเป็น segment หลักของ Bridgestone คิดเป็น ~56% ของรายได้รวม" },
  tb:           { title:"TB — Truck & Bus Tires",                      text:"ยางสำหรับรถบรรทุกและรถโดยสาร\nMargin ต่ำกว่า PS/LT แต่มี Volume สูง ผูกกับการเติบโตของโลจิสติกส์" },
  spec:         { title:"Speciality Tires — ยางเฉพาะทาง",             text:"ยางสำหรับงานพิเศษ เช่น เครื่องบิน (AC), ยานพาหนะนอกถนน (OR), เกษตร (AG), มอเตอร์ไซค์ (MC)\nเป็น segment ที่มี Margin สูงสุด" },
  rdex:         { title:"Research & Development Expenses",             text:"งบวิจัยและพัฒนา ครอบคลุมการพัฒนายาง EV Tires, AirFree (ยางไม่ต้องสูบลม) และวัสดุศาสตร์ขั้นสูง" },
  capex:        { title:"Capital Expenditure — CAPEX",                 text:"รายจ่ายลงทุนในสินทรัพย์ถาวร เช่น โรงงานใหม่ เครื่องจักร และระบบอัตโนมัติ สะท้อนทิศทางการขยายกำลังการผลิต" },
  selling:      { title:"Depreciation & Amortization",                 text:"ค่าเสื่อมราคาของสินทรัพย์ถาวรและค่าตัดจำหน่ายสินทรัพย์ไม่มีตัวตน ใช้ประเมินภาระต้นทุนของโครงสร้างพื้นฐาน" },
  geoAmericas:  { title:"ภูมิภาคอเมริกา (Americas)",                  text:"รวมสหรัฐอเมริกา, แคนาดา, ละตินอเมริกา\nเป็นตลาดใหญ่สุดของ Bridgestone ด้วยแบรนด์ Bridgestone และ Firestone" },
  geoJapan:     { title:"ประเทศญี่ปุ่น (Japan)",                       text:"ตลาดบ้านเกิดของ Bridgestone รวมสำนักงานใหญ่และโรงงานหลัก\nยังคงเป็นฐานวิจัยและพัฒนาสำคัญ" },
  geoEmea:      { title:"EMEA — Europe, Middle East & Africa",          text:"ครอบคลุมยุโรป ตะวันออกกลาง และแอฟริกา\nการแข่งขันสูงกับ Michelin (ฝรั่งเศส) และ Continental (เยอรมนี)" },
  geoApic:      { title:"APIC — Asia Pacific, India & China",           text:"รวมเอเชียตะวันออกเฉียงใต้ จีน อินเดีย ออสเตรเลีย\nเป็น segment ที่เติบโตเร็วที่สุดตามการขยายตัวของตลาดรถยนต์" },
  factories:    { title:"โรงงานทั้งหมด (Total Plants)",                text:"จำนวนโรงงานการผลิตทั้งหมดทั่วโลก รวมโรงงานยาง วัตถุดิบ และ Off-the-Road" },
  tireFact:     { title:"โรงงานผลิตยาง (Tire Manufacturing Plants)",    text:"โรงงานที่ผลิตยางรถยนต์โดยตรง กระจายทุกทวีปเพื่อลดต้นทุนโลจิสติกส์และตอบสนองตลาดท้องถิ่น" },
  matFact:      { title:"โรงงานวัตถุดิบ (Material Plants)",             text:"โรงงานที่ผลิต/แปรรูปวัตถุดิบสำหรับการผลิตยาง เช่น ยางสังเคราะห์ ผ้าใบไนลอน และลวดเหล็ก" },
  rdCenters:    { title:"ศูนย์วิจัยและพัฒนา (R&D Centers)",            text:"ศูนย์วิจัยระดับโลก ครอบคลุมการทดสอบยาง, การพัฒนา Compound ใหม่ และเทคโนโลยีดิจิทัล" },
};

/* ══════════════════════════════════════════════
   MOBILE HOOK — ตรวจขนาดหน้าจอ
══════════════════════════════════════════════ */
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

/* ══════════════════════════════════════════════
   PANEL
══════════════════════════════════════════════ */
function Panel({ title, subtitle, children, style }) {
  return (
    <div style={{ background:"#161616", border:"1px solid #2a2a2a", borderRadius:6, padding:"16px 20px", ...style }}>
      {subtitle && <div style={{ color:"#555", fontSize:9, letterSpacing:2, marginBottom:4, fontFamily:"monospace" }}>{subtitle}</div>}
      {title && <div style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:12, fontFamily:"'Oswald',sans-serif", display:"flex", alignItems:"center" }}>{title}</div>}
      {children}
    </div>
  );
}

function YearBtn({ y, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"4px 11px", borderRadius:3,
      border:`1px solid ${active?color:"#333"}`,
      background:active?`${color}22`:"transparent",
      color:active?color:"#666",
      cursor:"pointer", fontSize:11,
      fontWeight:active?700:400,
      fontFamily:"'Oswald',sans-serif",
      transition:"all 0.2s",
    }}>{y}</button>
  );
}

/* ══════════════════════════════════════════════
   COMPARE SECTION
══════════════════════════════════════════════ */
function CompareSection({ yearA, yearB, isMobile }) {
  const dA = DATA[yearA], dB = DATA[yearB];
  const g2 = isMobile ? "1fr" : "1fr 1fr";

  const kpiRows = [
    { label:"รายได้รวม (¥B)",             a:dA.revenue,     b:dB.revenue,     f:fmt,           abs:false, tip:T.revenue     },
    { label:"กำไรจากการดำเนินงาน (¥B)",  a:dA.opProfit,    b:dB.opProfit,    f:fmt,           abs:false, tip:T.opProfit    },
    { label:"อัตรากำไร OP (%)",           a:dA.opMargin,    b:dB.opMargin,    f:v=>`${fmt(v)}%`,abs:true,  tip:T.opMargin    },
    { label:"กำไรสุทธิ (¥B)",            a:dA.netIncome,   b:dB.netIncome,   f:fmt,           abs:false, tip:T.netIncome   },
    { label:"ROE (%)",                     a:dA.roe,         b:dB.roe,         f:v=>`${fmt(v)}%`,abs:true,  tip:T.roe         },
    { label:"สินทรัพย์รวม (¥B)",         a:dA.totalAssets, b:dB.totalAssets, f:fmt,           abs:false, tip:T.totalAssets },
    { label:"ส่วนของผู้ถือหุ้น (¥B)",   a:dA.totalEquity, b:dB.totalEquity, f:fmt,           abs:false, tip:T.totalEquity },
    { label:"พนักงาน (คน)",              a:dA.employees,   b:dB.employees,   f:fmtBig,        abs:false, tip:T.employees   },
    { label:"ส่วนแบ่งตลาด (%)",          a:dA.marketShare, b:dB.marketShare, f:v=>`${fmt(v)}%`,abs:true,  tip:T.marketShare },
    { label:"ปริมาณผลิต (ตัน)",          a:dA.production,  b:dB.production,  f:fmtBig,        abs:false, tip:T.production  },
  ];

  const marginRows = [
    { label:"OP Margin",    a:dA.opMargin,    b:dB.opMargin,    max:15, tip:T.opMargin },
    { label:"PS/LT Margin", a:dA.pslt.margin, b:dB.pslt.margin, max:15, tip:T.pslt    },
    { label:"TB Margin",    a:dA.tb.margin,   b:dB.tb.margin,   max:10, tip:T.tb      },
    { label:"Spec Margin",  a:dA.spec.margin, b:dB.spec.margin, max:25, tip:T.spec    },
    { label:"ROE",          a:dA.roe,         b:dB.roe,         max:15, tip:T.roe     },
  ];

  const TTBar = ({ active, payload, label }) => {
    if (!active||!payload?.length) return null;
    return (
      <div style={{ background:"#1a1a1a", border:"1px solid #333", padding:"8px 12px", borderRadius:4, fontSize:11 }}>
        <div style={{ color:"#aaa", marginBottom:4 }}>{label}</div>
        {payload.map((p,i)=><div key={i} style={{ color:p.fill }}>ปี {p.name}: ¥{fmt(p.value)}B</div>)}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16, padding:"14px 20px", background:"#111", border:"1px solid #2a2a2a", borderRadius:6, flexWrap:"wrap" }}>
        <div style={{ width:3, height:30, background:`linear-gradient(to bottom,${CA},${CB})`, borderRadius:2 }}/>
        <div>
          <div style={{ color:"#555", fontSize:9, letterSpacing:2, fontFamily:"monospace" }}>YEAR-OVER-YEAR COMPARISON</div>
          <div style={{ color:"#fff", fontSize:16, fontWeight:700, fontFamily:"'Oswald',sans-serif" }}>เปรียบเทียบผลการดำเนินงาน</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:4 }}>
          <span style={{ background:CA, color:"#fff", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, padding:"3px 14px", borderRadius:3 }}>{yearA}</span>
          <span style={{ color:"#444", fontSize:20 }}>vs</span>
          <span style={{ background:CB, color:"#111", fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:14, padding:"3px 14px", borderRadius:3 }}>{yearB}</span>
        </div>
      </div>

      {/* KPI Table + Radar */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 340px", gap:14, marginBottom:14 }}>
        <Panel subtitle="KEY METRICS COMPARISON" title="ตารางเปรียบเทียบตัวชี้วัดหลัก">
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10, padding:"5px 9px", background:"#111", borderRadius:4, border:"1px solid #222", width:"fit-content" }}>
            <span style={{ display:"inline-flex", width:16, height:16, borderRadius:"50%", alignItems:"center", justifyContent:"center", background:"#e8192c18", border:"1px solid #e8192c66", color:"#e8192c", fontSize:9, fontFamily:"monospace", fontWeight:900 }}>i</span>
            <span style={{ color:"#555", fontSize:9 }}>แตะไอคอนเพื่อดูคำอธิบาย</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 88px 88px 78px 62px", minWidth:460 }}>
              {["ตัวชี้วัด",yearA,yearB,"เปลี่ยนแปลง","%"].map((h,i)=>(
                <div key={i} style={{ padding:"6px 8px", background:"#111", color:"#555", fontSize:9, letterSpacing:1, textAlign:i>0?"right":"left", borderBottom:"1px solid #2a2a2a" }}>{h}</div>
              ))}
              {kpiRows.map((row,ri)=>{
                const chg = row.b-row.a, cp=pct(row.a,row.b), col=dCol(chg);
                return [
                  <div key={`l${ri}`} style={{ padding:"8px 8px", color:"#aaa", fontSize:10, borderBottom:"1px solid #1a1a1a", display:"flex", alignItems:"center" }}>
                    {row.label}<Info title={row.tip.title} text={row.tip.text}/>
                  </div>,
                  <div key={`a${ri}`} style={{ padding:"8px 8px", textAlign:"right", borderBottom:"1px solid #1a1a1a", borderLeft:`2px solid ${CA}30` }}>
                    <span style={{ color:CA,fontSize:9 }}>● </span><span style={{ color:"#fff",fontSize:11,fontWeight:600 }}>{row.f(row.a)}</span>
                  </div>,
                  <div key={`b${ri}`} style={{ padding:"8px 8px", textAlign:"right", borderBottom:"1px solid #1a1a1a", borderLeft:`2px solid ${CB}30` }}>
                    <span style={{ color:CB,fontSize:9 }}>● </span><span style={{ color:"#fff",fontSize:11,fontWeight:600 }}>{row.f(row.b)}</span>
                  </div>,
                  <div key={`c${ri}`} style={{ padding:"8px 8px", textAlign:"right", color:col, fontSize:10, fontWeight:700, borderBottom:"1px solid #1a1a1a" }}>
                    {arrow(chg)} {row.abs?`${fmt(Math.abs(chg),1)}pp`:row.f(Math.abs(chg))}
                  </div>,
                  <div key={`p${ri}`} style={{ padding:"8px 8px", textAlign:"right", color:col, fontSize:10, fontWeight:700, borderBottom:"1px solid #1a1a1a" }}>
                    {row.abs?"—":`${cp>0?"+":""}${fmt(cp)}%`}
                  </div>,
                ];
              })}
            </div>
          </div>
        </Panel>

        <Panel subtitle="PERFORMANCE RADAR" title="กราฟแมงมุม (Normalized %)">
          <div style={{ color:"#555", fontSize:9, marginBottom:6 }}>ฐาน = ค่าสูงสุดของปี 2024</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={[
              { s:"รายได้",        A:(dA.revenue/4430.1)*100,        B:(dB.revenue/4430.1)*100        },
              { s:"กำไร OP",       A:Math.max(0,(dA.opProfit/483.3)*100), B:Math.max(0,(dB.opProfit/483.3)*100) },
              { s:"สินทรัพย์",    A:(dA.totalAssets/5723.5)*100,   B:(dB.totalAssets/5723.5)*100   },
              { s:"ส่วนผู้ถือหุ้น",A:(dA.totalEquity/3786.5)*100,  B:(dB.totalEquity/3786.5)*100  },
              { s:"ส่วนแบ่งตลาด", A:(dA.marketShare/14.4)*100,    B:(dB.marketShare/14.4)*100    },
              { s:"การผลิต",       A:(dA.production/1480000)*100,  B:(dB.production/1480000)*100  },
            ]} cx="50%" cy="50%">
              <PolarGrid stroke="#2a2a2a"/>
              <PolarAngleAxis dataKey="s" tick={{ fill:"#666",fontSize:9 }}/>
              <Radar name={String(yearA)} dataKey="A" stroke={CA} fill={CA} fillOpacity={0.18} strokeWidth={2} dot={{ fill:CA,r:3 }}/>
              <Radar name={String(yearB)} dataKey="B" stroke={CB} fill={CB} fillOpacity={0.18} strokeWidth={2} dot={{ fill:CB,r:3 }}/>
              <Legend formatter={v=><span style={{ color:v==yearA?CA:CB,fontSize:10 }}>{v}</span>}/>
              <Tooltip formatter={v=>`${fmt(v,1)}`} contentStyle={{ background:"#1a1a1a",border:"1px solid #333",fontSize:11 }} labelStyle={{ color:"#aaa" }}/>
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Financial + Geo Bar */}
      <div style={{ display:"grid", gridTemplateColumns:g2, gap:14, marginBottom:14 }}>
        <Panel subtitle="FINANCIAL COMPARISON" title="เปรียบเทียบตัวเลขทางการเงิน (¥B)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              { label:"รายได้รวม",  a:dA.revenue,              b:dB.revenue              },
              { label:"กำไร OP",    a:dA.opProfit,             b:dB.opProfit             },
              { label:"กำไรสุทธิ", a:Math.max(0,dA.netIncome),b:Math.max(0,dB.netIncome)},
              { label:"สินทรัพย์", a:dA.totalAssets,          b:dB.totalAssets          },
              { label:"ส่วนผู้ถือหุ้น",a:dA.totalEquity,      b:dB.totalEquity          },
            ]} margin={{ left:-10,right:10,top:10,bottom:0 }} barGap={4}>
              <CartesianGrid stroke="#1e1e1e" strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="label" tick={{ fill:"#666",fontSize:9 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:"#555",fontSize:9 }} axisLine={false} tickLine={false} width={42}/>
              <Tooltip content={<TTBar/>}/>
              <Bar dataKey="a" name={String(yearA)} fill={CA} radius={[2,2,0,0]} maxBarSize={30}/>
              <Bar dataKey="b" name={String(yearB)} fill={CB} radius={[2,2,0,0]} maxBarSize={30}/>
              <Legend formatter={v=><span style={{ color:v==yearA?CA:CB,fontSize:10 }}>{v}</span>}/>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel subtitle="REVENUE BY REGION" title="รายได้แยกภูมิภาค (億 JPY)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              { name:"อเมริกา",a:dA.geoAmericasOku,b:dB.geoAmericasOku },
              { name:"ญี่ปุ่น", a:dA.geoJapanOku,  b:dB.geoJapanOku   },
              { name:"EMEA",   a:dA.geoEmeaOku,    b:dB.geoEmeaOku    },
              { name:"APIC",   a:dA.geoApicOku,    b:dB.geoApicOku    },
            ]} margin={{ left:-10,right:10,top:10,bottom:0 }} barGap={4}>
              <CartesianGrid stroke="#1e1e1e" strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="name" tick={{ fill:"#666",fontSize:9 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:"#555",fontSize:9 }} axisLine={false} tickLine={false} width={42}/>
              <Tooltip formatter={(v,n)=>[`¥${fmtBig(v)}億`,`ปี ${n}`]} contentStyle={{ background:"#1a1a1a",border:"1px solid #333",fontSize:11 }} labelStyle={{ color:"#aaa" }}/>
              <Bar dataKey="a" name={String(yearA)} fill={CA} radius={[2,2,0,0]} maxBarSize={30}/>
              <Bar dataKey="b" name={String(yearB)} fill={CB} radius={[2,2,0,0]} maxBarSize={30}/>
              <Legend formatter={v=><span style={{ color:v==yearA?CA:CB,fontSize:10 }}>{v}</span>}/>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Margin + Product */}
      <div style={{ display:"grid", gridTemplateColumns:g2, gap:14, marginBottom:14 }}>
        <Panel subtitle="MARGIN COMPARISON" title="เปรียบเทียบ Margin (%)">
          {marginRows.map(row=>{
            const chg=row.b-row.a;
            return (
              <div key={row.label} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, alignItems:"center" }}>
                  <span style={{ color:"#aaa", fontSize:10, display:"flex", alignItems:"center" }}>{row.label}<Info title={row.tip.title} text={row.tip.text}/></span>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ color:CA,fontSize:11,fontWeight:700 }}>{fmt(row.a)}%</span>
                    <span style={{ color:CB,fontSize:11,fontWeight:700 }}>{fmt(row.b)}%</span>
                    <span style={{ color:dCol(chg),fontSize:10 }}>{arrow(chg)}{fmt(Math.abs(chg),1)}pp</span>
                  </div>
                </div>
                <div style={{ background:"#222",borderRadius:2,height:6,marginBottom:3 }}>
                  <div style={{ width:`${Math.max(0,(row.a/row.max)*100)}%`,height:"100%",background:CA,borderRadius:2,transition:"width 0.6s" }}/>
                </div>
                <div style={{ background:"#222",borderRadius:2,height:6 }}>
                  <div style={{ width:`${Math.max(0,(row.b/row.max)*100)}%`,height:"100%",background:CB,borderRadius:2,transition:"width 0.6s" }}/>
                </div>
              </div>
            );
          })}
        </Panel>

        <Panel subtitle="PRODUCT SEGMENT REVENUE" title="รายได้แยกประเภทสินค้า (¥B)">
          {[
            ["PS/LT (ยางนั่ง/ปิกอัพ)",  dA.pslt.revenue,dB.pslt.revenue,T.pslt],
            ["TB (ยางบรรทุก/โดยสาร)",    dA.tb.revenue,  dB.tb.revenue,  T.tb  ],
            ["Speciality (ยางเฉพาะทาง)", dA.spec.revenue,dB.spec.revenue,T.spec],
          ].map(([label,a,b,tip])=>{
            const maxV=Math.max(a,b,1), cp=pct(a,b);
            return (
              <div key={label} style={{ marginBottom:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, alignItems:"center" }}>
                  <span style={{ color:"#aaa",fontSize:10,display:"flex",alignItems:"center" }}>{label}<Info title={tip.title} text={tip.text}/></span>
                  <span style={{ color:dCol(cp),fontSize:10,fontWeight:700 }}>{arrow(cp)} {cp>=0?"+":""}{fmt(cp)}%</span>
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <span style={{ color:CA,fontSize:10,width:52,textAlign:"right",fontWeight:600 }}>¥{fmt(a)}B</span>
                  <div style={{ flex:1 }}>
                    <div style={{ background:"#222",borderRadius:2,height:7,marginBottom:3 }}>
                      <div style={{ width:`${(a/maxV)*100}%`,height:"100%",background:CA,borderRadius:2,transition:"width 0.6s" }}/>
                    </div>
                    <div style={{ background:"#222",borderRadius:2,height:7 }}>
                      <div style={{ width:`${(b/maxV)*100}%`,height:"100%",background:CB,borderRadius:2,transition:"width 0.6s" }}/>
                    </div>
                  </div>
                  <span style={{ color:CB,fontSize:10,width:52,fontWeight:600 }}>¥{fmt(b)}B</span>
                </div>
              </div>
            );
          })}
        </Panel>
      </div>

      {/* Production + Investment */}
      <div style={{ display:"grid", gridTemplateColumns:g2, gap:14 }}>
        <Panel subtitle="PRODUCTION COMPARISON" title="ปริมาณการผลิตแยกภูมิภาค (ตัน)">
          {[["ญี่ปุ่น",dA.prodJapan,dB.prodJapan],["ทวีปอเมริกา",dA.prodAmericas,dB.prodAmericas],["เอเชีย/แปซิฟิก",dA.prodApic,dB.prodApic],["ยุโรป/EMEA",dA.prodEmea,dB.prodEmea]].map(([label,a,b])=>{
            const maxV=Math.max(a,b,1), cp=pct(a,b);
            return (
              <div key={label} style={{ marginBottom:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                  <span style={{ color:"#aaa",fontSize:10 }}>{label}</span>
                  <span style={{ color:dCol(cp),fontSize:10,fontWeight:700 }}>{arrow(cp)} {cp>=0?"+":""}{fmt(cp)}%</span>
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <span style={{ color:CA,fontSize:9,width:48,textAlign:"right" }}>{Math.round(a/1000)}K</span>
                  <div style={{ flex:1 }}>
                    <div style={{ background:"#222",borderRadius:2,height:6,marginBottom:3 }}><div style={{ width:`${(a/maxV)*100}%`,height:"100%",background:CA,borderRadius:2 }}/></div>
                    <div style={{ background:"#222",borderRadius:2,height:6 }}><div style={{ width:`${(b/maxV)*100}%`,height:"100%",background:CB,borderRadius:2 }}/></div>
                  </div>
                  <span style={{ color:CB,fontSize:9,width:48 }}>{Math.round(b/1000)}K</span>
                </div>
              </div>
            );
          })}
        </Panel>

        <Panel subtitle="INVESTMENT COMPARISON" title="เปรียบเทียบการลงทุน (¥B)">
          {[["ค่าใช้จ่าย R&D",dA.rdex,dB.rdex,T.rdex],["รายจ่ายลงทุน (CAPEX)",dA.capex,dB.capex,T.capex],["ค่าเสื่อมราคาและตัดจำหน่าย",dA.selling,dB.selling,T.selling]].map(([label,a,b,tip])=>{
            const maxV=Math.max(a,b,1), cp=pct(a,b);
            return (
              <div key={label} style={{ marginBottom:18 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6,alignItems:"center" }}>
                  <span style={{ color:"#aaa",fontSize:10,display:"flex",alignItems:"center" }}>{label}<Info title={tip.title} text={tip.text}/></span>
                  <span style={{ color:dCol(cp),fontSize:10,fontWeight:700 }}>{arrow(cp)} {cp>=0?"+":""}{fmt(cp)}%</span>
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <span style={{ color:CA,fontSize:10,width:44,textAlign:"right",fontWeight:600 }}>¥{fmt(a)}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ background:"#222",borderRadius:2,height:7,marginBottom:3 }}><div style={{ width:`${(a/maxV)*100}%`,height:"100%",background:CA,borderRadius:2 }}/></div>
                    <div style={{ background:"#222",borderRadius:2,height:7 }}><div style={{ width:`${(b/maxV)*100}%`,height:"100%",background:CB,borderRadius:2 }}/></div>
                  </div>
                  <span style={{ color:CB,fontSize:10,width:44,fontWeight:600 }}>¥{fmt(b)}</span>
                </div>
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function BridgestoneDashboard() {
  const [year, setYear]   = useState(2024);
  const [cmpA, setCmpA]   = useState(2022);
  const [cmpB, setCmpB]   = useState(2024);
  const [animKey, setKey] = useState(0);
  const isMobile = useIsMobile();

  useEffect(()=>{ setKey(k=>k+1); },[year]);

  const d = DATA[year];
  const compShare  = `share${year}`;
  const maxShare   = Math.max(...COMPETITORS.map(c=>c[compShare]));
  const geoTotal   = d.geoAmericasOku+d.geoJapanOku+d.geoEmeaOku+d.geoApicOku;
  const trendYrMap = { 2020:"63",2021:"64",2022:"65",2023:"66",2024:"67" };
  const g2 = isMobile ? "1fr" : "1fr 1fr";
  const px = isMobile ? "12px" : "28px";

  const TT = ({ active,payload,label }) => {
    if (!active||!payload?.length) return null;
    return (
      <div style={{ background:"#1e1e1e",border:"1px solid #333",padding:"8px 12px",borderRadius:4,fontSize:11 }}>
        <div style={{ color:"#aaa",marginBottom:4 }}>พ.ศ. {label}</div>
        {payload.map((p,i)=><div key={i} style={{ color:p.color }}>{p.name}: ¥{fmt(p.value)}B</div>)}
      </div>
    );
  };

  return (
    <GlobalTooltipProvider>
      <div style={{ background:"#0d0d0d",minHeight:"100vh",color:"#fff",fontFamily:"'Roboto','Segoe UI',sans-serif",fontSize:12 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
          *{box-sizing:border-box;margin:0;padding:0;}
          @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
          .anim{animation:fadeUp 0.35s ease forwards}
          ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#e8192c;border-radius:3px}
        `}</style>

        {/* HEADER */}
        <div style={{ background:"#111",borderBottom:"1px solid #222",padding:`12px ${px}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ background:CA,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:3 }}>
              <span style={{ color:"#fff",fontWeight:900,fontSize:16,fontFamily:"'Oswald',sans-serif" }}>B</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:isMobile?15:18,letterSpacing:3 }}>BRIDGESTONE</div>
              <div style={{ color:"#666",fontSize:10 }}>แดชบอร์ดข้อมูลองค์กร ประจำปี {year}</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:5,alignItems:"center",flexWrap:"wrap" }}>
            <span style={{ color:"#555",fontSize:10,marginRight:4 }}>เลือกปี</span>
            {YEARS.map(y=>(
              <button key={y} onClick={()=>setYear(y)} style={{
                padding:"5px 10px",borderRadius:3,border:"1px solid",
                borderColor:year===y?CA:"#333",
                background:year===y?CA:"transparent",
                color:year===y?"#fff":"#aaa",
                cursor:"pointer",fontSize:11,fontWeight:year===y?700:400,
                fontFamily:"'Oswald',sans-serif",transition:"all 0.2s",
              }}>{y}</button>
            ))}
          </div>
        </div>

        <div style={{ padding:`18px ${px}` }} key={animKey} className="anim">

          {/* KPI ROW */}
          <div style={{
            background:"#111",border:"1px solid #222",borderRadius:6,
            padding:isMobile?"14px 12px":"20px 32px",
            display:"flex",gap:12,marginBottom:16,justifyContent:"space-around",
            flexWrap:isMobile?"wrap":"nowrap",
          }}>
            {[
              [fmt(d.revenue),"","พันล้านเยน","รายได้รวม",T.revenue],
              [fmt(d.opProfit),"","พันล้านเยน","กำไร OP",T.opProfit],
              [fmt(d.opMargin,1),"%","","OP Margin",T.opMargin],
              [fmtBig(d.employees),"","คน","พนักงานทั่วโลก",T.employees],
              [d.countries,"","ประเทศ","ตลาดที่ดำเนินการ",T.countries],
            ].map(([val,unit,sub,label,tip],i,arr)=>(
              <div key={label} style={{ display:"flex",flex:isMobile?"1 0 40%":"1",alignItems:"center" }}>
                <div style={{ textAlign:"center",flex:1 }}>
                  <div style={{ color:CA,fontSize:isMobile?24:34,fontWeight:900,fontFamily:"'Oswald',sans-serif",lineHeight:1 }}>
                    {val}<span style={{ fontSize:isMobile?14:20 }}>{unit}</span>
                  </div>
                  <div style={{ color:"#aaa",fontSize:10,marginTop:6 }}>{sub}</div>
                  <div style={{ color:"#666",fontSize:9,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    {label}<Info title={tip.title} text={tip.text}/>
                  </div>
                </div>
                {!isMobile && i<arr.length-1 && <div style={{ width:1,height:50,background:"#222",flexShrink:0 }}/>}
              </div>
            ))}
          </div>

          {/* TREND + ROE */}
          <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 360px",gap:14,marginBottom:14 }}>
            <Panel subtitle="REVENUE & PROFIT TREND 2014–2024" title="แนวโน้มรายได้และกำไร (2557–2567)">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={TREND} margin={{ left:-10,right:10,top:10,bottom:0 }}>
                  <CartesianGrid stroke="#1e1e1e" strokeDasharray="3 3"/>
                  <XAxis dataKey="y" tick={{ fill:"#555",fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`พ.ศ.${v}`}/>
                  <YAxis tick={{ fill:"#555",fontSize:10 }} axisLine={false} tickLine={false} width={45}/>
                  <Tooltip content={<TT/>}/>
                  <Line dataKey="rev" name="รายได้รวม" stroke={CA} strokeWidth={2}
                    dot={p=>p.payload.y===trendYrMap[year]
                      ?<circle cx={p.cx} cy={p.cy} r={5} fill={CA} stroke="#fff" strokeWidth={2}/>
                      :<circle cx={p.cx} cy={p.cy} r={2.5} fill={CA}/>}/>
                  <Line dataKey="op" name="กำไร OP" stroke={CA} strokeWidth={1.5} strokeDasharray="5 3"
                    dot={p=>p.payload.y===trendYrMap[year]
                      ?<circle cx={p.cx} cy={p.cy} r={5} fill="#fff" stroke={CA} strokeWidth={2}/>
                      :<circle cx={p.cx} cy={p.cy} r={2} fill={CA}/>}/>
                </LineChart>
              </ResponsiveContainer>
            </Panel>

            <Panel subtitle="RETURN ON EQUITY (ROE)"
              title={<>ผลตอบแทนต่อส่วนของผู้ถือหุ้น<Info title={T.roe.title} text={T.roe.text}/></>}>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
                {ROE_HISTORY.map(r=>(
                  <div key={r.yr} style={{ background:r.ce===year?"#1e1e1e":"#111",border:`1px solid ${r.ce===year?CA:"#222"}`,borderRadius:4,padding:"8px",textAlign:"center" }}>
                    <div style={{ color:"#555",fontSize:9 }}>{r.yr}</div>
                    <div style={{ color:r.val<0?CA:"#4caf50",fontSize:18,fontWeight:700,fontFamily:"'Oswald',sans-serif" }}>{r.val}%</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"center",marginTop:14,background:"#1a1a1a",borderRadius:4,padding:"10px" }}>
                <div style={{ color:"#555",fontSize:10 }}>ROE ปี {year+543}</div>
                <div style={{ color:d.roe<0?CA:"#fff",fontSize:28,fontWeight:700,fontFamily:"'Oswald',sans-serif" }}>{d.roe}%</div>
              </div>
            </Panel>
          </div>

          {/* GEO + MARKET SHARE */}
          <div style={{ display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:14 }}>
            <Panel subtitle={`REVENUE BY GEOGRAPHIC SEGMENT ${year}`} title="รายได้แยกตามภูมิภาค">
              <div style={{ display:"flex",alignItems:"center",gap:20,flexWrap:isMobile?"wrap":"nowrap" }}>
                <svg viewBox="0 0 130 130" width={130} height={130} style={{ flexShrink:0 }}>
                  {(()=>{
                    const vals=[d.geoAmericasOku,d.geoJapanOku,d.geoEmeaOku,d.geoApicOku];
                    const tot=vals.reduce((a,b)=>a+b,0);
                    const cols=["#e8192c","#ff4d60","#cc1425","#990e1c"];
                    let cum=-Math.PI/2;
                    return vals.map((v,i)=>{
                      const ang=(v/tot)*2*Math.PI;
                      const x1=65+55*Math.cos(cum),y1=65+55*Math.sin(cum);
                      const x2=65+55*Math.cos(cum+ang),y2=65+55*Math.sin(cum+ang);
                      const xi1=65+35*Math.cos(cum),yi1=65+35*Math.sin(cum);
                      const xi2=65+35*Math.cos(cum+ang),yi2=65+35*Math.sin(cum+ang);
                      const lg=ang>Math.PI?1:0;
                      const dd=`M${x1} ${y1}A55 55 0 ${lg} 1 ${x2} ${y2}L${xi2} ${yi2}A35 35 0 ${lg} 0 ${xi1} ${yi1}Z`;
                      cum+=ang;
                      return <path key={i} d={dd} fill={cols[i]} stroke="#0d0d0d" strokeWidth={2}/>;
                    });
                  })()}
                  <text x={65} y={60} textAnchor="middle" fill="#aaa" fontSize={8}>¥{fmt(geoTotal/100,0)}B</text>
                  <text x={65} y={73} textAnchor="middle" fill="#aaa" fontSize={7}>Billion JPY</text>
                </svg>
                <div style={{ flex:1,minWidth:160 }}>
                  {[
                    ["ทวีปอเมริกา",d.geoAmericasOku,"#e8192c",T.geoAmericas],
                    ["ญี่ปุ่น",d.geoJapanOku,"#ff4d60",T.geoJapan],
                    ["ยุโรป/ตะวันออกกลาง/แอฟริกา",d.geoEmeaOku,"#cc1425",T.geoEmea],
                    ["เอเชีย/แปซิฟิก/อินเดีย/จีน",d.geoApicOku,"#990e1c",T.geoApic],
                  ].map(([lbl,val,col,tip])=>(
                    <div key={lbl} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                      <span style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }}/>
                      <span style={{ color:"#aaa",fontSize:10,flex:1 }}>{lbl}</span>
                      <Info title={tip.title} text={tip.text}/>
                      <span style={{ color:"#fff",fontSize:10,fontWeight:600 }}>¥{fmtBig(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel subtitle={`GLOBAL TIRE MARKET SHARE (${year})`}
              title={<>ส่วนแบ่งตลาดยางรถยนต์โลก<Info title={T.marketShare.title} text={T.marketShare.text}/></>}>
              {COMPETITORS.map((c,i)=>{
                const share=c[compShare], isBs=c.name==="Bridgestone";
                return (
                  <div key={c.name} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:7 }}>
                    <span style={{ color:"#555",fontSize:10,width:14,textAlign:"right" }}>{String(i+1).padStart(2,"0")}</span>
                    <span style={{ color:isBs?CA:"#aaa",fontSize:11,width:85,fontWeight:isBs?700:400 }}>{c.name}</span>
                    <div style={{ flex:1,background:"#222",borderRadius:2,height:6 }}>
                      <div style={{ width:`${(share/maxShare)*100}%`,height:"100%",background:isBs?CA:"#444",borderRadius:2,transition:"width 0.5s" }}/>
                    </div>
                    <span style={{ color:isBs?CA:"#aaa",fontSize:10,width:32,textAlign:"right",fontWeight:isBs?700:400 }}>{share}%</span>
                  </div>
                );
              })}
            </Panel>
          </div>

          {/* PRODUCT + PRODUCTION */}
          <div style={{ display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:14 }}>
            <Panel subtitle={`OPERATING RESULTS BY PRODUCT (${year})`} title="ผลการดำเนินงานแยกตามประเภทสินค้า">
              <div style={{ overflowX:"auto" }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 80px 80px 60px 50px",gap:6,marginBottom:10,minWidth:380 }}>
                  {["ประเภทสินค้า","รายได้ (¥B)","กำไร OP (¥B)","MARGIN","YOY"].map((h,i)=>(
                    <span key={i} style={{ color:"#555",fontSize:9,textAlign:i>0?"right":"left" }}>{h}</span>
                  ))}
                </div>
                {[["ยางรถยนต์นั่ง/รถปิกอัพ (PS/LT)",d.pslt,T.pslt],["ยางรถบรรทุก/รถโดยสาร (TB)",d.tb,T.tb],["ยางเฉพาะทาง (OR/AC/AG/MC)",d.spec,T.spec]].map(([name,seg,tip])=>(
                  <div key={name} style={{ display:"grid",gridTemplateColumns:"1fr 80px 80px 60px 50px",gap:6,padding:"7px 0",borderTop:"1px solid #1e1e1e",minWidth:380 }}>
                    <span style={{ color:"#ccc",fontSize:10,display:"flex",alignItems:"center" }}>{name}<Info title={tip.title} text={tip.text}/></span>
                    <span style={{ color:"#fff",fontSize:11,fontWeight:600,textAlign:"right" }}>{fmt(seg.revenue)}</span>
                    <span style={{ color:"#fff",fontSize:11,fontWeight:600,textAlign:"right" }}>{fmt(seg.op)}</span>
                    <span style={{ color:"#fff",fontSize:11,textAlign:"right" }}>{seg.margin}%</span>
                    <span style={{ color:seg.yoy>=0?"#4caf50":CA,fontSize:10,textAlign:"right",fontWeight:700 }}>{seg.yoy>=0?"+":""}{seg.yoy}%</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel subtitle={`GLOBAL TIRE PRODUCTION ${year}`}
              title={<>ปริมาณการผลิตยางทั่วโลก<Info title={T.production.title} text={T.production.text}/></>}>
              <div style={{ marginBottom:16 }}>
                <span style={{ color:CA,fontSize:22,fontWeight:900,fontFamily:"'Oswald',sans-serif" }}>{fmtBig(d.production)}</span>
                <span style={{ color:"#fff",fontSize:14,marginLeft:6 }}>ตัน</span>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                {[["ญี่ปุ่น",d.prodJapan],["ทวีปอเมริกา",d.prodAmericas],["เอเชีย/แปซิฟิก/อินเดีย/จีน",d.prodApic],["ยุโรป/ตะวันออกกลาง/แอฟริกา",d.prodEmea]].map(([lbl,val])=>(
                  <div key={lbl} style={{ background:"#111",border:"1px solid #222",borderRadius:4,padding:"12px 14px" }}>
                    <div style={{ color:"#666",fontSize:9,marginBottom:6 }}>{lbl}</div>
                    <div style={{ color:"#fff",fontSize:20,fontWeight:700,fontFamily:"'Oswald',sans-serif" }}>{Math.round(val/1000)}K <span style={{ fontSize:12,color:"#aaa" }}>ตัน</span></div>
                    <div style={{ height:3,background:"#222",borderRadius:2,marginTop:8 }}>
                      <div style={{ width:`${(val/d.prodAmericas)*100}%`,height:"100%",background:CA,borderRadius:2 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* R&D + FACILITIES */}
          <div style={{ display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:14 }}>
            <Panel subtitle={`R&D & CAPITAL INVESTMENT ${year}`} title="การลงทุนด้านวิจัยและพัฒนา">
              {[["ค่าใช้จ่าย R&D",d.rdex,130,"#888",T.rdex],["รายจ่ายลงทุน (CAPEX)",d.capex,420,CA,T.capex],["ค่าเสื่อมราคาและตัดจำหน่าย",d.selling,380,"#555",T.selling]].map(([lbl,val,max,col,tip])=>(
                <div key={lbl} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center" }}>
                    <span style={{ color:"#aaa",fontSize:11,display:"flex",alignItems:"center" }}>{lbl}<Info title={tip.title} text={tip.text}/></span>
                    <span style={{ color:"#fff",fontSize:11,fontWeight:600 }}>¥{fmt(val)}B</span>
                  </div>
                  <div style={{ background:"#222",height:4,borderRadius:2 }}>
                    <div style={{ width:`${(val/max)*100}%`,height:"100%",background:col,borderRadius:2,transition:"width 0.5s" }}/>
                  </div>
                </div>
              ))}
            </Panel>

            <Panel subtitle={`GLOBAL FACILITIES (ณ ธันวาคม ${year+543})`} title="โครงสร้างพื้นฐานการผลิตทั่วโลก">
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14 }}>
                {[
                  [d.factories,"โรงงานทั้งหมด",T.factories],
                  [d.tireFactories,"โรงงานผลิตยาง",T.tireFact],
                  [d.matFactories,"โรงงานวัตถุดิบ",T.matFact],
                  [d.rdCenters,"ศูนย์วิจัย R&D",T.rdCenters],
                ].map(([val,lbl,tip])=>(
                  <div key={lbl} style={{ background:"#111",border:"1px solid #222",borderRadius:4,padding:"10px 8px",textAlign:"center" }}>
                    <div style={{ color:CA,fontSize:26,fontWeight:700,fontFamily:"'Oswald',sans-serif" }}>{val}</div>
                    <div style={{ color:"#666",fontSize:9,marginTop:4,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      {lbl}<Info title={tip.title} text={tip.text}/>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* FINANCIAL + MILESTONES */}
          <div style={{ display:"grid",gridTemplateColumns:g2,gap:14,marginBottom:28 }}>
            <Panel subtitle={`FINANCIAL POSITION ${year}`} title="ฐานะการเงิน">
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                {[
                  ["สินทรัพย์รวม",`${fmt(d.totalAssets)} ¥B`,T.totalAssets],
                  ["ส่วนของผู้ถือหุ้นรวม",`${fmt(d.totalEquity)} ¥B`,T.totalEquity],
                  ["กำไรสุทธิ",`${fmt(d.netIncome)} ¥B`,T.netIncome],
                  [`ROE ปี ${year+543}`,`${d.roe} %`,T.roe],
                ].map(([lbl,val,tip])=>(
                  <div key={lbl} style={{ background:"#111",border:"1px solid #222",borderRadius:4,padding:"12px 14px" }}>
                    <div style={{ color:"#555",fontSize:9,marginBottom:6,display:"flex",alignItems:"center" }}>{lbl}<Info title={tip.title} text={tip.text}/></div>
                    <div style={{ color:"#fff",fontSize:18,fontWeight:700,fontFamily:"'Oswald',sans-serif" }}>{val}</div>
                    <div style={{ height:2,background:CA,marginTop:8,width:"60%",borderRadius:1 }}/>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel subtitle="COMPANY MILESTONES" title="เหตุการณ์สำคัญของบริษัท">
              {[
                ["2474","ก่อตั้งโดย ชิจิโร อิชิบาชิ ที่เมืองคุรุเมะ จังหวัดฟุกุโอกะ ประเทศญี่ปุ่น"],
                ["2503","ขยายธุรกิจสู่ยางอากาศยาน — เปิดโรงงาน Tokyo AC Tire Plant"],
                ["2511","เปิดโรงงานอิโกเนะ — ปัจจุบันเป็นโรงงานในประเทศที่ใหญ่สุด (1,421 คน)"],
                ["2530","เข้าซื้อกิจการ Firestone กลายเป็นผู้ผลิตยางชั้นนำระดับโลก"],
                ["2567","รายได้แตะ ¥4,430.1 พันล้านเยน — ส่วนแบ่งตลาด 13.6% อันดับ 2 ของโลก"],
                ["2568","AirFree (ยางไม่ต้องสูบลม) และ Soft-Robotics เข้าสู่พอร์ตธุรกิจสำรวจ"],
              ].map(([yr,text])=>(
                <div key={yr} style={{ display:"flex",gap:14,padding:"6px 0",borderBottom:"1px solid #1a1a1a" }}>
                  <span style={{ color:CA,fontSize:11,fontWeight:700,fontFamily:"'Oswald',sans-serif",width:32,flexShrink:0 }}>{yr}</span>
                  <span style={{ color:"#aaa",fontSize:10,lineHeight:1.5 }}>{text}</span>
                </div>
              ))}
            </Panel>
          </div>

          {/* COMPARISON PICKER */}
          <div style={{ background:"#111",border:"1px solid #2a2a2a",borderRadius:6,padding:"16px 20px",marginBottom:16 }}>
            <div style={{ color:"#555",fontSize:9,letterSpacing:2,fontFamily:"monospace",marginBottom:10 }}>YEAR-OVER-YEAR COMPARISON — เลือกสองปีเพื่อเปรียบเทียบ</div>
            <div style={{ display:"flex",alignItems:"center",gap:12,flexWrap:"wrap" }}>
              <div style={{ display:"flex",gap:5,alignItems:"center",flexWrap:"wrap" }}>
                <span style={{ background:CA,color:"#fff",fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:11,padding:"3px 10px",borderRadius:3,minWidth:42,textAlign:"center" }}>ปีที่ 1</span>
                {YEARS.map(y=><YearBtn key={y} y={y} active={cmpA===y} color={CA} onClick={()=>setCmpA(y)}/>)}
              </div>
              <span style={{ color:"#333",fontSize:22,fontWeight:300 }}>vs</span>
              <div style={{ display:"flex",gap:5,alignItems:"center",flexWrap:"wrap" }}>
                <span style={{ background:CB,color:"#111",fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:11,padding:"3px 10px",borderRadius:3,minWidth:42,textAlign:"center" }}>ปีที่ 2</span>
                {YEARS.map(y=><YearBtn key={y} y={y} active={cmpB===y} color={CB} onClick={()=>setCmpB(y)}/>)}
              </div>
            </div>
          </div>

          <CompareSection yearA={cmpA} yearB={cmpB} isMobile={isMobile}/>

        </div>
      </div>
    </GlobalTooltipProvider>
  );
}
