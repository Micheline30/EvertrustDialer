// ══════════════════════════════════════════════════════════════════
// ILLINOIS MUTUAL DI — UW LOOKUP PATCH
// Evertrust Legacy Protection Group Dialer
// Drop this file's contents into a <script> tag at the END of <body>
// OR reference it: <script src="evertrust_dialer_im_di_patch.js"></script>
// ══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. INJECT IM DI DATA INTO uwData ────────────────────────────
  if (typeof uwData !== 'undefined') {
    uwData['illinois_mutual_di'] = {
      accent: '#003A70',
      sections: [
        {
          title: 'DI105 Issue Parameters',
          items: [
            { q: 'Issue ages',                    a: '18–60 (To Age 67 plan: up to age 60)' },
            { q: 'Min earned income',             a: '$600/month' },
            { q: 'Min issue',                     a: '$200/month' },
            { q: 'Max issue Classes 5/3/2/1',     a: '$10,000/month' },
            { q: 'Max issue Class 4 / Chiro',     a: '$8,000/month' },
            { q: 'Max participation limit',       a: '$12,000/month ($10K for Class 4/Chiro)' },
            { q: 'Guaranteed renewable',          a: 'To age 67' },
            { q: 'Conditionally renewable',       a: 'To age 75' },
            { q: '24-hr coverage',                a: 'On and off the job' },
            { q: 'NOT available in',              a: '❌ AK, CA, DC, HI, NM, NY, VT' },
          ]
        },
        {
          title: 'Occupation Classes',
          items: [
            { q: 'Class 5 — SIDI A',  a: 'Admin/Professional/Clerical — no manual labor. Examples: Accountants, Attorneys, CPA, Physician GP, Pharmacist, RN (clinic only)' },
            { q: 'Class 4 — SIDI B',  a: 'Specialized Technical — physical dexterity, ≤10% manual labor. MAX $8K/mo. Examples: Surgeon, Dentist, CRNA, Cardiologist, Oral Surgeon' },
            { q: 'Class 3 — SIDI B',  a: 'Semi-Pro/Supervisory — on-site supervision, moderate dexterity. Examples: Dental Hygienist, Medical Tech, PT, RN hospital, Pharmacy Tech' },
            { q: 'Class 2 — SIDI C',  a: 'Skilled Trade — continual manual labor/dexterity. Examples: Carpenter, Electrician, Plumber, HVAC, LPN, Paramedic, Mechanic, Cosmetologist' },
            { q: 'Class 1 — SIDI C',  a: 'Heavy Manual/Hazardous — max 5-Year BP. Examples: Chiropractor, Factory Worker, Firefighter, Police Officer, Roofer, Welder, CNA' },
            { q: 'NI — Not Insurable', a: '❌ Pilots, Air Traffic Control, Armed Forces (all branches), SWAT/Bomb Squad, Secret Service, Elected Officials, Day Traders, UPS Drivers, Longshoremen' },
            { q: '⚠️ Key rule',        a: 'Class is based on ACTUAL DUTIES performed — not job title alone. UW has final approval on all classifications.' },
          ]
        },
        {
          title: 'Benefit and Elimination Periods',
          items: [
            { q: 'Available benefit periods',    a: '6 Month · 1 Year · 2 Year · 5 Year · 10 Year · To Age 67' },
            { q: 'Classes 5/4/3/2',              a: '✅ All 6 benefit periods available' },
            { q: 'Class 1',                      a: '6 Mo, 1 Yr, 2 Yr, 5 Yr ONLY — ❌ No 10-Year or To Age 67' },
            { q: 'Ages 56–60',                   a: '❌ 5-Year and 10-Year NOT available — only 6 Mo, 1 Yr, 2 Yr, To Age 67' },
            { q: 'Ages 61+',                     a: 'To Age 67 benefit period ONLY' },
            { q: 'Elimination periods',          a: '30 · 60 · 90 · 180 · 365 · 730 days' },
            { q: 'Min 60-day elim states',       a: 'CO, CT, DE, KS, SD' },
            { q: 'Min 90-day elim states',       a: 'MD, MA, NJ, OR, RI, WA' },
            { q: '730-day NOT available in',     a: 'AR, CT, IA, ID, KS, MD, ME, NJ, OK, PA, SC, TX, UT, VA, WA, WV' },
          ]
        },
        {
          title: 'Total Disability Definition',
          items: [
            { q: 'First 24 months',              a: 'Cannot perform substantial duties of OWN occupation AND not engaged in any other occupation for wage or profit' },
            { q: 'After 24 months',              a: 'Cannot perform substantial duties of ANY occupation (given education, training, experience) and not working for wage or profit' },
            { q: '2-Yr Pure Own Occ 9255',       a: '✅ All classes, ages 18-60 — removes "not working elsewhere" requirement for 24 months. ❌ Not LA or UT. Required in FL.' },
            { q: '5-Yr Pure Own Occ 9256',       a: '✅ Classes 5/4/3, ages 18-60 — own occ only for 60 months. Must also purchase 9257 or 9258. ❌ Not LA or UT.' },
            { q: 'To Age 67 Own Occ Ext 9258',   a: '✅ Classes 5/4/3 — own occ to age 67. Requires To Age 67 benefit period. ❌ Not LA or UT.' },
            { q: '⚠️ Florida required',           a: 'FL applicants MUST purchase 2-Yr or 5-Yr Pure Own Occ rider' },
          ]
        },
        {
          title: 'Policy Provisions',
          items: [
            { q: 'Survivor Benefit',           a: '4× monthly benefit paid to beneficiary (3× in MD) — insured dies during TD after 6+ consecutive months of TD payments' },
            { q: 'Waiver of Premium',          a: 'Retroactive — 90-day TD triggers full WOP + refund of first 3 months of premiums' },
            { q: 'Partial Disability',         a: 'Up to 6 months per period of disability' },
            { q: 'Presumed Total Disability',  a: 'Automatic TD for: total loss of both eyes, both ears, speech, both hands, both feet, or one hand and one foot' },
            { q: 'Recurrent Disability',       a: 'Same or related cause = continuation of claim — unless 6+ months of full-time work in between' },
            { q: 'Organ Donor',                a: 'No elimination period — policy must be in force 6 months. ❌ Not ID.' },
            { q: 'Retraining & Home Mod',      a: 'Up to 6× monthly benefit — after 6+ continuous months of TD benefits paid' },
            { q: 'Foreign Travel',             a: '90-day limit for disability occurring outside US/Canada/Mexico' },
            { q: 'Pre-Ex Condition Lookback',  a: '2-year standard | 1 year: MN, MT, NC, ND, VA | 9 months: NH' },
          ]
        },
        {
          title: 'Optional Riders',
          items: [
            { q: 'Return of Premium 9266',       a: 'Ages 18-55, all classes — 100% premiums returned at 65-67 minus benefits paid. ❌ Not CT/MA. ❌ Not with 365/730-day elim. Tip: strong close for healthy prospects.' },
            { q: 'COLA Rider 9260',              a: 'Ages 18-60, Classes 5/4/3/2 — CPI-based benefit increase starting 2nd year of TD. ✅ Only with 5-Yr, 10-Yr, or To Age 67 benefit periods.' },
            { q: 'ADL Rider 9259',               a: 'Ages 18-60, all classes — pays if 2+ ADLs are impaired OR cognitive impairment exists. ❌ Not CT. ✅ With 2-Yr, 5-Yr, 10-Yr, To Age 67.' },
            { q: 'GIO Rider 9267',               a: 'Ages 18-45, all classes — 5 purchase options, each 24+ months apart, before age 55. Option amounts: $100–$600/month.' },
            { q: 'Non-Cancelable 9251',          a: 'Ages 18-60, Classes 5/4/3 ONLY — locks in premium for life. Guaranteed premium + guaranteed renewable.' },
            { q: 'Residual Disability 9261',     a: 'Ages 18-60, Classes 5/4/3/2 — 20%+ income loss qualifies. Min $2,000/mo income required. ✅ With 2-Yr or longer benefit periods.' },
            { q: 'Integrated Monthly Benefit 9264', a: 'Ages 18-60, all classes — extra monthly benefit offset by SS/workers comp received. ❌ Not CT/NJ.' },
            { q: 'Auto Increase 9252',           a: 'Ages 18-50, all classes — automatic 3%/yr for first 5 policy anniversaries. Not available if benefit < $1,000/mo.' },
            { q: 'Retroactive Injury 9253',      a: 'Ages 18-60, all classes — pays benefits from date of injury if TD begins within 30 days of accident.' },
            { q: 'Full Mental Nervous 9265',     a: 'Ages 18-60, all classes — removes 24-month cap for mental/nervous conditions and substance abuse. ❌ Not CT.' },
          ]
        },
        {
          title: 'BE105 Business Expense Power®',
          items: [
            { q: 'Issue ages',           a: '18–60 ONLY — BE105 stops at 60; DI105 continues to 67' },
            { q: 'Benefit periods',      a: '12 months · 18 months · 24 months' },
            { q: 'Elimination periods',  a: '30 · 60 · 90 days' },
            { q: 'Max issue',            a: '100% of eligible monthly biz expenses — max $10,000/mo ($8K for Class 4/Chiro)' },
            { q: 'Eligibility',          a: 'Business in existence 1+ year OR 3+ years in same occupation. Insured must be full-time active owner/manager.' },
            { q: 'Eligible expenses',    a: 'Rent/lease, utilities, employee salaries (not insured/replacement/family <3 mos), equipment rental, billing fees, payroll taxes, property insurance, professional dues, depreciation' },
            { q: 'Tax note',             a: 'Premiums generally deductible as business expense — benefits offset covered expenses. Consult tax advisor.' },
            { q: 'Conversion right',     a: 'Before age 60 — right to convert to guaranteed renewable DI policy without new evidence of insurability' },
          ]
        },
        {
          title: 'WSA07 Accident Insurance',
          items: [
            { q: 'Issue ages',              a: '18-69 primary/spouse · 0-21 child (0-23 if student)' },
            { q: 'Coverage',                a: '24-hr on and off job accidents · guaranteed renewable for life' },
            { q: 'Benefit levels',          a: 'Economy · Standard · Preferred · Premium' },
            { q: 'Eligibility',             a: 'Must apply for a DI plan. May still issue WSA07 even if DI is declined (if non-medical UW requirements met).' },
            { q: 'NOT available',           a: '❌ CT and NH when sold with DI105' },
            { q: 'Catastrophic Rider 9245', a: '$100K for insured / $50K spouse / $50K child — 180-day elim period. ❌ Not ID/MA/NE/PA/TN/UT.' },
            { q: 'Wellness Rider 9243',     a: '$50–$200/yr for qualifying health screening. ❌ Not GA/MA/MI/NJ/UT/VA/WA.' },
            { q: '⚠️ Does NOT cover',       a: 'Sickness — not a replacement for major medical or Medicare supplement — does NOT meet ACA minimum essential coverage.' },
          ]
        },
        {
          title: 'Sales Concepts and Scripts',
          items: [
            { q: 'M.U.G.® Plan',            a: 'Mortgage + Utilities + Groceries = expenses that MUST be paid even during disability. "Which of these stops if your paycheck stops?"' },
            { q: 'M.U.G. qualifying question', a: '"If you got sick or injured and couldn\'t work for 6 months — how would you pay your mortgage? Your utilities? Your groceries?"' },
            { q: 'Job A vs. Job B close',    a: '"Job A pays $3,000/mo with no DI. Job B pays $2,950/mo with DI. If disabled: Job A = $0/mo. Job B = $2,000/mo in benefits. Which job would you choose right now?"' },
            { q: 'ROP close',                a: '"If you never make a claim, you get ALL your money back at 65 — tax free. If you DO make a claim, the policy paid exactly what it was supposed to. You literally cannot lose either way."' },
            { q: 'Budget objection',         a: '"Less than $2 a day protects your entire paycheck. One month of disability can wipe out years of savings — and most disabilities last longer than 90 days."' },
            { q: 'Group plan objection',     a: '"Employer DI only covers 60% of base salary AND disappears the day you leave that job. This policy is yours permanently — regardless of where you work."' },
            { q: 'Golden qualifier',         a: '"If we find a plan that fits your needs and your budget — is there any other reason you would NOT want to submit an application to see if you qualify?"' },
          ]
        },
        {
          title: 'Illinois Mutual Contacts',
          items: [
            { q: 'DI Sales Desk',     a: '(800) 437-7355, Option 2 · Sales@IllinoisMutual.com' },
            { q: 'DI Underwriting',   a: '(800) 437-7355, ext. 790 · Underwriting@IllinoisMutual.com' },
            { q: 'Agent Contracting', a: '(800) 437-7355, ext. 748' },
            { q: 'Agent Portal',      a: 'Agent.IllinoisMutual.com — eApps, illustrations, forms' },
            { q: '5G Quote Tool',     a: 'www.5GQUOTE.com — quick quotes, any device, any time' },
            { q: 'Key Form Numbers',  a: 'UW Guide: A9637 · Medical Guide: A9641 · Occ Guide: A9761' },
            { q: 'Financial Strength', a: '$1.57 billion total assets (12/31/25) · 115+ years in business · Mutual company · Family-operated — 5 generations' },
          ]
        },
      ]
    };
  }

  // ── 2. INJECT IL MUTUAL DI BUTTON INTO UW LOOKUP HEADER ─────────
  const uwHdr = document.querySelector('#step9 .card-header');
  if (uwHdr) {
    const btn = document.createElement('button');
    btn.className = 'uw-prod-btn';
    btn.dataset.prod = 'illinois_mutual_di';
    btn.style.cssText = [
      'background:rgba(255,255,255,.15)',
      'color:#90EE90',
      'border:1px solid #90EE90',
      'border-radius:4px',
      'padding:5px 11px',
      'font-size:11px',
      'font-weight:700',
      'cursor:pointer',
      'margin-left:4px',
    ].join(';');
    btn.textContent = '🏛️ IL Mutual DI';
    btn.onclick = function () { uwSwitchProd('illinois_mutual_di', this); };
    uwHdr.appendChild(btn);
  }

});
// ── END ILLINOIS MUTUAL DI PATCH ────────────────────────────────────
