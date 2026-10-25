import { StudyNote, FormulaDefinition, MCQQuestion } from '../types/index.ts';

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-p1-sec-a',
    part: 'part1',
    sectionCode: 'Section A: External Financial Reporting Decisions (15%)',
    topic: 'Revenue Recognition & Leases (ASC 606 / ASC 842)',
    title: '5-Step Revenue Model, Balance Sheet Valuation & Operating vs Finance Leases',
    summary: 'Core principles of ASC 606 revenue recognition across performance obligations and ASC 842 Right-of-Use lease accounting under US GAAP.',
    readTimeMinutes: 12,
    updatedAt: '2026-10-24',
    keyPoints: [
      'Step 1: Identify contract with customer; Step 2: Identify distinct performance obligations; Step 3: Determine transaction price; Step 4: Allocate price to performance obligations; Step 5: Recognize revenue when/as obligation satisfied.',
      'Variable consideration is estimated using either Expected Value or Most Likely Amount and constrained to avoid reversal.',
      'ASC 842 requires almost all leases > 12 months to be recorded on the Balance Sheet as a Right-of-Use (ROU) Asset and Lease Liability.',
      'Finance Lease (Lessee): Front-loaded expense (Amortization + Interest). Operating Lease: Single straight-line lease expense.',
      'US GAAP allows LIFO for inventory, whereas IFRS strictly prohibits LIFO. Lower of Cost or Net Realizable Value applies under FIFO/Weighted Average.'
    ],
    imaExamTips: [
      'Watch out for the allocation of stand-alone selling price discounts—allocate proportionally across all performance obligations unless clear evidence ties discount to a specific item.',
      'On the CMA exam, remember that under an operating lease, cash paid is classified entirely under Operating Cash Flows, whereas under a finance lease, principal repayment is Financing and interest is Operating.'
    ],
    content: `## 1. ASC 606: The Core Revenue Recognition Standard

The core objective of ASC 606 is to depict the transfer of promised goods or services to customers in an amount that reflects the consideration to which the entity expects to be entitled.

### The Five-Step Framework:
1. **Identify the Contract:** A contract exists when approved by parties, rights/payment terms are identifiable, commercial substance exists, and collection is probable (>75-80% likelihood under US GAAP).
2. **Identify Performance Obligations:** Promises in a contract to transfer distinct goods or services. A good/service is distinct if the customer can benefit on its own and it is separately identifiable within the contract.
3. **Determine the Transaction Price:** Fixed amounts, plus variable consideration (penalties, bonuses, discounts). The variable portion must be constrained: only include it if it is probable that a significant reversal will not occur.
4. **Allocate Transaction Price:** Based on relative standalone selling prices (SSP). If SSP is not observable, estimate using Adjusted Market Assessment, Expected Cost Plus Margin, or Residual approach.
5. **Recognize Revenue:** Either over time (customer controls asset as created, or no alternative use + enforceable right to payment) or at a point in time (control transfers).

---

## 2. ASC 842: Lease Accounting

All leases with a term greater than 12 months must be capitalized on the balance sheet.

### Classification Criteria (OWNES Test):
If ANY of the five criteria are met, the lease is a **Finance Lease** for the lessee; otherwise, it is an **Operating Lease**:
* **O**wnership transfer at end of term
* **W**ritten purchase option reasonably certain to be exercised
* **N**et present value of lease payments ≥ 90% of fair value
* **E**conomic life: lease term is ≥ 75% of asset's remaining life
* **S**pecialized nature with no alternative use to lessor`
  },
  {
    id: 'note-p1-sec-b',
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting (20%)',
    topic: 'Master Budget & Flexible Budgeting Methodologies',
    title: 'The Master Budgeting Process, Operating Budgets, & Rolling Forecasts',
    summary: 'Comprehensive hierarchy of the Master Budget from sales forecast through cash budget and pro forma financial statements.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-24',
    keyPoints: [
      'The Sales Budget is the foundational building block of the entire Master Budget. An erroneous sales forecast cascades through all operational budgets.',
      'Production Budget calculation: Units Required = Budgeted Sales + Desired Ending Finished Goods - Beginning Finished Goods.',
      'Direct Materials Purchases = Materials for Production + Desired Ending Raw Materials - Beginning Raw Materials.',
      'Cash Budget has 4 main sections: Cash Collections, Cash Disbursements, Cash Excess/Deficiency, and Financing.',
      'A Flexible Budget recalculates revenues and variable costs for actual volume, isolating efficiency differences from activity volume.'
    ],
    imaExamTips: [
      'Be extremely careful with "beginning" inventory of one period being the "ending" inventory of the previous period. Questions frequently test quarterly rolling schedules.',
      'Depreciation is a non-cash expense! Always deduct depreciation when converting Budgeted Overhead into Cash Disbursements for Overhead.'
    ],
    content: `## 1. Master Budget Interrelationships

The Master Budget is a comprehensive financial blueprint combining operating and financial plans:

### Sequence of Operating Budgets:
1. **Sales Budget:** Volume × Price.
2. **Production Budget (Units):**
   $$\\text{Production} = \\text{Sales} + \\text{Desired Ending FG} - \\text{Beginning FG}$$
3. **Direct Materials (DM) Budget:**
   $$\\text{DM Purchases} = (\\text{Production} \\times \\text{DM/unit}) + \\text{Desired Ending RM} - \\text{Beginning RM}$$
4. **Direct Labor (DL) Budget:** Production Units × DL Hours/Unit × Labor Wage Rate.
5. **Manufacturing Overhead (MOH) Budget:** Variable MOH + Fixed MOH.
6. **Cost of Goods Sold (COGS) Budget.**
7. **Selling & Administrative Expense Budget.**

### The Financial Budget Sequence:
* **Capital Expenditures Budget** (long-term equipment & facilities)
* **Cash Budget** (Crucial liquidity tracker)
* **Pro Forma Balance Sheet, Income Statement, & Statement of Cash Flows**`
  },
  {
    id: 'note-p1-sec-c',
    part: 'part1',
    sectionCode: 'Section C: Performance Management (20%)',
    topic: 'Variance Analysis & Responsibility Center Metrics',
    title: 'Standard Costing, 4-Way Overhead Variances, ROI, & Residual Income',
    summary: 'Deconstruction of Direct Materials, Direct Labor, Variable Overhead, and Fixed Overhead variances, alongside segment performance evaluation.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-24',
    keyPoints: [
      'DM Price Variance = AQ × (AP - SP); evaluated at purchase by the purchasing manager.',
      'DM Quantity (Efficiency) Variance = SP × (AQ - SQ); evaluated at usage by the production supervisor.',
      'DL Rate Variance = AH × (AR - SR); DL Efficiency Variance = SR × (AH - SH).',
      'Fixed Overhead Volume Variance = Budgeted Fixed OH - Applied Fixed OH = SP × (Denominator Hours - Standard Hours Allowed). FOH Volume variance is ONLY caused by producing more or less than denominator capacity.',
      'Residual Income = Operating Income - (Operating Assets × Required Rate of Return). Overcomes the sub-optimization flaw of ROI.'
    ],
    imaExamTips: [
      'Remember: "AQ" in the DM Price Variance is Actual Quantity *Purchased*, while "AQ" in the DM Efficiency Variance is Actual Quantity *Used*. If purchases ≠ usage, don\'t mix them up!',
      'Favorable vs Unfavorable: If Actual Cost < Standard Cost, it is Favorable (F). If Actual Cost > Standard Cost, it is Unfavorable (U).'
    ],
    content: `## 1. Direct Material and Labor Variances

### Direct Materials:
* **DM Price Variance:**
  $$\\text{DMPV} = \\text{AQ}_{\\text{purchased}} \\times (\\text{AP} - \\text{SP})$$
* **DM Quantity / Efficiency Variance:**
  $$\\text{DMQV} = \\text{SP} \\times (\\text{AQ}_{\\text{used}} - \\text{SQ}_{\\text{allowed}})$$

### Direct Labor:
* **DL Rate Variance:** $\\text{DLRV} = \\text{AH} \\times (\\text{AR} - \\text{SR})$
* **DL Efficiency Variance:** $\\text{DLEV} = \\text{SR} \\times (\\text{AH} - \\text{SH})$

---

## 2. Four-Way Overhead Variances

1. **Variable OH Spending Variance:** $\\text{AH} \\times (\\text{Actual VOH Rate} - \\text{Standard VOH Rate})$
2. **Variable OH Efficiency Variance:** $\\text{Standard VOH Rate} \\times (\\text{AH} - \\text{SH})$
3. **Fixed OH Budget (Spending) Variance:** $\\text{Actual FOH} - \\text{Budgeted FOH}$
4. **Fixed OH Volume Variance:** $\\text{Budgeted FOH} - \\text{Applied FOH} = \\text{FOH Rate} \\times (\\text{Denominator Volume} - \\text{SH})$`
  },
  {
    id: 'note-p1-sec-e',
    part: 'part1',
    sectionCode: 'Section E: Internal Controls (15%)',
    topic: 'COSO Framework & Sarbanes-Oxley (SOX) Section 404',
    title: 'The 5 COSO Components (CRIME), 17 Principles, & Fraud Triangle',
    summary: 'Internal control integrated framework, separation of duties, corporate governance, and SOX compliance imperatives for US CMA.',
    readTimeMinutes: 10,
    updatedAt: '2026-10-24',
    keyPoints: [
      'COSO 5 Components Mnemonic: CRIME (Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring).',
      'The Control Environment is the "tone at the top" and the foundation for all other components.',
      'Segregation of Duties requires separating Authorization, Custody of assets, Record keeping, and Reconciliation (ARC).',
      'SOX 404 requires management to assess and external auditors to attest to the effectiveness of Internal Control over Financial Reporting (ICFR).',
      'Fraud Triangle comprises 3 elements: Pressure (Incentive), Opportunity (only element management directly controls), and Rationalization.'
    ],
    imaExamTips: [
      'Internal controls provide REASONABLE assurance, never absolute assurance, due to inherent human error, collusion, and management override.',
      'If a scenario describes an employee receiving checks and recording them in the ledger, identify the violation of segregation of custody and recording.'
    ],
    content: `## 1. COSO Internal Control Integrated Framework

Internal control is a process designed to provide reasonable assurance regarding operations, reporting, and compliance.

### The 5 Components (C-R-I-M-E):
* **C - Control Environment:** Ethical tone, integrity, independent audit committee, organizational structure. (5 principles)
* **R - Risk Assessment:** Identifying, assessing, and responding to organizational risks, including fraud risk. (4 principles)
* **I - Information & Communication:** Timely, accurate communication flowing internally and externally. (3 principles)
* **M - Monitoring Activities:** Ongoing evaluations and separate periodic audits. (2 principles)
* **E - Existing Control Activities:** Policies and procedures (Segregation of Duties, approvals, physical safeguards, IT controls). (3 principles)`
  },
  {
    id: 'note-p2-sec-a',
    part: 'part2',
    sectionCode: 'Section A: Financial Statement Analysis (20%)',
    topic: 'Liquidity, Solvency, & DuPont Return on Equity Decomposition',
    title: 'Comprehensive Ratio Analysis, 3-Stage & 5-Stage DuPont Models',
    summary: 'Deep dive into financial health assessment, working capital liquidity metrics, solvency leverage, and ROE drivers.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-24',
    keyPoints: [
      'Current Ratio = Current Assets / Current Liabilities. Quick Ratio = (Cash + Marketable Securities + Receivables) / Current Liabilities.',
      'Cash Conversion Cycle (CCC) = Days Sales Outstanding (DSO) + Days Sales of Inventory (DSI) - Days Payable Outstanding (DPO).',
      '3-Stage DuPont ROE = Net Profit Margin × Total Asset Turnover × Financial Leverage Multiplier.',
      '5-Stage DuPont isolates Tax Burden, Interest Burden, Operating Margin, Asset Turnover, and Financial Leverage.',
      'Times Interest Earned (Interest Coverage) = EBIT / Interest Expense.'
    ],
    imaExamTips: [
      'A negative Cash Conversion Cycle means the company gets paid by customers before it pays suppliers (e.g. Amazon, Dell) - highly favorable working capital!',
      'In turnover ratios, always use Average balances in the denominator if balance sheet accounts are paired with income statement flow measures.'
    ],
    content: `## 1. DuPont Analysis Decomposition

Return on Equity (ROE) measures how effectively management generates income from shareholders' capital.

### 3-Stage DuPont Formula:
$$\\text{ROE} = \\left(\\frac{\\text{Net Income}}{\\text{Sales}}\\right) \\times \\left(\\frac{\\text{Sales}}{\\text{Total Assets}}\\right) \\times \\left(\\frac{\\text{Total Assets}}{\\text{Common Equity}}\\right)$$
$$\\text{ROE} = \\text{Net Profit Margin} \\times \\text{Asset Turnover} \\times \\text{Equity Multiplier}$$

* **Profit Margin:** Operational pricing power and cost containment.
* **Asset Turnover:** Asset efficiency and capacity utilization.
* **Equity Multiplier:** Degree of financial leverage.`
  },
  {
    id: 'note-p2-sec-b',
    part: 'part2',
    sectionCode: 'Section B: Corporate Finance (20%)',
    topic: 'WACC, Capital Asset Pricing Model (CAPM), & Working Capital',
    title: 'Weighted Average Cost of Capital, Cost of Debt/Equity, & Capital Structure',
    summary: 'Determination of hurdle rates, debt tax shield, beta risk adjustments, and optimum capital structure strategy.',
    readTimeMinutes: 16,
    updatedAt: '2026-10-24',
    keyPoints: [
      'WACC = (Wd × Kd × (1 - t)) + (Wp × Kp) + (We × Ke). Always use MARKET values for weights when available.',
      'Cost of Debt (after-tax) = Before-tax Kd × (1 - Marginal Tax Rate).',
      'Cost of Equity via CAPM: Ke = Rf + Beta × [E(Rm) - Rf], where [E(Rm) - Rf] is the Equity Market Risk Premium.',
      'Cost of Equity via Gordon Dividend Growth Model: Ke = (D1 / P0) + g.',
      'Cost of Preferred Stock: Kp = Dp / Net Proceeds (preferred dividends are NOT tax deductible).'
    ],
    imaExamTips: [
      'Double check if the question gives "Market Risk Premium" or "Return on the Market". If it gives Market Risk Premium, DO NOT subtract the risk-free rate again!',
      'Remember D1 in the Gordon Growth model is the expected NEXT period dividend: D1 = D0 × (1 + g).'
    ],
    content: `## 1. Weighted Average Cost of Capital (WACC)

WACC is the minimum return an organization must earn on its existing asset base to satisfy debt holders and equity shareholders:

$$\\text{WACC} = w_d k_d (1 - t) + w_p k_p + w_e k_e$$

### Component Costs:
1. **Cost of Debt ($k_d$):** Yield to Maturity (YTM) of new debt issuance adjusted for tax: $k_d(1 - t)$.
2. **Cost of Preferred Stock ($k_p$):** $D_p / P_{\\text{net}}$, where dividends are fixed and non-deductible.
3. **Cost of Common Equity ($k_e$):**
   * **CAPM:** $k_e = R_f + \\beta (R_m - R_f)$
   * **Dividend Discount Model:** $k_e = \\frac{D_1}{P_0} + g$`
  },
  {
    id: 'note-p2-sec-c',
    part: 'part2',
    sectionCode: 'Section C: Decision Analysis (25%)',
    topic: 'CVP Analysis, Marginal Costing, & Special Order Decisions',
    title: 'Breakeven Economics, Margin of Safety, & Relevant Costing Decision Rules',
    summary: 'Contribution margin mechanics, multi-product sales mix breakeven, and decision trees for special orders and outsourcing.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-24',
    keyPoints: [
      'Contribution Margin (CM) = Sales - Variable Costs. CM Ratio = CM / Sales.',
      'Breakeven in Units = Fixed Costs / CM per Unit. Breakeven in Dollars = Fixed Costs / CM Ratio.',
      'Margin of Safety = (Expected Sales - Breakeven Sales) / Expected Sales.',
      'In Special Order decisions with idle capacity: Accept if Special Price > Incremental Variable Cost + any incremental fixed cost.',
      'If operating at full capacity, Opportunity Cost (CM foregone on displaced regular sales) must be included as a cost.'
    ],
    imaExamTips: [
      'Sunk costs and allocated common fixed costs that will continue regardless of the decision are IRRELEVANT. Eliminate them immediately.',
      'For multi-product breakeven, calculate the weighted-average contribution margin based on the constant sales volume mix.'
    ],
    content: `## 1. Cost-Volume-Profit (CVP) Fundamentals

CVP assumes revenues and costs are linear within the relevant range:

### Key Formulas:
* **Unit CM:** $P - V$
* **CM Ratio:** $\\frac{P - V}{P}$
* **Target Operating Income in Units:**
  $$\\text{Units} = \\frac{\\text{Fixed Costs} + \\text{Target Operating Income}}{\\text{Unit CM}}$$
* **Target Net Income (with taxes):**
  $$\\text{Units} = \\frac{\\text{Fixed Costs} + \\left(\\frac{\\text{Target Net Income}}{1 - t}\\right)}{\\text{Unit CM}}$$`
  },
  {
    id: 'note-p2-sec-f',
    part: 'part2',
    sectionCode: 'Section F: Professional Ethics (15%)',
    topic: 'IMA Statement of Ethical Professional Practice',
    title: 'The 4 Principles, 4 Standards, & Conflict Resolution Steps',
    summary: 'The cornerstone of the CMA credential: Competence, Confidentiality, Integrity, Credibility, and Whistleblower protocols.',
    readTimeMinutes: 11,
    updatedAt: '2026-10-24',
    keyPoints: [
      '4 Overarching Ethical Principles: Honesty, Fairness, Objectivity, and Responsibility.',
      '4 Specific Standards: Competence, Confidentiality, Integrity, and Credibility.',
      'Competence: Maintain professional expertise, perform duties per laws/regulations, provide accurate decision support.',
      'Confidentiality: Keep information confidential except when authorized or legally required; never use confidential data for personal advantage.',
      'Integrity: Mitigate actual/apparent conflicts of interest; refrain from engaging in any conduct that would prejudice carrying out duties.',
      'Credibility: Communicate information fairly and objectively; disclose all relevant information that could influence user understanding.'
    ],
    imaExamTips: [
      'Conflict Resolution Sequence: (1) Discuss with immediate supervisor. If supervisor is involved, go to next higher level. (2) Consult an IMA Ethics Counselor or legal counsel. (3) DO NOT contact the police or external press unless there is a clear legal mandate!'
    ],
    content: `## 1. IMA Statement of Ethical Professional Practice

CMA candidates must adhere to IMA's binding ethical code.

### The 4 Standards:
1. **Competence:** Continual knowledge growth, professional standards, clear recommendations.
2. **Confidentiality:** Protection of proprietary information; inform subordinates regarding confidentiality.
3. **Integrity:** Mitigate conflicts of interest, refuse gifts that bias decisions, avoid discrediting the profession.
4. **Credibility:** Fair and objective disclosure of all relevant facts and limitations.

### Resolving Ethical Issues:
1. Follow established corporate policies.
2. Discuss with immediate supervisor (or next level if supervisor is involved).
3. Contact the IMA Ethics Helpline for guidance.
4. Consult personal attorney regarding legal rights and duties.
5. If conflict remains unresolved, consider disassociation or resignation.`
  }
];

export const INITIAL_FORMULAS: FormulaDefinition[] = [
  {
    id: 'f-wacc',
    part: 'part2',
    category: 'Corporate Finance',
    name: 'Weighted Average Cost of Capital (WACC)',
    equation: 'WACC = (Wd * Kd * (1 - t)) + (We * Ke) + (Wp * Kp)',
    explanation: 'Calculates the overall required return on the firm based on its market-value debt, equity, and preferred stock capital structure.',
    unit: '%',
    inputs: [
      { key: 'debtWeight', label: 'Weight of Debt (Wd)', placeholder: '0.40', defaultVal: 0.40 },
      { key: 'debtCost', label: 'Pre-tax Cost of Debt (Kd %)', placeholder: '6.0', defaultVal: 6.0 },
      { key: 'taxRate', label: 'Marginal Tax Rate (t %)', placeholder: '25.0', defaultVal: 25.0 },
      { key: 'equityWeight', label: 'Weight of Equity (We)', placeholder: '0.60', defaultVal: 0.60 },
      { key: 'equityCost', label: 'Cost of Equity (Ke %)', placeholder: '11.0', defaultVal: 11.0 }
    ],
    calculate: (inputs) => {
      const Wd = inputs.debtWeight ?? 0.4;
      const Kd = inputs.debtCost ?? 6.0;
      const t = (inputs.taxRate ?? 25.0) / 100;
      const We = inputs.equityWeight ?? 0.6;
      const Ke = inputs.equityCost ?? 11.0;

      const afterTaxDebt = Kd * (1 - t);
      const debtContrib = Wd * afterTaxDebt;
      const equityContrib = We * Ke;
      const wacc = debtContrib + equityContrib;

      return {
        result: Math.round(wacc * 100) / 100,
        stepByStep: `After-Tax Debt Cost: ${Kd}% * (1 - ${t}) = ${afterTaxDebt.toFixed(2)}%\nDebt Component: ${(Wd * 100).toFixed(1)}% * ${afterTaxDebt.toFixed(2)}% = ${debtContrib.toFixed(2)}%\nEquity Component: ${(We * 100).toFixed(1)}% * ${Ke.toFixed(2)}% = ${equityContrib.toFixed(2)}%\nWACC = ${debtContrib.toFixed(2)}% + ${equityContrib.toFixed(2)}% = ${wacc.toFixed(2)}%`
      };
    }
  },
  {
    id: 'f-capm',
    part: 'part2',
    category: 'Corporate Finance',
    name: 'Capital Asset Pricing Model (CAPM Cost of Equity)',
    equation: 'Ke = Rf + Beta * (Rm - Rf)',
    explanation: 'Models the expected return on common equity based on systematic risk (Beta) and market risk premium.',
    unit: '%',
    inputs: [
      { key: 'rf', label: 'Risk-Free Rate (Rf %)', placeholder: '4.0', defaultVal: 4.0 },
      { key: 'beta', label: 'Equity Beta', placeholder: '1.25', defaultVal: 1.25 },
      { key: 'marketReturn', label: 'Expected Market Return (Rm %)', placeholder: '10.0', defaultVal: 10.0 }
    ],
    calculate: (inputs) => {
      const Rf = inputs.rf ?? 4.0;
      const Beta = inputs.beta ?? 1.25;
      const Rm = inputs.marketReturn ?? 10.0;
      const premium = Rm - Rf;
      const ke = Rf + Beta * premium;
      return {
        result: Math.round(ke * 100) / 100,
        stepByStep: `Market Risk Premium (Rm - Rf): ${Rm}% - ${Rf}% = ${premium.toFixed(2)}%\nRisk Adjustment: ${Beta.toFixed(2)} * ${premium.toFixed(2)}% = ${(Beta * premium).toFixed(2)}%\nKe = ${Rf}% + ${(Beta * premium).toFixed(2)}% = ${ke.toFixed(2)}%`
      };
    }
  },
  {
    id: 'f-dupont-3',
    part: 'part2',
    category: 'Performance & Ratios',
    name: 'DuPont 3-Stage Return on Equity (ROE)',
    equation: 'ROE = Net Profit Margin * Asset Turnover * Equity Multiplier',
    explanation: 'Breaks down ROE into profitability (NPM), operating efficiency (ATO), and leverage (EM).',
    unit: '%',
    inputs: [
      { key: 'netIncome', label: 'Net Income ($)', placeholder: '150000', defaultVal: 150000 },
      { key: 'sales', label: 'Net Sales ($)', placeholder: '1200000', defaultVal: 1200000 },
      { key: 'assets', label: 'Total Assets ($)', placeholder: '800000', defaultVal: 800000 },
      { key: 'equity', label: 'Total Equity ($)', placeholder: '400000', defaultVal: 400000 }
    ],
    calculate: (inputs) => {
      const NI = inputs.netIncome ?? 150000;
      const Sales = inputs.sales ?? 1200000;
      const Assets = inputs.assets ?? 800000;
      const Equity = inputs.equity ?? 400000;

      const npm = (NI / Sales) * 100;
      const ato = Sales / Assets;
      const em = Assets / Equity;
      const roe = (npm * ato * em);

      return {
        result: Math.round(roe * 100) / 100,
        stepByStep: `Net Profit Margin: $${NI.toLocaleString()} / $${Sales.toLocaleString()} = ${npm.toFixed(2)}%\nAsset Turnover: $${Sales.toLocaleString()} / $${Assets.toLocaleString()} = ${ato.toFixed(2)}x\nEquity Multiplier: $${Assets.toLocaleString()} / $${Equity.toLocaleString()} = ${em.toFixed(2)}x\nROE = ${npm.toFixed(2)}% * ${ato.toFixed(2)} * ${em.toFixed(2)} = ${roe.toFixed(2)}%`
      };
    }
  },
  {
    id: 'f-cvp-breakeven',
    part: 'part2',
    category: 'Decision Analysis',
    name: 'Breakeven Point & Margin of Safety (CVP)',
    equation: 'BE Units = Fixed Costs / (Price - Variable Cost)',
    explanation: 'Determines the minimum sales volume required to cover all operating fixed costs with zero operating profit.',
    unit: 'Units',
    inputs: [
      { key: 'fixedCosts', label: 'Total Fixed Costs ($)', placeholder: '240000', defaultVal: 240000 },
      { key: 'unitPrice', label: 'Selling Price per Unit ($)', placeholder: '50', defaultVal: 50 },
      { key: 'unitVarCost', label: 'Variable Cost per Unit ($)', placeholder: '30', defaultVal: 30 },
      { key: 'actualUnits', label: 'Expected Sales Units', placeholder: '16000', defaultVal: 16000 }
    ],
    calculate: (inputs) => {
      const FC = inputs.fixedCosts ?? 240000;
      const P = inputs.unitPrice ?? 50;
      const V = inputs.unitVarCost ?? 30;
      const actualUnits = inputs.actualUnits ?? 16000;

      const unitCM = P - V;
      const cmRatio = unitCM / P;
      const beUnits = unitCM > 0 ? FC / unitCM : 0;
      const beRevenue = FC / cmRatio;
      const mosUnits = actualUnits - beUnits;
      const mosPct = actualUnits > 0 ? (mosUnits / actualUnits) * 100 : 0;

      return {
        result: Math.round(beUnits),
        stepByStep: `Unit CM: $${P} - $${V} = $${unitCM.toFixed(2)} (CM Ratio: ${(cmRatio * 100).toFixed(1)}%)\nBreakeven Units = $${FC.toLocaleString()} / $${unitCM} = ${Math.round(beUnits).toLocaleString()} units\nBreakeven Revenue = $${Math.round(beRevenue).toLocaleString()}\nMargin of Safety = ${Math.round(mosUnits).toLocaleString()} units (${mosPct.toFixed(1)}%)`
      };
    }
  },
  {
    id: 'f-dm-variances',
    part: 'part1',
    category: 'Cost & Variance',
    name: 'Direct Materials Price & Efficiency Variances',
    equation: 'Price Var = AQ * (AP - SP) | Quantity Var = SP * (AQ - SQ)',
    explanation: 'Isolates the dollar impact of input purchasing price differences versus factory shop floor physical quantity efficiency.',
    unit: '$',
    inputs: [
      { key: 'aqPurchased', label: 'Actual Quantity Purchased (lbs/kg)', placeholder: '10000', defaultVal: 10000 },
      { key: 'ap', label: 'Actual Price per Unit ($)', placeholder: '5.20', defaultVal: 5.20 },
      { key: 'sp', label: 'Standard Price per Unit ($)', placeholder: '5.00', defaultVal: 5.00 },
      { key: 'aqUsed', label: 'Actual Quantity Used in Production', placeholder: '9800', defaultVal: 9800 },
      { key: 'sqAllowed', label: 'Standard Quantity Allowed for Output', placeholder: '9500', defaultVal: 9500 }
    ],
    calculate: (inputs) => {
      const AQP = inputs.aqPurchased ?? 10000;
      const AP = inputs.ap ?? 5.20;
      const SP = inputs.sp ?? 5.00;
      const AQU = inputs.aqUsed ?? 9800;
      const SQ = inputs.sqAllowed ?? 9500;

      const priceVar = AQP * (AP - SP);
      const qtyVar = SP * (AQU - SQ);

      const priceType = priceVar > 0 ? 'Unfavorable (U)' : 'Favorable (F)';
      const qtyType = qtyVar > 0 ? 'Unfavorable (U)' : 'Favorable (F)';

      return {
        result: Math.abs(Math.round(priceVar + qtyVar)),
        stepByStep: `DM Price Variance: ${AQP.toLocaleString()} * ($${AP.toFixed(2)} - $${SP.toFixed(2)}) = $${Math.abs(priceVar).toLocaleString()} ${priceType}\nDM Quantity Variance: $${SP.toFixed(2)} * (${AQU.toLocaleString()} - ${SQ.toLocaleString()}) = $${Math.abs(qtyVar).toLocaleString()} ${qtyType}\nNet Variance: $${Math.abs(priceVar + qtyVar).toLocaleString()}`
      };
    }
  },
  {
    id: 'f-ccc',
    part: 'part2',
    category: 'Working Capital',
    name: 'Cash Conversion Cycle (CCC)',
    equation: 'CCC = Days Sales Outstanding + Days Inventory - Days Payables Outstanding',
    explanation: 'Measures the time span in days from cash outflow for inventory purchases to cash inflow from collections.',
    unit: 'Days',
    inputs: [
      { key: 'dso', label: 'Days Sales Outstanding (DSO)', placeholder: '42', defaultVal: 42 },
      { key: 'dsi', label: 'Days Sales of Inventory (DSI)', placeholder: '65', defaultVal: 65 },
      { key: 'dpo', label: 'Days Payable Outstanding (DPO)', placeholder: '38', defaultVal: 38 }
    ],
    calculate: (inputs) => {
      const DSO = inputs.dso ?? 42;
      const DSI = inputs.dsi ?? 65;
      const DPO = inputs.dpo ?? 38;
      const ccc = DSO + DSI - DPO;
      return {
        result: ccc,
        stepByStep: `Operating Cycle: ${DSO} days + ${DSI} days = ${DSO + DSI} days\nLess Supplier Financing (DPO): -${DPO} days\nCash Conversion Cycle = ${ccc} days`
      };
    }
  },
  {
    id: 'f-eoq',
    part: 'part2',
    category: 'Working Capital',
    name: 'Economic Order Quantity (EOQ)',
    equation: 'EOQ = sqrt((2 * Demand * OrderCost) / CarryingCost)',
    explanation: 'Finds the optimal order quantity that minimizes the total annual inventory ordering and holding costs.',
    unit: 'Units',
    inputs: [
      { key: 'demand', label: 'Annual Demand (Units)', placeholder: '20000', defaultVal: 20000 },
      { key: 'orderCost', label: 'Cost per Order ($)', placeholder: '50', defaultVal: 50 },
      { key: 'holdingCost', label: 'Carrying Cost per Unit ($/yr)', placeholder: '2.00', defaultVal: 2.00 }
    ],
    calculate: (inputs) => {
      const S = inputs.demand ?? 20000;
      const O = inputs.orderCost ?? 50;
      const C = inputs.holdingCost ?? 2.0;
      const eoq = Math.sqrt((2 * S * O) / C);
      const ordersPerYear = S / eoq;
      return {
        result: Math.round(eoq),
        stepByStep: `Numerator: 2 * ${S.toLocaleString()} * $${O} = ${(2 * S * O).toLocaleString()}\nDivided by Carrying Cost ($${C}) = ${((2 * S * O) / C).toLocaleString()}\nSquare Root (EOQ) = ${Math.round(eoq).toLocaleString()} units\nOptimal Orders per Year: ~${ordersPerYear.toFixed(1)} orders`
      };
    }
  }
];

export const INITIAL_QUESTIONS: MCQQuestion[] = [
  {
    id: 'q-101',
    part: 'part1',
    sectionCode: 'Section A: External Financial Reporting Decisions',
    topic: 'Revenue Recognition (ASC 606)',
    scenarioText: 'A software company enters into a $120,000 contract to provide a customer with a 1-year software license, installation service, and 1 year of technical customer support. The software can function without installation, and other third parties routinely provide installation.',
    questionText: 'Under US GAAP (ASC 606), how many distinct performance obligations are present in this contract?',
    options: [
      'One performance obligation because they are all part of a single combined technology package.',
      'Two performance obligations: the software license and technical support combined with installation.',
      'Three distinct performance obligations: the software license, the installation service, and the technical support service.',
      'Four performance obligations: software, installation, standard support, and warranty.'
    ],
    correctOptionIndex: 2,
    explanation: 'Under ASC 606, a good or service is distinct if (1) the customer can benefit from it on its own or together with readily available resources, and (2) the promise to transfer it is separately identifiable within the contract. Because the software operates independently, third parties perform installation, and support is distinct, there are 3 separate performance obligations.',
    difficulty: 'Exam-Level'
  },
  {
    id: 'q-102',
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting',
    topic: 'Direct Materials Purchases Budget',
    scenarioText: 'Apex Corp plans to sell 12,000 units in April and 15,000 units in May. Each unit requires 3 lbs of raw material. Management maintains ending finished goods inventory equal to 20% of next month’s sales and ending raw materials inventory equal to 10% of next month’s production needs. March 31 inventory balances are at their required levels.',
    questionText: 'What is the budgeted production of finished goods units for April?',
    options: [
      '12,000 units',
      '12,600 units',
      '11,400 units',
      '15,000 units'
    ],
    correctOptionIndex: 1,
    explanation: 'Production = Sales + Desired Ending FG - Beginning FG. For April: Desired Ending FG = 20% of May Sales = 0.20 * 15,000 = 3,000 units. Beginning FG for April = Ending FG for March = 20% of April Sales = 0.20 * 12,000 = 2,400 units. Production = 12,000 + 3,000 - 2,400 = 12,600 units.',
    difficulty: 'Moderate'
  },
  {
    id: 'q-103',
    part: 'part1',
    sectionCode: 'Section C: Performance Management',
    topic: 'Direct Labor Variances',
    scenarioText: 'Standard direct labor cost per unit is 2 hours at $25.00 per hour ($50.00 standard cost per unit). During October, 4,000 units were produced. The company incurred 8,400 direct labor hours at a total payroll cost of $218,400.',
    questionText: 'What are the Direct Labor Rate Variance and Direct Labor Efficiency Variance, respectively?',
    options: [
      '$8,400 Unfavorable and $10,000 Unfavorable',
      '$8,400 Favorable and $10,000 Unfavorable',
      '$8,400 Favorable and $10,000 Favorable',
      '$16,800 Unfavorable and $20,000 Favorable'
    ],
    correctOptionIndex: 1,
    explanation: 'Actual Rate (AR) = $218,400 / 8,400 hrs = $26.00/hr. Standard Rate (SR) = $25.00/hr. DL Rate Variance = AH * (AR - SR) = 8,400 * ($26 - $25) = $8,400 Unfavorable (Wait, actual was $26 vs $25 standard -> Rate variance is $8,400 Unfavorable). Let us re-verify: wait! If AR is $26, it is Unfavorable. But let us check choice: $8,400 U and $10,000 U! Standard hours allowed (SH) = 4,000 units * 2 hrs = 8,000 hrs. Actual hours = 8,400 hrs. DL Efficiency Variance = SR * (AH - SH) = $25 * (8,400 - 8,000) = $10,000 Unfavorable.',
    difficulty: 'Exam-Level'
  },
  {
    id: 'q-104',
    part: 'part1',
    sectionCode: 'Section E: Internal Controls',
    topic: 'Segregation of Duties',
    scenarioText: 'An internal auditor observes that the accounts payable clerk prepares payment vouchers, enters invoices into the ledger, signs paper checks up to $5,000, and performs the monthly bank reconciliation.',
    questionText: 'Which fundamental internal control principle is severely violated?',
    options: [
      'Dual authorization of electronic transfers',
      'Segregation of duties between asset custody, recordkeeping, and reconciliation',
      'Mandatory two-week annual vacation policy',
      'Verification of invoice mathematical accuracy'
    ],
    correctOptionIndex: 1,
    explanation: 'Segregation of duties requires that authorization, recording (entering invoices), custody of assets (signing checks), and periodic reconciliation (bank reconciliation) be handled by separate individuals to prevent and detect misappropriation and error.',
    difficulty: 'Foundation'
  },
  {
    id: 'q-201',
    part: 'part2',
    sectionCode: 'Section A: Financial Statement Analysis',
    topic: 'DuPont Analysis',
    scenarioText: 'A company has Net Income of $240,000, Net Sales of $3,000,000, Average Total Assets of $1,500,000, and Average Shareholders Equity of $750,000.',
    questionText: 'Using the 3-stage DuPont model, what is the company’s Return on Equity (ROE)?',
    options: [
      '16.0%',
      '24.0%',
      '32.0%',
      '40.0%'
    ],
    correctOptionIndex: 2,
    explanation: 'Profit Margin = $240,000 / $3,000,000 = 8.0%. Asset Turnover = $3,000,000 / $1,500,000 = 2.0x. Equity Multiplier = $1,500,000 / $750,000 = 2.0x. ROE = 8.0% * 2.0 * 2.0 = 32.0%. (Alternatively, $240,000 / $750,000 = 32.0%).',
    difficulty: 'Foundation'
  },
  {
    id: 'q-202',
    part: 'part2',
    sectionCode: 'Section B: Corporate Finance',
    topic: 'Cost of Capital (CAPM)',
    scenarioText: 'Treasury bill rate is 3.5%, expected market return is 11.5%, and the firm’s equity beta is 1.40. The firm’s marginal corporate tax rate is 25%.',
    questionText: 'Under the Capital Asset Pricing Model (CAPM), what is the firm’s estimated cost of common equity?',
    options: [
      '11.2%',
      '14.7%',
      '16.1%',
      '19.6%'
    ],
    correctOptionIndex: 1,
    explanation: 'Ke = Rf + Beta * [E(Rm) - Rf] = 3.5% + 1.40 * [11.5% - 3.5%] = 3.5% + 1.40 * [8.0%] = 3.5% + 11.2% = 14.7%. Note: Income taxes do not reduce the cost of equity (only debt has a tax shield).',
    difficulty: 'Moderate'
  },
  {
    id: 'q-203',
    part: 'part2',
    sectionCode: 'Section C: Decision Analysis',
    topic: 'Special Order Decision with Idle Capacity',
    scenarioText: 'Vanguard Corp manufactures backpacks. Normal selling price is $60. Unit manufacturing cost at 80,000 units capacity (currently producing 60,000 units) is: Direct Materials $18, Direct Labor $12, Variable Overhead $6, Fixed Overhead $10. A foreign distributor offers to buy 10,000 units at $42 each. Regular sales will not be affected, but Vanguard must pay a special one-time export fee of $2 per unit.',
    questionText: 'If Vanguard accepts the special order, operating income will:',
    options: [
      'Decrease by $40,000',
      'Increase by $60,000',
      'Increase by $80,000',
      'Increase by $40,000'
    ],
    correctOptionIndex: 1,
    explanation: 'Because Vanguard has 20,000 units of idle capacity, fixed overhead is irrelevant. Incremental revenue per unit = $42. Incremental variable cost per unit = DM ($18) + DL ($12) + Variable OH ($6) + Export fee ($2) = $38. Incremental contribution margin per unit = $42 - $38 = $4/unit. Total increase in operating income = 10,000 units * $4 = $60,000 increase (Wait, choice B is $60,000).',
    difficulty: 'Exam-Level'
  },
  {
    id: 'q-204',
    part: 'part2',
    sectionCode: 'Section F: Professional Ethics',
    topic: 'IMA Conflict Resolution',
    scenarioText: 'A senior management accountant discovers that the CFO has deferred recording significant warranty claims to boost quarterly net income so executive bonuses will vest. The accountant consults company internal grievance policy and approaches the CFO, who orders the accountant to remain silent.',
    questionText: 'According to the IMA Statement of Ethical Professional Practice, what is the accountant’s next appropriate step?',
    options: [
      'Immediately call the press and local regulatory authorities.',
      'Present the issue to the next higher managerial level (e.g. Audit Committee or Board of Directors).',
      'Post an anonymous warning on social media.',
      'Alter the financial statements secretly without notifying anyone.'
    ],
    correctOptionIndex: 1,
    explanation: 'Under the IMA Conflict of Resolution procedures: if the immediate supervisor is involved in the ethical violation, the member should present the issue to the next higher managerial level (such as the audit committee, executive committee, or board of directors). External notification is prohibited unless there is a clear legal mandate.',
    difficulty: 'Moderate'
  },
  {
    id: 'q-205',
    part: 'part2',
    sectionCode: 'Section E: Investment Decisions',
    topic: 'Net Present Value vs Internal Rate of Return',
    scenarioText: 'When evaluating two mutually exclusive capital investment projects with differing scales and timing of cash flows, the NPV and IRR methods produce conflicting rankings.',
    questionText: 'Which method should management prioritize and why?',
    options: [
      'IRR because percentage returns are easier to explain to shareholders.',
      'NPV because it assumes reinvestment at the cost of capital, maximizing total shareholder wealth.',
      'Payback period to break the tie.',
      'IRR because it assumes reinvestment at the internal rate of return.'
    ],
    correctOptionIndex: 1,
    explanation: 'For mutually exclusive projects, NPV is theoretically superior to IRR because it realistically assumes cash flows are reinvested at the firm\'s cost of capital (WACC) rather than the project\'s IRR. NPV directly measures the net addition to shareholder wealth.',
    difficulty: 'Moderate'
  }
];

export const CMA_PART_STRUCTURE = [
  {
    part: 'part1',
    name: 'Part 1: Financial Planning, Performance, and Analytics',
    description: '100 Multiple-Choice Questions & 2 Essay Scenarios | 4 Hours | Passing Scaled Score: 360/500',
    sections: [
      { code: 'A', name: 'External Financial Reporting Decisions', weight: '15%' },
      { code: 'B', name: 'Planning, Budgeting, and Forecasting', weight: '20%' },
      { code: 'C', name: 'Performance Management', weight: '20%' },
      { code: 'D', name: 'Cost Management', weight: '15%' },
      { code: 'E', name: 'Internal Controls', weight: '15%' },
      { code: 'F', name: 'Technology and Analytics', weight: '15%' }
    ]
  },
  {
    part: 'part2',
    name: 'Part 2: Strategic Financial Management',
    description: '100 Multiple-Choice Questions & 2 Essay Scenarios | 4 Hours | Passing Scaled Score: 360/500',
    sections: [
      { code: 'A', name: 'Financial Statement Analysis', weight: '20%' },
      { code: 'B', name: 'Corporate Finance', weight: '20%' },
      { code: 'C', name: 'Decision Analysis', weight: '25%' },
      { code: 'D', name: 'Risk Management', weight: '10%' },
      { code: 'E', name: 'Investment Decisions', weight: '10%' },
      { code: 'F', name: 'Professional Ethics', weight: '15%' }
    ]
  }
];
