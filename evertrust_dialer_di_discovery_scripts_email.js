// ══════════════════════════════════════════════════════════════════════
// EVERTRUST DIALER — PATCH 2: DI DISCOVERY + DI SCRIPTS + DI EMAIL
// Drop this <script> tag at the END of <body> in your dialer HTML
// Requires: evertrust_dialer_im_di_patch.js already loaded (UW data)
// ══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ══════════════════════════════════════════════════════════════════
  // SECTION 1: DI DISCOVERY QUESTIONS — inject into Step 3
  // ══════════════════════════════════════════════════════════════════
  injectDIDiscovery();

  // ══════════════════════════════════════════════════════════════════
  // SECTION 2: DI SCRIPTS — inject into Step 10 Scripts Library
  // ══════════════════════════════════════════════════════════════════
  injectDIScripts();

  // ══════════════════════════════════════════════════════════════════
  // SECTION 3: DI QUOTE EMAIL — add button to lead header area
  // ══════════════════════════════════════════════════════════════════
  injectDIEmailButton();

});

// ══════════════════════════════════════════════════════════════════
// SECTION 1: DI DISCOVERY — Step 3 injection
// ══════════════════════════════════════════════════════════════════
function injectDIDiscovery() {
  // Find Step 3 card body — look for the discovery step container
  const step3 = document.querySelector('#step3');
  if (!step3) return;

  const cardBody = step3.querySelector('.card-body') || step3;

  // Build the DI discovery panel
  const diDiv = document.createElement('div');
  diDiv.id = 'di-discovery-panel';
  diDiv.style.cssText = 'margin-top:16px;';
  diDiv.innerHTML = `
    <div style="background:linear-gradient(135deg,#003A70,#1A4A8A);border-radius:10px;padding:11px 15px;display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:pointer;" onclick="toggleDIDiscovery()">
      <span style="font-size:16px;">🏛️</span>
      <div>
        <div style="color:white;font-size:12px;font-weight:700;letter-spacing:.4px;">DISABILITY INCOME — DISCOVERY QUESTIONS</div>
        <div style="color:rgba(255,255,255,.7);font-size:10px;margin-top:1px;">Illinois Mutual DI Qualifier · Click to expand/collapse</div>
      </div>
      <span id="di-disc-arrow" style="margin-left:auto;color:white;font-size:16px;transition:transform .2s;">▼</span>
    </div>
    <div id="di-discovery-body" style="display:block;">

      <!-- QUALIFYING OPENER -->
      <div class="di-disc-section" style="background:#F0F4F8;border-radius:9px;padding:12px 14px;margin-bottom:10px;border-left:4px solid #003A70;">
        <div class="di-disc-title" style="font-size:10px;font-weight:700;color:#003A70;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">📋 QUALIFYING OPENER</div>
        <div class="di-q" style="font-size:13px;color:#1A202C;line-height:1.75;cursor:pointer;padding:7px 10px;border-radius:7px;background:white;border:1px solid #CBD5E0;margin-bottom:6px;" onclick="copyDIQ(this)" title="Click to copy">
          "Before we go over your life insurance options, I want to ask you something that most agents never bring up — <strong>What happens to your family's income if YOU can't work for 6 months?</strong> Not if you pass away — but if you're sick or hurt and just can't go in. Does that conversation interest you?"
        </div>
        <div style="font-size:10px;color:#718096;font-style:italic;">👆 Click any script to copy it. This is your DI door-opener — use it right after the life insurance pitch.</div>
      </div>

      <!-- NEEDS DISCOVERY -->
      <div class="di-disc-section" style="background:white;border-radius:9px;padding:12px 14px;margin-bottom:10px;border:1px solid #CBD5E0;">
        <div class="di-disc-title" style="font-size:10px;font-weight:700;color:#1A4A8A;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">💰 INCOME & NEEDS QUESTIONS</div>
        <div class="di-q-list">
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#003A70;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">1</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Monthly Income</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"Roughly what's your monthly take-home income from work — the paycheck that your family depends on every month?"</div>
              <div style="margin-top:5px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                <span style="font-size:10px;color:#718096;">Record:</span>
                <input type="number" id="di-income" placeholder="$/month" style="border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;width:110px;">
                <span style="font-size:10px;color:#1B7A4E;font-weight:700;" id="di-income-hint"></span>
              </div>
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#003A70;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">2</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Mortgage / Rent</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"What's your mortgage or rent payment each month? Is that something you could skip for 3 months if your paycheck stopped?"</div>
              <input type="number" id="di-mortgage" placeholder="$/month" style="margin-top:5px;border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;width:110px;">
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#003A70;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">3</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Other Fixed Monthly Bills</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"If I add up your utilities, groceries, car payment, and insurance — what do you think those total per month? We're building your M.U.G.® number — Mortgage, Utilities, Groceries."</div>
              <input type="number" id="di-bills" placeholder="$/month" style="margin-top:5px;border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;width:110px;">
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;align-items:flex-start;">
            <span style="background:#003A70;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">4</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Emergency Savings Runway</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"If your income stopped completely tomorrow, how many months could your family keep up their current lifestyle on savings alone? Most families say 1–3 months."</div>
              <select id="di-savings-months" style="margin-top:5px;border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;">
                <option value="">Select...</option>
                <option value="1">Less than 1 month</option>
                <option value="2">1–2 months</option>
                <option value="3">3 months</option>
                <option value="6">4–6 months</option>
                <option value="12">6–12 months</option>
                <option value="12+">12+ months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- OCCUPATION QUALIFIER -->
      <div class="di-disc-section" style="background:white;border-radius:9px;padding:12px 14px;margin-bottom:10px;border:1px solid #CBD5E0;">
        <div class="di-disc-title" style="font-size:10px;font-weight:700;color:#C45911;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">💼 OCCUPATION & ELIGIBILITY</div>
        <div class="di-q-list">
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#C45911;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">5</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Type of Work</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"Tell me about your work — are you mainly sitting at a desk, or are you doing physical work on your feet most of the day? And do you work for an employer or are you self-employed?"</div>
              <div style="margin-top:5px;display:flex;gap:8px;flex-wrap:wrap;">
                <select id="di-work-type" style="border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;">
                  <option value="">Work type...</option>
                  <option value="desk">Desk/Office/Admin</option>
                  <option value="medical">Medical/Dental/Healthcare</option>
                  <option value="technical">Technical/Supervisory</option>
                  <option value="skilled">Skilled Trade (Carpenter, Plumber, etc.)</option>
                  <option value="heavy">Heavy Manual/Hazardous</option>
                  <option value="other">Other</option>
                </select>
                <select id="di-employment-type" style="border:1px solid #CBD5E0;border-radius:5px;padding:3px 8px;font-size:12px;">
                  <option value="">Employment...</option>
                  <option value="employed">W-2 Employee</option>
                  <option value="self">Self-Employed / Owner</option>
                  <option value="contract">1099 / Contract</option>
                </select>
              </div>
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#C45911;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">6</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Employer DI Coverage</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"Does your employer offer any short-term or long-term disability coverage through your job benefits? If so, how long does it pay and what percentage of your salary does it cover?"</div>
              <div id="di-employer-di-note" style="margin-top:5px;font-size:11px;background:#FFF3CD;border-left:3px solid #D69E2E;padding:5px 8px;border-radius:0 5px 5px 0;color:#7B5E00;display:none;">
                ⚠️ <strong>Key objection pre-handle:</strong> "Employer DI only covers 60% of your base salary — and the moment you leave that job or get laid off, the coverage disappears. This Illinois Mutual policy is <em>yours</em> permanently, no matter what happens with your employer."
              </div>
              <button onclick="document.getElementById('di-employer-di-note').style.display='block'" style="margin-top:5px;background:#FFF3CD;border:1px solid #D69E2E;border-radius:5px;padding:3px 10px;font-size:11px;color:#7B5E00;cursor:pointer;">💡 Show employer DI rebuttal</button>
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;align-items:flex-start;">
            <span style="background:#C45911;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">7</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">Past Disability / Claims</div>
              <div style="font-size:12px;color:#718096;line-height:1.6;">"Have you ever been out of work for an extended time due to an illness or injury — even a few weeks? And do you have any ongoing health conditions I should know about before we look at options for you?"</div>
            </div>
          </div>
        </div>
      </div>

      <!-- THE CLOSE -->
      <div class="di-disc-section" style="background:white;border-radius:9px;padding:12px 14px;margin-bottom:10px;border:1px solid #CBD5E0;">
        <div class="di-disc-title" style="font-size:10px;font-weight:700;color:#1B7A4E;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;">🎯 THE TRANSITION CLOSE</div>
        <div class="di-q-list">
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;border-bottom:1px solid #F0F4F8;align-items:flex-start;">
            <span style="background:#1B7A4E;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">8</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">The M.U.G.® Summary</div>
              <div class="di-q" style="font-size:12px;color:#1A202C;line-height:1.75;cursor:pointer;padding:7px 10px;border-radius:7px;background:#F0F4F8;border:1px solid #CBD5E0;" onclick="copyDIQ(this)" title="Click to copy" id="di-mug-script">
                "So let me make sure I understand your situation. Your mortgage is about [MORTGAGE]/month, and your basic living expenses on top of that are roughly [BILLS]/month. That's your M.U.G. number — what absolutely has to be paid no matter what. And you told me your savings would last about [SAVINGS] months. So if you got hurt today and couldn't work — you'd be behind on bills in [SAVINGS] months. That's what disability income insurance is designed to protect. Does it make sense to look at a plan that could cover that gap for less than a cup of coffee a day?"
              </div>
              <div style="font-size:10px;color:#718096;font-style:italic;margin-top:3px;">👆 Click to copy. Replace [BRACKETS] with actual numbers collected above.</div>
            </div>
          </div>
          <div class="di-q-item" style="display:flex;gap:10px;padding:7px 0;align-items:flex-start;">
            <span style="background:#1B7A4E;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:2px;">9</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:#1A202C;margin-bottom:2px;">The Golden Qualifier</div>
              <div class="di-q" style="font-size:12px;color:#1A202C;line-height:1.75;cursor:pointer;padding:7px 10px;border-radius:7px;background:#F0F4F8;border:1px solid #CBD5E0;" onclick="copyDIQ(this)" title="Click to copy">
                "If we can find a plan that fits your budget AND protects your income — is there any reason you would NOT want to go ahead and see if you qualify? I'll get you some numbers and we can take it from there."
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIVE MUG CALCULATOR -->
      <div id="di-mug-calc" style="background:linear-gradient(135deg,#003A70,#1A4A8A);border-radius:10px;padding:14px;margin-bottom:10px;display:none;">
        <div style="color:rgba(255,255,255,.8);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">🏠 M.U.G.® LIVE CALCULATOR</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;">
          <div style="background:rgba(255,255,255,.12);border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#48BB78;" id="mug-mort-display">$—</div>
            <div style="font-size:10px;color:rgba(255,255,255,.7);margin-top:2px;">🏠 Mortgage</div>
          </div>
          <div style="background:rgba(255,255,255,.12);border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:22px;font-weight:800;color:#63B3ED;" id="mug-bills-display">$—</div>
            <div style="font-size:10px;color:rgba(255,255,255,.7);margin-top:2px;">💡 Bills</div>
          </div>
          <div style="background:rgba(255,255,255,.25);border-radius:8px;padding:10px;text-align:center;border:2px solid rgba(255,255,255,.4);">
            <div style="font-size:22px;font-weight:800;color:#FCD34D;" id="mug-total-display">$—</div>
            <div style="font-size:10px;color:rgba(255,255,255,.7);margin-top:2px;">🛡️ M.U.G. Total</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,.1);border-radius:7px;padding:9px;font-size:12px;color:rgba(255,255,255,.9);line-height:1.65;" id="mug-calc-narrative">
          Fill in mortgage, bills, and income above to see the M.U.G. calculation.
        </div>
        <button onclick="generateDIEmailFromDiscovery()" style="margin-top:10px;width:100%;background:#48BB78;color:white;border:none;border-radius:8px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;">📧 Generate DI Quote Email with This Data</button>
      </div>

    </div><!-- /di-discovery-body -->
  `;

  cardBody.appendChild(diDiv);

  // Wire up live MUG calculator
  ['di-income','di-mortgage','di-bills'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateMUGCalc);
  });

  document.getElementById('di-savings-months').addEventListener('change', updateMUGCalc);
  document.getElementById('di-income').addEventListener('input', function() {
    const inc = parseFloat(this.value) || 0;
    const hint = document.getElementById('di-income-hint');
    if (inc >= 600) {
      const est = Math.min(Math.round(inc * 0.65 / 100) * 100, 10000);
      hint.textContent = `→ Est. max benefit ~$${est.toLocaleString()}/mo`;
    } else if (inc > 0) {
      hint.textContent = '⚠️ Below $600/mo minimum';
      hint.style.color = '#C00000';
    }
  });
}

function toggleDIDiscovery() {
  const body = document.getElementById('di-discovery-body');
  const arrow = document.getElementById('di-disc-arrow');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (arrow) arrow.style.transform = open ? 'rotate(-90deg)' : '';
}

function updateMUGCalc() {
  const mort = parseFloat(document.getElementById('di-mortgage').value) || 0;
  const bills = parseFloat(document.getElementById('di-bills').value) || 0;
  const inc = parseFloat(document.getElementById('di-income').value) || 0;
  const savingsMonths = document.getElementById('di-savings-months').value;
  const total = mort + bills;

  if (!mort && !bills) { document.getElementById('di-mug-calc').style.display = 'none'; return; }
  document.getElementById('di-mug-calc').style.display = 'block';
  document.getElementById('mug-mort-display').textContent = mort ? '$' + mort.toLocaleString() : '$—';
  document.getElementById('mug-bills-display').textContent = bills ? '$' + bills.toLocaleString() : '$—';
  document.getElementById('mug-total-display').textContent = total ? '$' + total.toLocaleString() : '$—';

  const narrative = document.getElementById('mug-calc-narrative');
  if (total > 0) {
    const months = savingsMonths || '1–2';
    const pct = inc > 0 ? Math.round((total / inc) * 100) : '?';
    narrative.innerHTML = `Your client's M.U.G.® number is <strong style="color:#FCD34D;">$${total.toLocaleString()}/month</strong>${inc > 0 ? ` — that's ${pct}% of their income` : ''}. With only ${months} month(s) of savings, a disability without coverage means <strong style="color:#FC8181;">missed mortgage and bills in ${months} month(s)</strong>. A DI benefit of $${Math.min(total, 10000).toLocaleString()}/month would cover this gap entirely.`;
  }

  // Update MUG script with real numbers
  const script = document.getElementById('di-mug-script');
  if (script && mort && bills) {
    const sm = savingsMonths || '[SAVINGS]';
    script.innerHTML = `"So let me make sure I understand your situation. Your mortgage is about <strong>$${mort.toLocaleString()}/month</strong>, and your other basic living expenses on top of that are roughly <strong>$${bills.toLocaleString()}/month</strong>. That's your M.U.G. number — what absolutely has to be paid no matter what — <strong>$${total.toLocaleString()} every single month</strong>. And you told me your savings would last about <strong>${sm} months</strong>. So if you got hurt or sick today and couldn't work — you'd be behind on bills in ${sm} months. That's exactly what disability income insurance is designed to protect. Does it make sense to at least look at a plan?"`;
  }
}

function copyDIQ(el) {
  const text = el.innerText.replace(/^\s+|\s+$/g, '');
  navigator.clipboard.writeText(text).catch(() => {});
  const orig = el.style.background;
  el.style.background = '#D6EFE3';
  setTimeout(() => { el.style.background = orig; }, 600);
}


// ══════════════════════════════════════════════════════════════════
// SECTION 2: DI SCRIPTS — Step 10 Scripts Library injection
// ══════════════════════════════════════════════════════════════════
function injectDIScripts() {
  const step10 = document.querySelector('#step10');
  if (!step10) return;
  const cardBody = step10.querySelector('.card-body') || step10;

  const SCRIPTS = [
    {
      id: 'di-mug-opener',
      tag: '🏠 M.U.G. Opener',
      color: '#003A70',
      title: 'The M.U.G.® Plan — Door Opener',
      when: 'After completing life insurance pitch — use as a DI transition',
      script: `"Before I let you go, there's one more thing I want to bring up — and honestly most agents skip this entirely, so I want to make sure you're protected on all sides.

Your life insurance protects your family if you're GONE. But what happens to your family's finances if you're ALIVE but just can't work? A heart attack at 45 — you survive it, but you're out of work for 6 months. A car accident — you're recovering, but bills keep coming.

I'm talking about Mortgage... Utilities... Groceries. That's the M.U.G.® plan. Those three things don't stop just because your paycheck stops.

Illinois Mutual has a policy called Paycheck Power® that replaces your income — your actual monthly paycheck — while you're recovering. For less than $2 a day in most cases, it covers everything.

Can I take a couple of minutes and run through some numbers for you?"`,
      notes: 'Use after life insurance close. Works best when client has a mortgage.'
    },
    {
      id: 'di-job-ab',
      tag: '🎯 Job A vs B',
      color: '#1B7A4E',
      title: 'Job A vs. Job B — The Value Close',
      when: 'When prospect seems interested but hasn\'t committed',
      script: `"Let me put this in a way that makes total sense. Imagine two identical jobs — same title, same company, same duties. You\'re choosing which one to take.

Job A pays you [INCOME]/month. No disability coverage. If you get sick or hurt? Zero income until you recover.

Job B pays you [INCOME-MINUS-PREMIUM]/month — about $40 less per month. But if you get sick or hurt, it pays you [BENEFIT]/month until you can work again.

Right now, sitting here healthy, most people choose Job A for the extra $40. But the moment a disability hits? You\'d give anything for Job B.

The only difference between those two jobs is about $40 a month. That's the cost of this policy.

So which job would you choose?"`,
      notes: 'Replace [INCOME], [INCOME-MINUS-PREMIUM], and [BENEFIT] with actual numbers. Extremely effective closer.'
    },
    {
      id: 'di-rop-close',
      tag: '💰 ROP Close',
      color: '#C45911',
      title: 'Return of Premium — The No-Lose Close',
      when: 'When prospect is on the fence or worried about "wasting money"',
      script: `"Here's what makes this policy completely unique — and I've never seen anything like it in any other product line.

Illinois Mutual has what's called a Return of Premium rider. Here's how it works:

If you pay into this policy for 20 or 30 years and NEVER make a single disability claim — at age 65 or 67, they write you a check for every premium dollar you ever paid. Every cent, back in your pocket.

If you DO make a claim? The policy paid exactly what it was supposed to — it replaced your income when you needed it most.

You literally cannot lose. Either you protect your income and get your money's worth, or you never needed it and you get all your money back.

When's the last time any insurance policy offered you that kind of guarantee?"`,
      notes: 'ROP rider available ages 18-55, all classes. Not available in CT or MA. Not with 365/730-day elimination. Confirm eligibility first.'
    },
    {
      id: 'di-objection-cost',
      tag: '💸 Objection: Cost',
      color: '#8B6914',
      title: 'Budget Objection — The Daily Cost Reframe',
      when: 'Client says "I can\'t afford it" or "it\'s too expensive"',
      script: `"I completely understand — every dollar matters. But let me ask you this...

You make [INCOME]/month. That's [INCOME_DAILY] a day. If a disability hits and you're out of work for just 90 days, that's [90_DAYS] gone from your family's budget. Most disabilities last longer than that.

This policy costs roughly [PREMIUM] a month — that's less than [DAILY_COST] a day. You're insuring an income worth over $[ANNUAL_INCOME] a year for less than the cost of a Starbucks coffee.

And here's the thing — the people who say they can't afford disability insurance are exactly the people who need it most. Because if something happened, they have no cushion. No savings runway.

If we can find something in the $[LOWER_PREMIUM] to $[UPPER_PREMIUM] range a month, would that be workable for you?"`,
      notes: 'Replace all [BRACKETS] with real numbers. Always anchor to daily cost ($1.50-$2.50/day range). Then offer a shorter benefit period or longer elimination period to reduce premium.'
    },
    {
      id: 'di-objection-employer',
      tag: '🏢 Objection: Work Coverage',
      color: '#5B2C8A',
      title: 'Employer Coverage Objection — The Portability Close',
      when: 'Client says "I already have disability through work"',
      script: `"That's great that your employer offers that — a lot of companies don't even bother. But let me ask you three quick questions about it.

First — does it cover 100% of your income, or just a portion? Most group plans cover 60% of your base salary, and they usually exclude bonuses, commissions, and self-employment income.

Second — what happens to that coverage if you leave that job, get laid off, or the company cuts benefits? It's gone the same day your employment ends.

Third — is the benefit taxable? If your employer paid the premium, the benefit is taxable income, so that 60% becomes even less.

The Illinois Mutual policy I'm looking at for you is PORTABLE — it's yours regardless of your employer. It's GUARANTEED RENEWABLE — they can never cancel it as long as you pay premiums. And the benefit is TAX-FREE because you pay the premium yourself.

Would it make sense to have a personal policy that you own, that ADDS to your employer coverage and doesn't disappear when your job does?"`,
      notes: 'Very effective when prospect has group LTD. Position as supplemental. Group replaces 60% taxable; individual adds tax-free benefit on top.'
    },
    {
      id: 'di-biz-owner',
      tag: '🏢 Business Owner',
      color: '#2E75B6',
      title: 'Business Owner — Personal DI + BE105 Combined',
      when: 'Self-employed or business owner prospect',
      script: `"Being self-employed is amazing — but it comes with a risk most business owners don't think about until it's too late.

If you, [NAME], had to stop working tomorrow for 6 months — what would happen to your business? Your employees? Your clients? Your lease?

Illinois Mutual actually has TWO products designed specifically for you.

The first is Paycheck Power® — that's your personal income replacement. If you can't work, it pays you [BENEFIT]/month to cover your mortgage, groceries, and personal bills.

The second is Business Expense Power®, also called BE105. This one specifically reimburses your BUSINESS overhead — your office rent, employee salaries, utilities, insurance, and equipment payments — while you're recovering. So your business stays alive even when you're not there.

And here's the beautiful part — the premiums on the Business Expense policy are generally tax deductible as a business expense.

Would it make sense to look at protecting both your personal income AND your business with the same company?"`,
      notes: 'BE105 issue ages 18-60 only. Business must exist 1+ year. Insured must be full-time active owner/manager.'
    },
    {
      id: 'di-young-pro',
      tag: '👶 Young Professional',
      color: '#0D7377',
      title: 'Young Professional — Lock It In Young',
      when: 'Client is under 35 — works for Nurse Practitioners, Accountants, young professionals',
      script: `"Can I be real with you about something for a second?

You are in the absolute sweet spot right now for disability insurance. Young, healthy, good occupation, solid income. Do you know what your rates will look like for this same policy in 10 years? Significantly higher. And more importantly — do you know what a health condition discovered in the next 5 years could do to your ability to qualify? It could make you completely uninsurable.

The best time to lock in a disability policy is before you ever need it. And right now, today, you're at the cheapest you'll ever be for this coverage.

Illinois Mutual also has a Guaranteed Insurability Option — that means even if something happens to your health later, you have the right to buy MORE coverage without proving insurability again. No new health questions.

A small investment today locks in protection for your entire career. We're talking about protecting [INCOME_ANNUAL] a year in income. Would you be open to seeing what that looks like at your age?"`,
      notes: 'GIO rider ages 18-45. Guaranteed Renewable to 67. Lock-in close works well for any client under 45.'
    },
    {
      id: 'di-golden-qualifier',
      tag: '🔑 Golden Qualifier',
      color: '#1B7A4E',
      title: 'The Golden Qualifier — Final Pre-Close',
      when: 'After explaining DI and before asking for the application',
      script: `"[NAME], I've walked you through how the Illinois Mutual Paycheck Power® policy works, what it covers, and roughly what it would cost.

Let me ask you the most important question of this entire conversation:

If we can find a plan that fits your needs AND fits your budget — is there any other reason you would NOT want to go ahead and submit an application to see if you qualify?

I just need to take you through a few health questions so I can get you an accurate quote and submit everything on your behalf. You have a full 30-day free look period after approval — so you can review everything and cancel for any reason with a full refund if it's not right for you.

So — if the numbers work, are you ready to move forward?"`,
      notes: 'Classic golden qualifier. Get the yes BEFORE running the quote. Eliminates post-quote objections. If they say no — find out why NOW.'
    },
  ];

  const panel = document.createElement('div');
  panel.id = 'di-scripts-panel';
  panel.style.cssText = 'margin-top:16px;';

  let tabHTML = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">';
  SCRIPTS.forEach((s, i) => {
    tabHTML += `<button onclick="showDIScript('${s.id}')" id="dtab-${s.id}" style="padding:5px 11px;border-radius:16px;border:2px solid #CBD5E0;background:${i===0?s.color:'white'};color:${i===0?'white':'#718096'};font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;">${s.tag}</button>`;
  });
  tabHTML += '</div>';

  let scriptsHTML = '';
  SCRIPTS.forEach((s, i) => {
    scriptsHTML += `
      <div id="dscript-${s.id}" style="display:${i===0?'block':'none'};">
        <div style="background:linear-gradient(135deg,${s.color},${s.color}CC);border-radius:10px;padding:11px 15px;margin-bottom:10px;display:flex;align-items:center;gap:10px;">
          <div>
            <div style="color:white;font-size:13px;font-weight:700;">${s.title}</div>
            <div style="color:rgba(255,255,255,.75);font-size:11px;margin-top:2px;">📍 When to use: ${s.when}</div>
          </div>
          <button onclick="copyFullDIScript('dscript-body-${s.id}')" style="margin-left:auto;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:6px;padding:5px 12px;color:white;font-size:11px;font-weight:700;cursor:pointer;">📋 Copy</button>
        </div>
        <div id="dscript-body-${s.id}" style="background:#F7FAFC;border:1px solid #CBD5E0;border-radius:9px;padding:14px;font-size:13px;line-height:1.85;color:#1A202C;white-space:pre-line;cursor:pointer;" onclick="copyFullDIScript('dscript-body-${s.id}')" title="Click to copy">${s.script.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
        <div style="margin-top:8px;background:#FFF3CD;border-left:3px solid #D69E2E;padding:7px 10px;border-radius:0 7px 7px 0;font-size:11px;color:#7B5E00;line-height:1.6;">
          <strong>📌 Agent Note:</strong> ${s.notes}
        </div>
      </div>`;
  });

  panel.innerHTML = `
    <div style="background:linear-gradient(135deg,#003A70,#1A4A8A);border-radius:10px;padding:11px 15px;display:flex;align-items:center;gap:10px;margin-bottom:12px;">
      <span style="font-size:16px;">🏛️</span>
      <div>
        <div style="color:white;font-size:12px;font-weight:700;letter-spacing:.4px;">ILLINOIS MUTUAL DI — SCRIPTS LIBRARY</div>
        <div style="color:rgba(255,255,255,.7);font-size:10px;margin-top:1px;">7 complete sales scripts · Click any script to copy it</div>
      </div>
    </div>
    ${tabHTML}
    <div id="di-scripts-content">${scriptsHTML}</div>
  `;

  cardBody.appendChild(panel);
}

function showDIScript(id) {
  document.querySelectorAll('[id^="dscript-"]').forEach(el => {
    if (!el.id.includes('body')) el.style.display = 'none';
  });
  document.querySelectorAll('[id^="dtab-"]').forEach(btn => {
    btn.style.background = 'white';
    btn.style.color = '#718096';
    btn.style.borderColor = '#CBD5E0';
  });
  const target = document.getElementById('dscript-' + id);
  const tab = document.getElementById('dtab-' + id);
  if (target) target.style.display = 'block';
  if (tab) {
    tab.style.background = tab.dataset.color || '#003A70';
    tab.style.color = 'white';
  }
}

function copyFullDIScript(bodyId) {
  const el = document.getElementById(bodyId);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).catch(() => {});
  const orig = el.style.background;
  el.style.background = '#D6EFE3';
  setTimeout(() => { el.style.background = orig; }, 700);
}


// ══════════════════════════════════════════════════════════════════
// SECTION 3: DI QUOTE EMAIL GENERATOR
// ══════════════════════════════════════════════════════════════════
function injectDIEmailButton() {
  // Try to find a good injection point — near the lead info or top action bar
  const step1 = document.querySelector('#step1') || document.querySelector('.lead-header');
  if (!step1) return;

  const emailBtn = document.createElement('button');
  emailBtn.id = 'di-email-btn';
  emailBtn.style.cssText = 'background:#003A70;color:white;border:none;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;margin-top:8px;display:flex;align-items:center;gap:6px;';
  emailBtn.innerHTML = '📧 Generate DI Quote Request Email';
  emailBtn.onclick = () => openDIEmailModal();

  const cardBody = step1.querySelector('.card-body') || step1;
  cardBody.appendChild(emailBtn);

  // Build the email modal
  const modal = document.createElement('div');
  modal.id = 'di-email-modal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;overflow-y:auto;padding:20px;';
  modal.innerHTML = `
    <div style="background:white;border-radius:16px;max-width:760px;margin:0 auto;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3);">
      <div style="background:linear-gradient(135deg,#003A70,#2E75B6);padding:18px 22px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:20px;">📧</span>
        <div>
          <div style="color:white;font-size:16px;font-weight:700;">DI Quote Request Email Generator</div>
          <div style="color:rgba(255,255,255,.75);font-size:12px;margin-top:2px;">Pre-filled for Illinois Mutual DI Sales Desk · (800) 437-7355 Option 2</div>
        </div>
        <button onclick="closeDIEmailModal()" style="margin-left:auto;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:8px;padding:6px 14px;color:white;font-size:12px;font-weight:700;cursor:pointer;">✕ Close</button>
      </div>

      <div style="padding:20px;">
        <!-- Client Fields -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Client Name</div>
            <input id="em-name" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="First Last">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Date of Birth</div>
            <input id="em-dob" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="MM/DD/YYYY">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Age</div>
            <input id="em-age" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="e.g. 42">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Gender</div>
            <select id="em-gender" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;">
              <option value="">Select...</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">State</div>
            <input id="em-state" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="e.g. SC">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Tobacco?</div>
            <select id="em-tobacco" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;">
              <option value="Non-Tobacco">Non-Tobacco / Non-Nicotine</option>
              <option value="Tobacco">Current Tobacco/Nicotine User</option>
            </select>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Occupation</div>
            <input id="em-occ" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="e.g. RN — Hospital (Class 3)">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Monthly Income</div>
            <input id="em-income" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="e.g. $5,500">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Desired Monthly Benefit</div>
            <input id="em-benefit" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;" placeholder="e.g. $3,000 or 'Max available'">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Benefit Period</div>
            <select id="em-bp" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;">
              <option value="">Select...</option>
              <option>6 Month</option><option>1 Year</option><option>2 Year</option>
              <option>5 Year</option><option>10 Year</option><option>To Age 67</option>
              <option>Multiple — please quote all available</option>
            </select>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Elimination Period</div>
            <select id="em-elim" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;">
              <option value="">Select...</option>
              <option>30 Days</option><option>60 Days</option><option>90 Days</option>
              <option>180 Days</option><option>365 Days</option><option>730 Days</option>
              <option>Multiple — please quote 30, 60, and 90 days</option>
            </select>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Policy Type</div>
            <select id="em-type" class="em-field" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:13px;">
              <option>DI105 Personal only</option>
              <option>DI105 Personal + BE105 Business Expense</option>
              <option>BE105 Business Expense only</option>
              <option>DI105 + WSA07 Accident Insurance</option>
              <option>DI105 + BE105 + WSA07 — full package</option>
            </select>
          </div>
        </div>

        <!-- Riders -->
        <div style="margin-bottom:14px;">
          <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;">Riders to Quote</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;" id="em-riders">
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Return of Premium (9266)"> ROP</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="COLA Rider (9260)"> COLA</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="ADL Rider (9259)"> ADL</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="GIO Rider (9267)"> GIO</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Non-Cancelable (9251)"> Non-Can</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Own Occupation Rider (9255/9256/9258)"> Own Occ</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Residual Disability (9261)"> Residual</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Full Mental/Nervous (9265)"> Full Mental</label>
            <label style="display:flex;align-items:center;gap:5px;font-size:12px;background:#F0F4F8;border-radius:6px;padding:5px 10px;cursor:pointer;border:1px solid #CBD5E0;"><input type="checkbox" value="Automatic Increase (9252)"> Auto Increase</label>
          </div>
        </div>

        <!-- Health Notes -->
        <div style="margin-bottom:14px;">
          <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Health Notes / Special Circumstances</div>
          <textarea id="em-health" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:8px 10px;font-size:12px;height:70px;resize:vertical;" placeholder="Any relevant health conditions, prior claims, business ownership details, etc."></textarea>
        </div>

        <!-- Agent Info -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;background:#F0F4F8;border-radius:9px;padding:12px;">
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Your Name</div>
            <input id="em-agent" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:12px;" placeholder="Agent Name" value="Marcus">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Your Phone</div>
            <input id="em-agent-phone" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:12px;" placeholder="(843) 773-5293" value="(843) 773-5293">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">Your Email</div>
            <input id="em-agent-email" style="width:100%;border:2px solid #CBD5E0;border-radius:7px;padding:7px 10px;font-size:12px;" placeholder="your@email.com">
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-bottom:16px;">
          <button onclick="generateDIEmail()" style="flex:1;background:linear-gradient(135deg,#003A70,#2E75B6);color:white;border:none;border-radius:9px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;">⚡ Generate Email</button>
          <button onclick="clearDIEmail()" style="background:#F0F4F8;color:#718096;border:2px solid #CBD5E0;border-radius:9px;padding:12px 18px;font-size:12px;font-weight:700;cursor:pointer;">↺ Clear</button>
        </div>

        <!-- Generated Email Output -->
        <div id="em-output" style="display:none;">
          <div style="background:linear-gradient(135deg,#1B7A4E,#2D8A5E);border-radius:9px;padding:11px 15px;display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span style="color:white;font-size:13px;font-weight:700;">✅ Email Generated — Ready to Send</span>
            <div style="margin-left:auto;display:flex;gap:6px;">
              <button onclick="copyDIEmail()" style="background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:6px;padding:5px 12px;color:white;font-size:11px;font-weight:700;cursor:pointer;">📋 Copy All</button>
              <button onclick="openMailTo()" style="background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:6px;padding:5px 12px;color:white;font-size:11px;font-weight:700;cursor:pointer;">📤 Open in Mail</button>
            </div>
          </div>
          <div style="margin-bottom:8px;">
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px;">To:</div>
            <input id="em-to-display" readonly style="width:100%;border:1px solid #CBD5E0;border-radius:6px;padding:6px 10px;font-size:12px;background:#F7FAFC;" value="Sales@IllinoisMutual.com">
          </div>
          <div style="margin-bottom:8px;">
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px;">Subject:</div>
            <input id="em-subject-display" readonly style="width:100%;border:1px solid #CBD5E0;border-radius:6px;padding:6px 10px;font-size:12px;background:#F7FAFC;">
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px;">Body:</div>
            <textarea id="em-body-display" readonly style="width:100%;border:1px solid #CBD5E0;border-radius:6px;padding:10px;font-size:12px;height:340px;background:#F7FAFC;line-height:1.7;"></textarea>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function openDIEmailModal() {
  const modal = document.getElementById('di-email-modal');
  if (modal) modal.style.display = 'block';
  // Pre-fill from discovery if available
  const inc = document.getElementById('di-income');
  if (inc && inc.value) document.getElementById('em-income').value = '$' + parseFloat(inc.value).toLocaleString();
  // Try to pull lead name from dialer fields
  const leadName = document.querySelector('#leadName') || document.querySelector('#lead-name') || document.querySelector('[name="name"]');
  if (leadName && leadName.value) document.getElementById('em-name').value = leadName.value;
}

function generateDIEmailFromDiscovery() {
  openDIEmailModal();
  setTimeout(generateDIEmail, 300);
}

function closeDIEmailModal() {
  const modal = document.getElementById('di-email-modal');
  if (modal) modal.style.display = 'none';
}

function generateDIEmail() {
  const name = document.getElementById('em-name').value || '[Client Name]';
  const dob = document.getElementById('em-dob').value || '[DOB]';
  const age = document.getElementById('em-age').value || '[Age]';
  const gender = document.getElementById('em-gender').value || '[Gender]';
  const state = document.getElementById('em-state').value || '[State]';
  const tobacco = document.getElementById('em-tobacco').value || 'Non-Tobacco';
  const occ = document.getElementById('em-occ').value || '[Occupation]';
  const income = document.getElementById('em-income').value || '[Income]';
  const benefit = document.getElementById('em-benefit').value || '[Desired Benefit]';
  const bp = document.getElementById('em-bp').value || '[Benefit Period]';
  const elim = document.getElementById('em-elim').value || '[Elimination Period]';
  const policyType = document.getElementById('em-type').value || 'DI105 Personal only';
  const health = document.getElementById('em-health').value || 'No significant health history noted at this time.';
  const agentName = document.getElementById('em-agent').value || 'Marcus';
  const agentPhone = document.getElementById('em-agent-phone').value || '(843) 773-5293';
  const agentEmail = document.getElementById('em-agent-email').value || '';
  const today = new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'});

  const checkedRiders = [...document.querySelectorAll('#em-riders input:checked')].map(el => el.value);
  const ridersText = checkedRiders.length > 0
    ? checkedRiders.map(r => `  • ${r}`).join('\n')
    : '  • No specific riders requested — please quote base plan and advise on recommended riders for this profile';

  const subject = `DI Quote Request — ${name} — ${state} — Age ${age}`;

  const body = `To: DI Sales Team — Illinois Mutual Life Insurance Company
Re: Disability Income Quote Request
Date: ${today}

Hello,

I am writing to request a disability income quote for a client I spoke with today. Please find the client's information below. I would appreciate a quote as soon as possible and am happy to discuss the case over the phone.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Name:               ${name}
  Date of Birth:      ${dob}
  Age:                ${age}
  Gender:             ${gender}
  State of Residence: ${state}
  Tobacco/Nicotine:   ${tobacco}
  Occupation:         ${occ}
  Monthly Income:     ${income}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COVERAGE REQUESTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Policy Type:          ${policyType}
  Desired Monthly Benefit: ${benefit}
  Benefit Period:       ${bp}
  Elimination Period:   ${elim}

  Riders to Quote:
${ridersText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEALTH NOTES / SPECIAL CIRCUMSTANCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${health}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Agent Name:   ${agentName}
  Agency:       Evertrust Legacy Protection Group
  Phone:        ${agentPhone}${agentEmail ? '\n  Email:        ' + agentEmail : ''}

Please send the quote illustration to the email above or call me directly at ${agentPhone} to discuss. I am targeting to follow up with this client within 24–48 hours.

Thank you for your help!

${agentName}
Evertrust Legacy Protection Group
${agentPhone}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Illinois Mutual DI Sales: (800) 437-7355, Option 2
DI Underwriting: (800) 437-7355, ext. 790
Quote Tool: www.5GQUOTE.com`;

  document.getElementById('em-subject-display').value = subject;
  document.getElementById('em-body-display').value = body;
  document.getElementById('em-output').style.display = 'block';

  // Store for mailto
  window._diEmailSubject = subject;
  window._diEmailBody = body;
}

function copyDIEmail() {
  const subj = document.getElementById('em-subject-display').value;
  const body = document.getElementById('em-body-display').value;
  navigator.clipboard.writeText(`To: Sales@IllinoisMutual.com\nSubject: ${subj}\n\n${body}`).catch(() => {});
  const btn = event.target;
  btn.textContent = '✅ Copied!';
  setTimeout(() => { btn.textContent = '📋 Copy All'; }, 2000);
}

function openMailTo() {
  const subj = encodeURIComponent(window._diEmailSubject || '');
  const body = encodeURIComponent(window._diEmailBody || '');
  window.open(`mailto:Sales@IllinoisMutual.com?subject=${subj}&body=${body}`, '_blank');
}

function clearDIEmail() {
  document.querySelectorAll('.em-field').forEach(el => {
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else if (el.id !== 'em-agent' && el.id !== 'em-agent-phone') el.value = '';
  });
  document.querySelectorAll('#em-riders input').forEach(el => el.checked = false);
  document.getElementById('em-health').value = '';
  document.getElementById('em-output').style.display = 'none';
}

// ── END OF PATCH 2 ──────────────────────────────────────────────────────────────
