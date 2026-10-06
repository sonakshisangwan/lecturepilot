import { LectureData } from "@/types/study";

export const MOCK_LECTURES: LectureData[] = [
  {
    id: "cs229-opt",
    title: "CS 229: Gradient Descent & Convex Optimization",
    course: "Computer Science • Prof. Andrew Ng",
    type: "pdf",
    fileSize: "4.8 MB",
    pages: 42,
    duration: "1h 18m",
    date: "Yesterday at 4:30 PM",
    status: "ready",
    topics: ["Stochastic Gradient Descent", "Learning Rate Annealing", "Hessian Matrix", "Momentum", "Convexity Conditions"],
    summaryBrief:
      "This lecture establishes the mathematical foundations of first-order and second-order optimization. It contrasts batch gradient descent, mini-batch SGD, and Newton's method, detailing convergence rates, condition numbers, and saddle point evasion.",
    summaryFull: `### Executive Overview
Optimization forms the algorithmic backbone of modern supervised learning. While closed-form solutions (such as Normal Equations for Linear Regression) exist for simple quadratic loss functions, high-dimensional parameter spaces require iterative numerical methods.

---

### Key Pillars Covered

#### 1. First-Order Methods: Gradient Descent
- **Batch Gradient Descent (BGD)** computes the exact gradient over the full dataset $m$:
  $$\\theta_{j} := \\theta_{j} - \\alpha \\frac{1}{m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$
  *Guaranteed convergence to the global optimum for convex loss functions, but computationally prohibitive when $m > 10^6$.*
- **Stochastic Gradient Descent (SGD)** updates parameters per individual example. It introduces noise that helps escape shallow local minima and saddle points, but oscillates around the minimum without a decaying learning rate schedule $\\alpha_t = \\frac{\\alpha_0}{1 + kt}$.
- **Mini-Batch SGD (batch size $B=32\\dots 256$)** strikes the optimal trade-off between vectorization throughput on NVIDIA Tensor Cores and variance reduction.

#### 2. Momentum & Adaptive Learning Rates
- Standard SGD oscillates along high-curvature ravines (poor condition number $\\kappa = \\frac{\\lambda_{max}}{\\lambda_{min}}$).
- **Polyak Momentum** maintains an exponentially decaying velocity vector $v_t = \\beta v_{t-1} + \\alpha \\nabla J(\\theta)$, dampening oscillations in orthogonal dimensions.

#### 3. Second-Order Optimization: Newton-Raphson Method
- Uses the Hessian matrix $H \\in \\mathbb{R}^{n \\times n}$ of second partial derivatives:
  $$\\theta := \\theta - H^{-1} \\nabla J(\\theta)$$
- **Quadratic Convergence**: Takes dramatically fewer steps near the minimum ($O(\\log \\log \\frac{1}{\\epsilon})$), but inverting an $n \\times n$ matrix scales as $O(n^3)$ per step, making it infeasible when $n$ is in the millions.

---

### High-Yield Exam Takeaway
Know when to pick Newton's method vs SGD. If the feature dimensionality $n < 1,000$ and computing $H$ is tractable, Newton's method converges in fewer than 10 iterations. For deep neural networks ($n > 10^7$), first-order momentum or Adam is mandatory.`,
    flashcards: [
      {
        id: "fc-1",
        front: "What is the condition number $\\kappa$ of a Hessian matrix, and how does it affect gradient descent convergence?",
        back: "$\\kappa = \\frac{\\lambda_{max}}{\\lambda_{min}}$. A high condition number creates an ill-conditioned elliptical loss surface where gradient descent bounces excessively along steep ravine walls instead of progressing toward the minimum.",
        category: "Optimization Theory",
        difficulty: "Hard",
        repetitionStage: 2,
      },
      {
        id: "fc-2",
        front: "Why does Newton's method struggle with non-convex loss surfaces in deep learning?",
        back: "Newton's method attracts toward points where $\\nabla J(\\theta) = 0$, regardless of whether the curvature is positive or negative. In high dimensions, saddle points vastly outnumber local minima, so $H^{-1}$ directs the step directly toward saddle points.",
        category: "Second-Order Methods",
        difficulty: "Hard",
        repetitionStage: 1,
      },
      {
        id: "fc-3",
        front: "What role does the momentum coefficient $\\beta$ (typically 0.9) play in Polyak Momentum?",
        back: "It acts as a friction parameter. It averages past gradients to accelerate in directions of persistent gradient sign while cancelling out high-frequency oscillations in ravine walls.",
        category: "First-Order Methods",
        difficulty: "Medium",
        repetitionStage: 3,
      },
      {
        id: "fc-4",
        front: "State the update rule for Mini-Batch Gradient Descent with batch size $B$.",
        back: "$\\theta := \\theta - \\alpha \\frac{1}{B} \\sum_{i \\in \\mathcal{B}} \\nabla_\\theta \\mathcal{L}(h_\\theta(x^{(i)}), y^{(i)})$. Enables parallel GPU SIMD execution while reducing gradient noise variance by factor $\\frac{1}{\\sqrt{B}}$.",
        category: "SGD Algorithms",
        difficulty: "Easy",
        repetitionStage: 4,
      },
      {
        id: "fc-5",
        front: "What is the computational complexity of inverting an $n \\times n$ Hessian matrix in standard Newton's Method?",
        back: "$O(n^3)$ using Gaussian elimination or Cholesky decomposition. Storing $H$ requires $O(n^2)$ memory.",
        category: "Computational Complexity",
        difficulty: "Easy",
        repetitionStage: 4,
      },
    ],
    quiz: [
      {
        id: "qz-1",
        question: "Why does Mini-Batch SGD converge faster in real-world wall-clock time than pure Stochastic Gradient Descent (batch size = 1)?",
        options: [
          "Mini-batch SGD has a strictly higher theoretical convergence rate per parameter update",
          "Mini-batch SGD maximizes GPU Tensor Core matrix multiplication parallelism while reducing gradient variance",
          "Mini-batch SGD guarantees that every batch is strictly convex",
          "Mini-batch SGD automatically computes the second derivative of the loss function"
        ],
        answerIndex: 1,
        explanation: "Hardware acceleration: Modern GPUs and NVIDIA Tensor Cores process matrix batches (e.g. 64 or 128 items) in parallel at nearly the same latency as a single sample, while the averaging reduces sample variance.",
        source: "Slide 16 • Matrix Parallelism on Tensor Accelerators",
      },
      {
        id: "qz-2",
        question: "When applying Newton's method to optimize a function $J(\\theta)$, under what condition is the update step guaranteed to be a descent direction?",
        options: [
          "The Hessian matrix $H$ must be symmetric positive-definite ($H \\succ 0$)",
          "The learning rate $\\alpha$ must be strictly greater than 1.0",
          "The gradient $\\nabla J(\\theta)$ must have all positive components",
          "The number of data samples $m$ must exceed the parameter dimension $n$"
        ],
        answerIndex: 0,
        explanation: "If $H$ is positive definite ($H \\succ 0$), its inverse $H^{-1}$ is also positive definite, ensuring $-H^{-1} \\nabla J(\\theta)$ forms an acute angle with $-\\nabla J(\\theta)$, guaranteeing a local decrease in loss.",
        source: "Slide 28 • Second-Order Curvature & Definiteness",
      },
      {
        id: "qz-3",
        question: "A student notices that training loss oscillates wildly between successive epochs without ever reaching a low plateau. What is the most likely cause?",
        options: [
          "The batch size is too large for the GPU memory buffer",
          "The learning rate $\\alpha$ is too high, overshooting the valley bottom repeatedly",
          "The model has too few parameters and underfits the linear hypothesis",
          "The loss function is strictly convex with zero condition number"
        ],
        answerIndex: 1,
        explanation: "If the step size $\\alpha$ exceeds $\\frac{2}{\\lambda_{max}}$ (where $\\lambda_{max}$ is the maximum eigenvalue of the Hessian), gradient descent diverges or oscillates across the ravine walls.",
        source: "Slide 11 • Stability Bounds on Learning Rate",
      },
      {
        id: "qz-4",
        question: "What is the primary difference between AdaGrad and RMSProp?",
        options: [
          "AdaGrad uses momentum while RMSProp does not",
          "RMSProp uses an exponentially decaying average of squared gradients instead of summing all historical squared gradients",
          "AdaGrad computes second-order derivatives while RMSProp only computes first-order",
          "RMSProp requires a separate Hessian inversion every 10 steps"
        ],
        answerIndex: 1,
        explanation: "AdaGrad accumulates all past squared gradients in the denominator, causing the learning rate to shrink monotonically until training freezes. RMSProp replaces the cumulative sum with an exponential moving average (parameter $\\beta_2$), allowing continued learning.",
        source: "Slide 34 • Adaptive Optimization Methods",
      },
    ],
    keyPoints: [
      {
        id: "kp-1",
        title: "Learning Rate Stability Condition",
        category: "Formula",
        content: "For quadratic loss $J(\\theta) = \\frac{1}{2} \\theta^T A \\theta - b^T \\theta$, gradient descent converges if and only if $0 < \\alpha < \\frac{2}{\\lambda_{max}(A)}$. If $\\alpha > \\frac{2}{\\lambda_{max}}$, the update diverges exponentially.",
        examWeight: 3,
        mastered: true,
      },
      {
        id: "kp-2",
        title: "Newton-Raphson vs Gradient Descent Tradeoff",
        category: "Core Concept",
        content: "Newton's method requires $O(n^3)$ operations per step due to $(H)^{-1}$ inversion, but reaches quadratic convergence in very few iterations. GD is $O(n)$ per step but has linear convergence rate.",
        examWeight: 3,
        mastered: false,
      },
      {
        id: "kp-3",
        title: "Ill-Conditioned Ravines & The Hessian Condition Number",
        category: "Exam Trap",
        content: "Exam Trap: Students often confuse high condition number with steep gradients. Condition number $\\kappa = \\lambda_{max} / \\lambda_{min}$ measures ratio of extreme curvatures, causing perpendicular oscillations rather than descent toward the minimum.",
        examWeight: 2,
        mastered: false,
      },
      {
        id: "kp-4",
        title: "Lipschitz Smoothness Definition",
        category: "Definition",
        content: "A function $f$ is $L$-Lipschitz smooth if $\\|\\nabla f(x) - \\nabla f(y)\\| \\leq L \\|x - y\\|$ for all $x, y$. This sets the upper bound on curvature and guarantees safe descent step size $\\alpha = 1/L$.",
        examWeight: 2,
        mastered: true,
      },
    ],
    initialChat: [
      {
        id: "msg-1",
        sender: "user",
        text: "Why did Prof. Ng say that Newton's method is disastrous for modern deep learning even though it has quadratic convergence?",
        timestamp: "4:32 PM",
      },
      {
        id: "msg-2",
        sender: "ai",
        text: "Two fundamental mathematical and engineering roadblocks prevent Newton's method in deep learning:\n\n1. **The Curse of Saddle Points in High Dimensions**:\nIn deep networks, local minima are rare; high-dimensional spaces are dominated by **saddle points** (where some Hessian eigenvalues are positive and others are negative). Newton's method targets $\\nabla J(\\theta) = 0$, so negative curvature causes it to accelerate *directly toward* saddle points rather than escaping them.\n\n2. **The $O(n^3)$ Computational Wall**:\nInverting the Hessian $H \\in \\mathbb{R}^{n \\times n}$ scales as $O(n^3)$. When $n = 100\\text{M}$ parameters (a modest model today), storing $H$ requires **40 petabytes of RAM**, and inverting it would take centuries of compute.\n\nThat's why first-order methods like Adam with GPU-accelerated Tensor Core operations remain standard.",
        citations: [
          {
            label: "Slide 29: Newton's Method Limitations",
            page: 29,
            excerpt: "At saddle points where det(H) < 0, second-order updates attract rather than repel.",
          },
          {
            label: "Audio 44:18",
            timestamp: "44:18",
            excerpt: "Andrew Ng: 'If you have a billion parameters, forget about calculating an n-by-n matrix every step.'",
          },
        ],
        timestamp: "4:32 PM",
        suggestedFollowUps: [
          "How does Quasi-Newton (L-BFGS) approximate the inverse Hessian?",
          "Can you give me a quick quiz question on this?",
          "Show me the Polyak Momentum update formula",
        ],
      },
    ],
  },
  {
    id: "bio101-resp",
    title: "BIO 101: Cellular Respiration & Mitochondrial ATP Synthase",
    course: "Biological Sciences • Dr. Elena Rostova",
    type: "video",
    fileSize: "142 MB",
    pages: 36,
    duration: "52m 10s",
    date: "2 days ago",
    status: "ready",
    topics: ["Glycolysis", "Citric Acid Cycle (Krebs)", "Electron Transport Chain", "Chemiosmotic Hypothesis", "ATP Synthase Rotary Motor"],
    summaryBrief:
      "A complete molecular walkthrough of how cells convert glucose into ~30-32 ATP. Details proton gradient generation across the inner mitochondrial membrane and the mechanical rotation of the F0-F1 ATP synthase complex.",
    summaryFull: `### Cellular Respiration Study Guide

#### Phase 1: Glycolysis (Cytosol)
- Anaerobic breakdown of 1 Glucose ($C_6H_{12}O_6$) into 2 Pyruvate ($C_3H_4O_3$).
- Net yield: **2 ATP** (via substrate-level phosphorylation) and **2 NADH**.
- Rate-limiting enzyme: **Phosphofructokinase-1 (PFK-1)**, allosterically inhibited by high ATP and citrate.

#### Phase 2: Pyruvate Oxidation & Citric Acid Cycle (Mitochondrial Matrix)
- Pyruvate enters the matrix via mitochondrial pyruvate carrier (MPC) and is converted by Pyruvate Dehydrogenase into **Acetyl-CoA** + $CO_2$ + NADH.
- Krebs Cycle turns twice per glucose molecule: produces 2 ATP/GTP, 6 NADH, 2 $FADH_2$, and releases 4 $CO_2$.

#### Phase 3: Oxidative Phosphorylation & The Chemiosmotic Coupling
- **Complex I (NADH Dehydrogenase)**: Pumps 4 $H^+$ per NADH.
- **Complex II (Succinate Dehydrogenase)**: Transfers electrons from $FADH_2$ without pumping protons.
- **Complex III (Cytochrome bc1)**: Pumps 4 $H^+$.
- **Complex IV (Cytochrome c Oxidase)**: Pumps 2 $H^+$, reduces oxygen to water: $\\frac{1}{2} O_2 + 2H^+ + 2e^- \\rightarrow H_2O$.
- **ATP Synthase ($F_0 F_1$)**: Driven by proton motive force (PMF $\\Delta p = \\Delta \\psi - \\frac{2.3RT}{F} \\Delta pH$). 3 to 4 protons passing through the $c$-ring rotate the central $\\gamma$-stalk, causing conformational changes in the 3 catalytic $\\beta$-subunits (Open $\\rightarrow$ Loose $\\rightarrow$ Tight) to synthesize ATP from ADP and $P_i$.`,
    flashcards: [
      {
        id: "fc-b1",
        front: "What is the final electron acceptor in the mitochondrial electron transport chain?",
        back: "Molecular Oxygen ($O_2$). Complex IV reduces it to water ($H_2O$): $\\frac{1}{2}O_2 + 2H^+ + 2e^- \\rightarrow H_2O$. Without oxygen, electron flow ceases and the proton gradient collapses.",
        category: "Oxidative Phosphorylation",
        difficulty: "Easy",
        repetitionStage: 4,
      },
      {
        id: "fc-b2",
        front: "Why does 1 molecule of $FADH_2$ generate fewer ATP (~1.5) than 1 molecule of NADH (~2.5)?",
        back: "$FADH_2$ enters at Complex II (Succinate Dehydrogenase), bypassing Complex I. Therefore, electrons from $FADH_2$ only trigger proton pumping across Complexes III and IV (6 $H^+$ total) versus Complexes I, III, and IV (10 $H^+$ total) for NADH.",
        category: "Bioenergetics",
        difficulty: "Medium",
        repetitionStage: 3,
      },
      {
        id: "fc-b3",
        front: "Explain the Paul Boyer Binding Mechanism of the $F_1$ ATP synthase head.",
        back: "The three catalytic $\\beta$-subunits cycle through three conformational states: (1) Open: binds ADP + Pi weakly, (2) Loose: holds substrates tightly, (3) Tight: mechanically forces condensation into ATP. The rotating asymmetrical $\\gamma$-subunit drives the transition.",
        category: "Molecular Motors",
        difficulty: "Hard",
        repetitionStage: 2,
      },
    ],
    quiz: [
      {
        id: "qz-b1",
        question: "If an uncoupling protein (like Thermogenin / UCP-1 in brown adipose tissue) allows protons to leak back into the matrix without passing through ATP Synthase, what happens?",
        options: [
          "ATP production halts and the energy of the electrochemical gradient is released as heat",
          "Glycolysis is completely inhibited by excess substrate",
          "Oxygen consumption ceases immediately",
          "The inner mitochondrial membrane ruptures due to hyper-osmotic pressure"
        ],
        answerIndex: 0,
        explanation: "Uncouplers dissipate the proton motive force without driving the ATP synthase turbine. Electron transport continues furiously (consuming oxygen), but the dissipated gradient produces pure non-shivering thermogenesis (heat).",
        source: "Video Timestamp 38:12 • Thermogenic Uncoupling",
      },
    ],
    keyPoints: [
      {
        id: "kp-b1",
        title: "Net ATP Balance Sheet per Glucose",
        category: "Core Concept",
        content: "Theoretical yield is 36-38 ATP; observed practical yield in mammalian cells is 30-32 ATP due to proton leakage and the energy cost of importing pyruvate and phosphate into the matrix.",
        examWeight: 3,
        mastered: true,
      },
    ],
    initialChat: [
      {
        id: "msg-b1",
        sender: "user",
        text: "Can you explain how ATP Synthase mechanically rotates like a turbine?",
        timestamp: "10:14 AM",
      },
      {
        id: "msg-b2",
        sender: "ai",
        text: "ATP Synthase is literally a nanoscale rotary motor composed of two parts:\n\n1. **$F_0$ base (membrane rotor)**: Protons in the intermembrane space enter half-channels in the stationary $a$-subunit, neutralize negative aspartate residues on the $c$-ring subunits, and cause the $c$-ring to rotate mechanically like a water wheel as protons exit into the matrix.\n\n2. **$F_1$ catalytic knob (matrix stator)**: The spinning $c$-ring is attached to the central asymmetrical $\\gamma$-stalk. As $\\gamma$ spins inside the stationary $(\\alpha\\beta)_3$ hexamer, it rhythmically deforms each $\\beta$-subunit into the 'Tight' conformation, smashing ADP and inorganic phosphate together to create ATP.\n\nEvery full 360° turn synthesizes 3 ATP molecules!",
        citations: [
          {
            label: "Video 41:20: Rotary motor simulation",
            timestamp: "41:20",
            excerpt: "Dr. Elena: 'Notice the central gamma stalk rotating at up to 100 revolutions per second.'",
          },
        ],
        timestamp: "10:15 AM",
        suggestedFollowUps: [
          "What happens if Cyanide blocks Complex IV?",
          "Quiz me on the differences between NADH and FADH2",
        ],
      },
    ],
  },
];
