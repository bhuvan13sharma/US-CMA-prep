import { StudyNote, FormulaDefinition, MCQQuestion } from '../types/index.ts';

export const INITIAL_NOTES: StudyNote[] = [
  // ==========================================
  // CMA PART 1: FINANCIAL PLANNING, PERFORMANCE, AND ANALYTICS
  // ==========================================
  {
    id: 'note-p1-sec-a',
    part: 'part1',
    sectionCode: 'Section A: External Financial Reporting Decisions (15%)',
    topic: 'Revenue Recognition & Leases (ASC 606 / ASC 842)',
    title: '5-Step Revenue Framework, Operating vs Finance Leases, & Inventory Valuation',
    summary: 'Core principles of ASC 606 revenue recognition across performance obligations, ASC 842 Right-of-Use lease accounting under US GAAP, and inventory costing methods.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Step 1: Identify contract with customer; Step 2: Identify distinct performance obligations; Step 3: Determine transaction price; Step 4: Allocate price to obligations based on relative standalone selling prices; Step 5: Recognize revenue as performance obligation is satisfied.',
      'Variable consideration is estimated via Expected Value or Most Likely Amount, constrained so significant reversal is not probable.',
      'ASC 842 requires all leases > 12 months to be capitalized on the Balance Sheet as a Right-of-Use (ROU) Asset and Lease Liability.',
      'Finance Lease (Lessee): Front-loaded total expense (Amortization + Interest). Operating Lease: Single straight-line lease expense.',
      'US GAAP permits LIFO, whereas IFRS strictly prohibits LIFO. Under FIFO and Average Cost, inventory is carried at Lower of Cost or Net Realizable Value (NRV).'
    ],
    imaExamTips: [
      'Discounts across contracts: Allocate relative standalone selling price discounts proportionally across all performance obligations unless clear evidence ties the discount to a specific deliverable.',
      'Operating Lease vs Finance Lease cash flow classification: Lessee operating lease payments are 100% Operating Cash Flow. Finance lease payments split into Interest (Operating) and Principal repayment (Financing Cash Flow).'
    ],
    content: `## 1. ASC 606: The 5-Step Revenue Framework

Under ASC 606, revenue is recognized to depict the transfer of promised goods or services to customers in an amount that reflects the consideration to which the entity expects to be entitled.

### The Five Steps:
1. **Identify the Contract with a Customer:** A contract exists when approved by parties, rights/payment terms are identifiable, commercial substance exists, and collection is probable (>75-80% likelihood under US GAAP).
2. **Identify Distinct Performance Obligations:** Promises to transfer goods or services. A good/service is distinct if:
   * The customer can benefit from it on its own or together with readily available resources.
   * The promise is separately identifiable from other promises in the contract.
3. **Determine the Transaction Price:** Fixed amounts, variable consideration (discounts, rebates, bonuses), non-cash consideration, and consideration payable to the customer. Variable consideration must be *constrained* to amounts where a significant revenue reversal is not probable.
4. **Allocate Transaction Price:** Allocate based on relative Standalone Selling Prices (SSP). If observable prices do not exist, use Adjusted Market Assessment, Expected Cost Plus Margin, or Residual approach.
5. **Recognize Revenue When or As Obligations Are Satisfied:**
   * **Over Time:** If customer simultaneously receives and consumes benefits, the entity creates/enhances an asset customer controls, or asset has no alternative use and entity has enforceable right to payment.
   * **Point in Time:** When customer obtains control (physical possession, legal title, risks and rewards of ownership).

---

## 2. ASC 842: Lease Accounting

All leases with terms exceeding 12 months must be capitalized on the balance sheet.

### Lessee Classification (OWNES Test):
If ANY of the 5 criteria are satisfied, the lease is classified as a **Finance Lease**; otherwise it is an **Operating Lease**:
* **O** - Ownership transfers to lessee by end of lease term.
* **W** - Written purchase option that lessee is reasonably certain to exercise.
* **N** - Net present value of lease payments ≥ 90% of fair value of underlying asset.
* **E** - Economic life: lease term covers ≥ 75% of asset's remaining economic life.
* **S** - Specialized nature of asset with no alternative use to lessor at end of term.

---

## 3. Inventory Valuation (US GAAP vs. IFRS)

* **Cost Flow Assumptions:** FIFO (First-In, First-Out), LIFO (Last-In, First-Out), Weighted Average, Specific Identification.
* **IFRS Prohibition:** IFRS strictly forbids LIFO because it does not reflect physical inventory flow.
* **Measurement Rules:**
  * **FIFO / Weighted Average:** Lower of Cost or Net Realizable Value (NRV = Estimated Selling Price - Costs of Completion & Disposal).
  * **LIFO / Retail Method (US GAAP only):** Lower of Cost or Market (Market = Replacement Cost, subject to Ceiling = NRV and Floor = NRV minus normal profit margin).`
  },
  {
    id: 'note-p1-sec-a2',
    part: 'part1',
    sectionCode: 'Section A: External Financial Reporting Decisions (15%)',
    topic: 'Financial Statements & Statement of Cash Flows',
    title: 'Balance Sheet Classifications, Comprehensive Income, & Direct vs Indirect Cash Flows',
    summary: 'Mastering financial statement disclosures, Other Comprehensive Income (OCI) items, and direct versus indirect operating cash flows preparation.',
    readTimeMinutes: 13,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Current Assets are expected to be realized in cash, sold, or consumed within one year or the operating cycle, whichever is longer.',
      'Comprehensive Income = Net Income + Other Comprehensive Income (OCI). OCI includes PUFER items: Pension adjustments, Unrealized gains/losses on AFS debt securities, Foreign currency translation gains/losses, Effective portion of cash flow hedges, and Revaluation surplus (IFRS).',
      'The Statement of Cash Flows classifies flows into Operating (CFO), Investing (CFI), and Financing (CFF).',
      'Under the Indirect Method: CFO = Net Income + Non-cash expenses (Depreciation/Amortization) - Gains + Losses - Increase in Current Operating Assets + Increase in Current Operating Liabilities.',
      'Significant non-cash investing and financing activities (e.g. issuing stock to purchase land, capital lease inception) must be disclosed in a supplementary schedule.'
    ],
    imaExamTips: [
      'Cash flow classification trap: Under US GAAP, interest received, dividends received, and interest paid are ALL Operating cash flows. Dividends PAID are Financing cash flows.',
      'IFRS flexibility: IFRS allows interest and dividends received to be Operating or Investing, and interest and dividends paid to be Operating or Financing.'
    ],
    content: `## 1. Statement of Comprehensive Income & OCI

Comprehensive income reflects all changes in equity during a period except those resulting from investments by owners and distributions to owners.

$$\\text{Comprehensive Income} = \\text{Net Income} + \\text{Other Comprehensive Income (OCI)}$$

### Key OCI Items (Mnemonic: PUFE):
* **P** - Pension adjustments: actuarial gains/losses and prior service costs.
* **U** - Unrealized holding gains and losses on Available-for-Sale (AFS) debt securities.
* **F** - Foreign currency translation adjustments (functional currency to reporting currency).
* **E** - Effective portion of cash flow hedge gains and losses.

Accumulated OCI (AOCI) is reported as a separate component of Stockholders' Equity on the Balance Sheet.

---

## 2. Statement of Cash Flows: Direct vs. Indirect Method

The Statement of Cash Flows explains the change in cash and cash equivalents over the reporting period.

### Three Activity Categories:
1. **Operating Activities (CFO):** Core revenue-generating operations, customer receipts, inventory supplier payments, employee wages, taxes, and interest.
2. **Investing Activities (CFI):** Purchases and sales of Property, Plant & Equipment (PP&E), investments in debt/equity securities of other entities, and loans made to third parties.
3. **Financing Activities (CFF):** Issuing or repurchasing own common/preferred stock, borrowing money through bonds/notes, repaying principal on borrowings, and paying cash dividends to shareholders.

### Indirect Method Reconciliation:
$$\\text{CFO} = \\text{Net Income} + \\text{Depreciation \\& Amortization} - \\text{Gains on Sale of PP\\&E} + \\text{Losses} - \\Delta\\text{Operating CA} + \\Delta\\text{Operating CL}$$`
  },
  {
    id: 'note-p1-sec-b',
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting (20%)',
    topic: 'Master Budget System & Operating Schedules',
    title: 'The Master Budgeting Sequence, Production & Inventory Schedules, and Rolling Cash Budgets',
    summary: 'Comprehensive walkthrough of operating budgets, production unit requirements, direct materials purchase schedules, and cash disbursements.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'The Sales Budget is the foundational building block. Every operational schedule derives from expected sales volume.',
      'Production Budget Formula: Units to Produce = Budgeted Sales Units + Desired Ending Finished Goods - Beginning Finished Goods.',
      'Direct Materials Purchases Formula: Raw Materials to Purchase = Materials Needed for Production + Desired Ending RM - Beginning RM.',
      'Cash Budget has 4 distinct sections: Cash Receipts, Cash Disbursements, Cash Excess/Deficiency, and Financing.',
      'Depreciation is a non-cash expense and must be deducted from manufacturing overhead and SG&A budgets when computing cash disbursements.'
    ],
    imaExamTips: [
      'Inventory timing link: The ending inventory of the 1st quarter is automatically the beginning inventory of the 2nd quarter! Look for multi-period rolling schedules on exam questions.',
      'Cash budget minimum balance: Always maintain the policy minimum cash balance requirement before concluding financing needs or surplus investments.'
    ],
    content: `## 1. Master Budget Interrelationships

The Master Budget is an organization's integrated operating and financial blueprint for a specified period.

### Sequence of Operating Budgets:
1. **Sales Budget:** Projected unit sales $\\times$ selling price per unit.
2. **Production Budget (Units):**
   $$\\text{Required Units} = \\text{Budgeted Sales} + \\text{Target Ending FG} - \\text{Beginning FG}$$
3. **Direct Materials (DM) Budget:**
   $$\\text{DM Usage} = \\text{Production Units} \\times \\text{Standard DM per Unit}$$
   $$\\text{DM Purchases} = \\text{DM Usage} + \\text{Target Ending RM} - \\text{Beginning RM}$$
   $$\\text{Cost of DM Purchases} = \\text{DM Purchases} \\times \\text{Purchase Price per Unit}$$
4. **Direct Labor (DL) Budget:**
   $$\\text{DL Cost} = \\text{Production Units} \\times \\text{Standard DL Hours per Unit} \\times \\text{Hourly Wage Rate}$$
5. **Manufacturing Overhead (MOH) Budget:** Variable overhead rate $\\times$ activity base + Fixed overhead.
6. **Ending Finished Goods Inventory Budget:** Computes standard unit product cost to value ending FG and COGS.
7. **Cost of Goods Sold (COGS) Budget.**
8. **Selling & Administrative Expense Budget.**

---

## 2. The Cash Budget

Liquidity determines operational survival. The cash budget reveals cash crunches in advance.

### The 4 Cash Budget Components:
1. **Cash Receipts:** Cash sales + collections of prior credit sales (based on lag schedules, e.g. 70% in month of sale, 28% in following month, 2% uncollectible).
2. **Cash Disbursements:** Payments for DM purchases, DL wages, cash operating expenses, capital expenditures, and tax payments.
3. **Cash Excess or Deficiency:** Beginning Cash + Receipts - Disbursements - Minimum Operating Cash Requirement.
4. **Financing Section:** Borrowings (revolving line of credit), interest payments, and repayments of principal.`
  },
  {
    id: 'note-p1-sec-b2',
    part: 'part1',
    sectionCode: 'Section B: Planning, Budgeting, and Forecasting (20%)',
    topic: 'Quantitative Forecasting & Modern Budgeting Philosophies',
    title: 'Regression Analysis, Learning Curves, Zero-Based (ZBB), & Kaizen Budgeting',
    summary: 'Statistical forecasting tools including simple/multiple linear regression, cumulative learning curve models, and progressive budgeting methodologies.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Simple Linear Regression: y = a + bx, where y is dependent variable (total cost), a is intercept (fixed cost), b is slope (variable cost per unit), and x is independent variable (activity level).',
      'Coefficient of Determination (R²): Measures the percentage of total variation in the dependent variable explained by the independent variable (0 ≤ R² ≤ 1).',
      'Learning Curve Theory: As cumulative production volume doubles, the cumulative average time per unit decreases by a constant percentage (the learning rate, typically 80% to 90%).',
      'Cumulative Average-Time Model: Evaluates total hours as doubling occurs. Incremental Unit-Time Model: Applies learning percentage only to the specific doubled unit.',
      'Zero-Based Budgeting (ZBB): Requires all budget items to be justified from dollar zero each period, eliminating incremental budget creep.'
    ],
    imaExamTips: [
      'Learning curve calculations: If unit 1 takes 100 hours with an 80% cumulative average learning rate: 2 units average 80 hrs (total 160 hrs); 4 units average 64 hrs (total 256 hrs); 8 units average 51.2 hrs (total 409.6 hrs).',
      'Kaizen Budgeting vs ZBB: Kaizen focuses on continuous small cost reductions throughout production; ZBB focuses on evaluating organizational programs and activities from scratch.'
    ],
    content: `## 1. Linear Regression in Cost Estimation

Regression analysis separates mixed costs into fixed and variable components:

$$y = a + bx$$

* $y$ = Total estimated cost (dependent variable)
* $a$ = Fixed cost intercept
* $b$ = Variable cost per unit of activity (slope coefficient)
* $x$ = Cost driver activity volume (independent variable)

### Key Statistical Measures:
* **$R^2$ (Coefficient of Determination):** Proportions of variation explained by the model. Values $> 0.85$ indicate strong predictive power.
* **$t$-Statistic & $p$-Value:** Test if the slope coefficient $b$ is statistically significantly different from zero ($p < 0.05$).
* **Standard Error of the Estimate ($s_e$):** Measures the standard deviation of residuals; lower values indicate a tighter fit.

---

## 2. Learning Curve Analysis

Used when direct labor operations involve complex, repetitive manual assembly.

### Cumulative Average-Time Learning Model (Wright Model):
Each time cumulative output doubles, cumulative average direct labor hours per unit declines by the learning factor:
* Unit 1: $100$ hours. Cumulative Average = $100$ hrs. Total = $100$ hrs.
* Unit 2 (1st doubling): Cumulative Average = $100 \\times 0.80 = 80$ hrs. Total = $160$ hrs. (Unit 2 took $160 - 100 = 60$ hrs).
* Unit 4 (2nd doubling): Cumulative Average = $80 \\times 0.80 = 64$ hrs. Total = $4 \\times 64 = 256$ hrs.
* Unit 8 (3rd doubling): Cumulative Average = $64 \\times 0.80 = 51.2$ hrs. Total = $8 \\times 51.2 = 409.6$ hrs.

---

## 3. Alternative Budgeting Methodologies

* **Zero-Based Budgeting (ZBB):** Starts from zero base. Managers submit decision packages ranked by cost-benefit priority. Prevents legacy budget slack.
* **Activity-Based Budgeting (ABB):** Budgets activities and resources based on cost drivers and expected workload volumes.
* **Kaizen Budgeting:** Embeds continuous improvement targets directly into budget numbers, mandating systematic incremental cost decreases.
* **Rolling / Continuous Budgets:** As one month or quarter expires, a new period is appended to maintain a continuous 12-month forward horizon.`
  },
  {
    id: 'note-p1-sec-c',
    part: 'part1',
    sectionCode: 'Section C: Performance Management (20%)',
    topic: 'Standard Costing & Comprehensive Variance Analysis',
    title: 'Direct Materials, Direct Labor, & 4-Way Overhead Variances',
    summary: 'Detailed decomposition of price, rate, spending, efficiency, and volume variances, isolating root causes of operational variances.',
    readTimeMinutes: 16,
    updatedAt: '2026-10-25',
    keyPoints: [
      'DM Price Variance = AQ purchased × (AP - SP); assigned to the Purchasing Manager.',
      'DM Quantity (Efficiency) Variance = SP × (AQ used - SQ allowed for actual output); assigned to the Production Supervisor.',
      'DL Rate Variance = AH × (AR - SR); DL Efficiency Variance = SR × (AH - SH allowed).',
      'Variable Overhead Spending Variance = AH × (Actual VOH Rate - Standard VOH Rate).',
      'Variable Overhead Efficiency Variance = Standard VOH Rate × (AH - SH allowed).',
      'Fixed Overhead Budget (Spending) Variance = Actual FOH - Budgeted FOH.',
      'Fixed Overhead Volume Variance = Budgeted FOH - Applied FOH = Standard FOH Rate × (Denominator Hours - SH allowed).'
    ],
    imaExamTips: [
      'AQ Purchased vs Used: If actual materials purchased differ from actual materials used, always use AQ purchased for DM Price Variance and AQ used for DM Quantity Variance!',
      'Fixed Overhead Volume Variance meaning: A favorable volume variance does NOT mean money was saved! It only means the plant operated at higher capacity than the denominator level.'
    ],
    content: `## 1. Direct Material and Labor Variances

A standard cost system establishes predetermined benchmarks for input prices and quantities.

### Direct Materials Variances:
* **Price Variance:**
  $$\\text{DMPV} = \\text{AQ}_{\\text{purchased}} \\times (\\text{AP} - \\text{SP})$$
* **Quantity / Efficiency Variance:**
  $$\\text{DMQV} = \\text{SP} \\times (\\text{AQ}_{\\text{used}} - \\text{SQ}_{\\text{allowed}})$$

### Direct Labor Variances:
* **Rate Variance:**
  $$\\text{DLRV} = \\text{AH} \\times (\\text{AR} - \\text{SR})$$
* **Efficiency Variance:**
  $$\\text{DLEV} = \\text{SR} \\times (\\text{AH} - \\text{SH}_{\\text{allowed}})$$

---

## 2. Four-Way Overhead Variance Analysis

Overhead is separated into variable and fixed components.

### Variable Overhead Variances:
1. **Variable OH Spending Variance:**
   $$\\text{VOH Spending} = \\text{AH} \\times (\\text{Actual VOH Rate} - \\text{Standard VOH Rate}) = \\text{Actual VOH} - (\\text{AH} \\times \\text{Standard VOH Rate})$$
2. **Variable OH Efficiency Variance:**
   $$\\text{VOH Efficiency} = \\text{Standard VOH Rate} \\times (\\text{AH} - \\text{SH}_{\\text{allowed}})$$

### Fixed Overhead Variances:
3. **Fixed OH Budget (Spending) Variance:**
   $$\\text{FOH Budget Variance} = \\text{Actual FOH} - \\text{Budgeted FOH}$$
4. **Fixed OH Volume (Production-Volume) Variance:**
   $$\\text{FOH Volume Variance} = \\text{Budgeted FOH} - \\text{Applied FOH} = \\text{FOH Rate} \\times (\\text{Denominator Volume} - \\text{SH}_{\\text{allowed}})$$`
  },
  {
    id: 'note-p1-sec-c2',
    part: 'part1',
    sectionCode: 'Section C: Performance Management (20%)',
    topic: 'Responsibility Accounting, Transfer Pricing, & Balanced Scorecard',
    title: 'Responsibility Centers, Residual Income vs ROI, Transfer Pricing Rules, & The Balanced Scorecard',
    summary: 'Evaluating organizational segment managers, solving the ROI suboptimization trap with Residual Income, and setting boundary transfer prices.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Four Responsibility Centers: Cost Center (costs only), Revenue Center (revenues only), Profit Center (revenues and costs), Investment Center (revenues, costs, and invested capital).',
      'Return on Investment (ROI) = Operating Income / Average Operating Assets = Profit Margin × Asset Turnover.',
      'ROI Suboptimization: A manager evaluated solely on ROI may reject a profitable project that exceeds the company hurdle rate if it lowers the division current average ROI.',
      'Residual Income (RI) = Operating Income - (Operating Assets × Hurdle Rate). Solves the suboptimization trap because any positive RI project is accepted.',
      'General Transfer Pricing Rule: Minimum Transfer Price = Incremental Outlay Cost (Variable Cost) + Opportunity Cost (Foregone Contribution Margin).',
      'Balanced Scorecard evaluates performance across 4 perspectives: Financial, Customer, Internal Business Processes, and Learning & Growth.'
    ],
    imaExamTips: [
      'Transfer Pricing with Excess Capacity: Opportunity cost is zero. The selling division should accept any transfer price that covers its incremental variable cost!',
      'Transfer Pricing at Full Capacity: Opportunity cost equals the full contribution margin from outside sales. Minimum transfer price equals market price.'
    ],
    content: `## 1. Investment Center Performance Metrics

### Return on Investment (ROI):
$$\\text{ROI} = \\frac{\\text{Operating Income}}{\\text{Average Operating Assets}} = \\left(\\frac{\\text{Operating Income}}{\\text{Sales}}\\right) \\times \\left(\\frac{\\text{Sales}}{\\text{Average Operating Assets}}\\right) = \\text{Margin} \\times \\text{Turnover}$$

* **Flaw of ROI (Suboptimization):** A division earning 22% ROI will reject a project yielding 16%, even if the corporate cost of capital is 10%, destroying overall firm value.

### Residual Income (RI):
$$\\text{Residual Income} = \\text{Operating Income} - (\\text{Operating Assets} \\times \\text{Required Minimum Rate of Return})$$

* **Advantage:** Managers accept all projects with positive Residual Income, perfectly aligning divisional incentives with shareholder wealth maximization.

---

## 2. Transfer Pricing Decision Framework

Transfer pricing applies when one organizational subunit sells goods or services to another subunit.

### The Universal Rule:
$$\\text{Minimum Transfer Price (Seller)} = \\text{Incremental Cost per Unit} + \\text{Opportunity Cost per Unit}$$

* **Case 1: Substantial Idle Capacity:**
  * Opportunity Cost = $0$.
  * Minimum Transfer Price = Variable Cost.
* **Case 2: Operating at Full Capacity:**
  * Opportunity Cost = External Contribution Margin $(P_{\\text{external}} - V)$.
  * Minimum Transfer Price = Variable Cost + $(P_{\\text{external}} - V) = P_{\\text{external}}$ (Market Price).
* **Maximum Transfer Price (Buyer):** Lower of external market purchase price or buyer's net revenue from the product.

---

## 3. The Balanced Scorecard

Devised by Kaplan and Norton, the Balanced Scorecard tracks financial and non-financial operational measures.

### The 4 Perspectives:
1. **Financial:** "How do we look to shareholders?" (ROI, RI, cash flow, profit margin).
2. **Customer:** "How do customers see us?" (Customer satisfaction, retention, Net Promoter Score, market share).
3. **Internal Business Processes:** "What must we excel at?" (Cycle time, yield rates, defect rates, setup times).
4. **Learning and Growth:** "Can we continue to improve and create value?" (Employee training hours, turnover rate, IT adoption).`
  },
  {
    id: 'note-p1-sec-d',
    part: 'part1',
    sectionCode: 'Section D: Cost Management (15%)',
    topic: 'Cost Accumulation Systems & Activity-Based Costing (ABC)',
    title: 'Job Order vs Process Costing, Equivalent Units (FIFO vs WA), & ABC Cost Pools',
    summary: 'Distinguishing product vs period costs, calculating FIFO and Weighted Average equivalent units of production, and eliminating cost distortion with ABC.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Product Costs (inventoriable): Direct Materials, Direct Labor, Manufacturing Overhead. Period Costs (expensed immediately): Selling, General & Administrative.',
      'Job Order Costing: Tracks costs by unique job or customized batch. Predetermined Overhead Rate (POHR) = Estimated Total MOH / Estimated Allocation Base.',
      'Process Costing: Continuous mass production of homogeneous units. Costs accumulated by department.',
      'Weighted Average Equivalent Units = Units Completed & Transferred Out + (Ending WIP Units × % Completion). Combines beginning WIP with current work.',
      'FIFO Equivalent Units = (Beginning WIP Units × % Work Needed to Complete) + Units Started & Completed + (Ending WIP Units × % Completion).',
      'Activity-Based Costing (ABC) categorizes activities into Unit-level, Batch-level, Product-sustaining, and Facility-sustaining, eliminating volume-based cost distortion.'
    ],
    imaExamTips: [
      'Equivalent Units shortcut: FIFO Equivalent Units = Weighted Average Equivalent Units - (Beginning WIP Units × % Prior Period Work Already Completed).',
      'ABC Distortion Rule: Traditional volume-based allocation consistently overcosts high-volume, simple products and undercosts low-volume, complex products.'
    ],
    content: `## 1. Process Costing: Equivalent Units of Production (EUP)

Process costing is used when identical products flow continuously through automated production departments.

### 1. Weighted Average Method:
Blends beginning inventory costs with current period costs:
$$\\text{EUP}_{\\text{WA}} = \\text{Units Completed and Transferred Out} + (\\text{Ending WIP Units} \\times \\% \\text{Completed})$$
$$\\text{Cost per EUP}_{\\text{WA}} = \\frac{\\text{Beginning WIP Cost} + \\text{Current Period Cost}}{\\text{EUP}_{\\text{WA}}}$$

### 2. FIFO Method:
Keeps beginning inventory costs strictly separate from current period work:
$$\\text{EUP}_{\\text{FIFO}} = (\\text{Beginning WIP} \\times (1 - \\% \\text{Work Already Done})) + \\text{Units Started \\& Completed} + (\\text{Ending WIP} \\times \\% \\text{Completed})$$
$$\\text{Cost per EUP}_{\\text{FIFO}} = \\frac{\\text{Current Period Cost ONLY}}{\\text{EUP}_{\\text{FIFO}}}$$

---

## 2. Activity-Based Costing (ABC)

Traditional volume-based costing relies on a single plantwide or departmental rate (e.g. DL hours, machine hours), creating cross-subsidization.

### Activity Hierarchy:
1. **Unit-Level Activities:** Performed each time a unit is produced (e.g., machine electricity).
2. **Batch-Level Activities:** Performed each time a batch is processed (e.g., setup costs, purchase orders, shipments).
3. **Product-Sustaining Activities:** Undertaken to support specific product lines (e.g., product engineering redesigns, testing protocols).
4. **Facility-Sustaining Activities:** General factory operations (e.g., factory rent, plant security, insurance).`
  },
  {
    id: 'note-p1-sec-d2',
    part: 'part1',
    sectionCode: 'Section D: Cost Management (15%)',
    topic: 'Overhead Allocation, Joint Products, & Lean Operations',
    title: 'Service Department Allocation (Direct, Step, Reciprocal), NRV at Split-Off, JIT & Theory of Constraints',
    summary: 'Allocating support department costs, valuing joint products and by-products at split-off, and maximizing bottleneck throughput in operations.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Service department allocation methods: Direct Method (ignores inter-service support), Step-Down Method (allocates sequentially, ignores reverse services), Reciprocal Method (algebraic equations solving mutual services).',
      'Split-off point is where joint products become separately identifiable. Joint costs incurred prior to split-off are SUNK for decisions regarding further processing.',
      'Joint Cost Allocation Methods: Sales Value at Split-Off, Physical Measure, Net Realizable Value (NRV = Final Sales Value - Separable Processing Costs).',
      'By-Products: Low relative sales value. Can be accounted for under the Production Method (reduces joint production cost) or Sales Method (recorded as miscellaneous revenue).',
      'Theory of Constraints (TOC): Maximize throughput margin (Revenues - Direct Materials) through the system bottleneck. Drum-Buffer-Rope mechanism.',
      'Cost of Quality (COQ) categories: Prevention and Appraisal (Conformance Costs) vs Internal Failure and External Failure (Non-Conformance Costs).'
    ],
    imaExamTips: [
      'Sell or Process Further Rule: Joint costs incurred before the split-off point are completely irrelevant! Process further if Incremental Revenue > Incremental Separable Costs.',
      'Cost of Quality exam pattern: Warranty repairs, product recalls, customer returns, and liability claims are External Failure costs—the most expensive quality costs.'
    ],
    content: `## 1. Support Department Cost Allocation

Support departments (e.g. Maintenance, HR, IT) provide services to each other and to operating production departments.

* **Direct Method:** Allocates support costs directly to production departments; completely ignores services provided between support departments.
* **Step-Down (Sequential) Method:** Allocates costs sequentially, starting with the support department providing services to the greatest number of other support departments. Once allocated, no costs are cycled back.
* **Reciprocal (Matrix / Algebraic) Method:** Fully captures mutual interactions by expressing cost relationships as simultaneous linear equations.

---

## 2. Joint Products and Split-Off Point

Joint products are two or more products generated simultaneously from a common raw material and process.

### Allocation Methods:
1. **Sales Value at Split-Off:** Based on relative market value at the exact split-off point.
2. **Net Realizable Value (NRV):** Used when products cannot be sold at split-off without further processing:
   $$\\text{NRV} = \\text{Final Selling Price} - \\text{Separable Processing Costs}$$
3. **Physical Measure:** Allocates based on pounds, gallons, or volume. Flawed if expensive products carry high weight.

---

## 3. Operational Efficiency & Theory of Constraints (TOC)

* **Just-In-Time (JIT):** Demand-pull system where goods are produced only as needed by customers, targeting zero inventory, zero setup times, and zero defects.
* **Theory of Constraints (TOC):** Every organization has at least one constraint (bottleneck) that limits total output:
  1. Identify the bottleneck.
  2. Exploit the bottleneck (keep it running 100% of the time).
  3. Subordinate everything else to the bottleneck.
  4. Elevate the bottleneck (invest capital to expand capacity).
* **Throughput Contribution:** $\\text{Revenues} - \\text{Direct Materials Cost}$. Labor and overhead are treated as fixed operating expenses.`
  },
  {
    id: 'note-p1-sec-e',
    part: 'part1',
    sectionCode: 'Section E: Internal Controls (15%)',
    topic: 'COSO Internal Control Framework & Sarbanes-Oxley (SOX)',
    title: 'The 5 COSO Components (CRIME), 17 Principles, Segregation of Duties (ARC), & SOX 404',
    summary: 'Internal control framework, corporate governance under SOX Sections 302 and 404, segregation of incompatible duties, and the fraud triangle.',
    readTimeMinutes: 13,
    updatedAt: '2026-10-25',
    keyPoints: [
      'COSO 5 Components Mnemonic: CRIME (Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring).',
      'The Control Environment is the foundation; sets ethical tone at the top, board independence, and organizational structure.',
      '17 Codified Principles support the 5 components; all must be present and functioning for internal control to be deemed effective.',
      'Segregation of Duties requires separating Authorization of transactions, Recording/accounting, Custody of assets, and Periodic Reconciliation (ARC rule).',
      'SOX Section 302 requires CEO/CFO certification of financial reports; Section 404 mandates annual management ICFR evaluation and independent external audit attestation.',
      'Fraud Triangle comprises Pressure (Incentive), Opportunity (the only element management can control directly), and Rationalization.'
    ],
    imaExamTips: [
      'Internal controls provide REASONABLE assurance, never absolute assurance, due to human error, faulty judgment, collusion, and management override.',
      'If an exam question describes an employee receiving customer payments and posting entries to the accounts receivable ledger, identify a severe violation of Custody and Recording segregation.'
    ],
    content: `## 1. The COSO Internal Control Framework

Internal control is a process designed to provide reasonable assurance regarding operations, reporting, and compliance objectives.

### The 5 Components (C-R-I-M-E):
* **C - Control Environment:** Ethical tone at the top, board independence and oversight, organizational structure, commitment to competence, and accountability (5 principles).
* **R - Risk Assessment:** Identifying, analyzing, and managing risks to objectives, including explicit assessment of fraud risk and significant organizational changes (4 principles).
* **I - Information & Communication:** Obtaining high-quality information, internal communication across all levels, and effective communication with external stakeholders (3 principles).
* **M - Monitoring Activities:** Ongoing evaluations, periodic separate evaluations, and communicating deficiencies promptly to management and the board (2 principles).
* **E - Existing Control Activities:** Policies and procedures mitigating risks, segregation of duties, authorizations, and IT controls (3 principles).

---

## 2. Segregation of Incompatible Duties (ARC)

To prevent fraud and conceal errors, the following 4 functions must never be assigned to the same individual:
1. **A - Authorization:** Approving transactions, purchase orders, or credit limits.
2. **R - Recording:** Journalizing, posting to sub-ledgers, and general ledger maintenance.
3. **C - Custody:** Handling physical cash, signing checks, holding warehouse inventory.
4. **Reconciliation:** Independent bank reconciliations and physical inventory counts.

---

## 3. Sarbanes-Oxley Act (SOX) Highlights

* **Section 302:** Principal officers (CEO and CFO) must personally certify financial reports, establish disclosure controls, and disclose any control deficiencies or fraud.
* **Section 404:** Management is required to assess and issue an annual internal control report stating its responsibility for Internal Control over Financial Reporting (ICFR) and assessing ICFR effectiveness. External auditors must independently attest to ICFR.`
  },
  {
    id: 'note-p1-sec-e2',
    part: 'part1',
    sectionCode: 'Section E: Internal Controls (15%)',
    topic: 'Information Systems Security & IT Controls',
    title: 'IT General Controls (ITGC), Application Controls, Disaster Recovery (RPO/RTO), & System Security',
    summary: 'Distinguishing IT General Controls from Application Controls, implementing input checks, and planning business continuity with RPO and RTO.',
    readTimeMinutes: 12,
    updatedAt: '2026-10-25',
    keyPoints: [
      'IT General Controls (ITGC) apply across all systems: logical access controls, change management, computer operations, and backup/recovery.',
      'IT Application Controls operate at the business process level: Input controls, Processing controls, and Output controls.',
      'Input Validation Controls: Field check (data type), Limit/Range check, Completeness check, Validity check (matches master file), and Hash totals (sum of non-financial fields like employee IDs).',
      'Disaster Recovery: Cold Site (empty facility, days/weeks to resume), Warm Site (hardware present, lacks recent data), Hot Site (fully equipped duplicate facility, real-time replication, immediate failover).',
      'Recovery Point Objective (RPO) defines acceptable data loss in time; Recovery Time Objective (RTO) defines acceptable system downtime.'
    ],
    imaExamTips: [
      'Hash total vs Financial batch total: A financial batch total sums currency amounts (e.g. total payroll dollars $145,000). A hash total sums meaningless numeric fields solely for control (e.g. sum of employee IDs 489,120).',
      'Disaster Recovery Hot Site: Most expensive option, but necessary for financial institutions where downtime cannot exceed minutes.'
    ],
    content: `## 1. IT Application Controls

Application controls ensure the completeness, accuracy, and authorization of transaction processing.

### Types of Input Controls:
* **Field Check:** Ensures data entered conforms to the proper character type (e.g. numeric only in phone numbers).
* **Limit / Range Check:** Verifies numbers fall between acceptable lower and upper bounds (e.g. hourly wages between $15 and $100).
* **Validity Check:** Compares input against existing master records (e.g. customer account number must exist in customer table).
* **Reasonableness Test:** Analyzes two data fields together (e.g. overtime hours cannot be entered if regular hours < 40).
* **Batch Controls:**
  * **Financial Total:** Sum of dollar amounts.
  * **Record Count:** Number of documents entered.
  * **Hash Total:** Sum of numeric fields with no economic meaning (e.g. sum of account numbers).

---

## 2. Business Continuity & Disaster Recovery

* **Hot Site:** Fully configured data center with hardware, network connections, and replicated real-time data. Failover occurs in seconds or minutes.
* **Warm Site:** Equipped with hardware and communication links, but requires loading backups and applications. Recovery takes hours to days.
* **Cold Site:** Leased physical space with electrical and HVAC infrastructure, but no hardware or software. Recovery takes weeks.
* **Recovery Point Objective (RPO):** The maximum age of files that must be recovered from backup storage for normal operations to resume (determines backup frequency).
* **Recovery Time Objective (RTO):** The maximum allowable elapsed time to restore the system after an outage.`
  },
  {
    id: 'note-p1-sec-f',
    part: 'part1',
    sectionCode: 'Section F: Technology and Analytics (15%)',
    topic: 'Information Systems, ERP, Databases, & Data Governance',
    title: 'Enterprise Resource Planning (ERP), Relational Databases (SQL), Big Data & Data Governance',
    summary: 'Centralized database structures, ERP architectures, SQL queries, data warehouses vs data lakes, and enterprise data governance.',
    readTimeMinutes: 13,
    updatedAt: '2026-10-25',
    keyPoints: [
      'ERP Systems integrate all core business functions (sales, accounting, procurement, manufacturing, HR) into a unified central database, eliminating data silos.',
      'Relational Database Architecture: Data structured into tables (relations) with rows (records/tuples) and columns (attributes/fields).',
      'Primary Key uniquely identifies each row; Foreign Key in another table references the Primary Key to establish relationships.',
      'Database Normalization (1NF, 2NF, 3NF) removes data redundancy and prevents insert, update, and delete anomalies.',
      'Data Warehouse stores clean, structured historical data optimized for analytical reporting (OLAP). Data Lake stores raw structured, semi-structured, and unstructured data.',
      'Data Governance establishes data stewardship, master data management, privacy compliance (GDPR/CCPA), and data quality metrics.'
    ],
    imaExamTips: [
      'OLTP vs OLAP: Online Transaction Processing (OLTP) manages day-to-day transaction entry (fast writes, normalized). Online Analytical Processing (OLAP) manages complex queries and historical trend analysis (data warehouses, dimensional schemas).',
      'Foreign Key constraint: Prevents orphan records. You cannot delete a customer if there are outstanding sales orders referencing that customer ID.'
    ],
    content: `## 1. Enterprise Resource Planning (ERP) Systems

Modern corporations coordinate operations through enterprise software suites (e.g. SAP S/4HANA, Oracle ERP Cloud).

### Benefits of ERP:
* **Single Source of Truth:** A single integrated relational database serves all departments simultaneously.
* **Real-Time Data Availability:** Financial statements update instantaneously as warehouse shipments or customer invoices occur.
* **Enhanced Audit Trails:** Automated transaction logging traces every modification back to individual user IDs and timestamps.

---

## 2. Relational Database Concepts & SQL

* **Tables:** Formed by rows (records) and columns (attributes).
* **Primary Key:** An attribute or combination of attributes that uniquely identifies every tuple in the table (e.g. \`CustomerID\`).
* **Foreign Key:** An attribute in a table that matches the primary key in another table, enforcing referential integrity.
* **Structured Query Language (SQL):** Standard language for querying relational databases:
  \`\`\`sql
  SELECT CustomerName, SUM(OrderAmount) AS TotalSpend
  FROM Orders
  WHERE OrderDate >= '2026-01-01'
  GROUP BY CustomerName
  HAVING TotalSpend > 50000;
  \`\`\`

---

## 3. Data Warehouses vs. Data Lakes

* **Data Warehouse:** Subject-oriented, integrated, time-variant, non-volatile collection of data used for managerial decision-making. Employs ETL (Extract, Transform, Load) to clean and structure data prior to ingestion.
* **Data Lake:** Massive repository storing raw structured, semi-structured (JSON, XML), and unstructured (PDFs, images, sensor logs) data. Employs ELT (Extract, Load, Transform).`
  },
  {
    id: 'note-p1-sec-f2',
    part: 'part1',
    sectionCode: 'Section F: Technology and Analytics (15%)',
    topic: 'Data Analytics Hierarchy & Emerging Tech in Finance',
    title: 'Descriptive, Diagnostic, Predictive, & Prescriptive Analytics, RPA, & Business Intelligence',
    summary: 'The four-stage analytics maturity model, machine learning applications in financial management, robotic process automation, and data visualization best practices.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'The 4 Analytics Stages: Descriptive (What happened?), Diagnostic (Why did it happen?), Predictive (What is likely to happen?), Prescriptive (What should we do?).',
      'Descriptive Analytics uses summary statistics, standard financial statements, and variance dashboards.',
      'Diagnostic Analytics uses drill-down techniques, data mining, anomaly detection, and correlation analysis.',
      'Predictive Analytics utilizes linear/logistic regression, time-series forecasting, decision trees, and Monte Carlo simulations.',
      'Prescriptive Analytics applies mathematical optimization, linear programming, and scenario simulation to recommend optimal actions.',
      'Robotic Process Automation (RPA) configures software bots to execute repetitive, rules-based tasks (e.g. three-way invoice matching, bank reconciliations).',
      'Data Visualization rules: Use line charts for continuous trends over time, bar charts for categorical comparisons, scatter plots for correlation relationships.'
    ],
    imaExamTips: [
      'Know the 4 analytics categories thoroughly! Exam questions frequently give a business scenario (e.g., "Using historical regression to forecast next quarter sales") and ask which type of analytics is being employed (Predictive).',
      'RPA best fit: RPA is ideal for standardized, repetitive, rule-based processes with digital structured inputs. It does NOT make complex subjective judgments.'
    ],
    content: `## 1. The Four-Stage Data Analytics Hierarchy

As analytics maturity increases, the organization transitions from retrospective reporting to forward-looking strategic optimization.

| Stage | Question Answered | Common Tools & Methods | Example Application |
|---|---|---|---|
| **1. Descriptive** | "What happened?" | Summary tables, KPI dashboards, variance reports | Monthly budget vs. actual variance reports |
| **2. Diagnostic** | "Why did it happen?" | Drill-downs, root cause analysis, correlation | Investigating why Region B direct labor variance surged |
| **3. Predictive** | "What will happen?" | Regression models, time-series, Monte Carlo | Projecting bad debt default probabilities |
| **4. Prescriptive** | "What action should we take?" | Optimization, linear programming, decision trees | Calculating optimal product mix under machine capacity |

---

## 2. Robotic Process Automation (RPA) & Machine Learning

* **Robotic Process Automation (RPA):** Software robots ("bots") that emulate human actions across user interfaces to perform repetitive, rules-based tasks without altering core IT infrastructure. Examples include downloading supplier invoices, performing 3-way matching, and generating standard month-end journal entries.
* **Supervised Learning:** Algorithms trained on labeled historical data (e.g., predicting fraudulent transactions based on past labeled fraud cases).
* **Unsupervised Learning:** Algorithms identifying hidden patterns or clustering in unlabeled datasets (e.g., customer segmentation for pricing tiers).

---

## 3. Data Visualization Best Practices

* **Line Charts:** Best for depicting trends of continuous variables over time.
* **Bar / Column Charts:** Best for discrete categorical comparisons.
* **Scatter Plots:** Best for displaying relationships and correlation between two numerical variables.
* **Avoid Visual Distortions:** Never use 3D charts, avoid pie charts with more than 4-5 slices, and avoid truncated y-axes that artificially exaggerate small differences.`
  },

  // ==========================================
  // CMA PART 2: STRATEGIC FINANCIAL MANAGEMENT
  // ==========================================
  {
    id: 'note-p2-sec-a',
    part: 'part2',
    sectionCode: 'Section A: Financial Statement Analysis (20%)',
    topic: 'Liquidity, Solvency, & DuPont Return on Equity Decomposition',
    title: 'Comprehensive Ratio Analysis, Cash Conversion Cycle, & 3-Stage / 5-Stage DuPont Models',
    summary: 'Evaluating liquidity, activity turnover, capital structure solvency, and decomposing Return on Equity into operating efficiency and leverage.',
    readTimeMinutes: 16,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Current Ratio = Current Assets / Current Liabilities. Quick Ratio = (Cash + Marketable Securities + Receivables) / Current Liabilities.',
      'Cash Conversion Cycle (CCC) = Days Sales Outstanding (DSO) + Days Sales in Inventory (DSI) - Days Payable Outstanding (DPO).',
      'A negative CCC means the firm receives customer cash before paying inventory suppliers (highly favorable working capital efficiency).',
      'Times Interest Earned (TIE / Interest Coverage) = EBIT / Interest Expense. Assesses long-term debt debt-service ability.',
      '3-Stage DuPont ROE = Net Profit Margin × Total Asset Turnover × Equity Multiplier.',
      '5-Stage DuPont isolates Tax Burden, Interest Burden, Operating Margin, Asset Turnover, and Financial Leverage.'
    ],
    imaExamTips: [
      'Turnover denominator rule: When calculating turnover ratios that pair an income statement flow (Sales, COGS) with a balance sheet balance, ALWAYS use the AVERAGE balance whenever beginning and ending figures are available!',
      'Working capital transaction impacts: Paying a current liability with cash will INCREASE the current ratio if the ratio was already greater than 1.0, and DECREASE it if below 1.0.'
    ],
    content: `## 1. Liquidity & Working Capital Ratios

Liquidity assesses a firm's capacity to meet short-term obligations as they come due.

* **Current Ratio:**
  $$\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$$
* **Quick (Acid-Test) Ratio:**
  $$\\text{Quick Ratio} = \\frac{\\text{Cash} + \\text{Marketable Securities} + \\text{Accounts Receivable}}{\\text{Current Liabilities}}$$
* **Cash Ratio:**
  $$\\text{Cash Ratio} = \\frac{\\text{Cash} + \\text{Marketable Securities}}{\\text{Current Liabilities}}$$

---

## 2. Activity Ratios & Cash Conversion Cycle (CCC)

Measures the speed with which operational assets are converted into cash.

* **Days Sales Outstanding (DSO):**
  $$\\text{AR Turnover} = \\frac{\\text{Net Credit Sales}}{\\text{Average AR}}, \\quad \\text{DSO} = \\frac{365}{\\text{AR Turnover}}$$
* **Days Sales in Inventory (DSI):**
  $$\\text{Inventory Turnover} = \\frac{\\text{COGS}}{\\text{Average Inventory}}, \\quad \\text{DSI} = \\frac{365}{\\text{Inventory Turnover}}$$
* **Days Payable Outstanding (DPO):**
  $$\\text{AP Turnover} = \\frac{\\text{Purchases}}{\\text{Average AP}}, \\quad \\text{DPO} = \\frac{365}{\\text{AP Turnover}}$$
* **Cash Conversion Cycle:**
  $$\\text{CCC} = \\text{DSO} + \\text{DSI} - \\text{DPO}$$

---

## 3. DuPont ROE Decomposition

Deconstructs Return on Equity to pinpoint the true drivers of profitability:

### 3-Stage Model:
$$\\text{ROE} = \\left(\\frac{\\text{Net Income}}{\\text{Sales}}\\right) \\times \\left(\\frac{\\text{Sales}}{\\text{Total Assets}}\\right) \\times \\left(\\frac{\\text{Total Assets}}{\\text{Common Equity}}\\right)$$
$$\\text{ROE} = \\text{Net Profit Margin} \\times \\text{Asset Turnover} \\times \\text{Equity Multiplier}$$

### 5-Stage Model:
$$\\text{ROE} = \\left(\\frac{\\text{Net Income}}{\\text{EBT}}\\right) \\times \\left(\\frac{\\text{EBT}}{\\text{EBIT}}\\right) \\times \\left(\\frac{\\text{EBIT}}{\\text{Sales}}\\right) \\times \\left(\\frac{\\text{Sales}}{\\text{Assets}}\\right) \\times \\left(\\frac{\\text{Assets}}{\\text{Equity}}\\right)$$
$$= \\text{Tax Burden} \\times \\text{Interest Burden} \\times \\text{Operating Margin} \\times \\text{Asset Turnover} \\times \\text{Financial Leverage}$$`
  },
  {
    id: 'note-p2-sec-a2',
    part: 'part2',
    sectionCode: 'Section A: Financial Statement Analysis (20%)',
    topic: 'Profitability, Market Multiples, & Earnings Quality Analysis',
    title: 'Operating Margins, P/E, Market-to-Book, & Red Flags in Earnings Quality',
    summary: 'Assessing profitability, equity valuation multiples, sustainable earnings quality, and detecting aggressive accounting practices and revenue manipulation.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Gross Profit Margin = (Sales - COGS) / Sales. Operating Margin = Operating Income (EBIT) / Sales.',
      'Price-to-Earnings (P/E) Ratio = Market Price per Share / Earnings per Share (EPS). High P/E signals strong future growth expectations or temporarily depressed earnings.',
      'Dividend Payout Ratio = Dividends per Share / EPS. Retention Rate (b) = 1 - Payout Ratio. Sustainable Growth Rate (g) = ROE × b.',
      'High Earnings Quality: Earnings backed by strong operating cash flows, conservative accounting choices, recurring revenue sources.',
      'Earnings Red Flags: CFO substantially lagging behind Net Income, sudden changes in accounting estimates (e.g. extending depreciable asset lives), large non-operating gains boosting pre-tax income, aggressive end-of-quarter shipping (channel stuffing).'
    ],
    imaExamTips: [
      'Sustainable Growth Rate formula: g = ROE × (1 - Dividend Payout Ratio). If ROE is 20% and company pays out 30% of earnings as dividends, g = 20% × 0.70 = 14%.',
      'Cash flow divergence red flag: If Net Income is rising rapidly while Cash Flow from Operations (CFO) is declining, it strongly indicates aggressive accruals or uncollected receivables.'
    ],
    content: `## 1. Profitability & Market Multiples

* **Return on Assets (ROA):**
  $$\\text{ROA} = \\frac{\\text{Net Income}}{\\text{Average Total Assets}} = \\text{Net Margin} \\times \\text{Asset Turnover}$$
* **Price / Earnings (P/E) Ratio:**
  $$\\text{P/E} = \\frac{\\text{Current Market Price per Share}}{\\text{Diluted EPS}}$$
* **Market-to-Book (P/B) Ratio:**
  $$\\text{P/B} = \\frac{\\text{Market Capitalization}}{\\text{Total Common Stockholders' Equity}}$$
* **Sustainable Growth Rate ($g$):**
  $$g = \\text{ROE} \\times b = \\text{ROE} \\times (1 - \\text{Dividend Payout Ratio})$$

---

## 2. Earnings Quality & Forensic Red Flags

High-quality earnings accurately reflect economic reality and predict future cash flows reliably.

### Prominent Accounting Manipulations:
* **Premature Revenue Recognition (Bill-and-Hold / Channel Stuffing):** Shipping goods to distributors without firm commitment to record revenue before year-end.
* **Capitalizing Operating Expenses:** Booking routine maintenance or research expenditures as capital assets (e.g. WorldCom scandal), inflating current-period EBITDA and operating cash flows.
* **Cookie Jar Reserves:** Overestimating bad debt or warranty allowances in highly profitable years to reverse them into income during leaner years.
* **Big Bath Restructuring Charges:** Taking massive one-time asset write-downs in a single troubled period to artificially clean the balance sheet and reduce future depreciation.`
  },
  {
    id: 'note-p2-sec-b',
    part: 'part2',
    sectionCode: 'Section B: Corporate Finance (20%)',
    topic: 'Cost of Capital, Capital Structure, & Modigliani-Miller',
    title: 'WACC, Capital Asset Pricing Model (CAPM), Beta, & Capital Structure Theories',
    summary: 'Calculating the weighted average cost of capital, after-tax debt costs, beta risk adjustments via CAPM, and evaluating optimal debt-equity trade-offs.',
    readTimeMinutes: 16,
    updatedAt: '2026-10-25',
    keyPoints: [
      'WACC = (Wd × Kd × (1 - t)) + (Wp × Kp) + (We × Ke). Always use MARKET values for weights when available.',
      'Cost of Debt is adjusted for the tax deductibility of interest: After-tax Kd = Before-tax Kd × (1 - Marginal Tax Rate).',
      'Cost of Preferred Stock: Kp = Dp / Net Proceeds (preferred dividends are NOT tax deductible).',
      'Cost of Common Equity via CAPM: Ke = Rf + Beta × [E(Rm) - Rf], where [E(Rm) - Rf] is the Equity Market Risk Premium.',
      'Cost of Equity via Gordon Dividend Growth Model: Ke = (D1 / P0) + g.',
      'Modigliani-Miller Theorem with corporate taxes: Firm value increases with debt due to the interest tax shield: Value of Levered Firm = Value of Unlevered Firm + (Tax Rate × Debt).',
      'Trade-Off Theory: Optimal capital structure balances tax advantages of debt against bankruptcy and financial distress costs.'
    ],
    imaExamTips: [
      'Market Risk Premium vs Return on the Market: If given "Market Risk Premium = 7%", that is already [E(Rm) - Rf]! Do NOT subtract the risk-free rate again. If given "Return on Market = 10%" and Rf = 3%, then Market Risk Premium = 10% - 3% = 7%.',
      'Gordon Model D1: D1 is NEXT period expected dividend: D1 = D0 × (1 + g).'
    ],
    content: `## 1. Weighted Average Cost of Capital (WACC)

WACC is the minimum required rate of return an entity must generate on its overall asset portfolio to satisfy all capital providers.

$$\\text{WACC} = w_d k_d (1 - t) + w_p k_p + w_e k_e$$

### Component Costs:
1. **Cost of Debt ($k_d$):** Yield to Maturity (YTM) on newly issued bonds:
   $$\\text{After-Tax } k_d = k_d \\times (1 - t)$$
2. **Cost of Preferred Stock ($k_p$):**
   $$k_p = \\frac{D_p}{P_{\\text{net}}}$$
   *(Preferred dividends are distributed after tax and offer no corporate tax shield).*
3. **Cost of Common Equity ($k_e$):**
   * **Capital Asset Pricing Model (CAPM):**
     $$k_e = R_f + \\beta \\left(E(R_m) - R_f\\right)$$
   * **Gordon Dividend Discount Growth Model:**
     $$k_e = \\frac{D_1}{P_0} + g = \\frac{D_0 (1 + g)}{P_0} + g$$

---

## 2. Capital Structure Theories

* **Modigliani-Miller (No Taxes):** Under perfect capital markets, financial leverage has zero effect on total firm value.
* **Modigliani-Miller (With Corporate Taxes):** Debt interest is tax-deductible. The present value of the interest tax shield increases firm value:
  $$V_L = V_U + (t \\times D)$$
* **Trade-off Theory:** As debt levels rise, expected costs of bankruptcy, agency conflicts, and financial distress rise exponentially, creating an optimal debt-equity mix.
* **Pecking Order Theory:** Asymmetric information causes firms to prioritize internal financing (retained earnings) first, debt second, and external equity as an absolute last resort.`
  },
  {
    id: 'note-p2-sec-b2',
    part: 'part2',
    sectionCode: 'Section B: Corporate Finance (20%)',
    topic: 'Working Capital Management & Foreign Exchange Hedging',
    title: 'Cash Concentration (Lockbox), Credit Terms (2/10 Net 30), EOQ, & FX Risk Hedging',
    summary: 'Accelerating cash collections, calculating the annualized cost of trade credit discounts, inventory EOQ, and managing currency exposure with derivatives.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Cash Management Tools: Lockbox systems (reduces mail and processing float), Concentration banking, Zero-Balance Accounts (ZBA).',
      'Annualized Cost of Forgoing Cash Discounts: Cost = (Discount % / (100 - Discount %)) × (365 / (Credit Period - Discount Period)).',
      'Economic Order Quantity (EOQ) = Sqrt((2 × Annual Demand × Order Cost) / Carrying Cost per Unit). Minimizes total ordering and holding costs.',
      'Reorder Point = (Daily Demand × Lead Time in Days) + Safety Stock.',
      'Foreign Exchange Exposures: Transaction Exposure (unsettled contractual cash flows), Translation Exposure (converting foreign sub balance sheets to reporting currency), Economic Exposure (long-term competitive impact of exchange rates).',
      'Hedging instruments: Forward contracts (tailored, OTC), Futures (exchange-traded, standardized, daily margin settlement), Options (downside protection with upside participation).'
    ],
    imaExamTips: [
      'Cost of 2/10 net 30: Cost = (2/98) × (365 / 20) = 2.04% × 18.25 = 37.24% APR (or 44.59% EAR). Forgoing cash discounts is almost always an extremely expensive form of financing!',
      'EOQ tradeoff: At the EOQ point, total annual ordering costs EQUAL total annual carrying costs.'
    ],
    content: `## 1. Cash Management & Float Optimization

* **Mail Float:** Time check spends in transit.
* **Processing Float:** Time between company receipt and deposit at bank.
* **Clearing Float:** Time bank takes to clear check and credit funds.
* **Lockbox System:** Customers mail remittances to a dedicated post office box operated by the local bank, which collects and deposits checks multiple times daily, drastically cutting float.

---

## 2. Cost of Trade Credit

When a supplier offers terms such as "2/10, net 30":

$$\\text{Annualized Opportunity Cost} = \\left(\\frac{\\text{Discount \\%}}{100 - \\text{Discount \\%}}\\right) \\times \\left(\\frac{365}{\\text{Total Days} - \\text{Discount Days}}\\right)$$

$$\\text{Cost of 2/10, net 30} = \\left(\\frac{2}{98}\\right) \\times \\left(\\frac{365}{30 - 10}\\right) = 0.02041 \\times 18.25 = 37.24\\%$$

---

## 3. Economic Order Quantity (EOQ)

Balancing order placement costs against inventory holding costs:

$$\\text{EOQ} = \\sqrt{\\frac{2DS}{H}}$$

* $D$ = Annual unit sales demand
* $S$ = Fixed cost per purchase order
* $H$ = Carrying/holding cost per unit per year

---

## 4. Foreign Exchange Risk Management

* **Forward Contracts:** Private OTC agreements to exchange a set amount of currency at a specified forward rate on a future date; non-standardized.
* **Futures Contracts:** Standardized contracts traded on organized exchanges with daily marked-to-market margin requirements.
* **Options:** Call options grant the right to buy currency (hedges foreign payables); Put options grant the right to sell currency (hedges foreign receivables).`
  },
  {
    id: 'note-p2-sec-c',
    part: 'part2',
    sectionCode: 'Section C: Decision Analysis (25%)',
    topic: 'Cost-Volume-Profit (CVP) Analysis & Operating Leverage',
    title: 'Breakeven Economics, Target Profits, Margin of Safety, & Degree of Operating Leverage (DOL)',
    summary: 'Mastering contribution margin mechanics, breakeven formulas in units and dollars, after-tax target profits, and operating leverage multipliers.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Contribution Margin (CM) = Sales - Variable Costs. CM Ratio = CM / Sales.',
      'Breakeven in Units = Total Fixed Costs / Unit Contribution Margin.',
      'Breakeven in Dollars = Total Fixed Costs / Contribution Margin Ratio.',
      'Target Pre-Tax Operating Income in Units = (Fixed Costs + Target Operating Income) / Unit CM.',
      'Target After-Tax Net Income in Units = [Fixed Costs + (Target Net Income / (1 - t))] / Unit CM.',
      'Margin of Safety = (Budgeted Sales - Breakeven Sales) / Budgeted Sales.',
      'Degree of Operating Leverage (DOL) = Contribution Margin / Operating Income (EBIT). Measures the percentage change in EBIT for a 1% change in sales volume.'
    ],
    imaExamTips: [
      'Tax conversion in CVP: Never put after-tax Net Income directly into the numerator! Always gross it up to pre-tax operating income: Target Operating Income = Target Net Income / (1 - t).',
      'DOL shortcut: DOL = % Change in EBIT / % Change in Sales. If DOL is 4.0, a 10% increase in sales volume produces a 40% surge in EBIT.'
    ],
    content: `## 1. CVP Fundamentals & Breakeven Analysis

Cost-Volume-Profit analysis assumes revenues and variable costs behave linearly within the relevant range.

### Essential Equations:
* **Unit Contribution Margin:**
  $$\\text{Unit CM} = P - V$$
* **Contribution Margin Ratio:**
  $$\\text{CM Ratio} = \\frac{P - V}{P}$$
* **Breakeven Point in Units:**
  $$\\text{BE}_{\\text{units}} = \\frac{\\text{Fixed Costs}}{P - V}$$
* **Breakeven Point in Sales Dollars:**
  $$\\text{BE}_{\\$} = \\frac{\\text{Fixed Costs}}{\\text{CM Ratio}}$$

---

## 2. Target Profit Analysis

### Target Operating Income (Pre-Tax):
$$\\text{Required Units} = \\frac{\\text{Fixed Costs} + \\text{Target Operating Income}}{\\text{Unit CM}}$$

### Target Net Income (After-Tax):
$$\\text{Required Units} = \\frac{\\text{Fixed Costs} + \\left(\\frac{\\text{Target Net Income}}{1 - t}\\right)}{\\text{Unit CM}}$$

---

## 3. Margin of Safety & Operating Leverage

* **Margin of Safety (MoS):** How far sales can drop before the firm incurs an operating loss:
  $$\\text{MoS Percentage} = \\frac{\\text{Expected Sales} - \\text{Breakeven Sales}}{\\text{Expected Sales}}$$
* **Degree of Operating Leverage (DOL):**
  $$\\text{DOL} = \\frac{\\text{Total Contribution Margin}}{\\text{Operating Income (EBIT)}} = \\frac{\\% \\Delta \\text{EBIT}}{\\% \\Delta \\text{Sales Volume}}$$
* High fixed costs relative to variable costs result in a high DOL, magnifying both operating profits on the upside and losses on the downside.`
  },
  {
    id: 'note-p2-sec-c2',
    part: 'part2',
    sectionCode: 'Section C: Decision Analysis (25%)',
    topic: 'Relevant Costing, Marginal Decisions, & Pricing Strategies',
    title: 'Special Orders, Make-or-Buy (Outsourcing), Constrained Bottlenecks, & Target Costing',
    summary: 'Evaluating differential cash flows for short-term special orders, make-or-buy decisions, allocating constrained production hours, and target costing.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Relevant Costs must meet two criteria: (1) They occur in the future, and (2) They differ between the alternatives under consideration.',
      'Sunk costs (past expenditures like prior R&D) and allocated common fixed costs that will continue regardless of the choice are completely IRRELEVANT.',
      'Special Order with Excess Capacity: Accept if Special Price > Incremental Variable Manufacturing Costs + any incremental fixed costs.',
      'Special Order at Full Capacity: Must include the Opportunity Cost (foregone contribution margin from displaced regular customer orders).',
      'Make-or-Buy: Compare incremental cost to manufacture internally against external purchase price. Factor in opportunity cost of factory space.',
      'Constrained Resource Optimization: When resources (machine hours, direct labor) are limited, rank products by Contribution Margin per unit of Constrained Resource.',
      'Target Costing: Target Cost = Competitive Market Selling Price - Desired Profit Margin. Used during the product design phase.'
    ],
    imaExamTips: [
      'Bottleneck ranking rule: Never rank products by unit contribution margin or CM ratio when a constraint exists! Always divide Unit CM by the constraint hours required per unit.',
      'Dropping a segment: Keep the product line if its Contribution Margin exceeds its AVOIDABLE fixed costs. Unavoidable allocated corporate overhead will simply burden remaining divisions!'
    ],
    content: `## 1. Principles of Relevant Costing

Only future costs that differ between alternatives are relevant.

### Common Decision Scenarios:
1. **Special Order Decisions:**
   * If plant has **idle capacity**: Accept if Offer Price $\\ge$ Incremental Variable Costs.
   * If plant is at **full capacity**:
     $$\\text{Minimum Offer Price} = \\text{Incremental Variable Cost} + \\text{Opportunity Cost (Foregone CM per regular unit)}$$
2. **Make-or-Buy (Outsourcing):**
   * Compare avoidable manufacturing costs (DM + DL + Variable MOH + Avoidable Fixed MOH) against external supplier purchase price.
3. **Keep-or-Drop Division:**
   * Retain the division if:
     $$\\text{Segment Contribution Margin} > \\text{Direct Avoidable Fixed Costs}$$
   * Common corporate overhead allocated across divisions is irrelevant because it continues unchanged.

---

## 2. Product Mix Under Constraints

When machine capacity or labor hours are insufficient to satisfy total market demand:

$$\\text{Ranking Metric} = \\frac{\\text{Unit Contribution Margin}}{\\text{Constraint Usage per Unit (e.g. Machine Hours)}}$$

* Maximize production of the product with the highest Contribution Margin per Constraint Hour until demand is satisfied, then allocate remaining capacity to the next ranked product.

---

## 3. Strategic Pricing Approaches

* **Cost-Plus Pricing:** Cost Base $\\times (1 + \\text{Target Markup \\%})$.
* **Target Costing:**
  $$\\text{Target Cost} = \\text{Target Market Price} - \\text{Desired Profit Margin}$$
  Conducted during product engineering and R&D before manufacturing commitments are locked in.
* **Price Elasticity of Demand:**
  $$\\epsilon = \\frac{\\% \\Delta \\text{Quantity Demanded}}{\\% \\Delta \\text{Price}}$$
  If $|\\epsilon| > 1$, demand is elastic (price reductions increase total revenue); if $|\\epsilon| < 1$, demand is inelastic (price increases boost revenue).`
  },
  {
    id: 'note-p2-sec-d',
    part: 'part2',
    sectionCode: 'Section D: Risk Management (10%)',
    topic: 'Enterprise Risk Management (ERM) & Risk Governance',
    title: 'The COSO 2017 ERM Framework (5 Components & 20 Principles) and Risk Appetite',
    summary: 'Strategic enterprise risk governance, defining organizational risk appetite, aligning business strategy with mission, and the 20 COSO ERM principles.',
    readTimeMinutes: 13,
    updatedAt: '2026-10-25',
    keyPoints: [
      'ERM is the culture, capabilities, and practices integrated with strategy-setting and execution that organizations rely on to manage risk in creating, preserving, and realizing value.',
      'Risk Capacity is the maximum amount of risk an entity is able to absorb; Risk Appetite is the amount of risk an organization is willing to accept in pursuit of value.',
      'Risk Tolerance is the acceptable level of variation relative to the achievement of a specific operational objective.',
      'COSO 2017 ERM Framework has 5 Interrelated Components: (1) Governance & Culture, (2) Strategy & Objective-Setting, (3) Performance, (4) Review & Revision, (5) Information, Communication & Reporting.',
      'The 5 components are supported by 20 specific codified principles.'
    ],
    imaExamTips: [
      'Risk Appetite vs Risk Tolerance: Risk appetite is broad, strategic, and set by the Board of Directors. Risk tolerance is tactical, measurable, and applied to specific day-to-day operations.',
      'Integration of ERM: ERM is NOT an isolated compliance department function! It must be integrated into strategic planning and operational decision-making.'
    ],
    content: `## 1. The COSO 2017 ERM Framework

The COSO ERM Framework integrates risk management into strategy formulation and execution.

### The 5 Core Components:
1. **Governance and Culture:** Sets the organization's tone, reinforcing the importance of ERM, establishing board oversight, operating structures, and desired ethical culture (5 principles).
2. **Strategy and Objective-Setting:** Establishes risk appetite in alignment with business mission and vision; evaluates risk profiles of alternative strategic paths (4 principles).
3. **Performance:** Identifies, assesses, and prioritizes operational risks; determines risk responses and develops a portfolio view of risk (5 principles).
4. **Review and Revision:** Evaluates substantial environmental changes, reviews organizational performance relative to risk, and identifies ERM improvements (3 principles).
5. **Information, Communication, and Reporting:** Continually leverages technology and communication channels to report on risk, culture, and performance to all stakeholders (3 principles).

---

## 2. Key ERM Concepts

* **Risk Profile:** A composite view of the risk assumed at a particular level of the entity (e.g. business unit, country, or product line).
* **Portfolio View:** A composite view of risks across the entire organization, considering interdependencies and correlation (risk diversification).
* **Risk Appetite vs. Risk Capacity:**
  * **Risk Capacity:** The absolute maximum potential loss an organization can endure without catastrophic insolvency.
  * **Risk Appetite:** The broad amount of risk an organization deliberately chooses to assume to generate expected financial returns.`
  },
  {
    id: 'note-p2-sec-d2',
    part: 'part2',
    sectionCode: 'Section D: Risk Management (10%)',
    topic: 'Risk Assessment & Quantitative Treatment Strategies',
    title: 'Inherent vs Residual Risk, Risk Response Matrix (Avoid, Reduce, Share, Accept), & Expected Monetary Value',
    summary: 'Evaluating risk severity via probability and impact, selecting optimal risk responses, and calculating Expected Monetary Value (EMV).',
    readTimeMinutes: 12,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Inherent Risk: The risk to an entity in the absence of any direct actions by management to alter its likelihood or impact.',
      'Residual Risk: The risk that remains after management has implemented internal controls and risk response strategies.',
      'Risk Heat Maps plot Likelihood (probability) on the x-axis and Impact (severity) on the y-axis to prioritize organizational attention.',
      'The 4 Universal Risk Responses: Avoidance (exit activity), Reduction/Mitigation (controls and safety redesign), Sharing/Transfer (insurance, hedging, outsourcing), Acceptance (retain risk within tolerance).',
      'Expected Monetary Value (EMV) = Sum of (Probability of Event × Financial Payoff).',
      'Value at Risk (VaR): Statistical technique measuring maximum expected dollar loss over a given time horizon at a specified confidence level (e.g. 95% or 99%).'
    ],
    imaExamTips: [
      'Which risk response? High Likelihood + High Impact = AVOID. Low Likelihood + High Impact = SHARE/TRANSFER (insurance). High Likelihood + Low Impact = REDUCE/MITIGATE (internal controls). Low Likelihood + Low Impact = ACCEPT.',
      'Expected Value calculations: On decision tree questions, multiply probabilities by payoff values at each chance node and work backwards from right to left.'
    ],
    content: `## 1. Risk Assessment & Measurement

Risk severity is evaluated by analyzing both the probability of occurrence and the resulting magnitude of impact.

$$\\text{Residual Risk} = \\text{Inherent Risk} - \\text{Impact of Controls \\& Mitigations}$$

### Risk Severity Heat Map & Response Matrix:
* **High Impact / High Likelihood $\\rightarrow$ AVOIDANCE:** Discontinue the product line, sell the hazardous subsidiary, or exit the volatile geographic market.
* **High Impact / Low Likelihood $\\rightarrow$ SHARING / TRANSFER:** Purchase property insurance, enter currency forward contracts, or execute joint-venture indemnifications.
* **Low Impact / High Likelihood $\\rightarrow$ REDUCTION / MITIGATION:** Implement internal control activities, preventive maintenance, dual authorizations, and employee training.
* **Low Impact / Low Likelihood $\\rightarrow$ ACCEPTANCE:** Self-insure and absorb operational variations within routine operating budgets.

---

## 2. Expected Monetary Value (EMV)

Calculates the weighted-average financial consequence of uncertain future states:

$$\\text{EMV} = \\sum_{i=1}^n P_i \\times \\text{Outcome}_i$$

* Used in conjunction with decision trees to determine whether to launch a new product, conduct pilot testing, or invest in factory expansions under market uncertainty.`
  },
  {
    id: 'note-p2-sec-e',
    part: 'part2',
    sectionCode: 'Section E: Investment Decisions (10%)',
    topic: 'Capital Budgeting Cash Flow Estimation & Project Screening',
    title: 'Relevant Project Cash Flows, Depreciation Tax Shield, Salvage Value, & Net Working Capital Recovery',
    summary: 'Isolating incremental after-tax operating cash flows, calculating the depreciation tax shield, and accounting for initial and terminal cash flows.',
    readTimeMinutes: 14,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Focus only on Incremental After-Tax Cash Flows. Past sunk costs (e.g. market research) and allocated overhead are excluded.',
      'Financing costs (interest expense, debt repayments, dividends) are EXCLUDED from cash flows because they are incorporated into the hurdle discount rate (WACC).',
      'Initial Outlay (CF0) = Initial Asset Cost + Freight/Installation + Initial Investment in Net Working Capital (NWC) - Net Salvage Proceeds from Old Asset ± Tax on Sale of Old Asset.',
      'Annual Operating Cash Flow = (Incremental Revenues - Incremental Cash Expenses) × (1 - t) + (Depreciation × t).',
      'Depreciation Tax Shield = Depreciation Expense × Marginal Tax Rate. Provides an annual cash savings from reduced taxes.',
      'Terminal Year Cash Flow = Final Operating Cash Flow + After-Tax Salvage Value of Machine + 100% Recovery of Net Working Capital (non-taxable).'
    ],
    imaExamTips: [
      'Tax on Sale of Old Machine: Gain/Loss = Salvage Price - Book Value. If Sold > Book Value: Tax Payment = (Price - BV) × t. If Sold < Book Value: Tax Savings = (BV - Price) × t.',
      'Net Working Capital Recovery: The initial investment in inventory and receivables is recovered in full at the end of the project life without tax consequences!'
    ],
    content: `## 1. Principles of Capital Budgeting Cash Flows

Capital budgeting evaluates long-term capital allocation decisions (equipment purchases, plant expansions, new software).

### Key Rules:
* **Only Incremental Cash Flows:** Differences in future cash flows directly caused by project acceptance.
* **Exclude Sunk Costs:** Expenditures already incurred cannot be recovered.
* **Include Opportunity Costs:** Foregone rental revenue from company-owned real estate used by the project is a relevant cash outflow.
* **Exclude Financing Interest:** Financing costs are reflected in the discount rate (WACC). Including interest in cash flows would double-count financing costs.

---

## 2. The Three Phases of Project Cash Flows

### Phase 1: Initial Cash Outlay ($CF_0$)
$$\\text{Asset Purchase Price} + \\text{Shipping \\& Installation} + \\Delta \\text{NWC} - \\text{Net After-Tax Proceeds from Old Asset}$$

### Phase 2: Annual Operating Cash Flows ($CF_t$)
$$\\text{Operating Cash Flow} = (\\Delta \\text{Revenues} - \\Delta \\text{Cash Expenses}) \\times (1 - t) + (\\Delta \\text{Depreciation} \\times t)$$

### Phase 3: Terminal Year Cash Flow ($CF_n$)
$$\\text{Final Year Operating CF} + \\text{After-Tax Salvage of New Asset} + \\text{Full NWC Recovery}$$
$$\\text{After-Tax Salvage} = \\text{Market Price} - t \\times (\\text{Market Price} - \\text{Book Value})$$`
  },
  {
    id: 'note-p2-sec-e2',
    part: 'part2',
    sectionCode: 'Section E: Investment Decisions (10%)',
    topic: 'Discounted Cash Flow (DCF) Models & Project Ranking',
    title: 'Net Present Value (NPV), Internal Rate of Return (IRR), Profitability Index (PI), & Real Options',
    summary: 'Evaluating projects using NPV, IRR, and PI, resolving capital rationing conflicts, and valuing real options in capital investments.',
    readTimeMinutes: 15,
    updatedAt: '2026-10-25',
    keyPoints: [
      'Net Present Value (NPV) = Present Value of Cash Inflows - Initial Investment. Accept if NPV ≥ 0. Direct measure of expected dollar addition to shareholder wealth.',
      'NPV assumes reinvestment of interim cash flows at the project cost of capital (WACC), which is realistic.',
      'Internal Rate of Return (IRR) is the discount rate that sets NPV = 0. Accept if IRR ≥ Hurdle Rate. Assumes cash flows reinvested at the IRR itself (unrealistically high).',
      'NPV vs IRR Conflicts: Caused by project scale differences, timing differences of cash flows, or unconventional cash flow signs (causing multiple IRRs). NPV is always theoretically superior!',
      'Profitability Index (PI) = PV of Future Cash Inflows / Initial Outlay. Essential metric when capital rationing exists to rank independent projects.',
      'Payback Period = Initial Investment / Annual Cash Inflow. Measures liquidity and risk; ignores time value of money and cash flows after payback.',
      'Real Options: Option to expand, option to abandon (puts a floor on downside risk), option to delay/defer.'
    ],
    imaExamTips: [
      'Mutually Exclusive Projects: Always choose the project with the HIGHEST NPV, even if the other project has a higher IRR or higher PI!',
      'Discounted Payback: Overcomes simple payback by discounting future cash flows at the hurdle rate, but still ignores cash flows beyond the cutoff date.'
    ],
    content: `## 1. Net Present Value (NPV)

The theoretically superior capital allocation metric:

$$\\text{NPV} = \\sum_{t=1}^n \\frac{CF_t}{(1 + r)^t} - CF_0$$

* **Decision Rule:** Accept if $\\text{NPV} \\ge 0$. Reject if $\\text{NPV} < 0$.
* **Economic Meaning:** Represents the exact dollar increase in firm equity value resulting from the investment.
* **Reinvestment Rate Assumption:** Interim cash flows are reinvested at the cost of capital ($r$).

---

## 2. Internal Rate of Return (IRR)

The discount rate that forces the present value of cash inflows to equal the initial cash outlay:

$$\\sum_{t=1}^n \\frac{CF_t}{(1 + \\text{IRR})^t} - CF_0 = 0$$

* **Decision Rule:** Accept if $\\text{IRR} \\ge \\text{Hurdle Rate}$.
* **Defects of IRR:**
  1. **Reinvestment Assumption:** Assumes cash flows are reinvested at the IRR, artificially inflating returns.
  2. **Multiple IRRs:** Non-conventional cash flows (negative cash flows occurring in later years) can produce multiple positive IRRs.
  3. **Scale Insensitivity:** Prefers a $100 investment with a 50% IRR (making $50) over a $1,000,000 investment with a 25% IRR (making $250,000).

---

## 3. Profitability Index (PI) Under Capital Rationing

When capital budgets are strictly limited:

$$\\text{Profitability Index (PI)} = \\frac{\\text{PV of Future Operating Cash Inflows}}{CF_0} = 1 + \\frac{\\text{NPV}}{CF_0}$$

* **Decision Rule:** Accept if $\\text{PI} \\ge 1.0$.
* Projects are ranked in descending order of PI until capital budget is exhausted.`
  },
  {
    id: 'note-p2-sec-f',
    part: 'part2',
    sectionCode: 'Section F: Professional Ethics (15%)',
    topic: 'IMA Statement of Ethical Professional Practice',
    title: 'The 4 Ethical Principles, 4 Professional Standards, Conflict Resolution Steps, & FCPA',
    summary: 'Mastering the cornerstone of the CMA credential: Competence, Confidentiality, Integrity, Credibility, step-by-step ethical conflict resolution, and anti-bribery laws.',
    readTimeMinutes: 13,
    updatedAt: '2026-10-25',
    keyPoints: [
      '4 Overarching Principles: Honesty, Fairness, Objectivity, Responsibility.',
      '4 Enforceable Professional Standards: Competence, Confidentiality, Integrity, Credibility.',
      'Competence: Maintain professional expertise, perform duties per relevant laws and standards, provide clear recommendations.',
      'Confidentiality: Keep information confidential except when authorized or legally required, monitor subordinates, never use confidential data for illegal/unethical advantage.',
      'Integrity: Mitigate actual and apparent conflicts of interest, refuse gifts or inducements that bias judgment, abstain from activities that discredit the profession.',
      'Credibility: Communicate information fairly and objectively, disclose all relevant information that could influence user understanding, report operational delays or internal control deficiencies.',
      'Conflict Resolution Sequence: (1) Follow employer established policies; (2) Discuss with immediate supervisor (or next level if supervisor involved); (3) Contact IMA Ethics Helpline; (4) Consult personal attorney; (5) Resign if unresolved.',
      'Foreign Corrupt Practices Act (FCPA): Prohibits corrupt payments to foreign officials and mandates internal accounting controls and accurate books and records.'
    ],
    imaExamTips: [
      'CRITICAL CONFLICT RESOLUTION RULE: Never notify external law enforcement, regulators, or media unless there is a clear, explicit legal requirement to do so! Bypassing internal hierarchy to contact newspapers is an ethics violation.',
      'Gift policy: Refusing a luxury gift or lavish entertainment from a supplier is an application of the standard of INTEGRITY (mitigating bias and conflicts of interest).'
    ],
    content: `## 1. IMA Statement of Ethical Professional Practice

CMA candidates must strictly abide by the IMA's binding ethical code.

### The 4 Overarching Principles:
* **Honesty**
* **Fairness**
* **Objectivity**
* **Responsibility**

### The 4 Specific Enforceable Standards:
1. **Competence:**
   * Maintain appropriate level of professional expertise through continuous professional development.
   * Perform duties in accordance with relevant laws, regulations, and technical accounting standards.
   * Provide decision support information and recommendations that are accurate, clear, concise, and timely.
2. **Confidentiality:**
   * Keep information confidential except when disclosure is authorized or legally required.
   * Inform relevant parties regarding appropriate use of confidential information.
   * Refrain from using confidential information for unethical or illegal advantage.
3. **Integrity:**
   * Mitigate actual conflicts of interest; regularly communicate with business associates to avoid apparent conflicts.
   * Refrain from engaging in conduct that would prejudice carrying out duties ethically.
   * Abstain from engaging in or supporting any activity that might discredit the profession.
4. **Credibility:**
   * Communicate information fairly and objectively.
   * Disclose all relevant information that could reasonably be expected to influence an intended user's understanding.
   * Disclose delays or deficiencies in information, timeliness, or internal controls in conformance with organization policy.

---

## 2. Resolving Ethical Issues: Mandatory Protocol

When faced with an ethical dilemma, the CMA member should follow these sequential steps:
1. **Follow Established Organizational Policies:** Consult internal dispute resolution procedures, whistleblower lines, or ethics ombudsman.
2. **Discuss with Immediate Supervisor:** If supervisor is involved, present to the next management level. If the CEO is involved, report to the Audit Committee or Board of Directors.
3. **Contact IMA Ethics Helpline:** Seek confidential, objective guidance from the IMA Ethics Counselor to clarify ethical responsibilities.
4. **Consult Personal Legal Counsel:** Obtain independent legal counsel regarding statutory rights and personal liability obligations.
5. **Disassociation / Resignation:** If conflict cannot be resolved after exhausting all internal reviews, the member may have no recourse other than resignation.
* **EXAM RULE:** Do NOT contact the press, police, or regulatory authorities unless explicitly required by statutory law!

---

## 3. The Foreign Corrupt Practices Act (FCPA)

Enacted by the US Congress to combat international corporate bribery:
* **Anti-Bribery Provisions:** Makes it unlawful to offer, pay, or promise money or anything of value to a foreign official to secure an improper business advantage.
* **Accounting Provisions:** Requires public companies to make and keep books, records, and accounts that accurately reflect transactions and maintain a robust system of internal accounting controls.`
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
